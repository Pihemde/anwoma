/**
 * Prefecture
 */
var Prefecture = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var Prefecture = function(gcontext) {
		$sc(this, [gcontext, {width: 1, height: 1}]);
		this.counter = 0;
	};
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Prefecture.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Prefecture.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	/**
	 * Retrieve painting position
	 */
	Prefecture.prototype.load = function() {
		this.animator = new Animator(this.gcontext, SET, this.size, this.position, {x:5, y:-27});
		this.animator.initIds('PREFECTURE_ANIMATION_', 9);
		return this.position;
	};
	
	/**
	 * Draw object on canvas
	 */
	Prefecture.prototype.paint = function() {
		this.gcontext.drawImage(SET.PREFECTURE_BASE, this.size, this.position, {x:0, y:0});
		this.animator.play();
	};
	
	return $extends(Prefecture, GraphicalObject);
}();
