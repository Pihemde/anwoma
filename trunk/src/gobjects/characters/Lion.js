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
	Lion.prototype.load = function() {
		this.animator = new Animator(this.gcontext, SET, this.size, this.position, {x:-20, y:-20}, {x:3, y:2});
		this.animator.initIds('LION_E_', 12);
		return this.position;
	};
	
	Lion.prototype.activate = function() {
		return this.position;
	}
	
	/**
	 * Draw object on canvas
	 */
	Lion.prototype.paint = function() {
		this.animator.play();
		if(this.animator.id == 0) {
			this.position.i++;
		}
	};
	
	return $extends(Lion, GraphicalObject);
}();
