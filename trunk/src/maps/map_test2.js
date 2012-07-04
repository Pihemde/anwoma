/*
 * Map description
 */
const MAP_SIZE = {width: 25, height:25};
var MAP = [];

// Put some grass in whole map 
for(var i = 0 ; i < MAP_SIZE.width ; i++) {
	for(var j = 0 ; j < MAP_SIZE.height ; j++) {
		MAP.push({clazz: 'Grass', position: {i:i, j:j}});
	}
}


function circleWithSigns(i, j, m) {
	for(var n = 0 ; n < m ; n++) {
		MAP.push({clazz: 'Sign', position: {i:i+n, j:j-1}, orientation: ORIENTATION.E}); // top
		MAP.push({clazz: 'Sign', position: {i:i-1, j:j+n}, orientation: ORIENTATION.E}); // left
		MAP.push({clazz: 'Sign', position: {i:i+m, j:j+n}, orientation: ORIENTATION.E}); // right
		MAP.push({clazz: 'Sign', position: {i:i+n, j:j+m}, orientation: ORIENTATION.E}); // bottom
	}
}

MAP.push({clazz: 'Senat', position: {i:2, j:2}});
circleWithSigns(2, 2, 5);

MAP.push({clazz: 'Road', position: {i:5, j:20}});
MAP.push({clazz: 'Road', position: {i:6, j:20}});
MAP.push({clazz: 'Road', position: {i:7, j:20}});
MAP.push({clazz: 'Road', position: {i:8, j:20}});
MAP.push({clazz: 'Road', position: {i:9, j:20}});
MAP.push({clazz: 'Road', position: {i:9, j:19}});
MAP.push({clazz: 'Road', position: {i:9, j:18}});
MAP.push({clazz: 'Road', position: {i:10, j:18}});


MAP.push({clazz: 'Road', position: {i:7, j:19}});
MAP.push({clazz: 'Road', position: {i:7, j:21}});
MAP.push({clazz: 'Road', position: {i:7, j:22}});
MAP.push({clazz: 'Road', position: {i:6, j:22}});


MAP.push({clazz: 'GovernorMansion', position: {i:15, j:2}});
circleWithSigns(15, 2, 4)


MAP.push({clazz: 'Prefecture', position: {i:8, j:8}});
MAP.push({clazz: 'Engineer', position: {i:10, j:8}});


MAP.push({
	clazz: 'Farm', 
	position: {i:12, j:12},
	good: {type: GOOD_TYPE.FRUIT, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:15, j:12},
	good: {type: GOOD_TYPE.MEAT, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:18, j:12},
	good: {type: GOOD_TYPE.WHEAT, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:12, j:15},
	good: {type: GOOD_TYPE.VEGETABLE, quantity: 3},
});
MAP.push({
	clazz: 'Warehouse', 
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
	clazz: 'Farm', 
	position: {i:18, j:15},
	good: {type: GOOD_TYPE.VEGETABLE, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:12, j:18},
	good: {type: GOOD_TYPE.WHEAT, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:15, j:18},
	good: {type: GOOD_TYPE.OLIVE, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:18, j:18},
	good: {type: GOOD_TYPE.FRUIT, quantity: 3},
});