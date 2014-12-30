module.exports = function(processes) {
	return function(source, dest) {
		var entities = source.EntityManager.getEntities();

		for(var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			dest.log(('+ ' + entity.getName()).blue);
			if(dest.EntityManager.entityExists(entity)) {
				dest.warn('Entity Exists: ' + entity.getName());
			} else {
				dest.EntityManager.registerEntity(Entity);
			}
		}
	};
};