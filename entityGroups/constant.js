(function() {
	'use strict';

	var snooze = require('snooze');

	var Constant = new snooze.EntityGroup();
	Constant.type = 'constant';
	Constant.constant = true;
	Constant.compile = function(entity, entityManager) {
		entity.instance = entity.constructor;
	};
	Constant.registerDependencies = function(entity, entityManager) {};
	Constant.getInject = function(entity, entityManager) {
		if(typeof entity.instance === 'function') {
			return entity.instance;
		} else {
			return JSON.parse(JSON.stringify(entity.instance));
		}
	};

	module.exports = Constant;
})();