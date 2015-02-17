/**
 * Prefecture
 */
var Prefecture = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Prefecture(context) {
		GraphicalObject.call(this, context, {width: 3, height: 3});
		this.counter = 0;
	};
	Prefecture.prototype = Object.create(GraphicalObject.prototype);
	Prefecture.prototype.constructor = Prefecture;
	
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
		this.animator = new Animator(this.context.gcontext, SET.PREFECTURE.ANIMATION, this.size, this.position, {x:5, y:-27});
		return this.position;
	};
	
	/**
	 * Draw object on canvas
	 */
	Prefecture.prototype.paint = function() {
		this.context.gcontext.drawImage(SET.PREFECTURE.BASE, this.size, this.position, {x:0, y:0});
		this.animator.play();
	};
	
	return Prefecture;
}();
