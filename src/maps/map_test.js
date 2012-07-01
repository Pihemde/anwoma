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
		MAP.push({clazz: 'Sign', position: {i:i+n, j:j-1}, orientation: ORIENTATION.N}); // top
		MAP.push({clazz: 'Sign', position: {i:i-1, j:j+n}, orientation: ORIENTATION.N}); // left
		MAP.push({clazz: 'Sign', position: {i:i+m, j:j+n}, orientation: ORIENTATION.N}); // right
		MAP.push({clazz: 'Sign', position: {i:i+n, j:j+m}, orientation: ORIENTATION.N}); // bottom
	}
}

MAP.push({
	clazz: 'Farm', 
	position: {i:7, j:2},
	good: {type: GOOD_TYPE.OLIVE, quantity: 3},
});
MAP.push({
	clazz: 'Warehouse', 
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
	clazz: 'Farm', 
	position: {i:13, j:2},
	good: {type: GOOD_TYPE.VEGETABLE, quantity: 2},
});


//MAP.push({clazz: 'granary', position: {i:7, j:5}, good: {type: GOOD_TYPE.WHEAT, quantity: 4}});


MAP.push({clazz: 'Granary', position: {i:10, j:10}, good: {type: GOOD_TYPE.WHEAT, quantity: 2}});
circleWithSigns(10, 10, 3);

MAP.push({
	clazz: 'Farm', 
	position: {i:20, j:8},
	good: {type: GOOD_TYPE.MEAT, quantity: 1},
});
circleWithSigns(20, 8, 3);


MAP.push({
	clazz: 'Warehouse', 
	position: {i:3, j:10},
	goods: [
	        {type: GOOD_TYPE.MEAT, quantity: 4},
	        {type: GOOD_TYPE.WEAPON, quantity: 3},
	        {type: GOOD_TYPE.OLIVE, quantity: 4},
	        {type: GOOD_TYPE.IRON, quantity: 1},
	        {type: GOOD_TYPE.VEGETABLE, quantity: 3}
    ]
});
circleWithSigns(3, 10, 3);


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
circleWithSigns(15, 15, 3);

MAP.push({
	clazz: 'Farm', 
	position: {i:1, j:2},
	good: {type: GOOD_TYPE.MEAT, quantity: 1},
});
circleWithSigns(1, 2, 3);



MAP.push({clazz: 'Library', position: {i:3, j:20}});
circleWithSigns(3, 20, 2);