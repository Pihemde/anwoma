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
	var Class = function(map, context, position) {
		this.map = map;
		this.context = context;
		this.position = position;
		
		this.stock = 0; // Quantity of goods
		
		this.base0 = $i(GRANARY_BASE0);
		this.base1 = $i(GRANARY_BASE1);
		this.coordinate = map.toPixels(this.position);
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		var x = this.coordinate.x - SQUARE_WIDTH / 2 * map.zoom;// FIXME Il faut sortir ça dans une méthode 
		var y = this.coordinate.y + SQUARE_HEIGHT / 2;// FIXME Il faut sortir ça dans une méthode 

		x += (SQUARE_WIDTH - this.base0.width) * 0.5;
		y -= this.base0.height * 0.5 + (this.base0.height - SQUARE_HEIGHT) * 0.5;

		/*
		 * Draw base images
		 */
		this.context.drawImage(this.base0, x, y); // FIXME les différentes images doivent-être correctement alignées
		this.context.drawImage(this.base1, x+28, y-64);
		
		/*
		 * Draw goods * stock
		 */
/*
		if(stock > 0) {
			this.context.drawImage(this.src.stock0, c.x, c.y);
		}
		if(stock > 1) {
			this.context.drawImage(this.src.stock1, c.x, c.y);
		}
		if(stock > 2) {
			this.context.drawImage(this.src.stock2, c.x, c.y);
		}
		if(stock > 3) {
			this.context.drawImage(this.src.stock3, c.x, c.y);
		}
*/
	};
		
	return Class;
}();