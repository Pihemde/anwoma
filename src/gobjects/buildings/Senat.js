/**
 * Senat 
 */
var Senat = function() {
	const SET = SETS['roman'];
	
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var Senat = function(gcontext) {
		$sc(this, [gcontext, {width: 5, height: 5}]);
	};
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Senat.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Senat.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	/**
	 * Retrieve painting position
	 */
	Senat.prototype.load = function() {
		return {
			i: this.position.i + 2,
			j: this.position.j + 2
		};
	};
	
	/**
	 * Draw object on canvas
	 */
	Senat.prototype.paint = function() {
		/*
		 * Draw base images
		 */
		this.gcontext.drawImage(SET.SENAT.BASE, this.size, this.position);
	};
		
	return $extends(Senat, GraphicalObject);
}();
