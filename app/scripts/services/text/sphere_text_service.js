'use strict';

/**
 * @ngdoc service
 * @name sphereApp.Mlal
 * @description
 * # Mlal
 * Factory in the sphereApp.
 */
angular.module('sphereApp')
	.factory('sphereTextService', ['$resource', '$http', 'SPHERE_TEXT_CONFIG', function ($resource, $http, SPHERE_TEXT_CONFIG) {

		return {

			examineNodes: function (clickedNode, availableDataset, id, name) {
				switch (clickedNode) {
					case 'root':
						return {
							title     : 'Choose a Gold Standard',
							data      : availableDataset.gs,
							node_id   : id,
							showRemove: false,
							type      : 'root',
							addtype   : 'gs',
							name      : name
						};
						break;
					case 'gs':
						return {
							title     : 'Choose a Feature Extractor',
							data      : availableDataset.fe,
							node_id   : id,
							showRemove: true,
							type      : 'Gold Standard',
							addtype   : 'fe',
							name      : name
						};
						break;
					case 'fe':
						return {
							title     : 'Choose a Classfier',
							data      : availableDataset.cf,
							node_id   : id,
							showRemove: true,
							type      : 'Feature Extractor',
							addtype   : 'cf',
							name      : name
						};
						break;
					case 'cf':
						return {
							title     : 'Compile Workflow',
							data      : availableDataset.compile_workflow,
							node_id   : id,
							showRemove: true,
							type      : 'Classifier',
							addtype   : 'compile',
							name      : name
						};
						break;
					case 'cw':
						return {
							title     : '',
							data      : availableDataset.cw,
							node_id   : id,
							showRemove: true,
							type      : 'Custom Workflow',
							addtype   : 'compile',
							name      : name
						};
						break;
				}
			},

			/**
			 *
			 * @param method
			 * @param url
			 * @param data
			 */
			sendRequestToServer: function (method, url, data) {
				if (method === 'POST') {
					return $http.post(SPHERE_TEXT_CONFIG.apiBaseUrl + url, data)
						.then(function (response) {
							if (response.data['status'] === 'true') {
								return {status: true, message: response.data['message'], data: response.data['data']};
							}
							else {
								return {status: false, message: response.data['error']};
							}

						}, function () {
							return {
								status : false,
								message: "An error ocurred while trying to process the request"
							};
						});
				}
				else {
					return $http.get(SPHERE_TEXT_CONFIG.apiBaseUrl + url, data)
						.then(function (response) {
							if (response.data['status'] === 'true') {
								return {status: true, message: response.data['message'], data: response.data['data']};
							}
							else {
								return {status: false, message: response.data['error']};
							}

						}, function () {
							return {
								status : false,
								message: "An error ocurred while trying to process the request"
							};
						});
				}

			},

			/**
			 *
			 * @param name
			 * @param type
			 * @returns {{group: string, data: {id: string, name: *, type: *, color}, position: {x: number, y: number}}}
			 */
			createNode: function (name, type) {
				let date = new Date();
				let id   = '' + date.getTime();
				return {
					group   : "nodes",
					data    : {
						id   : id,
						name : name,
						type : type,
						color: SPHERE_TEXT_CONFIG.colorSchemes[type],
					},
					position: {
						x: 560,
						y: 200
					}
				}
			},

			/**
			 *
			 * @param workflow
			 * @returns {{group: string, data: {id: (number|api.Camera._id|string|string|*|string), name: (number|api.Camera._id|string|string|*|string), type: string, color}, position: {x: number, y: number}}}
			 */
			createNodeForCustomWorkflow: function (workflow) {

				return {
					group   : "nodes",
					data    : {
						id   : workflow._id,
						name : workflow.name,
						type : 'cw',
						color: SPHERE_TEXT_CONFIG.colorSchemes['cw'],
						shape: 'roundrectangle'
					},
					position: {
						x: 560,
						y: 200
					}
				}
			},

			/**
			 *
			 * @param edgeParameters
			 * @returns {{group: string, data: {id, source, target}}}
			 */
			createEdge: function (edgeParameters) {
				let date = new Date();
				let id   = '' + date.getTime();
				return {
					group: "edges",
					data : {
						id    : id,
						source: edgeParameters.source,
						target: edgeParameters.target
					}
				}
			},

			workflowDataFormatting: function (nodesArray, name) {
				let nodes = [];
				let links = [];
				for (let item of nodesArray) {
					if (item.group === "nodes") {
						nodes.push(item.data);
					}
					else {
						links.push(item.data);
					}
				}

				return JSON.stringify({
					nodes        : nodes,
					links        : links,
					workflow_name: name,
					workflow     : nodesArray,
				})

			},

			createClassifierObject: function (id, name, type) {
				return {
					id  : id,
					name: name,
					type: type
				}
			},

			bingTextResults: function (queryString, offset, apiKey, textCount) {
				{
					let key = SPHERE_TEXT_CONFIG.bingPrimaryApiKey;
					if (apiKey !== undefined) {
						key = apiKey;
					}

					let params  = {
						// Request parameters
						"q"         : queryString,
						"count"     : textCount,
						"offset"    : offset,
						"mkt"       : "en-us",
						"safeSearch": "Moderate",

					};
					let request = {
						url    : "https://api.cognitive.microsoft.com/bing/v5.0/search?" + $.param(params),
						method : "GET",
						headers: {
							"Ocp-Apim-Subscription-Key": key
						},
					};

					return $http(request)
						.then(function (response) {
							let searchResults = [];

							for (let result of response.data.webPages.value) {
								searchResults.push({
									id     : result['id'],
									name   : result['name'],
									url    : result['url'],
									snippet: result['snippet']
								});
							}
							return searchResults;
						});
				}

			}


		};


	}]);
