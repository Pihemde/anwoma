/**
 * Granary 
 */
var Granary = function() { // FIXME Comment on fait pour hériter ?
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext, position) {
		this.gcontext = gcontext;
		this.position = position;
		
		this.stock = 0; // Quantity of goods
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		/*
		 * Draw base images
		 */
		this.gcontext.drawImage(GRANARY_BASE0, this.position);
		this.gcontext.drawImage(GRANARY_BASE1, this.position, {x:1, y:-17});
		
		/*
		 * Draw goods * stock
		 */
/*
		if(stock > 0) {
			this.gcontext.drawImage(GRANARY_STOCK0, this.position, {x:?, y:?});
		}
		if(stock > 1) {
			this.gcontext.drawImage(GRANARY_STOCK1, this.position, {x:?, y:?});
		}
		if(stock > 2) {
			this.gcontext.drawImage(GRANARY_STOCK2, this.position, {x:?, y:?});
		}
		if(stock > 3) {
			this.gcontext.drawImage(GRANARY_STOCK3, this.position, {x:?, y:?});
		}
*/
	};
		
	return Class;
}();
