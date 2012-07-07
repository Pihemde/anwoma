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
		$sc(this, [gcontext, {width: 3, height: 3}]);
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function(p) {
		if(this.position.i + 1 == p.i && this.position.j + 1 == p.j) {
			
			/*
			 * Draw base images
			 */
			this.gcontext.drawImage(SET.GRANARY_BASE_0, this.size, this.position);
			this.gcontext.drawImage(SET.GRANARY_BASE_1, this.size, this.position, {x:1, y:-17});
			
			/*
			 * Draw goods * stock
			 */
	
			if(this.good.quantity > 0) {
				this.gcontext.drawImage(SET.GRANARY_STOCK_0, this.size, this.position, {x:-40, y:-63});
			}
			if(this.good.quantity > 1) {
				this.gcontext.drawImage(SET.GRANARY_STOCK_1, this.size, this.position, {x:-15, y:-58});
			}
			if(this.good.quantity > 2) {
				this.gcontext.drawImage(SET.GRANARY_STOCK_2, this.size, this.position, {x:20, y:-58});
			}
			if(this.good.quantity > 3) {
				this.gcontext.drawImage(SET.GRANARY_STOCK_3, this.size, this.position, {x:45, y:-65});
			}
		}
	};
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.serialize = function() {
		return {
			position: this.position,
			good: this.good
		};
	};
	
	/*
	 * Set attributes from json object
	 */
	Class.prototype.unserialize = function(description) {
		this.position = description.position;
		this.good = setData(description.good, {type: GOOD_TYPE.WHEAT, quantity: 0});
		this.fake = setData(description.fake, undefined);
	};
		
	return $extends(Class, GraphicalObject);
}();
