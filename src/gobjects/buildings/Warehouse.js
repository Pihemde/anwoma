/**
 * Warehouse
 */
var Warehouse = function() { // FIXME Comment on fait pour hériter ?
	const SET = SETS['roman'];
	/*
	 * offsets
	 */
	const OFFSETS = [
		{x : 29, y : -45}, // 1,0
		{x : 58, y : -30}, // 2,0
		{x : -29, y : -45}, // 0,1
		{x : 0, y : -30}, // 1,1
		{x : 29, y : -15}, // 1,2
		{x : -58, y : -30}, // 0,0
		{x : -29, y : -15}, // 1,0
		{x : 0, y : 0} // 2,0
	];
	
	/**
	 * Constructor
	 * 
	 * @param gcontext
	 *            the graphical context
	 * @param position
	 *            absolute position object instance on the game board (first :
	 *            0,0 ; second 1,0 ; ...)
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
			this.gcontext.drawImage(SET.WAREHOUSE_BASE, this.size, this.position, {x : 0,y : -60}); // 0,0
			this.gcontext.drawImage(SET.WAREHOUSE_ROOF, this.size, this.position, {x : 0,y : -70});
	
			/*
			 * Draw goods * stock
			 */
			for ( var i = 0; i < 8; i++) { // Only 8 squares
				this.paintSquare(this.goods[i], OFFSETS[i]);
			}
		}
	};

	Class.prototype.paintSquare = function(good, offset) {
		var image = SET.WAREHOUSE_BASE;
		if (!!good && good.quantity > 0) {
			image = SET['WAREHOUSE_' + good.type + '_' + good.quantity];
		}
		this.gcontext.drawImage(image, this.size, this.position, offset);
	}

	/*
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.serialize = function() {
		return {
			position : this.position,
		};
	};

	/*
	 * Set attributes from json object
	 */
	Class.prototype.unserialize = function(description) {
		this.position = description.position;
		this.goods = description.goods;
	};

	return $extends(Class, GraphicalObject);
}();
