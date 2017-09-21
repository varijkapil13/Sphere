'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:sphereTextDatasetcreationCtrl
 * @description
 * # sphereTextDatasetcreationCtrl
 * Controller of the Lambda3WebApp
 */
angular.module('sphereApp')
	.controller('TextDatasetcreationCtrl', function ($scope, SPHERE_TEXT_CONFIG, ngToast, sphereTextService, sphereImageService, $http) {
		this.awesomeThings            = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.loading                = false;
		$scope.searchingEnabled       = false;
		$scope.showSearchResults      = false;
		$scope.availableGoldStandards = [];
		$scope.showdescription        = false;
		$scope.descId                 = -1;

		$scope.fetchAvailableGoldStandards = function () {
			$scope.availableGoldStandards = [];
			$scope.loading                = true;
			sphereTextService.sendRequestToServer('GET', SPHERE_TEXT_CONFIG.getAllTextGoldStandards, '')
				.then(function (response) {
					$scope.loading = false;
					if (response.status) {
						let count = 0;
						for (let gs of response.data) {
							gs         = JSON.parse(gs);
							let gsItem = {
								name            : gs['name'],
								description     : gs['description'],
								language        : gs['language'],
								id              : gs['_id'],
								originalFileName: gs['original_file_name'],
								createdFileName : gs['created_file_name']
							};

							$scope.availableGoldStandards.push(gsItem);
							count++;
						}
					}
					else {
						ngToast.danger(response.message);
					}
				})
		};

		$scope.setActive = function (text) {
			if (text === 'search') {
				return $scope.searchingEnabled;
			}
			else {
				return !$scope.searchingEnabled;
			}
		};

		$scope.formSubmit = function (name, language, delimiter, encoding, description) {
			if ($scope.gsUploadingFile === undefined) {
				ngToast.danger("Please select some files to upload")
			}
			else {
				if (delimiter === undefined || delimiter.length === 0) {
					delimiter = '\t'
				}
				if (encoding === undefined || encoding.length === 0) {
					encoding = 'utf8'
				}
				console.log("file:  ", $scope.gsUploadingFile);
				let formData = new FormData();
				formData.append('name', name.replace(" ", ""));
				formData.append('delimiter', delimiter);
				formData.append('encoding', encoding);
				formData.append('description', description);
				formData.append('language', language);
				for (let file of $scope.gsUploadingFile) {
					formData.append("file", file['_file']);
				}

				sphereImageService.sendFilesToServer(SPHERE_TEXT_CONFIG.saveGoldStandardUrl, formData)
					.then(function (response) {
						if (response.success) {
							ngToast.success("Success")
						}
						else {
							ngToast.danger(response.message)
						}
					});
				console.log(name, delimiter, encoding, description, $scope.gsUploadingFile);
			}
		};

		$scope.downloadFile    = function (name, file_name, format) {
			let url = SPHERE_TEXT_CONFIG.apiBaseUrl + 'downloadFile/' + name + '/' + file_name + '/' + format;
			$http.get(url, {responseType: 'arraybuffer'})
				.then(function (response) {
					//require('angular-file-saver');
					let myBuffer = new Uint8Array(response.data);
					let data     = new Blob([myBuffer]);
					let fileName = '';
					if (format === 'zip') {
						fileName = name + '.tar.bz2';
					}
					else {
						fileName = file_name;
					}
					saveAs(data, fileName);
					console.log("success:  ", response)
				}, function (error) {
					console.log("error:  ", error)
				});

		};
		$scope.showDescription = function (description, name) {
			$scope.showdescription    = true;
			$scope.displayDescription = description;
			$scope.datasetNameForDescription = name;
		};

		$scope.downloadAllGoldStandards = function () {
			let url  = SPHERE_TEXT_CONFIG.apiBaseUrl + SPHERE_TEXT_CONFIG.fileDownloadURL;
			let data = {
				type: 'gold',
				path: SPHERE_TEXT_CONFIG.allGoldStandardsDownloadURL
			};
			$http.post(url, data, {responseType: 'arraybuffer'})
				.then(function (response) {
					//require('angular-file-saver');
					let myBuffer = new Uint8Array(response.data);
					let data     = new Blob([myBuffer]);
					let fileName = 'Sphere_All_Gold_Standards.tar.bz2';
					saveAs(data, fileName);
					ngToast.success("Success")
				}, function (error) {
					ngToast.danger("error:  " + error)
				});
		};


	});
