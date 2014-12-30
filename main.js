var snooze = require('snooze');

snooze.module('snooze-baselib')
	.registerEntityGroupsFromPath('entities/*.js')
	.registerEntitiesFromPath('services/*.js')
	.registerImportProcessesFromPath('importProcesses/*.js');