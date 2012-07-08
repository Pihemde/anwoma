/**
 * Library 
 */
var Library = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var Library = function(gcontext) {
		$sc(this, [gcontext, {width: 2, height: 2}]);
	};
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Library.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Library.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	/**
	 * Retrieve painting position
	 */
	Library.prototype.load = function() {
		return {
			i: this.position.i + 1,
			j: this.position.j + 1
		};
	};
	
	/**
	 * Draw object on canvas
	 */
	Library.prototype.paint = function() {
		this.gcontext.drawImage(SET.LIBRARY, this.size, this.position);
	};

	return $extends(Library, GraphicalObject);
}();
