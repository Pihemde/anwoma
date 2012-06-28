/*
 * Map description
 */
var MAP = [];

// Put some grass in whole map 
for(var i = 0 ; i < MAP_SIZE ; i++) {
	for(var j = 0 ; j < MAP_SIZE ; j++) {
		MAP.push({clazz: 'grass', position: {i:i, j:j}});
	}
}

MAP.push({clazz: 'granary', position: {i:2, j:2}, stock: 0});
MAP.push({clazz: 'sign', position: {i:15, j:1}, orientation: ORIENTATION.N});