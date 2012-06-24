var TERRAINS = {
	herbe1: {
		src: 'terrains/Land1a_00002.png',
		width: 1,
		height: 1
	},
	herbe2 :{
		src: 'terrains/Land1a_00003.png',
		width: 1,
		height: 1
	},
	herbe3: {
		src: 'terrains/Land1a_00004.png',
		width: 1,
		height: 1
	}
};

var BUILDINGS = {
	panneau1: {
		src: 'terrains/land3a_00092.png',
		width: 1,
		height: 1,
		deletable: true
	},
	rocher1: {
		src: 'terrains/land3a_00083.png',
		width: 3,
		height: 3,
		deletable: false
	},
	grenier: {
		src: 'grenier/grenier-plein.png',
		width: 3,
		height: 3,
		deletable: true
	}	
};


var Tile = function() {
	var Class = function(tileDescr) {
		this.tileDescr = tileDescr;
	}
	
	Class.prototype.paint = function(map, x, y) {
		if(!this.tileDescr) return;
		draw(this.tileDescr.ground, map, x, y);
		draw(this.tileDescr.building, map, x, y);
	}
	function draw(image, map, x, y) {
		if(!image) return;
		if(!map) return;
		var coord = map.toRealCoord([x, y]);
		x = coord[0] - SQUARE_WIDTH /2*map.zoom;// FIXME Il faut sortir ça dans une méthode 
		y = coord[1] + SQUARE_HEIGHT/2;// FIXME Il faut sortir ça dans une méthode 

		x += (SQUARE_WIDTH - image.object.width) * 0.5;
		y -= image.object.height * 0.5 + (image.object.height - SQUARE_HEIGHT) * 0.5;
		map.context.drawImage(image.object, x, y, image.object.width*map.zoom, image.object.height*map.zoom);
	}

	return Class;
}();

