var snooze = require('snooze');

snooze.module('snooze-baselib')
	.registerEntityGroupsFromPath('entities/*.js')
	.registerEntitiesFromPath('services/*.js')
	.registerImportProcessesFromPath('importProcesses/importEntityGroups.js')
	.registerImportProcessesFromPath('importProcesses/importEntities.js');