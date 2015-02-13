/**
 * GraphicalContext 
 */
var Tile = function() {

	/**
	 * Constructor
	 */
	var Tile = function() {
		this.gObject = undefined;
		this.characters = [];
	};

	Tile.prototype.activate = function() {
		if(!!this.gObject) {
			this.gObject.activate();
		}
	}

	Tile.prototype.paint = function(position) {
		var p = {
				i: this.gObject.position.i,
				j: this.gObject.position.j
		}
		p.i += Math.floor((this.gObject.size.width-1)/2);
		p.j += Math.floor((this.gObject.size.height-1)/2);
		if(!!this.gObject && p.i == position.i && p.j == position.j) {
			this.gObject.paint();
		}
		for(var n=0; n<this.characters.length; n++) {
			this.characters[n].paint();
		}
	}

	return Tile;
}();
