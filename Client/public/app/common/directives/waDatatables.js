/**
 * Web Artists Data Tables Directive
 */
define([
	// Utilities
	'common/module',        // Commons Module.
	'common/utils/supplant',// Supplant Helper from Crockford.
	'jquery',               // jQuery
	'lodash',               // Lodash plugin for data manipulation
	'bootstrap',            // Bootstrap
	'datatables',           // jQuery Datatables
	'datatables-tabletools',// Datatables Tabletools plugin
	'datatables-colvis',    // Datatables Col Visibility plugin
	'datatables-bootstrap', // Datatables bootstrap styles
	'datatables-colfilter', // Datatables column filter plugin
	'datatables-responsive',// Datatables responsive plugin
	'datatables-selectable' // Datatables Selectables plugin
],
function(module, supplant) {

	'use strict';

	module.registerDirective('waDatatables', [
		'$timeout',
		'$parse',
		'_',
		function($timeout, $parse, _) {

			var linker = function(scope, element, attrs) {

				// apply DataTable options, use defaults if none specified.
				var options = {};
				// Responsive parameters
				var responsiveHelper = undefined;
				var breakpointDefinition = {
					tablet: 1024,
					phone: 480
				};
				if (attrs.waDatatables.length > 0) {
					options = scope.$eval(attrs.waDatatables);
				} else {
					options = {
						"bStateSave": true,
						"bPaginate": true,
						"bLengthChange": true,
						"bFilter": true,
						"bInfo": true,
						"bRetrieve": true,
						"sDom": "L<'dt-toolbar'<'col-xs-12 col-sm-6'l><'col-sm-6 hidden-xs'TC>r>" +
							"t" +
							"<'dt-toolbar-footer'<'col-xs-6'i><'col-xs-6'p>>",
						//"sDom": "LTC<'clear'>R<'dt-toolbar'lr>" + "t" + "<'dt-toolbar-footer'<'col-xs-6'i><'col-xs-6'p>>",
						"oTableTools": {
							"aButtons": ["copy", {
								"sExtends": "print",
								"sMessage": "Print Report <i>(press Esc to close)</i>"
							}, "csv", "xls", "pdf"],
							"sSwfPath": "plugin/datatables-tabletools/swf/copy_csv_xls_pdf.swf"
						},
						"colVis": {
							activate: "mouseover",
							aiExclude: [0]
						},
						preDrawCallback: function () {
							// Initialize the responsive datatables helper once.
							if (!responsiveHelper) {
								responsiveHelper = new ResponsiveDatatablesHelper(element, breakpointDefinition);
							}
						},
						rowCallback: function (nRow) {
							responsiveHelper.createExpandIcon(nRow);
						},
						drawCallback: function (oSettings) {
							responsiveHelper.respond();
							if ($.fn.DataTable.ColVis) {
								$('.ColVis_MasterButton').addClass('btn btn-default');
								$('.ColVis_Button').removeClass('ColVis_Button');
							}
							$('.DTTT_container a').removeClass('DTTT_button').addClass("btn btn-default");
							$('.DTTT_container').removeClass('DTTT_container').addClass('DTTT btn-group');
							$('.dt-toolbar input, select').addClass('form-control input-sm');
						}
					};
				}

				// Tell the dataTables plugin what columns to use
				// We can either derive them from the dom, or use setup from the controller
				var explicitColumns = [];

				// Reverting to jQuery here since element.find in angular is only limited to tag ids.
				$(element).find('thead>tr[0]>th').each(function(index, elem) {
					explicitColumns.push($(elem).text());
				});
				if (explicitColumns.length > 0) {
					options["aoColumns"] = explicitColumns;
				} else if (attrs.aoColumns) {
					options["aoColumns"] = scope.$eval(attrs.aoColumns);
				}

				// aoColumnDefs is dataTables way of providing fine control over column config
				if (attrs.aoColumnDefs) {
					options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
				}

				// added here to modify styles for table tools & colVis plugins
				if (attrs.fnRowCallback) {
					options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
				}

				if (attrs.selectableOptions) {
					var selectionChangedHandler = $parse(attrs.onSelectionChanged);
					options["oSelectable"] = scope.$eval(attrs.selectableOptions);
					options["oSelectable"]["fnSelectionChanged"] = function(selection) {
						selectionChangedHandler(scope, {selection: selection._aoData});
					};
				}

				// apply the plugin
				var dataTable = $(element).dataTable(options);

				// check if column filters are defined.
				if (attrs.colFilterAoColumns) {
					dataTable.columnFilter({
						aoColumns: scope.$eval(attrs.colFilterAoColumns)
					});
				}

				if(attrs.childTableOptions) {
					var formatChildTable = function(aData) {
						var childColumns = scope.$eval(attrs.childTableOptions);
						var childTableColumns = '';
						angular.forEach(childColumns, function(eachColumn) {
							childTableColumns += supplant('<tr><td class="heading">{0}</td><td class="text-left">{1}</td></tr>', [eachColumn.heading, aData[eachColumn.field]]);
						});
						var childTableHtml = supplant('<div class="child-table"><table class="table table-condensed table-bordered">{0}</table></div>', [childTableColumns]);
						return childTableHtml;
					};

					$(element).find('tbody').on('click', 'td.control', function() {
						var tr = this.parentNode;
						if(!dataTable.fnIsOpen(tr) && ($(tr).find('td.control>div').length)){
							var aData = dataTable.fnGetData(tr);
							var details = dataTable.fnOpen(tr, formatChildTable(aData), 'child-details');
							$('div.childTable', details).slideDown();
							$(tr).find('td.control>div>i').removeClass('fa-plus').addClass('fa-minus');
						} else {
							dataTable.fnClose(tr)
							$(tr).find('td.control>div>i').removeClass('fa-minus').addClass('fa-plus');
						}
					});
				}

				/* Get row data based on the id and custom action specified in controller*/
				if (attrs.customActions) {
					var ActionList = scope.$eval(attrs.customActions);
					_.each(ActionList, function (obj) {
						$(element).find('tbody').on('click', 'td ' + obj.actionControlId, function () {
							var parent = $(this).closest("tr")[0];
							var rowData = dataTable.fnGetData(parent);
							var rowHandler = $parse(obj.actionHandler);
							rowHandler(scope, { row: rowData });
						});
					});
				}

				// watch for any changes to our data, rebuild the DataTable
				scope.$watch(attrs.aaData, function(value) {
					var val = value || null;
					if (val) {
						dataTable.fnClearTable();
						clearSelection();
						if(val.length > 0) {
							dataTable.fnAddData(scope.$eval(attrs.aaData));
						}
					}
				}, true);

				// Event to clear selection.
				scope.$on("clearSelection", function() {
					clearSelection();
				});

				function clearSelection() {
					if(attrs.selectableOptions) {
						var selection = dataTable.fnGetSelection();
						if(selection) {
							selection.fnClear();
						}
					}
				}
			};

			return {
				// For now, it can be used as an attribute.
				restrict: 'A',
				link: linker
			};
		}
	]);
});
