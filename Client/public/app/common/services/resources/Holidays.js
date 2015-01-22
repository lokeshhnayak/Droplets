define([
	'common/module',         // Angular Module for WebArtists VTSS app.
	'common/services/APIs',   // APIs Service
	'restangular'            // Restangular Library
],
function(module, supplant) {

	'use strict';

	module.registerService('Holidays', [
		'Restangular',
		'APIs',
		function (Restangular, APIs) {
			return Restangular.service(APIs.CLIENT_HOLIDAYS);
		}
	]);
});