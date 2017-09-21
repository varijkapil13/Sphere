'use strict';

/**
 * @ngdoc overview
 * @name sphereApp
 * @description
 * # sphereApp
 *
 * Main module of the application.
 */
angular
  .module('sphereApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngToast',
    'ui.bootstrap', // bootstrap ui
		'monospaced.elastic', // elastic textareas
		'checklist-model', // multiple selects
		'ngFileUpload', // upload files,
		'bootstrapLightbox',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/image/search', {
        templateUrl: 'views/image/search.html',
        controller: 'ImageSearchCtrl',
        controllerAs: 'image/search'
      })
      .when('/image/training', {
        templateUrl: 'views/image/training.html',
        controller: 'ImageTrainingCtrl',
        controllerAs: 'image/training'
      })
      .when('/image/validation', {
        templateUrl: 'views/image/validation.html',
        controller: 'ImageValidationCtrl',
        controllerAs: 'image/validation'
      })
      .when('/image/predictions', {
        templateUrl: 'views/image/predictions.html',
        controller: 'ImagePredictionsCtrl',
        controllerAs: 'image/predictions'
      })
      .when('/image/museumsearch', {
        templateUrl: 'views/image/museumsearch.html',
        controller: 'ImageMuseumsearchCtrl',
        controllerAs: 'image/museumsearch'
      })
      .when('/apihub', {
        templateUrl: 'views/apihub.html',
        controller: 'ApihubCtrl',
        controllerAs: 'apihub'
      })
      .when('/text/lexicons', {
        templateUrl: 'views/text/lexicons.html',
        controller: 'TextLexiconsCtrl',
        controllerAs: 'text/lexicons'
      })
      .when('/text/datasetcreation', {
        templateUrl: 'views/text/datasetcreation.html',
        controller: 'TextDatasetcreationCtrl',
        controllerAs: 'text/datasetcreation'
      })
      .when('/text/workflow-generator', {
        templateUrl: 'views/text/workflow-generator.html',
        controller: 'TextWorkflowGeneratorCtrl',
        controllerAs: 'text/workflowGenerator'
      })
      .when('/text/workflow-viewer', {
        templateUrl: 'views/text/workflow-viewer.html',
        controller: 'TextWorkflowViewerCtrl',
        controllerAs: 'text/workflowViewer'
      })
      .when('/text/workflowannotator', {
        templateUrl: 'views/text/workflowannotator.html',
        controller: 'TextWorkflowannotatorCtrl',
        controllerAs: 'text/workflowannotator'
      })
      .when('/navigation', {
        templateUrl: 'views/navigation.html',
        controller: 'NavigationCtrl',
        controllerAs: 'navigation'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

	.config(function (LightboxProvider) {
		LightboxProvider.templateUrl = '../views/image/lightboxTemplate.html';
		// increase the maximum display height of the image
		LightboxProvider.calculateImageDimensionLimits = function (dimensions) {
			return {
				'maxWidth' : dimensions.windowWidth >= 768 ? // default
					dimensions.windowWidth - 92 :
					dimensions.windowWidth - 52,
				'maxHeight': 1600                           // custom
			};
		};
		// the modal height calculation has to be changed since our custom template is
		// taller than the default template
		LightboxProvider.calculateModalDimensions = function (dimensions) {
			let width = Math.max(400, dimensions.imageDisplayWidth + 32);

			if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
				width = 'auto';
			}

			return {
				'width' : width,                             // default
				'height': 'auto'                            // custom
			};
		};
	});
