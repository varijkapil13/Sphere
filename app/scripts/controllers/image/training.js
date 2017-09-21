'use strict';

/**
 * @ngdoc function
 * @name sphereApp.controller:sphereImagesTrainingCtrl
 * @description
 * # sphereImagesTrainingCtrl
 * Controller of the sphereApp
 */
angular.module('sphereApp')
	.controller('ImageTrainingCtrl', function ($scope, SPHERE_IMAGE_CONFIG, ngToast, $http, sphereImageService) {
		this.awesomeThings            = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.availableImageDatasets = [];

		$scope.loading = true;

		sphereImageService.sendRequestToServer("GET", SPHERE_IMAGE_CONFIG.getImageDatsets, '')
			.then(function (response) {
				$scope.loading = false;
				if (response.status) {
					for (let item of response.data) {
						item = JSON.parse(item);

						let datasetItem = {
							id   : item['_id'],
							name : item['name'],
							count: item['count']
						};
						$scope.availableImageDatasets.push(datasetItem);
					}
				}
				else {
					ngToast.danger(response.message)
				}
			});
		$scope.availableModels = [];
		for (let imageItem of SPHERE_IMAGE_CONFIG.imageModels) {
			$scope.availableModels.push(imageItem);
		}

		sphereImageService.sendRequestToServer("GET", SPHERE_IMAGE_CONFIG.getExistingModelsUrl, '')
			.then(function (response) {
				$scope.loading = false;
				if (response.status) {
					for (let item of response.data) {
						item = JSON.parse(item);

						let datasetItem = {
							name: item['model_saved_name'],
							hash: item['model_hash']
						};

						$scope.availableModels.push(datasetItem);
					}
				}
				else {
					ngToast.danger(response.message)
				}
			});


		$scope.startTraining = function (datasets, model, modelName) {

			let datasetNames = [];
			console.log(datasets.name);
			datasetNames.push(datasets.name);
			/*for (let item of datasets) {
				datasetNames.push(item.name)
			}*/
			$scope.loading = true;
			let data       = {
				datasets: datasetNames,
				model   : model.name,
				name    : modelName
			};


			sphereImageService.sendRequestToServer("POST", SPHERE_IMAGE_CONFIG.startTrainingUrl, data)
				.then(function (response) {
					$scope.loading = false;
					if (response.status) {
						ngToast.success(response.message);
					}
					else {
						ngToast.danger(response.message);
					}
				});
		};
	});
