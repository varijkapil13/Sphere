'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:sphereApihubCtrl
 * @description
 * # sphereApihubCtrl
 * Controller of the Lambda3WebApp
 */
angular.module('sphereApp')
	.controller('ApihubCtrl', function ($scope, SPHERE_TEXT_CONFIG, ngToast, sphereTextService, SPHERE_IMAGE_CONFIG) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		$scope.oderListBy    = 'name';
		$scope.loading       = true;
		$scope.classifiers   = [];
		$scope.showingImages = false;

		$scope.textApiMainUrl  = SPHERE_TEXT_CONFIG.apiBaseUrl + SPHERE_TEXT_CONFIG.predictionWorkflowUrl;
		$scope.endUrl          = SPHERE_TEXT_CONFIG.predictionURl;
		$scope.imageApiMainUrl = SPHERE_IMAGE_CONFIG.mainWebServiceUrl + SPHERE_IMAGE_CONFIG.startImagePredictionUrl;


		$scope.getMethodResponse = {
			status : 'true/false',
			data   : 'Prediction Result',
			message: 'A success/error message'
		};

		$scope.postMethodResponse = {
			status : 'true/false',
			data   : [{
				text      : 'Text that was predicted',
				prediction: 'Prediction Result'
			}, {
				text      : 'Text that was predicted',
				prediction: 'Prediction Result'
			}],
			message: 'A success/error message'
		};

		$scope.postMethodRequest = {
			text     : 'Text to predict on',
			separator: 'Provide a separator to detect new lines. Example: , or || or $$ or !! . On detecting this symbol ' +
			'the system will treat the next set of words as one sentence until another occurence of this symbol ' +
			'is not detected.'
		};

		$scope.imagePredictionRequest = {
			model_name: "VGG16/VGG19/Xception/ResNet50/InceptionV3 (One of these options)",
			file      : ["image_1.jpg", "image_2.png", "image_3.jpg", "image_4.jpg"]
		};

		$scope.imagePredictionHeaders = {
			"Content-Type": "multipart/form-data"
		};

		$scope.imagePredictionResponse = {
			status : 'true/false',
			data   : [{
				filename   : 'image_1.jpg',
				predictions: [{
					class      : 'ImageNet class id of the image',
					description: 'description of this class',
					probability: 'probability of this class in the image'
				}, {
					class      : 'ImageNet class id of the image',
					description: 'description of this class',
					probability: 'probability of this class in the image'
				}, {
					class      : 'ImageNet class id of the image',
					description: 'description of this class',
					probability: 'probability of this class in the image'
				}]
			}, {
				filename   : 'image_2.png',
				predictions: [{
					class      : 'ImageNet class id of the image',
					description: 'description of this class',
					probability: 'probability of this class in the image'
				}, {
					class      : 'ImageNet class id of the image',
					description: 'description of this class',
					probability: 'probability of this class in the image'
				}, {
					class      : 'ImageNet class id of the image',
					description: 'description of this class',
					probability: 'probability of this class in the image'
				}]
			}],
			message: 'A success/error message'
		};
		sphereTextService.sendRequestToServer('GET', SPHERE_TEXT_CONFIG.workflowUrl)
			.then(function (response) {
				if (response.status === true) {
					$scope.loading = false;

					for (let item of response.data) {
						if (item.status === 'trained') {
							$scope.classifiers.push(sphereTextService.createClassifierObject(item._id, item.name, 'workflow'));
						}
					}
				}
				else {
					$scope.loading = false;
					ngToast.warning(response.message);
				}
			});

	});
