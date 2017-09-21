'use strict';

/**
 * @ngdoc function
 * @name sphereApp.controller:sphereImagesPredictionsCtrl
 * @description
 * # sphereImagesPredictionsCtrl
 * Controller of the sphereApp
 */
angular.module('sphereApp')
	.controller('ImagePredictionsCtrl', function ($scope, sphereImageService, SPHERE_IMAGE_CONFIG, ngToast, $route) {
		this.awesomeThings               = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.loading                   = false;
		$scope.availableModelsPrediction = [];
		for (let imageItem of SPHERE_IMAGE_CONFIG.imageModels) {
			$scope.availableModelsPrediction.push(imageItem);
		}

		$scope.predictionResults = [];

		$scope.predictOnSelectedImages = function (modelBaseName) {
			$scope.loading = true;
			let formData   = new FormData();
			for (let file of $scope.predictionFiles) {
				formData.append("file", file['_file']);
			}
			// Send model hash only as a choice, if some changes are needed in the webservice
			//formData.append("model_hash", modelHash);

			// Model name in the webservice used is actually the base model saved in the database.
			// If a custom model is used send model hash also in model_name and send modelBaseName in a new key model_base_name
			formData.append("model_name", modelBaseName.name);
			formData.encoding = 'multipart/form-data';

			sphereImageService.sendFilesToServer(SPHERE_IMAGE_CONFIG.startImagePredictionUrl, formData)
				.then(function (response) {
					$scope.loading = false;
					if (response.status) {
						$scope.predictionResults = response.data;
						ngToast.success("Success");
					}
					else {
						ngToast.warning("Fail");
					}
				})
		};

		$scope.clearAll = function () {
			$route.reload();
		};

		$scope.returnImage   = function (filename) {
			let return_file;
			for (let file of $scope.predictionFiles) {
				let file_data = file['_file'];

				if (file_data.name === filename) {
					return_file = file_data;
				}
			}

			return return_file;


		};
		$scope.downloadAsCSV = function () {

			let data    = [];
			for (let elem of $scope.predictionResults) {
				let count   = 1;
				let element = {};
				element["Image File"]   = elem.filename;
				for (let prediction of elem.predictions) {
					element["prediction" + count + ".imageNetClass"] = prediction.class;
					element["prediction" + count + ".description"]   = prediction.description;
					element["prediction" + count + ".probability"]   = prediction.probability;
					count ++;
				}

				data.push(element);
			}
			let csvData = Papa.unparse(JSON.parse(JSON.stringify(data)));
			let blob = new Blob([csvData], {type: "text/csv;charset=utf-8"});
			saveAs(blob, "Predictions.csv");

		};

	});
