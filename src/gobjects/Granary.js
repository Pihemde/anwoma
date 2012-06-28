/**
 * Granary 
 */
var Granary = function() { // FIXME Comment on fait pour hériter ?
	const SET = SETS['roman'];
	
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
		this.size = {width: 3, height: 3};
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		/*
		 * Draw base images
		 */
		this.gcontext.drawImage(SET.GRANARY_BASE0, this.size, this.position);
		this.gcontext.drawImage(SET.GRANARY_BASE1, this.size, this.position, {x:1, y:-17});
		
		/*
		 * Draw goods * stock
		 */
/*
		if(stock > 0) {
			this.gcontext.drawImage(SET.GRANARY_STOCK0, this.size, this.position, {x:?, y:?});
		}
		if(stock > 1) {
			this.gcontext.drawImage(SET.GRANARY_STOCK1, this.size, this.position, {x:?, y:?});
		}
		if(stock > 2) {
			this.gcontext.drawImage(SET.GRANARY_STOCK2, this.size, this.position, {x:?, y:?});
		}
		if(stock > 3) {
			this.gcontext.drawImage(SET.GRANARY_STOCK3, this.size, this.position, {x:?, y:?});
		}
*/
	};
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.serialize = function() {
		return {
			position: this.position,
			stock: this.stock
		};
	};
	
	/*
	 * Set attributes from json object
	 */
	Class.prototype.unserialize = function(description) {
		this.position = description.position;
		this.stock = setData(description.stock, 0);
	};
		
	return Class;
}();
