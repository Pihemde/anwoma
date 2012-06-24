/**
 * Granary 
 */
var Granary = function() { // FIXME Comment on fait pour hériter ?
	/**
	 * Constructor
	 * @param map ?
	 * @param context a canvas 2D context
	 * @param tile object description. Include image to paint, size, flags (buildable, destructible, ...), lifecycle rules.
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(map, context, tile, position) {
		this.map = map;
		this.context = context;
		this.tile = tile;
		this.position = position;
		
		this.stock = 0; // Quantity of goods
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		var c = this.getRealPosition();
		
		// Draw base images
		this.context.drawImage(this.tile.src.base0, c.x, c.y); // FIXME les différentes images doivent-être correctement alignées
		this.context.drawImage(this.tile.src.base0, c.x, c.y);
		
		// Draw goods * stock
		
	};
		
	return Class;
}();