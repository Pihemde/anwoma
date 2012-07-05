/**
 * Just a bunch of handy tools for mapping
 */
var Map = {};

Map.simple = function(clazz, i, j) {
	MAP.push({clazz: clazz, position: {i:i, j:j}});
};


Map.fillWithGrass = function() {
	for(var i = 0 ; i < MAP_SIZE.width ; i++) {
		for(var j = 0 ; j < MAP_SIZE.height ; j++) {
			MAP.push({clazz: 'Grass', position: {i:i, j:j}});
		}
	}
};

Map.circleWithSigns = function (i, j, m, o) {
	var orientation = setData(o, ORIENTATION.N);
	for(var n = 0 ; n < m ; n++) {
		MAP.push({clazz: 'Sign', position: {i:i+n, j:j-1}, orientation: orientation}); // top
		MAP.push({clazz: 'Sign', position: {i:i-1, j:j+n}, orientation: orientation}); // left
		MAP.push({clazz: 'Sign', position: {i:i+m, j:j+n}, orientation: orientation}); // right
		MAP.push({clazz: 'Sign', position: {i:i+n, j:j+m}, orientation: orientation}); // bottom
	}
};

/*
 * d => 0 : HORIZONTALY, anything but 0: VERTICALY
 */
Map.road = function(begin, end, c2, direction) {
	if(direction == 0) {
		for(var i = begin ; i <= end ; i++) {
			Map.simple('Road', i, c2);
		}
	} else {
		for(var j = begin ; j <= end ; j++) {
			Map.simple('Road', c2, j);
		}
	}
}