/**
 * Mountain 
 */
var Mountain = function() {
	const SET = SETS['roman'];
	
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var Mountain = function(gcontext) {
		$sc(this, [gcontext, {width: 3, height: 3}]);
	};
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Mountain.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Mountain.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	/**
	 * Retrieve painting position
	 */
	Mountain.prototype.load = function() {
		return {
			i: this.position.i + 1,
			j: this.position.j + 1
		};
	};
	
	/**
	 * Draw object on canvas
	 */
	Mountain.prototype.paint = function() {
		this.gcontext.drawImage(SET.MOUNTAIN_0, this.size, this.position);
	};
		
	return $extends(Mountain, GraphicalObject);
}();
