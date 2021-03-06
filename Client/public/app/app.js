'use strict';

define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-animate',
	'angular-sanitize',
	'angular-bootstrap',
	// 'angular-sails',
	'angular-permission',
	'smartwidgets',
	'notification',
	'restangular',
	'loadingbar',
	'satellizer'
], function (ng, couchPotato) {

	var logger = ng.module('wa.logger', ['ngSanitize']);

	var lodash = ng.module('lodash', ['ngSanitize']);

	// Expose lodash as a factory so that it can be used by angular.
	lodash.factory('_', function() {
		return window._; // assumes lodash has already been loaded on the page
	});

	logger.provider('Logger', [function() {
		// Set this to false if logging is not required in PROD.
		var isLoggingEnabled = true;
		var isTimerEnabled = true;

		this.enabled = function(_isLoggedEnabled) {
			isLoggingEnabled = !!_isLoggedEnabled;
		}

		this.timerEnabled = function(_isTimerEnabled) {
			_isTimerEnabled = !!_isTimerEnabled;
		}

		this.$get = ['$log', function($log) {
			var Logger = function(context) {
				this.context = context;
			};
			Logger.getInstance = function(context) {
				return new Logger(context);
			};
			Logger.supplant = function(str, o) {
				return str.replace(
					/\{([^{}]*)\}/g,
					function (a, b) {
						var r = o[b];
						return typeof r === 'string' || typeof r === 'number' ? r : a;
					}
				);
			};
			Logger.getFormattedTimestamp = function(date) {
			   return Logger.supplant('{0}:{1}:{2}:{3}', [
					date.getHours(),
					date.getMinutes(),
					date.getSeconds(),
					date.getMilliseconds()
				]);
			};
			Logger.prototype = {
				_log: function(originalFn, args) {
					if (!isLoggingEnabled) {
						return;
					}
					var now  = Logger.getFormattedTimestamp(new Date());
					var message = '', supplantData = [];
					$log[originalFn].call(null, Logger.supplant("Web Artists - VTSS: {0}::{1}", [now, this.context]));
					for (var i = 0; i < args.length; i++) {
						$log[originalFn].call(null, args[i]);
					}
				},
				log: function() {
					this._log('log', arguments);
				},
				info: function() {
					this._log('info', arguments);
				},
				warn: function() {
					this._log('warn', arguments);
				},
				debug: function() {
					this._log('debug', arguments);
				},
				error: function() {
					this._log('error', arguments);
				},
				time: function(name, reset) {
					if(!isTimerEnabled) {
						return;
					}
					if(window.console && typeof(window.console.time) != "undefined") {
						console.time(Logger.supplant("{0}:{1}", [this.context, name]));
					} else if(window.console) {
						if(!name) { return; }
						var time = new Date().getTime();
						if(!console.timeCounters) { console.timeCounters = {}; }
						var key = "KEY" + name.toString();
						if(!reset && console.timeCounters[key]) { return; }
						console.timeCounters[key] = time;
					}
				},
				timeEnd: function(name) {
					if(!isTimerEnabled) {
						return;
					}
					if(window.console && typeof(window.console.timeEnd) != "undefined") {
						console.timeEnd(Logger.supplant("{0}:{1}", [this.context, name]));
					} else if(window.console) {
						var time = new Date().getTime();
						if(!console.timeCounters) { return; }
						var key = "KEY" + name.toString();
						var timeCounter = console.timeCounters[key];
						var diff;
						if(timeCounter) {
							diff = time - timeCounter;
							var label = name + ": " + diff + "ms";
							console.info(label);
							delete console.timeCounters[key];
						}
						return diff;
					}
				}
			};
			return Logger;
		}];
	}]);

	var app = ng.module('app', [
		'ngSanitize',
		'lodash',
		'restangular',
		'satellizer',
		'scs.couch-potato',
		'angular-loading-bar',
		'ngAnimate',
		// 'ngSails',
		'ui.router',
		'ui.bootstrap',
		'permission',

		// Common
		'wa.common',
		'wa.logger',

		// App
		'app.auth',
		'app.layout',
		'app.forms',
		'app.home',
		'app.widgets',
		// Root
		'app.root',
		// Client
		'app.client',
		// Host
		'app.host',
		// Agency
		'app.agency',
		// Passenger
		'app.passenger',
		// Samples
		'app.sample'
	]);

	couchPotato.configureApp(app);

	app.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		logoutFailed: 'auth-logout-failed',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	});

	app.constant('USER_ROLES', {
		A: "A",
		RA: "RA",
		HA: "HA",
		HT: "HT",
		HF: "HF",
		AA: "AA",
		AT: "AT",
		AF: "AF",
		CA: "CA",
		CT: "CT",
		CF: "CF",
		P: "P",
		L: "L"
	});

	app.constant('APP_CONFIG', {
		BASE_URL: 'http://localhost:1337',
		ROOT_URL: 'root',
		HOST_URL: 'host',
		AGENCY_URL: 'agency',
		CLIENT_URL: 'client',
		PASSENGER_URL: 'passenger'
	});

	app.config([
		'$provide',
		'$httpProvider',
		'$authProvider',
		//'$sailsProvider',
		'RestangularProvider',
		'APP_CONFIG',
		function ($provide, $httpProvider, $authProvider, RestangularProvider, APP_CONFIG) {

			// Configure Angular Sails
			// $sailsProvider.url = 'http://localhost:1337/';
			// Intercept http calls.
			$provide.factory('ErrorHttpInterceptor', [
				'$q',
				function ($q) {
					var errorCounter = 0;
					function notifyError(rejection){
						console.log(rejection);
						$.bigBox({
							title: rejection.status + ' ' + rejection.statusText,
							content: (rejection.data && rejection.data.error) ? rejection.data.error : rejection.data,
							color: "#C46A69",
							icon: "fa fa-warning shake animated",
							number: ++errorCounter,
							timeout: 6000
						});
					}

					return {
						// On request failure
						requestError: function (rejection) {
							// show notification
							notifyError(rejection);

							// Return the promise rejection.
							return $q.reject(rejection);
						},

						// On response failure
						responseError: function (rejection) {
							// show notification
							notifyError(rejection);
							// Return the promise rejection.
							return $q.reject(rejection);
						}
					};
				}
			]);

			RestangularProvider.setBaseUrl(APP_CONFIG.BASE_URL);

			// Add the interceptor to the $httpProvider.
			$httpProvider.interceptors.push('ErrorHttpInterceptor');

			// Enhance $q to provide a handy "spread" delegate during $q.all
			var resolveWith = function($q) {
				return function resolved(val) {
					var dfd = $q.defer();
					dfd.resolve(val);
					return dfd.promise;
				};
			};

			$provide.decorator('$q', [
				'$delegate',
				function($delegate) {
					if (ng.isUndefined($delegate.spread)) {
						// Let's add a `spread()` that is very useful
						// when using $q.all()
						$delegate.spread = function(targetFn, scope) {
							return function() {
								var params = [].concat(arguments[0]);
								targetFn.apply(scope, params);
							};
						};
					}

					if (ng.isUndefined($delegate.resolve)) {
						// Similar to $q.reject(), add $q.resolve()
						// to easily make an immediately-resolved promise
						// ... this is useful for mock promise-returning APIs.
						$delegate.resolve = resolveWith($delegate);
					}

					return $delegate;
				}
			]);

			$authProvider.httpInterceptor = true, // Add Authorization header to HTTP request
			$authProvider.loginOnSignup = true;
			$authProvider.loginRedirect = 'http://localhost:1337/auth/login';
			$authProvider.logoutRedirect = 'http://localhost:1337/auth/login';
			$authProvider.signupRedirect = '/login';
			$authProvider.loginUrl = 'http://localhost:1337/auth/login';
			$authProvider.signupUrl = '/auth/signup';
			$authProvider.loginRoute = '/login';
			$authProvider.signupRoute = '/signup';
			$authProvider.tokenName = 'token';
			$authProvider.tokenPrefix = 'vtss'; // Local Storage name prefix
			$authProvider.unlinkUrl = '/auth/unlink/';
			$authProvider.authHeader = 'access_token';
		}

	]);

	app.run([
		'$couchPotato',
		'$rootScope',
		'$state',
		'$stateParams',
		function ($couchPotato, $rootScope, $state, $stateParams) {
			app.lazy = $couchPotato;
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
			// editableOptions.theme = 'bs3';
			// handle any route related errors (specifically used to check for hidden resolve errors)
			$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
				console.log(error);
			});
		}
	]);

	return app;
});
