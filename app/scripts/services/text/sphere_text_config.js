'use strict';
/**
 * @ngdoc service
 * @name sphereApp.SPHERE_TEXT_CONFIG
 * @description
 * SPHERE_TEXT_CONFIG
 * Constant in the sphereApp.
 */

const COLOR_CODES_FOR_WORKFLOW_TYPES = {
	'gs': '#061E78',
	'lr': '#FF5B00',
	'cf': '#1B7007',
	'fe': '#FF5B00',
	'cw': '#1B7007'
};
const LINE_SEPARATORS                = [
	'||',
	',',
	'$$',
	'!!'
];
const MAIN_API_URL                   = 'http://localhost:5001/sphere/api/v1/text/';
const CREATE_WORKFLOW_URL            = 'resources/workflows';
const GET_AVAILABLE_RESOURCES        = 'resources';
const GET_AVAILABLE_CLASSIFIERS      = 'resources/classifiers';
const START_ANNOTATION_URL           = 'performAnnotations';
const PREDICTION_WORKFLOW_URL        = "workflow/";
const PREDICTION_URL                 = "/predict";
const SAVE_ANNOTATED_DATA_URL        = "saveAnnotatedDataset";
const GET_ALL_TEXT_DATASETS          = "getDatasets";
const FILE_DOWNLAOD_URL              = "fileDownload";
const GOLD_STANDARDS_DOWNLOAD_PATH   = "/libraries/text_classification/backend/data/resources/all_gold_standards.tar.bz2";
const LEXICONS_SAVE_URK              = "addLexicon";
const LEXICONS_GET_URL               = "getLexicons";
const SAVE_DATASET                   = "datasetCreation";
const BING_SEARCH_TEXT_API_KEY_1 = 'cbef8dcd73e9434d88fc9a9d654e8a1a';
const BING_SEARCH_TEXT_API_KEY_2 = '11eaa4c46156475487b44f8b9a2f1b8f';

const RESOURCE_TYPES = {
	gs: 'gold_standard',
	fe: 'feature_extraction',
	cf: 'classifier',
	lr: 'language_resource',
	cw: 'custom_workflow',
};

angular.module('sphereApp')
	.constant('SPHERE_TEXT_CONFIG', {

		version                    : '0.1',
		colorSchemes               : COLOR_CODES_FOR_WORKFLOW_TYPES,
		apiBaseUrl                 : MAIN_API_URL,
		getAvailableResourcesUrl   : GET_AVAILABLE_RESOURCES,
		workflowUrl                : CREATE_WORKFLOW_URL,
		resourceTypes              : RESOURCE_TYPES,
		predictionURl              : PREDICTION_URL,
		predictionWorkflowUrl      : PREDICTION_WORKFLOW_URL,
		getAvailableClassifiersUrl : GET_AVAILABLE_CLASSIFIERS,
		startAnnotationsUrl        : START_ANNOTATION_URL,
		lineSeparators             : LINE_SEPARATORS,
		bingPrimaryApiKey          : BING_SEARCH_TEXT_API_KEY_1,
		bingSecondaryApiKey        : BING_SEARCH_TEXT_API_KEY_2,
		saveAnnoatedDatasetUrl     : SAVE_ANNOTATED_DATA_URL,
		getAllTextGoldStandards    : GET_ALL_TEXT_DATASETS,
		allGoldStandardsDownloadURL: GOLD_STANDARDS_DOWNLOAD_PATH,
		fileDownloadURL            : FILE_DOWNLAOD_URL,
		addLexiconUrl              : LEXICONS_SAVE_URK,
		saveGoldStandardUrl        : SAVE_DATASET,
		getLexiconsLink            : LEXICONS_GET_URL,
	});


