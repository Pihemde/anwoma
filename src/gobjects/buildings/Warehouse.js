/**
 * Warehouse
 */
var Warehouse = function() {
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
	 * @param gcontext the graphical context
	 */
	var Warehouse = function(gcontext) {
		$sc(this, [gcontext, {width: 3, height: 3}]);
	};

	/**
	 * Retrieve a JSON string to save object state
	 */
	Warehouse.prototype.serialize = function() {
		return {
			position : this.position
		};
	};

	/**
	 * Set attributes from json object
	 */
	Warehouse.prototype.unserialize = function(description) {
		this.position = description.position;
		this.goods = description.goods;
	};

	/**
	 * Retrieve painting position
	 */
	Warehouse.prototype.load = function() {
		return {
			i: this.position.i + 1,
			j: this.position.j + 1
		};
	};

	/**
	 * Draw object on canvas
	 */
	Warehouse.prototype.paint = function() {
		/*
		 * Draw base images
		 */
		this.gcontext.drawImage(SET.WAREHOUSE.BASE, this.size, this.position, {x : 0,y : -60}); // 0,0
		this.gcontext.drawImage(SET.WAREHOUSE.ROOF, this.size, this.position, {x : 0,y : -70});

		/*
		 * Draw goods * stock
		 */
		for ( var i = 0; i < 8; i++) { // Only 8 squares
			this.paintSquare(this.goods[i], OFFSETS[i]);
		}
	};

	Warehouse.prototype.paintSquare = function(good, offset) {
		var image = SET.WAREHOUSE.BASE;
		if (!!good && good.quantity > 0) {
			image = SET.WAREHOUSE[good.type][good.quantity-1];
		}
		this.gcontext.drawImage(image, this.size, this.position, offset);
	}

	return $extends(Warehouse, GraphicalObject);
}();
