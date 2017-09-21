'use strict';

/**
 * @ngdoc service
 * @name sphereApp.workflowCreation
 * @description
 * # sphere/text/workflowCreation
 * Factory in the sphereApp.
 */
angular.module('sphereApp')
	.factory('workflowCreation', ['$q', function ($q) {
		// Service logic
		// ...
		let cy;
		/**
		 *
		 */


		let workflowGraph = function (startingWorkflow) {
			let deferred = $q.defer();
			let eles     = [];

			if (startingWorkflow) {
				for (let i = 0; i < startingWorkflow.length; i++) {
					eles.push(startingWorkflow[i]);
				}
			}


			/**
			 *
			 */
			$(function () { // on dom ready


				cy = cytoscape({
					container: $('#workflowGraphCreation')[0],

					style: cytoscape.stylesheet()
						.selector('node')
						.css({
							'content'           : 'data(name)',
							'text-valign'       : 'bottom',
							'color'             : 'white',
							'text-outline-width': 1.2,
							'text-outline-color': '#545f88',
							'background-color'  : 'data(color)',
							'shape'             : 'roundrectangle'
						})
						.selector('edge')
						.css({
							'curve-style'       : 'bezier',
							'target-arrow-shape': 'triangle',
							'width'             : 3,
							'line-color'        : '#a1a1a1',
							'target-arrow-color': '#3972dd',
							'arrow-scale'       : 2,
						})
						.selector(':selected')
						.css({
							'background-color'  : 'black',
							'line-color'        : 'black',
							'target-arrow-color': 'black',
							'source-arrow-color': 'black',
							'text-outline-color': 'black'
						}),

					layout            : {
						name: 'cose',

					},
					minZoom           : 1,
					maxZoom           : 7,
					userPanningEnabled: true,
					selectionType     : 'single',


					elements: eles,

					ready: function () {
						deferred.resolve(this);

						cy.on('tap', 'node', function () {
							let node = this;
							let type = node.data('type');
							let name = node.data('name');
							fire('nodeClicked', [node.id(), type, name]);
						});

						cy.on('cxttapend', 'node', function () {
							let node = this;
							fire('nodeRightClicked', [node.id()]);
						});
						cy.on('tapstart', function () {
							fire('mouseDown', []);
						});

						cy.on('tap', 'edge', function () {
							let edge = this;
							fire('edgeClicked', [edge.id()])
						});

					}
				});

			}); // on dom ready;

			return deferred.promise;
		};


		workflowGraph.listeners = {};


		/**
		 *
		 * @param e
		 * @param args
		 */
		function fire(e, args) {
			let listeners = workflowGraph.listeners[e];


			for (let i = 0; listeners && i < listeners.length; i++) {
				let fn = listeners[i];

				fn.apply(fn, args);
			}
		}


		/**
		 *
		 * @param e
		 * @param fn
		 */
		function listen(e, fn) {


			let listeners = workflowGraph.listeners[e] = workflowGraph.listeners[e] || [];

			listeners.push(fn);

		}

		/**
		 *
		 */
		workflowGraph.addDataElement = function (nodeElement) {

			cy.add([nodeElement]);
		};
		/**
		 *
		 * @param id
		 */
		workflowGraph.removeDataElement = function (id) {
			let element = cy.$('#' + id);
			cy.remove(element);
		};


		/**
		 *
		 * @param fn
		 */
		workflowGraph.nodeClicked = function (fn) {
			listen('nodeClicked', fn);
		};

		workflowGraph.nodeRightClicked = function (fn) {
			listen('nodeRightClicked', fn);
		};
		workflowGraph.mousePressed     = function (fn) {
			listen('mouseDown', fn);
		};
		workflowGraph.edgeClicked      = function (fn) {
			listen('edgeClicked', fn);
		};
		workflowGraph.reinitialize     = function () {
			workflowGraph.listeners = {};
		};

		return workflowGraph;
	}]);
