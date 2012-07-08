/**
 * Lion
 */
var Lion = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var Lion = function(gcontext) {
		$sc(this, [gcontext, {width: 1, height: 1}]);
		this.counter = 0;
	};
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Lion.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Lion.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	/**
	 * Retrieve painting position
	 */
	Engineer.prototype.load = function() {
		this.animator = new Animator(this.gcontext, SET, this.size, this.position);
		this.animator.initIds('LION_E_', 11);
		return this.position;
	};
	
	/**
	 * Draw object on canvas
	 */
	Lion.prototype.paint = function() {
		this.animator.paint();
	};
	
	return $extends(Lion, GraphicalObject);
}();
