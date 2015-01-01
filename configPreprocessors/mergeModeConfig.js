(function() {
	'use strict';

	module.exports = function(processes) {
		return function(config, module) {
			var mode = config.mode;
			if(mode) {
				if(config.modes[mode]) {
					for(var key in config.modes[mode]) {
						config[key] = config.modes[mode][key];
					}
				}
			}
		};
	};
})();