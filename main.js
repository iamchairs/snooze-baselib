(function() {
	'use strict';

	var snooze = require('snooze');

	snooze.module('snooze-baselib')
		.registerEntityGroupsFromPath('entityGroups/*.js')
		.registerEntitiesFromPath('entities/*.js')
		.registerImportProcessesFromPath('importProcesses/importEntityGroups.js')
		.registerImportProcessesFromPath('importProcesses/importEntities.js')
		.registerConfigPreprocessorsFromPath('configPreprocessors/*.js');
})();