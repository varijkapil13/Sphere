'use strict';

/**
 * @ngdoc function
 * @name sphereApp.controller:sphereImagesMuseumsearchCtrl
 * @description
 * # sphereImagesMuseumsearchCtrl
 * Controller of the sphereApp
 */
angular.module('sphereApp')
	.controller('ImageMuseumsearchCtrl', function ($scope, SPHERE_IMAGE_CONFIG, sphereImageService, ngToast, Lightbox) {
		this.awesomeThings          = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.loading              = false;
		$scope.datePeriod           = 'After';
		$scope.searchResults        = [];
		$scope.imageSizes           = SPHERE_IMAGE_CONFIG.vaImageSizes;
		$scope.selectedImageSize    = {
			name: '355px sqaure fit',
			key : 'dsImageLink'
		};
		$scope.imageObjectsToRemove = [];


		$scope.searchImages = function (generalQuery, objectName, nameSearch, placeSearch, materialSearch, dateSearch, numberImages) {
			$scope.searchResults = [];
			let offsetMultiple   = undefined;
			if (numberImages !== undefined) {
				offsetMultiple = numberImages / 45;
			}

			if (offsetMultiple < 1) {
				ngToast.warning("Invalid number of images");
				return
			}
			if (offsetMultiple === undefined) {
				offsetMultiple = 1;
			}

			let finalurl = SPHERE_IMAGE_CONFIG.vaMuseumObjectSearchUrl;

			if (generalQuery !== undefined) {
				finalurl = finalurl + '&q=' + generalQuery;
			}

			if (nameSearch !== undefined) {
				finalurl = finalurl + '&namesearch=' + nameSearch;
			}
			if (placeSearch !== undefined) {
				finalurl = finalurl + '&placesearch=' + placeSearch;
			}
			if (materialSearch !== undefined) {
				finalurl = finalurl + '&materialsearch=' + materialSearch;
			}
			if (objectName !== undefined) {
				finalurl = finalurl + '&objectnamesearch=' + objectName;
			}
			if (dateSearch !== undefined) {

				finalurl = finalurl + '&' + angular.lowercase($scope.datePeriod) + '=' + dateSearch;
			}

			for (let i = 0; i < offsetMultiple; i++) {
				$scope.loading = true;
				if (i > 0) {
					let offset = 45 * i;
					finalurl   = finalurl + '&offset=' + offset
				}
				sphereImageService.getImagesFromVA(finalurl)
					.then(function (response) {
						$scope.loading = false;
						if (response.status) {
							let rawImagesResponse = sphereImageService.parseVamData(response.data);
							$scope.searchResults.push(...rawImagesResponse);
						}
						else {
							ngToast.danger(response.message);
						}
					});

			}
		};

		$scope.selectedImageForRemoval = function (imageObject, url) {
			if ($scope.editingModeEnabled) {
				if ($scope.imageObjectsToRemove.includes(imageObject)) {
					let index = $scope.imageObjectsToRemove.indexOf(imageObject);
					$scope.imageObjectsToRemove.splice(index, 1);
				}
				else {

					$scope.imageObjectsToRemove.push(imageObject);
				}
			}
			else {
				let image = [{
						url: url,
						caption: imageObject
					}];
				Lightbox.openModal(image, 0);
			}

		};
		$scope.checkImageSelected      = function (imageObject) {

			return $scope.imageObjectsToRemove.indexOf(imageObject) > -1;

		};
		$scope.deleteSelectedVAImages  = function () {
			for (let imageItem of $scope.imageObjectsToRemove) {
				if ($scope.searchResults.indexOf(imageItem) > -1) {
					$scope.searchResults.splice($scope.searchResults.indexOf(imageItem), 1);
				}
			}
			$scope.imageObjectsToRemove = [];
			$scope.editingModeEnabled   = false;
		};

		$scope.downloadAsZip = function () {
			$scope.loading  = true;
			let zip         = new JSZip();
			let count       = 0;
			let zipFileName = 'v&a_museum_search_files.zip';
			let urls        = [];
			let filenames   = [];
			for (let item of $scope.searchResults) {
				urls.push(item[$scope.selectedImageSize.key]);
				filenames.push(item.fileName);
			}
			urls.forEach(function (url) {

				JSZipUtils.getBinaryContent(url, function (error, data) {
					if (error) {
						throw error;
					}
					let fileName = filenames[count];
					zip.file(fileName, data, {binary: true});
					count++;
					if (count === urls.length) {
						zip.generateAsync({type: 'blob'}).then(function (content) {
							saveAs(content, zipFileName);
							$scope.loading = false;
							$scope.$digest();
							$scope.$apply();
						});
					}
				});
			});
		};

		$scope.sendToServer = function (classificationClass) {
			let urls = [];
			for (let item of $scope.searchResults) {
				urls.push(item[$scope.selectedImageSize.key]);
			}

			let images                  = {};
			images[classificationClass] = urls;
			let data                    = {};
			data['images']              = images;

			$scope.loading = true;
			sphereImageService.sendRequestToServer("POST", SPHERE_IMAGE_CONFIG.downloadImagesUrl, data)
				.then(function (response) {
					if (response.status) {
						$scope.clear();
						$scope.loading = false;
						ngToast.success(response.message);
					}
					else {
						$scope.loading = false;
						ngToast.danger(response.message);
					}
				});
		};

		$scope.clear = function () {
			$scope.searchResults        = [];
			$scope.datePeriod           = 'After';
			$scope.selectedImageSize    = {
				name: '355px sqaure fit',
				key : 'dsImageLink'
			};
			$scope.imageObjectsToRemove = [];
		}

		$scope.bingvaradioButtonClassDetection = function (mode) {
			return mode === "va";
		};
	});
