(function() {
	'use strict';

	var snooze = require('snooze');

	var Service = new snooze.EntityGroup();
	Service.type = 'service';
	Service.compile = function(entity, entityManager) {
		entity.instance = entityManager.run(entity.constructor);

		if(entity.instance) {
			if(entity.instance.$compile) {
				entity.instance.$compile();
			}
		}
	};

	Service.registerDependencies = function(entity) {
		if(typeof entity.constructor === 'function') {
			entity.dependencies = snooze.Util.getParams(entity.constructor);
		} else {
			throw Error('Services expect function constructors. ' + (typeof entity.constructor) + ' given');
		}
	};

	Service.getInject = function(entity) {
		if(entity.instance) {
			if(entity.instance.$get) {
				return entity.instance.$get;
			}
		}

		return entity.instance;
	};

	Service.getConfig = function(entity) {
		if(entity.instance) {
			if(entity.instance.$config) {
				return entity.instance.$config;
			}
		}

		return entity.instance;
	};

	module.exports = Service;
})();