define([
	'common/module',
	'lodash'
], function (module) {

	'use strict';

	module.registerDirective('waStateBreadcrumbs', [
		'$rootScope',
		'$state',
		'_',
		function ($rootScope, $state, _) {


			return {
				restrict: 'E',
				replace: true,
				template: '<ol class="breadcrumb"><li>Home</li></ol>',
				link: function (scope, element) {

					function setBreadcrumbs(breadcrumbs) {
						var html = '';
						angular.forEach(breadcrumbs, function (crumb) {
							html += '<li>' + crumb + '</li>'
						});
						element.html(html)
					}

					function fetchBreadcrumbs(stateName, breadcrunbs) {

						var state = $state.get(stateName);

						if (state && state.data && state.data.title && breadcrunbs.indexOf(state.data.title) == -1) {
							breadcrunbs.unshift(state.data.title)
						}

						var parentName = stateName.replace(/.?\w+$/, '');
						if (parentName) {
							return fetchBreadcrumbs(parentName, breadcrunbs);
						} else {
							return breadcrunbs;
						}
					}

					function processState(state) {
						var breadcrumbs;
						if (state.data && state.data.breadcrumbs) {
							breadcrumbs = state.data.breadcrumbs;
						} else {
							breadcrumbs = fetchBreadcrumbs(state.name, []);
						}
						setBreadcrumbs(breadcrumbs);
					}

					processState($state.current);

					$rootScope.$on('$stateChangeStart', function (event, state) {
						if(_.isObject(state)) {
							processState(state);
						}
					});
				}
			};
		}
	]);
});
