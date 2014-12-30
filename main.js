var snooze = require('snooze');

snooze.module('snooze-baselib')
	.registerEntityGroupsFromPath('./lib/entities/*.js');
	.registerEntitiesFromPath('./lib/services/*.js');
	.registerImportProcessesFromPath('./lib/importProcesses/*.js');