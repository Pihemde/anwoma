function setData(value, defaultValue) {
	if(undefined == value && undefined != defaultValue) {
		return defaultValue;
	}
	return value;
}

/**
 * GraphicalObject is parent class of all object that's will be paint.
 */
var GraphicalObject = function() {
	/**
	 * Constructor
	 * @param map ?
	 * @param context a canvas 2D context
	 * @param tile object description. Include image to paint, size, flags (buildable, destructible, ...), lifecycle rules.
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext, position) {
		this.map = map;
		this.gcontext = gcontext;
		this.tile = tile;
		this.position = position;
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		var t = this.tile;
		var c = this.getRealPosition();
		
		if(t.src instanceof Array) {
			for(var layer = 0 ; layer < t.src.lenght ; layer++) {
				this.gcontext.drawImage(t.src[layer], c.x, c.y);
			}
		} else {
			// Only one image to draw
			this.gcontext.drawImage(t.src, c.x, c.y);
		}

	};
	
	/**
	 * Return true if something can be build on it
	 */
	Class.prototype.isBuildable = function() {
		return this.tile.buildable;
	};
	
	/**
	 * Return true if it can be destroy
	 */
	Class.prototype.isDestructible = function() {
		return this.tile.destructible;
	};
		
	return Class;
}();
