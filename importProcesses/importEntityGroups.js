module.exports = function(processes) {
	return function(source, dest) {
		var entities = source.EntityManager.getEntityGroups();

		for(var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			dest.log(('+ ' + entity.getName()).blue);
			if(dest.EntityManager.entityGroupExists(entity)) {
				dest.warn('Entity Group Exists: ' + entity.getType());
			} else {
				dest.EntityManager.registerEntityGroup(entity);
			}
		}
	};
};