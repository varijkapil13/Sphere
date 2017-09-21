'use strict';

/**
 * @ngdoc function
 * @name sphereApp.controller:sphereTextWorkflowGeneratorCtrl
 * @description
 * # sphereTextWorkflowGeneratorCtrl
 * Controller of the sphereApp
 */
angular.module('sphereApp')
	.controller('TextWorkflowGeneratorCtrl', function ($scope, SPHERE_TEXT_CONFIG, ngToast, sphereTextService, workflowCreation, workflowInterchange) {
		this.awesomeThings    = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.selectedMethod = 'N/A';

		$scope.draggingEnabled     = true;
		$scope.modalShowValue      = {
			value: false
		};
		$scope.modalShown          = false;
		$scope.availableDataset    = {};
		$scope.waitingWorkflowLoad = true;

		$scope.searchResultsRecieved = false;
		$scope.selectType            = function (selectedObject) {
			$scope.selectedMethod = selectedObject;
		};
		$scope.edgeSelected          = false;
		$scope.viewWorkflow          = false;
		$scope.workflowName          = '';
		$scope.nodeValueItems        = [];
		$scope.workflowLibrary       = workflowInterchange.getWorkflows();

		let creatingNewEdge = false;
		let edgeParameters  = {
			source: '',
			target: ''
		};


		/**
		 *
		 * @param tab
		 */
		$scope.changeTab = function (tab) {
			if (tab === 'view') {
				$scope.viewWorkflow = true;
			}
			else if (tab === 'search') {
				$scope.viewWorkflow = false;
			}
		};


		/**
		 *
		 */
		function getAvailableResources() {
			$scope.loading = true;
			sphereTextService.sendRequestToServer('GET', SPHERE_TEXT_CONFIG.getAvailableResourcesUrl)
				.then(function (response) {
					if (response.status === true) {
						$scope.loading = false;
						let gs         = [], fe = [], cf = [];
						for (let item of response.data) {
							if (item.type === SPHERE_TEXT_CONFIG.resourceTypes.gs) {
								gs.push(item.name);
							}
							if (item.type === SPHERE_TEXT_CONFIG.resourceTypes.cf) {
								cf.push(item.name);
							}
							if (item.type === SPHERE_TEXT_CONFIG.resourceTypes.fe) {
								fe.push(item.name);
							}
						}
						$scope.availableDataset = {
							gs              : gs,
							fe              : fe,
							cf              : cf,
							compile_workflow: ['Compile Workflow'],
						};
					}
					else {
						$scope.loading = false;
						ngToast.danger(response.message);
					}
				});

		}

		getAvailableResources();


		/******************************************************** Cytoscape Workflow Creation  ***********************************************/
		/******************************************************** Cytoscape Workflow Creation  ***********************************************/
		/******************************************************** Cytoscape Workflow Creation  ***********************************************/


		workflowCreation();


		workflowCreation.reinitialize();
		/**
		 * create a new edge
		 *
		 */
		workflowCreation.nodeRightClicked(function (id) {
			if (creatingNewEdge) {
				if (id !== edgeParameters.source) {
					edgeParameters.target = id;

					let edgeAlreadyPresent = false;
					for (let items of $scope.nodeValueItems) {
						if (items.data.source === edgeParameters.source && items.data.target === edgeParameters.target) {
							edgeAlreadyPresent = true;
						}
					}

					if (!edgeAlreadyPresent) {
						let newEdge    = sphereTextService.createEdge(edgeParameters);
						edgeParameters = {
							source: '',
							target: ''
						};
						$scope.nodeValueItems.push(newEdge);

						workflowCreation.addDataElement(newEdge);
					}


					creatingNewEdge = false;
					$scope.$apply();
				}

			}
			else {
				edgeParameters.source = id;
				creatingNewEdge       = true;
				$scope.$apply();
			}
		});

		/**
		 *
		 */
		workflowCreation.mousePressed(function () {
			if (creatingNewEdge) {
				creatingNewEdge = false;
			}
			$scope.$apply();
		});
		/**
		 *
		 */
		workflowCreation.edgeClicked(function (id) {
			$scope.edgeSelected = true;
			$scope.edgeID       = id;
			$scope.toggleModal();
			$scope.$apply();
		});

		/**
		 *
		 */
		workflowCreation.nodeClicked(function (id, type, name) {
			$scope.modalData = sphereTextService.examineNodes(type, $scope.availableDataset, id, name);
			$scope.toggleModal();
			if (creatingNewEdge) {
				creatingNewEdge = false;
			}
			$scope.$apply();
		});


		/******************************************************** Cytoscape Workflow Creation  ***********************************************/
		/******************************************************** Cytoscape Workflow Creation  ***********************************************/
		/******************************************************** Cytoscape Workflow Creation  ***********************************************/


		/******************************************************** Cytoscape Workflow Handling ***********************************************/
		/******************************************************** Cytoscape Workflow Handling ***********************************************/
		/******************************************************** Cytoscape Workflow Handling ***********************************************/


		/**
		 * Toggle the modal view on the screen
		 *
		 */
		$scope.toggleModal = function () {
			$scope.modalShown = !$scope.modalShown;
		};

		/**
		 *
		 *
		 */
		$scope.hideModal = function () {
			$scope.edgeSelected = false;
			$scope.toggleModal();
		};
		/**
		 *
		 */
		$scope.startWorkflow = function () {

			$scope.modalData = sphereTextService.examineNodes('root', $scope.availableDataset, '0', 'Start');

			$scope.toggleModal();
		};


		/**
		 *
		 * @param modalData
		 * @param item
		 */
		$scope.addNode = function (modalData, item) {

			if (modalData.addtype === "compile") {
				$scope.createWorkflow();
			}
			else {

				let newNode = sphereTextService.createNode(item, modalData.addtype);
				$scope.nodeValueItems.push(newNode);
				$scope.waitingWorkflowLoad = false;
				addNodetoGraph(newNode);

			}
			$scope.toggleModal();
		};
		/**
		 *
		 * @param item
		 */
		$scope.addCustomWorkflow = function (item) {
			let newNode = sphereTextService.createNodeForCustomWorkflow(item);
			$scope.nodeValueItems.push(newNode);
			$scope.waitingWorkflowLoad = false;
			addNodetoGraph(newNode);
		};


		/**
		 *
		 * @param modalData
		 */
		$scope.removeNode = function (modalData) {
			let tempNodeValueItem = $.extend(true, [], $scope.nodeValueItems);

			// Deleting the node from the tempItems array
			for (let item of $scope.nodeValueItems) {
				if (item.data.id === modalData.node_id) {
					for (let tempItems of tempNodeValueItem) {
						if (tempItems.data.id === item.data.id) {
							let index = tempNodeValueItem.indexOf(tempItems);
							tempNodeValueItem.splice(index, 1);
						}
					}
				}
			}

			// Deleting the edges that originate from the node in the tempItems array
			for (let item of $scope.nodeValueItems) {
				if (item.data.source === modalData.node_id) {
					for (let tempItems of tempNodeValueItem) {
						if (tempItems.data.source === item.data.source) {
							let index = tempNodeValueItem.indexOf(tempItems);
							tempNodeValueItem.splice(index, 1);
						}
					}

				}
			}

			// Deleting the edges that end on the node in the tempItems array
			for (let item of $scope.nodeValueItems) {
				if (item.data.target === modalData.node_id) {
					for (let tempItems of tempNodeValueItem) {
						if (tempItems.data.target === item.data.target) {
							let index = tempNodeValueItem.indexOf(tempItems);
							tempNodeValueItem.splice(index, 1);
						}
					}
				}
			}

			$scope.nodeValueItems = [];
			$scope.nodeValueItems = tempNodeValueItem;
			removeNodeFromGraph(modalData.node_id);
			$scope.toggleModal();
		};

		/**
		 *
		 * @param edgeId
		 */
		$scope.removeEdge = function (edgeId) {
			removeNodeFromGraph(edgeId);
			for (let item of $scope.nodeValueItems) {
				if (item.data.id === edgeId) {
					let index = $scope.nodeValueItems.indexOf(item);
					$scope.nodeValueItems.splice(index, 1);
				}
			}

			$scope.edgeSelected = false;
			$scope.toggleModal();
		};


		/**
		 *
		 */
		$scope.createWorkflow = function () {
			$scope.workflowName = $scope.wfFieldName + '_' + $scope.wfLanguage + '_' + $scope.wfName + '_v' + $scope.wfVersion;

			$scope.workflowName = $scope.workflowName.replace(" ", "");
			if ($scope.workflowName.length <= 0) {
				ngToast.warning('Please enter a workflow name to continue');
			}
			else {
				let tempNodeValueItem = $.extend(true, [], $scope.nodeValueItems);
				let workflowData      = sphereTextService.workflowDataFormatting(tempNodeValueItem, $scope.workflowName);

				$scope.loading = true;
				sphereTextService.sendRequestToServer('POST', SPHERE_TEXT_CONFIG.workflowUrl, workflowData)
					.then(function (response) {
						if (response.status) {
							$scope.loading = false;
							ngToast.success(response.message)
						}
						else {
							$scope.loading = false;
							ngToast.danger(response.message);
						}
					});
			}


		};


		/**
		 *
		 * @param nodeElement
		 */
		function addNodetoGraph(nodeElement) {
			workflowCreation.addDataElement(nodeElement);
		}

		/**
		 *
		 * @param nodeId
		 */
		function removeNodeFromGraph(nodeId) {
			workflowCreation.removeDataElement(nodeId);
		}

		/******************************************************** Cytoscape Workflow Handling ***********************************************/
		/******************************************************** Cytoscape Workflow Handling ***********************************************/
		/******************************************************** Cytoscape Workflow Handling ***********************************************/

	});
