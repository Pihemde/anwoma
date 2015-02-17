/**
 * Lion
 */
var Lion = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Lion(context) {
		Character.call(this, context);
		this.counter = 0;
	};
	Lion.prototype = Object.create(Character.prototype);
	Lion.prototype.constructor = Lion;
	
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
		this.animator = new Animator(this.context.gcontext, SET['LION_E'], this.size, this.position, {x:-20, y:-20}, true);
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
		this.counter = (this.counter+1)%SET['LION_E'].length;
		if(this.counter == 0) {
			this.position.i++;
		}
	};
	
	return Lion;
}();
