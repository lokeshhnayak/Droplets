define([
	'app'
], function(module){
	"use strict";

	module.registerDirective('languageSelector', [
		'Language',
		function(Language){
			return {
				restrict: "EA",
				replace: true,
				templateUrl: "app/components/language/language-selector.tpl.html",
				scope: true,
			};
		}
	]);
});
