'use strict';

/**
 * @ngdoc function
 * @name sphereApp.controller:sphereImagesSearchCtrl
 * @description
 * # sphereImagesSearchCtrl
 * Controller of the sphereApp
 */
angular.module('sphereApp')
	.controller('ImageSearchCtrl', function ($scope, SPHERE_IMAGE_CONFIG, ngToast, $http, sphereImageService, Lightbox) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		$scope.selectedImagesToRemoveArray = [];
		$scope.currentSelectionForEditing  = {
			searchTerm: '',
		};
		$scope.bingSearchImageCount        = 1;
		$scope.searchingMode               = true;


		/**
		 *
		 * @param thumbnailUrl
		 * @param contentUrl
		 * @param encoding
		 */
		let imageModel = function (thumbnailUrl, contentUrl, encoding) {
			this.thumbnailUrl = thumbnailUrl;
			this.contentUrl   = contentUrl;
			this.format       = encoding;
		};

		/**
		 *
		 * @param searchTerm
		 * @param images
		 */
		let resultsModel = function (searchTerm, images) {
			this.searchTerm = searchTerm;
			this.images     = images;
		};

		/**
		 * Search for the given text
		 * @private
		 * @method getSearchResults
		 * @return {Object} description
		 */
		$scope.getSearchResults = function (numberOfImages, apiKey) {
			if ($scope.searchQuery && $scope.searchQuery !== '') {
				$scope.loading       = true;
				$scope.searchResults = [];
				if ($scope.searchQuery.indexOf(",") > -1) {
					let searchString       = $scope.searchQuery.split(', ').join(',');
					let searchStringsArray = searchString.split(',');

					for (let searchItem in searchStringsArray) {
						let searchTerm = searchStringsArray[searchItem];
						startBingSearch(searchTerm, numberOfImages, apiKey);
					}

				}
				else {
					startBingSearch($scope.searchQuery, numberOfImages, apiKey);

				}

			} else {
				ngToast.warning('Can\'t Search for empty text');
				$scope.loading = false;
			}
		};


		/**
		 * Clear the page of all the results and selections
		 * @private
		 * @method clear
		 * @return {Object} description
		 */
		$scope.clear = function () {
			$scope.chooseAll     = false;
			$scope.searchQuery   = '';
			$scope.searchResults = [];
		};


		/**
		 *
		 */
		$scope.sendData = function () {
			if ($scope.currentSelectionForEditing.searchTerm !== '') {
				ngToast.warning("You are in editing mode. Please click the <strong> Editing Mode </strong> button again to exit editing mode and start training");
			}
			else {
				$scope.loading   = true;
				let imagesToSend = {};
				for (let i = 0; i < $scope.searchResults.length; i++) {
					let tempObject                      = $scope.searchResults[i];
					imagesToSend[tempObject.searchTerm] = tempObject.images;
				}

				let data = {
					images: imagesToSend
				};
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

			}


		};

		/**
		 *
		 * @param category
		 * @param index
		 * @returns {boolean}
		 */
		$scope.checkImageSelected = function (category, index) {

			if ($scope.currentSelectionForEditing.searchTerm === category) {
				if ($scope.selectedImagesToRemoveArray.includes(index)) {
					return true
				}
			}
			else {
				return false
			}

		};
		/**
		 *
		 * @param indexOfElement
		 * @param categoryName
		 */
		$scope.selectedImageForRemoval = function (indexOfElement, categoryName) {
			if ($scope.currentSelectionForEditing.searchTerm === categoryName) {

				if ($scope.selectedImagesToRemoveArray.includes(indexOfElement)) {

					let index = $scope.selectedImagesToRemoveArray.indexOf(indexOfElement);
					$scope.selectedImagesToRemoveArray.splice(index, 1);

				}
				else {
					$scope.selectedImagesToRemoveArray.push(indexOfElement);
				}
			}
			else{
				let item = [];
				for (let categories of $scope.searchResults){
					if (categories.searchTerm === categoryName){
						item = categories.images;
					}
				}
				let image = [{url: item[indexOfElement].contentUrl}];
				Lightbox.openModal(image, 0);
			}
		};

		$scope.startImageRemovingMode = function (searchTerm) {
			if ($scope.currentSelectionForEditing.searchTerm === searchTerm) {
				$scope.currentSelectionForEditing.searchTerm = '';
			}
			else {
				$scope.currentSelectionForEditing.searchTerm = searchTerm;
			}
		};
		$scope.deleteSelectedImages   = function () {
			if ($scope.selectedImagesToRemoveArray.length > 0) {
				for (let items of $scope.searchResults) {
					if (items.searchTerm === $scope.currentSelectionForEditing.searchTerm) {
						for (let index of $scope.selectedImagesToRemoveArray) {
							items.images.splice(index, 1);
						}
						$scope.selectedImagesToRemoveArray = [];
					}
				}
				$scope.currentSelectionForEditing = {
					searchTerm: '',
				};
			}
			else {
				ngToast.warning('Please select some image to remove');
			}

		};

		/**
		 *
		 * @param searchTerm
		 * @param numberOfImages
		 * @param apiKey
		 * @returns {Promise.<void>}
		 */
		let startBingSearch              = function (searchTerm, numberOfImages, apiKey) {
			let offsetMultiple = undefined;

			if (numberOfImages !== undefined) {
				offsetMultiple = numberOfImages / $scope.bingSearchImageCount;
			}

			if (offsetMultiple < 1) {
				ngToast.warning("Invalid number of images, please enter number greater than the deafult");
				return
			}
			if (offsetMultiple === undefined) {
				offsetMultiple = 1;
			}
			let offset       = 0;
			let responseData = [];
			for (let i = 0; i < offsetMultiple; i++) {

				if (i > 0) {
					offset = $scope.bingSearchImageCount * i;
				}
				sphereImageService.bingResults(searchTerm, $scope.bingSearchImageCount, offset, apiKey)
					.then(function (imageData) {

						for (let itm = 0; itm < imageData.length; itm++) {
							let newImage = new imageModel(imageData[itm].thumbnailUrl, imageData[itm].contentUrl, imageData[itm].encodingFormat);
							responseData.push(newImage)
						}

					});
				setTimeout(sleep, 400);

			}
			let tempData = new resultsModel(searchTerm, responseData);
			$scope.searchResults.push(tempData);
			$scope.loading = false;

		};
		let sleep                        = function () {

		};
		$scope.radioButtonClassDetection = function (mode) {
			if (mode === "search") {
				return $scope.searchingMode === true;
			}
			else {
				return $scope.searchingMode !== true;
			}
		};

		$scope.bingvaradioButtonClassDetection = function (mode) {
			return mode === "bing";
		};

		/**
		 *
		 * @param className
		 * @returns {boolean}
		 */
		$scope.uploadImages = function (className) {
			if (!$scope.fileForUpload) {
				ngToast.danger("Please select some image to upload");
				return false;
			}
			if ($scope.fileForUpload.length <= 0) {
				ngToast.danger("Please select some image to upload");
				return false;
			}

			let formData = new FormData();
			for (let file of $scope.fileForUpload) {
				formData.append("file", file['_file']);
			}
			formData.append("class_name", className);
			formData.encoding = 'multipart/form-data';
			$scope.loading    = true;
			sphereImageService.sendFilesToServer(SPHERE_IMAGE_CONFIG.imageDatasetUploadUrl, formData)
				.then(function (response) {
					$scope.loading = false;
					if (response.status) {
						ngToast.success("Success");
					}
					else {
						ngToast.warning("Fail");
					}
				})

		};

	});
