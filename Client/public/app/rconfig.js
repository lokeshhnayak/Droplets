var require = {
	waitSeconds: 0,
	paths: {

		// Load from CDN wherever possible
		'jquery': [
			'//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
			'../plugin/jquery/jquery.min'
		],
		'jquery-ui': [
			'//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min',
			'../plugin/jquery-ui/jquery-ui.min'
		],
		'bootstrap': [
			'//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min',
			'../plugin/bootstrap/dist/js/bootstrap.min'
		],
		'angular': [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.2.27/angular.min',
			'../plugin/angular/angular.min'
		],
		'angular-cookies': [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.2.27/angular-cookies.min',
			'../plugin/angular-cookies/angular-cookies.min'
		],
		'angular-resource': [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.2.27/angular-resource.min',
			'../plugin/angular-resource/angular-resource.min'
		],
		'angular-sanitize': [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.2.27/angular-sanitize.min',
			'../plugin/angular-sanitize/angular-sanitize.min'
		],
		'angular-animate': [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.2.27/angular-animate.min',
			'../plugin/angular-animate/angular-animate.min'
		],

		// Require JS related (Plugins)
		'domReady': '../plugin/requirejs-domready/domReady',

		// Angular JS related (Plugins)
		'angular-ui-router': '../plugin/angular-ui-router/release/angular-ui-router.min',
		'angular-google-maps': '../plugin/angular-google-maps/dist/angular-google-maps.min',
		'angular-bootstrap': '../plugin/angular-bootstrap/ui-bootstrap-tpls.min',
		'angular-couch-potato': '../plugin/angular-couch-potato/dist/angular-couch-potato',
		'angular-easyfb': '../plugin/angular-easyfb/angular-easyfb.min',
		'angular-google-plus': '../plugin/angular-google-plus/dist/angular-google-plus.min',
		'angular-sails': '../plugin/angular-sails/dist/angular-sails.min',
		'angular-permission': '../plugin/angular-permission/dist/angular-permission',
		'restangular': '../plugin/restangular/dist/restangular.min',
		'satellizer': '../plugin/satellizer/satellizer.min',

		// jQuery related (Plugins)
		'pace':'../plugin/pace/pace.min',
		'fastclick': '../plugin/fastclick/lib/fastclick',
		'jquery-color': '../plugin/jquery-color/jquery.color',
		'select2': '../plugin/select2/select2.min',
		'summernote': '../plugin/summernote/dist/summernote.min',
		'he': '../plugin/he/he',
		'to-markdown': '../plugin/to-markdown/src/to-markdown',
		'markdown': '../plugin/markdown/lib/markdown',
		'ckeditor': '../plugin/ckeditor/ckeditor',
		'jqgrid':'../plugin/jqgrid/js/minified/jquery.jqGrid.min',
		'jqgrid-locale-en':'../plugin/jqgrid/js/i18n/grid.locale-en',
		'jquery-maskedinput': '../plugin/jquery-maskedinput/dist/jquery.maskedinput.min',
		'jquery-validation': '../plugin/jquery-validation/dist/jquery.validate.min',
		'jquery-form': '../plugin/jquery-form/jquery.form',
		'nouislider': '../plugin/nouislider/distribute/jquery.nouislider.min',
		'ionslider': '../plugin/ion.rangeSlider/js/ion.rangeSlider.min',
		'jquery-knob': '../plugin/jquery-knob/dist/jquery.knob.min',
		'dropzone': '../plugin/dropzone/downloads/dropzone.min',
		'jcrop': '../plugin/jcrop/js/jquery.Jcrop.min',
		'jquery-nestable': '../plugin/jquery-nestable/jquery.nestable',
		'superbox': '../plugin/superbox/superbox.min',
		'magnific-popup': '../plugin/magnific-popup/dist/jquery.magnific-popup',

		// Bootstrap related (Plugins)
		'bootstrap-markdown': '../plugin/bootstrap-markdown/js/bootstrap-markdown',
		'bootstrap-validator': '../plugin/bootstrapvalidator/dist/js/bootstrapValidator.min',
		'bootstrap-timepicker': '../plugin/bootstrap3-fontawesome-timepicker/js/bootstrap-timepicker.min',
		'clockpicker': '../plugin/clockpicker/dist/bootstrap-clockpicker.min',
		'bootstrap-duallistbox': '../plugin/bootstrap-duallistbox/dist/jquery.bootstrap-duallistbox.min',
		'bootstrap-colorpicker': '../plugin/bootstrap-colorpicker/js/bootstrap-colorpicker',
		'bootstrap-slider': '../plugin/seiyria-bootstrap-slider/dist/bootstrap-slider.min',
		'bootstrap-tagsinput': '../plugin/bootstrap-tagsinput/dist/bootstrap-tagsinput.min',
		'x-editable': '../plugin/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min',
		'fuelux-wizard': '../plugin/fuelux/js/wizard',
		'bootstrap-progressbar': '../plugin/bootstrap-progressbar/bootstrap-progressbar.min',

		// Moment
		'moment': '../plugin/moment/min/moment-with-locales.min',
		'moment-timezone': '../plugin/moment-timezone/moment-timezone',

		// Charts related.
		'sparkline': '../plugin/relayfoods-jquery.sparkline/dist/jquery.sparkline.min',
		'easy-pie': '../plugin/jquery.easy-pie-chart/dist/jquery.easypiechart.min',
		'flot': '../plugin/flot/jquery.flot.cust.min',
		'flot-resize': '../plugin/flot/jquery.flot.resize.min',
		'flot-fillbetween': '../plugin/flot/jquery.flot.fillbetween.min',
		'flot-orderBar': '../plugin/flot/jquery.flot.orderBar.min',
		'flot-pie': '../plugin/flot/jquery.flot.pie.min',
		'flot-time': '../plugin/flot/jquery.flot.time.min',
		'flot-tooltip': '../plugin/flot/jquery.flot.tooltip.min',
		'raphael': '../plugin/morris/raphael.min',
		'morris': '../plugin/morris/morris.min',
		'dygraphs': '../plugin/dygraphs/dygraph-combined.min',
		'chartjs': '../plugin/chartjs/chart.min',
		'jquery-jvectormap': '../plugin/vectormap/jquery-jvectormap-1.2.2.min',
		'jquery-jvectormap-world-mill-en': '../plugin/vectormap/jquery-jvectormap-world-mill-en',

		// Datatables related.
		'datatables': '../plugin/datatables/media/js/jquery.dataTables.min',
		'datatables-bootstrap': '../plugin/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap',
		'datatables-tabletools': '../plugin/datatables-tabletools/js/dataTables.tableTools',
		'datatables-colvis': '../plugin/datatables-colvis/js/dataTables.colVis',
		'datatables-colfilter': '../plugin/datatables-colfilter/media/js/jquery.dataTables.columnFilter',
		'datatables-responsive': '../plugin/datatables-responsive/files/1.10/js/datatables.responsive',
		'jquery-grouptoggle': '../plugin/datatables-selectable/src/jquery.groupToggle',
		'datatables-selectable': '../plugin/datatables-selectable/src/datatables.Selectable',
		
		// 'angular-x-editable': '../plugin/angular-xeditable/dist/js/xeditable.min',

		// Lo-Dash/Underscore
		'lodash': '../plugin/lodash/dist/lodash.min',

		// SA Plugins
		'fullcalendar': '../sa-plugin/fullcalendar/jquery.fullcalendar.min',
		'smartwidgets': '../sa-plugin/smartwidgets/jarvis.widget.min',
		'notification': '../sa-plugin/notification/SmartNotification.min',

		// app js file includes
		'appConfig': '../app.config',
		'modules-includes': 'includes',

		// loading bar
		'loadingbar': '../plugin/angular-loading-bar/build/loading-bar.min',

		// sails io
		'socket-io': 'http://localhost:1337/socket.io/socket.io',
		'sails-io': '../plugin/sails.io.js/dist/sails.io'

	},
	shim: {
		'angular': {'exports': 'angular', deps: ['jquery']},
		'angular-animate': { deps: ['angular'] },
		'angular-resource': { deps: ['angular'] },
		'angular-cookies': { deps: ['angular'] },
		'angular-sanitize': { deps: ['angular'] },
		'angular-bootstrap': { deps: ['angular'] },
		'angular-ui-router': { deps: ['angular'] },
		'angular-google-maps': { deps: ['angular'] },
		'angular-couch-potato': { deps: ['angular'] },
		'angular-permission': { deps: ['angular'] },
		'loadingbar': { deps: ['angular'] },
		'sails-io': { deps: ['socket-io']},
		'angular-sails': { deps: ['angular', 'sails-io'] },
		'restangular': { deps: ['angular', 'lodash'] },
		'anim-in-out': { deps: ['angular-animate'] },
		'angular-easyfb': { deps: ['angular'] },
		'angular-google-plus': { deps: ['angular'] },
		'satellizer': { deps: ['angular']},

		'select2': { deps: ['jquery']},
		'summernote': { deps: ['jquery']},
		'to-markdown': {deps: ['he']},
		'bootstrap-markdown': { deps: ['jquery', 'markdown', 'to-markdown']},
		'ckeditor': { deps: ['jquery']},

		'moment': { exports: 'moment'},
		'moment-timezone': { deps: ['moment']},
		'moment-timezone-data': { deps: ['moment']},
		'moment-helper': { deps: ['moment-timezone-data']},
		'bootstrap-daterangepicker': { deps: ['jquery', 'moment']},

		'flot': { deps: ['jquery']},
		'flot-resize': { deps: ['flot']},
		'flot-fillbetween': { deps: ['flot']},
		'flot-orderBar': { deps: ['flot']},
		'flot-pie': { deps: ['flot']},
		'flot-time': { deps: ['flot']},
		'flot-tooltip': { deps: ['flot']},

		'morris': {deps: ['raphael']},

		'datatables':{deps: ['jquery']},
		'datatables-colvis':{deps: ['datatables']},
		'datatables-tabletools':{deps: ['datatables']},
		'datatables-bootstrap':{deps: ['datatables','datatables-tabletools','datatables-colvis']},
		'datatables-responsive': {deps: ['datatables']},
		'datatables-colfilter': {deps: ['datatables']},
		'datatables-selectable': {deps: ['datatables', 'jquery-grouptoggle']},

		'jqgrid' : {deps: ['jquery']},
		'jqgrid-locale-en' : {deps: ['jqgrid']},

		'jquery-maskedinput':{deps: ['jquery']},
		'jquery-validation':{deps: ['jquery']},
		'jquery-form':{deps: ['jquery']},
		'jquery-color':{deps: ['jquery']},

		'jcrop':{deps: ['jquery-color']},

		'bootstrap-validator':{deps: ['jquery']},

		'bootstrap-timepicker':{deps: ['jquery']},
		'clockpicker':{deps: ['jquery']},
		'nouislider':{deps: ['jquery']},
		'ionslider':{deps: ['jquery']},
		'bootstrap-duallistbox':{deps: ['jquery']},
		'bootstrap-colorpicker':{deps: ['jquery']},
		'jquery-knob':{deps: ['jquery']},
		'bootstrap-slider':{deps: ['jquery']},
		'bootstrap-tagsinput':{deps: ['jquery']},
		'x-editable':{deps: ['jquery']},

		'fuelux-wizard':{deps: ['jquery']},
		'bootstrap':{deps: ['jquery']},

		'magnific-popup': { deps: ['jquery']},
		'modules-includes': { deps: ['angular']},
		'sparkline': { deps: ['jquery']},
		'easy-pie': { deps: ['jquery']},
		'jquery-jvectormap': { deps: ['jquery']},
		'jquery-jvectormap-world-mill-en': { deps: ['jquery']},
		'dropzone': { deps: ['jquery']},
		'bootstrap-progressbar': { deps: ['bootstrap']},
		'jquery-ui': { deps: ['jquery']},
		'jquery-nestable': { deps: ['jquery']},
		'superbox': { deps: ['jquery']},
		'notification': { deps: ['jquery']},
		'smartwidgets': { deps: ['jquery-ui']}

	},
	priority: [
		'jquery',
		'bootstrap',
		'angular'
	]
};