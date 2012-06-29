/**
 * Farm
 */
var Farm = function() { // FIXME Comment on fait pour hériter ?
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
	 * @param gcontext
	 *            the graphical context
	 * @param position
	 *            absolute position object instance on the game board (first :
	 *            0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
		this.size = {
			width : 3,
			height : 3
		};
	};

	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
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
		this.good = description.good;
	};

	return Class;
}();
