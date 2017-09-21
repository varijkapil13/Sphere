'use strict';
const GOOGLE_SEARCH_API_KEY = "AIzaSyA98Qr9sDfgAbiqejDQPMNe8NfS-bX0pPY";
const BING_SEARCH_API_KEY_1 = 'cbef8dcd73e9434d88fc9a9d654e8a1a';
const BING_SEARCH_API_KEY_2 = '11eaa4c46156475487b44f8b9a2f1b8f';
const BING_SEARCH_QUERY_URL = 'https://api.cognitive.microsoft.com/bing/v5.0/search?count=1000&offset=0&mkt=en-us&safesearch=Moderate&license=Public&q=';

const TEXT_MODELS                   = ["sample text model"];
const VIDEO_MODELS                  = ["sample video model"];
const WEBSERVICE_URL                = 'http://localhost:5000/sphere/api/v1/image/';
const RECIEVE_IMAGES                = 'recieveImages';
const RECIEVE_IMAGE_DATASET         = 'getDatasets';
const GET_MODELS                    = 'getModels';
const START_VALIDATION              = 'startValidation';
const START_TRAINING                = 'startTraining';
const VA_MUSEUM_OBJECT_SEARCH_URL   = 'http://www.vam.ac.uk/api/json/museumobject/search?images=1&limit=45';
const VA_MUSEUM_IMAGE_LINK          = 'http://media.vam.ac.uk/media/thira/collection_images/';
const START_IMAGE_PREDICTION_URL    = 'prediction';
const UPLOAD_AND_SAVE_IMAGE_DATASET = 'imageDatasetUpload';
const FILE_DOWNLOAD_URL             = "fileDownload";
const IMAGE_MODELS                  = [
	{
		name: "Xception",
		hash: "Xception"
	}, {
		name: "VGG16",
		hash: "VGG16"
	},
	{
		name: "VGG19",
		hash: "VGG19"
	},
	{
		name: "ResNet50",
		hash: "ResNet50"
	},
	{
		name: "InceptionV3",
		hash: "InceptionV3"
	}];
const VA_IMAGE_SIZES                = [
	{
		name: '70px sqaure crop',
		key : 'sImageLink'
	},
	{
		name: '130px sqaure crop',
		key : 'oImageLink'
	},
	{
		name: '177px sqaure crop',
		key : 'wsImageLink'
	},
	{
		name: '265px sqaure crop',
		key : 'wImageLink'
	},
	{
		name: '355px sqaure fit',
		key : 'dsImageLink'
	},
	{
		name: '768x600px best fit',
		key : 'lImageLink'
	},
	{
		name: '768px (max) longest axis',
		key : 'mainImageLink'
	},
];


/**
 * @ngdoc service
 * @name sphereApp.MLAL_CONFIG
 * @description
 * # SPHERE_IMAGE_CONFIG
 * Constant in the sphereApp.
 */



angular.module('sphereApp')
	.constant('SPHERE_IMAGE_CONFIG', {

		version: '0.2.1-SNAPSHOT',

		googleApiKey           : GOOGLE_SEARCH_API_KEY,
		bingPrimaryApiKey      : BING_SEARCH_API_KEY_1,
		bingSecondaryApiKey    : BING_SEARCH_API_KEY_2,
		bingSearchUrl          : BING_SEARCH_QUERY_URL,
		imageModels            : IMAGE_MODELS,
		textModels             : TEXT_MODELS,
		videoModels            : VIDEO_MODELS,
		mainWebServiceUrl      : WEBSERVICE_URL,
		downloadImagesUrl      : RECIEVE_IMAGES,
		getExistingModelsUrl   : GET_MODELS,
		startValidationURL     : START_VALIDATION,
		getImageDatsets        : RECIEVE_IMAGE_DATASET,
		startTrainingUrl       : START_TRAINING,
		vaMuseumObjectSearchUrl: VA_MUSEUM_OBJECT_SEARCH_URL,
		vaMuseumImageBaseLink  : VA_MUSEUM_IMAGE_LINK,
		vaImageSizes           : VA_IMAGE_SIZES,
		startImagePredictionUrl: START_IMAGE_PREDICTION_URL,
		imageDatasetUploadUrl  : UPLOAD_AND_SAVE_IMAGE_DATASET,
		fileDownloadURL        : FILE_DOWNLOAD_URL,
	});
