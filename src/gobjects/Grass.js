/**
 * Grass 
 */
var Grass = function() { // FIXME Comment on fait pour hériter ?
	/**
	 * Constructor
	 * @param map ?
	 * @param context a canvas 2D context
	 * @param tile object description. Include image to paint, size, flags (buildable, destructible, ...), lifecycle rules.
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(map, context, position) {
		this.map = map;
		this.context = context;
		this.position = position;
		this.image = $i(GRASS1);
		this.coordinate = map.toPixels(this.position);
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		var x = this.coordinate.x - SQUARE_WIDTH / 2 * map.zoom;// FIXME Il faut sortir ça dans une méthode 
		var y = this.coordinate.y + SQUARE_HEIGHT / 2;// FIXME Il faut sortir ça dans une méthode 

		x += (SQUARE_WIDTH - this.image.width) * 0.5;
		y -= this.image.height * 0.5 + (this.image.height - SQUARE_HEIGHT) * 0.5;
		
		this.context.drawImage(this.image, x, y);
	};
		
	return Class;
}();