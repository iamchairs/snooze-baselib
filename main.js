(function() {
	'use strict';

	var snooze = require('snooze');

	snooze.module('snooze-baselib')
		.registerEntityGroupsFromPath('entityGroups/*.js')
		.registerEntitiesFromPath('entities/*.js')
		.registerImportProcessesFromPath('importProcesses/*.js')
		.registerConfigPreprocessorsFromPath('configPreprocessors/*.js');
})();