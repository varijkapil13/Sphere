'use strict';

/**
 * @ngdoc function
 * @name sphereApp.controller:sphereImagesValidationCtrl
 * @description
 * # sphereImagesValidationCtrl
 * Controller of the sphereApp
 */
angular.module('sphereApp')
	.controller('ImageValidationCtrl', function ($scope, SPHERE_IMAGE_CONFIG, ngToast, $http, sphereImageService) {
		this.awesomeThings      = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.loading          = true;
		$scope.modelList        = [];
		$scope.validationStatus = 'Validate';
		$scope.jsonModelData    = '';


		// Getting the list of models from the webservice
		sphereImageService.sendRequestToServer('GET', SPHERE_IMAGE_CONFIG.getExistingModelsUrl, '')
			.then(function (response) {
				if (response.status) {
					$scope.modelList = sphereImageService.getMongoResultsAsJSON(response.data);
					$scope.loading   = false;
				}
				else {
					$scope.loading = false;
					ngToast.danger(response.message);
				}
			});


		$scope.hasJSON     = function (json) {
			return Object.keys(json).length > 1;
		};
		$scope.isValidated = function (acc) {
			return !!acc;
		};

		$scope.canValidate      = function (validationStatus) {
			if (validationStatus) {
				if (validationStatus === 'trainingPending') {
					$scope.validationStatus = 'Waiting to start training';
					return false
				}
				else if (validationStatus === 'tested') {
					$scope.validationStatus = 'Validated';
					return false
				}
				else if (validationStatus === 'testing') {
					$scope.validationStatus = 'In Validation';
					return false
				}
				else if (validationStatus === 'training') {
					$scope.validationStatus = 'Training...';
					return false
				}
				else if (validationStatus === 'trained') {
					return true
				}
			}
			else {
				$scope.validationStatus = 'Not Available';
				return false
			}
		};
		$scope.showJSONForModel = function (jsonData) {
			$scope.jsonModelData = JSON.stringify(JSON.parse(jsonData), null, 4);
		};

		$scope.startValidation = function (modelName, hashKey) {
			$scope.loading = true;
			let data       = {'model': modelName, 'hash': hashKey};
			sphereImageService.sendRequestToServer('POST', SPHERE_IMAGE_CONFIG.startValidationURL, data)
				.then(function (response) {
					if (response.status) {
						$scope.loading = false;
						ngToast.success(response.message)
					}
					else {
						$scope.loading = false;
						ngToast.danger(response.message);
					}
				})
		};
		$scope.downloadModels = function (path, name) {
			let url  = SPHERE_IMAGE_CONFIG.mainWebServiceUrl + SPHERE_IMAGE_CONFIG.fileDownloadURL;
			let data = {
				type: 'model',
				path: path
			};
			$http.post(url, data, {responseType: 'arraybuffer'})
				.then(function (response) {
					//require('angular-file-saver');
					let myBuffer = new Uint8Array(response.data);
					let data     = new Blob([myBuffer]);
					let fileName = name + '.h5';
					saveAs(data, fileName);
					ngToast.success("Success")
				}, function (error) {
					ngToast.danger("error:  " + error)
				});
		}


	});
