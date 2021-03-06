// WA directive for custom actions
define([
	'common/module', // App Module
	'jquery',        // jQuery
	// Services
	'common/services/FullscreenService',
	'common/utils/Notifications',
	'auth/login/AuthService'
],
function(module) {

	'use strict';

	module.registerDirective('waAction', [
		'$state',
		'$timeout',
		'Notifications',
		'FullscreenService',
		'AuthService',
		function($state, $timeout, Notifications, FullscreenService, AuthService) {
			var linker = function(scope, element, attrs) {
				var waActions = {
					 // LAUNCH FULLSCREEN 
				    launchFullscreen: function(element){
				    	if (FullscreenService.isEnabled()){
							FullscreenService.cancel();
						} else {
							FullscreenService.all();
						}
					}
				};

				var actionEvents = {
					launchFullscreen: function(e) {
						waActions.launchFullscreen(document.documentElement);
						// Listen on the `WAFullscreen.change`
						// the event will fire when anything changes the fullscreen mode
						var removeFullscreenHandler = FullscreenService.$on('WAFullscreen.change', function(evt, isFullscreenEnabled){
							if(!isFullscreenEnabled){
								scope.$evalAsync(function(){
									$("body").removeClass("full-screen");
									element.removeClass('in-fullscreen');
								});
							} else {
								$("body").addClass("full-screen");
								element.addClass("in-fullscreen");
							}
						});
					},

					userLogout: function(e) {
						AuthService.logout()
							.then(function(response) {
								Notifications.info({
									title: "Logged out",
									content: "You have been successfully logged out."
								});
							});
					}
				};

				if (angular.isDefined(attrs.waAction) && attrs.waAction != '') {
					var actionEvent = actionEvents[attrs.waAction];
					if (typeof actionEvent === 'function') {
						var param;
						if(attrs.waActionParam) {
							param = scope.$eval(attrs.waActionParam);
						}
						element.on('click', function(e) {
							actionEvent(e, param);
							e.preventDefault();
						});
					}
				}
			};

			return {
				restrict: 'A',
				link: linker
			};
		}
	]);
});