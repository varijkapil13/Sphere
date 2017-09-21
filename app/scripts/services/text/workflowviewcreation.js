'use strict';

/**
 * @ngdoc service
 * @name sphereApp.workflowViewCreation
 * @description
 * # sphere/text/workflowViewCreation
 * Factory in the sphereApp.
 */
angular.module('sphereApp')
	.factory('workflowViewCreation', ['$q', function ($q) {
		// Service logic
		// ...
		let cy;
		/**
		 *
		 */
		let workflowViewGraph = function (startingWorkflow) {
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
					container: $('#workflowGraphViewCreation')[0],

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

					}
				});

			}); // on dom ready

			return deferred.promise;
		};


		return workflowViewGraph;
	}]);
