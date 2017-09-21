'use strict';

/**
 * @ngdoc service
 * @name sphereApp.workflowInterchange
 * @description
 * # sphere/text/workflowInterchange
 * Service in the sphereApp.
 */
angular.module('sphereApp')
  .service('workflowInterchange', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
		let workflows = [];
		let addWorkflow = function (workflowName) {
			workflows.push(workflowName);
		};

		let getWorkflows = function () {
			return workflows;
		};

		return {
			addWorkflow: addWorkflow,
			getWorkflows: getWorkflows
		};

  });
