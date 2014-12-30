var snooze = require('snooze');

var Service = new snooze.EntityGroup();
Service.type = 'service';
Service.compile = function(entity) {
	entity.instance = run(entity.constructor);

	if(entity.$compile) {
		entity.instance.$compile();
	}
};
Service.registerDependencies = function(entity) {
	if(typeof entity.constructor === 'function') {
		entity.dependencies = Util.getParams(entity.constructor);
	} else {
		throw Error('Services expect function constructors. ' + (typeof entity.constructor) + ' given');
	}
};
Service.getInject = function(entity) {
	if(entity.instance.$get) {
		return entity.instance.$get;
	}

	return entity.instance;
};

module.exports = Service;