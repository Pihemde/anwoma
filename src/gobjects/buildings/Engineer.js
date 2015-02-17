/**
 * Engineer
 */
var Engineer = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Engineer(context) {
		GraphicalObject.call(this, context, {width: 1, height: 1});
	};
	Engineer.prototype = Object.create(GraphicalObject.prototype);
	Engineer.prototype.constructor = Engineer;
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Engineer.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Engineer.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	/**
	 * Retrieve painting position
	 */
	Engineer.prototype.load = function() {
		this.animator = new Animator(this.context.gcontext, SET.ENGINEER.ANIMATION, this.size, this.position, {x:-5, y:-35});
		return this.position;
	};
	
	/**
	 * Draw object on canvas
	 */
	Engineer.prototype.paint = function() {
		this.context.gcontext.drawImage(SET.ENGINEER.BASE, this.size, this.position, {x:0, y:0});
		this.animator.play();
	};
	
	return Engineer;
}();
