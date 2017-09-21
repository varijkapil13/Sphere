'use strict';

/**
 * @ngdoc directive
 * @name sphereApp.directive:sphere/apiInfo
 * @description
 * # sphere/apiInfo
 */
angular.module('sphereApp')
	.directive('apiInfo', function () {
		return {
			restrict  : 'E',
			replace   : true, // Replace with the template below
			transclude: true,
			link      : function (scope, element) {

			},
			template  : "<div class='row container-fluid' id='infoView'>" +
			"	<div class='panel panel-success'>		" +
			"<div class='panel-heading'>			" +
			"<a data-toggle='collapse' data-target='#information' class='info'>" +
			"	<strong>Request and Response information</strong>" +
			"<i class='fa fa-caret-down pull-right' aria-hidden='true'>" +
			"</i>			" +
			"</a>		" +
			"</div>		" +
			"<div class='panel-body collapse' id='information'>			" +
			"<div class='row container-fluid'>				" +
			"<div class='col-xs-12 col-md-6'>					" +
			"<h5> GET Request </h5>					" +
			"<p class='lead small'>For predicting on a single sentence.</p>					" +
			"<div class='col-xs-6 col-md-3'>						" +
			"<strong> URL Request parameters:</strong>					" +
			"</div>					" +
			"<div class='col-xs-6 col-md-9'>						" +
			"<p><code>text</code>						" +
			"<p class='small text-muted'>Assign your text to predict to this parameter </p> " +
			"</p>				" +
			"</div>				" +
			"<div class='col-xs-6 col-md-3'>					" +
			"<strong> Response:</strong>				" +
			"</div>				" +
			"<div class='col-xs-6 col-md-9'>					" +
			"<pre ng-bind-html='getMethodResponse | json'>							" +
			"</pre>				" +
			"</div>			" +
			"</div>			" +
			"<div class='col-xs-12 col-md-6'>				" +
			"<h5> POST Request </h5>				" +
			"<p class='lead small'>For predicting on multiple sentences. Use the <kbd>separator</kbd> field to provide a	line separator.</p>				" +
			"<div class='col-xs-6 col-md-3'>					" +
			"<strong> Request JSON</strong>				" +
			"</div>				" +
			"<div class='col-xs-6 col-md-9'>					" +
			"<pre ng-bind-html='postMethodRequest | json'>							" +
			"</pre>				" +
			"</div>				" +
			"<div class='col-xs-6 col-md-3'>					" +
			"<strong> Response:</strong>				" +
			"</div>				" +
			"<div class='col-xs-6 col-md-9'>					" +
			"<pre ng-bind-html='postMethodResponse | json'>						" +
			"</pre>				" +
			"</div>			" +
			"</div>		" +
			"</div>	" +
			"</div><" +
			"/div>" +
			"</div>"
		};
	});
