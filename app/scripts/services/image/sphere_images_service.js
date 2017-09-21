'use strict';

/**
 * @ngdoc service
 * @name sphereApp.Mlal
 * @description
 * # Mlal
 * Factory in the sphereApp.
 */
angular.module('sphereApp')
	.factory('sphereImageService', ['$resource', '$http', 'SPHERE_IMAGE_CONFIG', function ($resource, $http, SPHERE_IMAGE_CONFIG) {

		return {


			/**
			 *
			 * @param queryString
			 * @param count
			 * @param offset
			 * @param apiKey
			 */
			bingResults: function (queryString, count, offset, apiKey) {
				{
					let key = SPHERE_IMAGE_CONFIG.bingPrimaryApiKey;
					if (apiKey !== undefined) {
						key = apiKey;
					}
					let params  = {
						// Request parameters
						"q"         : queryString,
						"count"     : count,
						"offset"    : offset,
						"mkt"       : "en-us",
						"safeSearch": "Moderate",
						"license"   : "Public",
					};
					let request = {
						url    : "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
						method : "GET",
						headers: {
							"Ocp-Apim-Subscription-Key": key
						},
					};

					return $http(request)
						.then(function (response) {
							return response.data.value;
						});
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
					return $http.post(SPHERE_IMAGE_CONFIG.mainWebServiceUrl + url, data)
						.then(function (response) {
							if (response.data['status'] === 'true') {
								return {status: true, message: response.data['message']};
							}
							else {
								return {status: false, message: response.data['error']};
							}

						}, function (error) {
							return {
								status : false,
								message: error
							};
						});
				}
				else {
					return $http.get(SPHERE_IMAGE_CONFIG.mainWebServiceUrl + url, data)
						.then(function (response) {
							if (response.data['status'] === 'true') {
								return {status: true, message: response.data['message'], data: response.data['data']};
							}
							else {
								return {status: false, message: response.data['error']};
							}

						}, function (error) {
							return {
								status : false,
								message: error
							};
						});
				}


			},

			/**
			 *
			 * @param url
			 * @param data
			 */
			sendFilesToServer: function (url, data) {

				return $http.post(SPHERE_IMAGE_CONFIG.mainWebServiceUrl + url, data, {
					headers         : {'Content-Type': undefined},
					transformRequest: angular.identity
				})
					.then(function (response) {
						if (response.data['status'] === 'true') {
							return {status: true, message: response.data['message'], data: response.data['data']};
						}
						else {
							return {status: false, message: response.data['error']};
						}

					}, function (error) {
						return {
							status : false,
							message: error
						};
					});

			},

			getMongoResultsAsJSON: function (data) {
				let response = [];
				for (let item of data) {
					let currentItem = JSON.parse(item);
					response.push({
						model_file_link          : currentItem.model_file_link,
						model_hash               : currentItem.model_hash,
						model_json               : currentItem.model_json,
						model_base_name          : currentItem.model_base_name,
						model_search_terms       : currentItem.model_search_terms,
						model_validation_acc_loss: currentItem.model_training_acc_loss,
						model_validation_status  : currentItem.model_validation_status,
						model_weights_file_link  : currentItem.model_weights_file_link,
						model_id                 : currentItem._id,
						model_file_name          : currentItem.model_name + 'model-file.h5',
						model_weights_file_name  : currentItem.model_name + 'weights-file.h5',
						model_save_name          : currentItem.model_saved_name
					});
				}
				return response
			},

			getImagesFromVA: function (url) {
				return $http.get(url)
					.then(function (response) {
						if (response['status'] === 200) {
							return {
								status: true,
								data  : response['data']['records']
							};
						}
						else {
							return {
								status : false,
								message: response['statusText']
							};
						}


					}, function (error) {
						return {
							status : false,
							message: error
						};
					});
			},

			parseVamData: function (response) {
				let images = [];

				for (let imageItem of response) {
					let primaryImageId  = imageItem['fields']['primary_image_id'];
					let shortendImageId = primaryImageId.slice(0, 6);
					let imageLink       = SPHERE_IMAGE_CONFIG.vaMuseumImageBaseLink + shortendImageId + '/';
					let item            = {
						id            : imageItem['pk'],
						model         : imageItem['model'],
						artist        : imageItem['fields']['artist'],
						collectionCode: imageItem['fields']['collection_code'],
						dateText      : imageItem['fields']['date_text'],
						latitude      : imageItem['fields']['latitude'],
						longitude     : imageItem['fields']['longitude'],
						location      : imageItem['fields']['location'],
						museumNumber  : imageItem['fields']['museum_number'],
						object        : imageItem['fields']['object'],
						objectNumber  : imageItem['fields']['object_number'],
						place         : imageItem['fields']['place'],
						primaryImageId: primaryImageId,
						fileName      : primaryImageId + '.jpg',
						mainImageLink : imageLink + primaryImageId + '.jpg',
						sImageLink    : imageLink + primaryImageId + '_jpg_s' + '.jpg',
						oImageLink    : imageLink + primaryImageId + '_jpg_o' + '.jpg',
						wsImageLink   : imageLink + primaryImageId + '_jpg_ws' + '.jpg',
						wImageLink    : imageLink + primaryImageId + '_jpg_w' + '.jpg',
						dsImageLink   : imageLink + primaryImageId + '_jpg_ds' + '.jpg',
						lImageLink    : imageLink + primaryImageId + '_jpg_l' + '.jpg',
						slug          : imageItem['fields']['slug'],
						title         : imageItem['fields']['title'],
						rights        : imageItem['fields']['rights'],
					};
					images.push(item)
				}
				return images;
			}


		};

	}]);
