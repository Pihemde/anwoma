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
	
	Class.prototype.paint = function(context, x, y) {
		if(!this.tileDescr) return;
		draw(this.tileDescr.ground, context, x, y);
		draw(this.tileDescr.building, context, x, y);
	}
	function draw(image, context, x, y) {
		if(!image) return;
		if(!context) return;
		var coord = toRealCoord([x, y]);
		x = coord[0] - 29;// FIXME Il faut sortir ça dans une méthode 
		y = coord[1] + 15;// FIXME Il faut sortir ça dans une méthode 

		x += (SQUARE_WIDTH - image.object.width) * 0.5;
		y -= image.object.height * 0.5 + (image.object.height - SQUARE_HEIGHT) * 0.5;
		context.drawImage(image.object, x, y);
	}

	return Class;
}();

