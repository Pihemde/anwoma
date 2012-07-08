/**
 * GovernorMansion 
 */
var GovernorMansion = function() {
	const SET = SETS['roman'];
	
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var GovernorMansion = function(gcontext) {
		$sc(this, [gcontext, {width: 4, height: 4}]);
	};
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	GovernorMansion.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	GovernorMansion.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	/**
	 * Retrieve painting position
	 */
	GovernorMansion.prototype.load = function() {
		return {
			i: this.position.i + 2,
			j: this.position.j + 2
		};
	};
	
	/**
	 * Draw object on canvas
	 */
	GovernorMansion.prototype.paint = function() {
		/*
		 * Draw base images
		 */
		this.gcontext.drawImage(SET.GOVERNOR_MANSION, this.size, this.position);
	};
		
	return $extends(GovernorMansion, GraphicalObject);
}();
