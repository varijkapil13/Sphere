'use strict';

/**
 * @ngdoc function
 * @name sphereApp.controller:sphereTextWorkflowannotatorCtrl
 * @description
 * # sphereTextWorkflowannotatorCtrl
 * Controller of the sphereApp
 */
angular.module('sphereApp')
	.controller('TextWorkflowannotatorCtrl', function ($scope, $uibModal, SPHERE_TEXT_CONFIG, ngToast, sphereTextService, workflowInterchange) {
		this.awesomeThings        = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.textAreaData       = '';
		$scope.annotatedTextArea  = '';
		$scope.classifiers        = [];
		$scope.selectedClassifier = undefined;
		$scope.trainOnAnnotations = false;
		$scope.selectingWorkflow  = true;
		$scope.loading            = true;
		$scope.lineSeparators     = SPHERE_TEXT_CONFIG.lineSeparators;
		$scope.selectedSeparator  = $scope.lineSeparators[0];
		$scope.splitAutomatically = false;
		$scope.correctionsArray   = [];
		$scope.showCorrectedText  = false;


		/**
		 *
		 * @param separator
		 */
		$scope.setSelectedSeparator = function (separator) {
			$scope.selectedSeparator = separator;
		};


		sphereTextService.sendRequestToServer('GET', SPHERE_TEXT_CONFIG.workflowUrl)
			.then(function (response) {
				if (response.status === true) {
					$scope.loading = false;

					for (let item of response.data) {
						if (item.status === 'trained') {

							$scope.classifiers.push(sphereTextService.createClassifierObject('596a1393d51a273a6cd8696e', item.name, 'workflow'));
							//TODO: uncomment the line below and delte the line above
							//$scope.classifiers.push(sphereTextService.createClassifierObject(item._id, item.name, 'workflow'));
						}
					}
				}
				else {
					$scope.loading          = false;
					$scope.viewAllWorkflows = false;
					ngToast.warning(response.message);
				}
			});

		/**
		 *
		 * @param file
		 * @param errFiles
		 */
		$scope.uploadFiles = function (file, errFiles) {
			$scope.file    = file;
			$scope.errFile = errFiles && errFiles[0];

			if ($scope.showCorrectedText) {
				if (file) {

					Papa.parse(file, {
						dynamicTyping: true,
						worker       : true,
						newline      : "\n",
						complete     : function (results) {
							if ($scope.annotatedTextArea.length > 0) {
								$scope.annotatedTextArea = $scope.annotatedTextArea + '\n' + results.data.join("\n");
							}
							else {
								$scope.annotatedTextArea = results.data.join("\n");
							}
							$scope.$digest();
						}
					});

				}
			}
			else {

				const navigator = new LineNavigator(file);

				navigator.readLines(0, 5000, function (error, index, lines) {
					$scope.textAreaData = lines.join($scope.selectedSeparator + '\n');
					$scope.$digest();
				});

			}

		};

		/**
		 *
		 * @param classifier
		 */
		$scope.selectClassifier = function (classifier) {
			$scope.selectedClassifier = classifier;
		};

		/**
		 *
		 * @param section
		 */
		$scope.radioCheckChanged = function (section) {
			$scope.trainOnAnnotations = section === 'trainOnAnnotations';
		};
		/**
		 *
		 */
		$scope.startAnnotation = function () {
			$scope.selectingWorkflow = !$scope.selectedClassifier;
		};

		/**
		 *
		 */
		$scope.annotateText = function () {
			if (!$scope.selectedClassifier) {
				ngToast.danger('No Classifier selected. Please reload the page and select a classifier to begin')
			}
			else if ($scope.textAreaData === undefined || $scope.textAreaData.length < 1) {
				ngToast.danger('Please enter appropriate amount of text to start annotations')
			}
			else {
				$scope.loading = true;
				let data       = {
					text     : $scope.textAreaData,
					id       : $scope.selectedClassifier.id,
					name     : $scope.selectedClassifier.name,
					separator: $scope.selectedSeparator,
					split    : $scope.splitAutomatically
				};

				let url = SPHERE_TEXT_CONFIG.predictionWorkflowUrl + $scope.selectedClassifier.name + SPHERE_TEXT_CONFIG.predictionURl;

				sphereTextService.sendRequestToServer('POST', url, data)
					.then(function (response) {
						if (response.status) {
							$scope.loading           = false;
							$scope.predictionResults = response.data;
							ngToast.success(response.message);
						}
						else {
							$scope.loading = false;
							ngToast.warning(response.message);
						}
					});
			}
		};

		/**
		 *
		 */
		$scope.trainOnData = function () {
			console.log('Will Start Training in this function');
		};

		/**
		 *
		 * @param searchtext
		 * @param apiKey
		 */
		$scope.searchBing = function (searchtext, apiKey) {
			$scope.loading          = true;
			let bingSearchTextCount = 100;
			let snippetsToDownload  = 1000;
			let offsetMultiple      = snippetsToDownload / bingSearchTextCount;
			let offset              = 0;
			for (let i = 0; i < offsetMultiple; i++) {

				if (i > 0) {
					offset = bingSearchTextCount * i;
				}
				sphereTextService.bingTextResults(searchtext, offset, apiKey, bingSearchTextCount)
					.then(function (response) {
						for (let text of response) {
							$scope.textAreaData = $scope.textAreaData + text.snippet + $scope.selectedSeparator + '\n';
						}
					});

				setTimeout(sleep, 400);

			}
			$scope.loading = false;

		};

		/**
		 *
		 * @param text
		 * @param prediction
		 */
		$scope.addCorrection = function (text, prediction) {
			$scope.correctionsArray.push({
				text      : text,
				prediction: prediction
			});
			$scope.$apply();

		};

		$scope.viewCorrectedText = function () {
			$scope.showCorrectedText = !$scope.showCorrectedText;
			if ($scope.showCorrectedText) {
				for (let item of $scope.correctionsArray) {
					if ($scope.annotatedTextArea.length > 0) {
						$scope.annotatedTextArea = $scope.annotatedTextArea + '\n' + item.text + ',' + item.prediction
					}
					else {
						$scope.annotatedTextArea = $scope.annotatedTextArea + item.text + ',' + item.prediction
					}
				}
			}
			else {
				$scope.annotatedTextArea = '';
			}
		};

		/**
		 *
		 * @param name
		 * @param annotatedText
		 * @param language
		 * @param textDescription
		 */
		$scope.saveAnnotatedData = function (name, annotatedText, language, textDescription) {
			$scope.loading = true;
			let text       = annotatedText.split("\n");
			let data       = {
				text       : text,
				name       : name,
				language   : language,
				description: textDescription
			};

			sphereTextService.sendRequestToServer("POST", SPHERE_TEXT_CONFIG.saveAnnoatedDatasetUrl, data)
				.then(function (response) {
					$scope.loading = false;
					if (response.status) {
						ngToast.success(response.message);
					}
					else {
						ngToast.danger(response.message);
					}
				})


		};

		/**
		 *
		 */
		let sleep = function () {
		};

		$scope.downloadAnnotationsAsCSV = function () {
			let csvData = Papa.unparse($scope.predictionResults);
			let blob = new Blob([csvData], {type: "text/csv;charset=utf-8"});
			saveAs(blob, "Annotations.csv");
		};


	});
