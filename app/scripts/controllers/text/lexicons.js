'use strict';

/**
 * @ngdoc function
 * @name sphereApp.controller:SphereTextLexiconsCtrl
 * @description
 * # SphereTextLexiconsCtrl
 * Controller of the sphereApp
 */
angular.module('sphereApp')
	.controller('TextLexiconsCtrl', function ($scope, ngToast, sphereTextService, SPHERE_TEXT_CONFIG) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		$scope.pasteMode     = true;
		$scope.selectingFile = true;
		$scope.choosingName  = false;
		$scope.addingPython  = false;
		$scope.loading       = false;
		$scope.editorOptions = {
			lineWrapping: true,
			lineNumbers : true,
			autofocus   : true,
			mode        : 'python',
		};

		$scope.radioButtonClassDetection = function (method) {
			if (method === "paste") {
				return $scope.pasteMode === true;
			}
			else {
				return $scope.pasteMode !== true;
			}
		};

		$scope.validateLexicons = function (json) {
			if ($scope.pasteMode) {
				if (json !== undefined) {
					try {
						$scope.jsonTextFieldData = JSON.parse(json);
						$scope.selectingFile     = false;
						$scope.choosingName      = true;

					}
					catch (e) {
						ngToast.danger("Please Enter a valid JSON Data:  " + e);
						return false
					}
				}
				else {
					ngToast.danger("Please Type or paste JSON Data in the Text Area");
					return false
				}
			}
			else {
				if ($scope.lxFile.length <= 0) {
					ngToast.danger("Please Select a file to upload");
					return false
				}
				else {
					$scope.selectingFile = false;
					$scope.choosingName  = true;
				}
			}

		};

		$scope.validateName = function (name) {
			let newName         = name.replace(" ", "");
			$scope.fileName     = newName.replace(",", "#");
			$scope.choosingName = false;
			$scope.addingPython = true;
		};

		$scope.pythonCodeSnippet = "import os \nimport shutil \nclass LexiconParser:\n\tdef __init__(): \n\t\t pass \n\tdef" +
			" lexicon_parse(): \n\t#######################################\n\t Do not edit above this line please" +
			"\n\t#######################################\n\t";

		$scope.fields = [{id: 'fields1'}];

		$scope.addNewChoice = function () {
			let newItemNo = $scope.fields.length + 1;
			$scope.fields.push({'id': 'field' + newItemNo});
		};

		$scope.removeChoice = function () {
			let lastItem = $scope.fields.length - 1;
			$scope.fields.splice(lastItem);
		};

		$scope.submitForm = function (language) {
			$scope.loading          = true;
			let finalParsedElements = [];
			let userInputKeys;
			if ($scope.lxFile !== undefined) {
				Papa.parse($scope.lxFile["_file"], {
					dynamicTyping: true,
					worker       : true,
					complete     : function (results) {
						for (let elements of results.data) {
							let parsedElement = {};
							for (let fields of $scope.fields) {
								if (fields.name !== undefined) {
									let number = parseInt(fields.name);
									if (number > 0) {
										parsedElement["key" + number] = elements[number];
									}
								}
							}
							if (userInputKeys === undefined) {
								userInputKeys = [];
								for (let keys in parsedElement) {
									if (parsedElement.hasOwnProperty(keys)) {
										userInputKeys.push({"key": keys});
									}

								}
							}
							parsedElement["word"] = elements[0];
							finalParsedElements.push(parsedElement);

						}
						if (userInputKeys === undefined || userInputKeys.length <= 0) {
							ngToast.danger("No rows selected");
							$scope.loading = false;

						}
						else {
							// all good, send the data to the server.
							let jsonData      = JSON.parse(JSON.stringify(finalParsedElements));
							let jsonUserInput = JSON.parse(JSON.stringify(userInputKeys));
							sendLexiconToServer(jsonData, jsonUserInput, $scope.fileName, language);
						}

						$scope.$digest();
						$scope.$apply();
					}
				});


			}
			else {
				console.log("No files, goto JSON");
				let userKeys = [];
				for (let fields of $scope.fields) {
					if (fields.name !== undefined) {
						userKeys.push({"key": fields.name})
					}
				}
				let jsonUserKeys = JSON.parse(JSON.stringify(userKeys));

				sendLexiconToServer($scope.jsonTextFieldData, jsonUserKeys, $scope.fileName, language);
			}

		};

		function sendLexiconToServer(jsonData, userKeys, name, language) {
			let data = {
				lexicon : jsonData,
				keys    : userKeys,
				name    : name,
				language: language
			};
			console.log(JSON.stringify(data));
			sphereTextService.sendRequestToServer("POST", SPHERE_TEXT_CONFIG.addLexiconUrl, data)
				.then(function (respose) {
					$scope.loading = false;
					if (respose.status) {
						ngToast.success("Saved successfully!");
					}
					else {
						ngToast.danger(respose.message);
					}
				})
		}

		$scope.buildingEnabled    = true;
		$scope.displayJSONContent = "";

		/*****************/
		$scope.setActive                       = function (text) {
			if (text === 'build') {
				return $scope.buildingEnabled;
			}
			else {
				return !$scope.buildingEnabled;
			}
		};
		$scope.fetchAvailableFeatureExtractors = function () {
			$scope.availableFeatureExtractors = [];
			$scope.loading                    = true;
			sphereTextService.sendRequestToServer('GET', SPHERE_TEXT_CONFIG.getLexiconsLink, '')
				.then(function (response) {
					$scope.loading = false;
					if (response.status) {
						let count = 0;
						for (let fe of response.data) {
							fe         = JSON.parse(fe);
							let feItem = {
								name    : fe['name'],
								filename: fe['file_name'],
								language: fe['language'],
								keys    : fe['user_keys'],
								id      : fe['_id'],
								lexicons: fe['lexicons'],
							};

							$scope.availableFeatureExtractors.push(feItem);
							count++;
						}
					}
					else {
						ngToast.danger(response.message);
					}
				})
		};

		$scope.showJSONPanel = function (jsonData, name, type) {
			$scope.showPanelType        = type;
			$scope.lexiconsNameforPanel = name;
			$scope.showJSONPanelView    = true;
			$scope.displayJSONContent   = JSON.parse(JSON.stringify(jsonData, null, 4));
		};


	});
