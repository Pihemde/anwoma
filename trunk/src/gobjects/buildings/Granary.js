/**
 * Granary 
 */
var Granary = function() {
	const SET = SETS['roman'];
	
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Granary(context) {
		GraphicalObject.call(this, context, {width: 3, height: 3});
	};
	Granary.prototype = Object.create(GraphicalObject.prototype);
	Granary.prototype.constructor = Granary;
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Granary.prototype.serialize = function() {
		return {
			position: this.position,
			good: this.good
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Granary.prototype.unserialize = function(description) {
		this.position = description.position;
		this.good = setData(description.good, {type: GOOD_TYPE.WHEAT, quantity: 0});
	};

	/**
	 * Retrieve painting position
	 */
	Granary.prototype.load = function() {
		return {
			i: this.position.i + 1,
			j: this.position.j + 1
		};
	};
	
	/**
	 * Draw object on canvas
	 */
	Granary.prototype.paint = function() {
		/*
		 * Draw base images
		 */
		this.context.gcontext.drawImage(SET.GRANARY.BASE[0], this.size, this.position);
		this.context.gcontext.drawImage(SET.GRANARY.BASE[1], this.size, this.position, {x:1, y:-17});
		
		/*
		 * Draw goods * stock
		 */

		if(this.good.quantity > 0) {
			this.context.gcontext.drawImage(SET.GRANARY.STOCK[0], this.size, this.position, {x:-40, y:-63});
		}
		if(this.good.quantity > 1) {
			this.context.gcontext.drawImage(SET.GRANARY.STOCK[1], this.size, this.position, {x:-15, y:-58});
		}
		if(this.good.quantity > 2) {
			this.context.gcontext.drawImage(SET.GRANARY.STOCK[2], this.size, this.position, {x:20, y:-58});
		}
		if(this.good.quantity > 3) {
			this.context.gcontext.drawImage(SET.GRANARY.STOCK[3], this.size, this.position, {x:45, y:-65});
		}
	};
		
	return Granary;
}();
