'use strict';

var snooze = require('snooze');

var Value = new snooze.EntityGroup();
Value.type = 'value';
Value.compile = function(entity, entityManager) {
	entity.instance = entity.constructor;
};
Value.registerDependencies = function(entity, entityManager) {};
Value.getInject = function(entity, entityManager) {
	return entity.instance;
};

module.exports = Value;