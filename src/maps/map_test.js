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


MAP.push({
	clazz: 'farm', 
	position: {i:7, j:2},
	good: {type: GOOD_TYPE.OLIVE, quantity: 3},
});
MAP.push({
	clazz: 'warehouse', 
	position: {i:10, j:2},
	goods: [
	        {type: GOOD_TYPE.MEAT, quantity: 4},
	        {type: GOOD_TYPE.WEAPON, quantity: 3},
	        {type: GOOD_TYPE.OLIVE, quantity: 4},
	        {type: GOOD_TYPE.IRON, quantity: 1},
	        {type: GOOD_TYPE.VEGETABLE, quantity: 3}
    ]
});
MAP.push({
	clazz: 'farm', 
	position: {i:13, j:2},
	good: {type: GOOD_TYPE.VEGETABLE, quantity: 2},
});


//MAP.push({clazz: 'granary', position: {i:7, j:5}, good: {type: GOOD_TYPE.WHEAT, quantity: 4}});


MAP.push({clazz: 'sign', position: {i:10, j:9}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:11, j:9}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:12, j:9}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:9, j:10}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:9, j:11}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:9, j:12}, orientation: ORIENTATION.N});
MAP.push({clazz: 'granary', position: {i:10, j:10}, good: {type: GOOD_TYPE.WHEAT, quantity: 2}});
MAP.push({clazz: 'sign', position: {i:10, j:13}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:11, j:13}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:12, j:13}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:13, j:10}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:13, j:11}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:13, j:12}, orientation: ORIENTATION.N});




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
	position: {i:1, j:2},
	good: {type: GOOD_TYPE.MEAT, quantity: 1},
});
MAP.push({clazz: 'sign', position: {i:1, j:1}, orientation: ORIENTATION.N});



MAP.push({clazz: 'sign', position: {i:3, j:19}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:4, j:19}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:2, j:19}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:2, j:20}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:2, j:21}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:2, j:22}, orientation: ORIENTATION.N});
MAP.push({clazz: 'library', position: {i:3, j:20}});
MAP.push({clazz: 'sign', position: {i:3, j:22}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:4, j:22}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:5, j:19}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:5, j:20}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:5, j:21}, orientation: ORIENTATION.N});
MAP.push({clazz: 'sign', position: {i:5, j:22}, orientation: ORIENTATION.N});