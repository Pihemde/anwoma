/*
 * Map description
 */
const MAP_SIZE = {width: 25, height:25};
var MAP = [];

// Put some grass in whole map 
for(var i = 0 ; i < MAP_SIZE.width ; i++) {
	for(var j = 0 ; j < MAP_SIZE.height ; j++) {
		MAP.push({clazz: 'grass', position: {i:i, j:j}});
	}
}

MAP.push({clazz: 'granary', position: {i:10, j:10}, good: {type: GOOD_TYPE.WHEAT, quantity: 2}});
MAP.push({
	clazz: 'warehouse', 
	position: {i:15, j:15},
	goods: [
	        {type: GOOD_TYPE.WHEAT, quantity: 4},
	        {type: GOOD_TYPE.FURNITURE, quantity: 3},
	        {type: GOOD_TYPE.WINE, quantity: 4},
	        {type: GOOD_TYPE.MARBLE, quantity: 1},
	        {type: GOOD_TYPE.GRAPE, quantity: 3}
    ]
});
MAP.push({
	clazz: 'farm', 
	position: {i:10, j:15},
	good: {type: GOOD_TYPE.WHEAT, quantity: 4},
});
MAP.push({clazz: 'sign', position: {i:15, j:1}, orientation: ORIENTATION.N});