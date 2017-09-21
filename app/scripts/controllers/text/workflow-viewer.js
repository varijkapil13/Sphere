'use strict';

/**
 * @ngdoc function
 * @name sphereApp.controller:sphereTextWorkflowViewerCtrl
 * @description
 * # sphereTextWorkflowViewerCtrl
 * Controller of the sphereApp
 */
angular.module('sphereApp')
	.controller('TextWorkflowViewerCtrl', function ($scope, SPHERE_TEXT_CONFIG, ngToast, sphereTextService, workflowViewCreation, workflowInterchange) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		$scope.loading           = false;
		$scope.searchString      = '';
		$scope.viewAllWorkflows  = false;
		$scope.returnedWorkflows = [];
		$scope.showWorkflow      = false;
		$scope.predictionText    = '';

		/**
		 *
		 * @param searchString
		 */
		$scope.searchWorkflow = function (searchString) {
			$scope.loading = true;
			sphereTextService.sendRequestToServer('GET', SPHERE_TEXT_CONFIG.workflowUrl + "?searchstring=" + searchString)
				.then(function (response) {
					if (response.status === true) {
						$scope.loading           = false;
						$scope.viewAllWorkflows  = true;
						$scope.returnedWorkflows = response.data;
					}
					else {
						$scope.loading          = false;
						$scope.viewAllWorkflows = false;
						ngToast.warning(response.message);
					}
				});

		};

		/**
		 *
		 */
		$scope.getAllWorkflows = function () {
			$scope.loading = true;
			sphereTextService.sendRequestToServer('GET', SPHERE_TEXT_CONFIG.workflowUrl)
				.then(function (response) {
					if (response.status === true) {
						$scope.loading           = false;
						$scope.viewAllWorkflows  = true;
						$scope.returnedWorkflows = response.data;
					}
					else {
						$scope.loading          = false;
						$scope.viewAllWorkflows = false;
						ngToast.warning(response.message);
					}
				});
		};

		/**
		 *
		 * @param workflowData
		 */
		$scope.viewSelectedWorkflow = function (workflowData) {
			$scope.showWorkflow = true;
			workflowViewCreation(workflowData);
		};

		/**
		 *
		 * @param workflow
		 */
		$scope.addToWorkflowLibrary = function (workflow) {
			workflowInterchange.addWorkflow(workflow);
			ngToast.success("Workflow Added to library. Go to Create Workflows tab to include this workflow as a component in another workflow")
		};


		/**
		 *
		 * @param name
		 * @param text
		 */
		$scope.startPrediction = function (name, text) {

			if (text.length <= 0) {
				ngToast.warning("Enter a text to start prediction");
			}
			else {
				let url = SPHERE_TEXT_CONFIG.predictionWorkflowUrl + name + SPHERE_TEXT_CONFIG.predictionURl + '?text=' + text;
				sphereTextService.sendRequestToServer("GET", url)
					.then(function (response) {
						if (response.status) {
							ngToast.success("<strong>Prediction Result: </strong>" + response.data);
						}
						else {
							ngToast.warning(response.message);
						}
					})
			}
		}

	});
