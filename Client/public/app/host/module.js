define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-permission',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.host', [
		'ui.router',
		'permission',
		'app.host.home',
		'app.host.account',
		'app.host.devices',
		'app.host.finance',
		'app.host.messages'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.host', {
					abstract: true,
					data:{
						title: 'Host',
						permissions: {
							except: ['anonymous'],
							redirectTo: 'login'
						}
					}
				});
		}
	]);

	couchPotato.configureApp(module);

	module.run([
		'$couchPotato',
		function($couchPotato){
			module.lazy = $couchPotato;
		}
	]);

	return module;
});