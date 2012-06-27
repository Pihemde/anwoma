/**
 * Granary 
 */
var Granary = function() { // FIXME Comment on fait pour hériter ?
	const SIZE = {width: 3, height: 3};

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		/*
		 * Draw base images
		 */
		this.gcontext.drawImage(IMAGES.GRANARY_BASE0, SIZE, this.position);
		this.gcontext.drawImage(IMAGES.GRANARY_BASE1, SIZE, this.position, {x:1, y:-17});
		
		/*
		 * Draw goods * stock
		 */
/*
		if(stock > 0) {
			this.gcontext.drawImage(IMAGES.GRANARY_STOCK0, SIZE, this.position, {x:?, y:?});
		}
		if(stock > 1) {
			this.gcontext.drawImage(IMAGES.GRANARY_STOCK1, SIZE, this.position, {x:?, y:?});
		}
		if(stock > 2) {
			this.gcontext.drawImage(IMAGES.GRANARY_STOCK2, SIZE, this.position, {x:?, y:?});
		}
		if(stock > 3) {
			this.gcontext.drawImage(IMAGES.GRANARY_STOCK3, SIZE, this.position, {x:?, y:?});
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
	Class.prototype.unserialize = function(datas) {
		this.position = datas.position;
		this.stock = setData(datas.stock, 0);
	};
		
	return Class;
}();
