/**
 * Farm
 */
var Farm = function() {
	const SET = SETS['roman'];
	/*
	 * Offsets
	 */
	const OFFSETS = [
		{x : 58, y : -30}, // 2,0
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
	var Farm = function(gcontext) {
		$sc(this, [gcontext, {width: 3, height: 3}]);
	};

	/**
	 * Retrieve a JSON string to save object state
	 */
	Farm.prototype.serialize = function() {
		return {
			position : this.position,
		};
	};

	/**
	 * Set attributes from json object
	 */
	Farm.prototype.unserialize = function(description) {
		this.position = description.position;
		this.good = description.good;
	};

	/**
	 * Retrieve painting position
	 */
	Farm.prototype.load = function() {
		return {
			i: this.position.i + 1,
			j: this.position.j + 1
		};
	};

	/**
	 * Draw object on canvas
	 */
	Farm.prototype.paint = function() {
		/*
		 * Draw base images
		 */
		this.gcontext.drawImage(SET.FARM_BASE, this.size, this.position, {x:0, y:-30}); // 0,0

		/*
		 * Draw goods * stock
		 */
		var image = SET['FARM_' + this.good.type + '_0'];
		if (!!this.good && this.good.quantity > 0) {
			image = SET['FARM_' + this.good.type + '_' + this.good.quantity];
		}
		for ( var i = 0; i < 5; i++) { // Only 5 squares
			this.gcontext.drawImage(image, this.size, this.position, OFFSETS[i]);
		}
	}

	return $extends(Farm, GraphicalObject);
}();
