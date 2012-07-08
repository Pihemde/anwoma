/**
 * Dummy
 */
var Dummy = function() {
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var Dummy = function(position) {
		this.size = {width: 1, height: 1};
		this.position = position;
	};

	/**
	 * Retrieve painting position
	 */
	Dummy.prototype.load = function() {
		return this.position;
	};
	
	/**
	 * Draw object on canvas
	 */
	Dummy.prototype.paint = function() {
		//
	};
	
	return $extends(Dummy, GraphicalObject);
}();
