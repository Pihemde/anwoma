/**
 * Character
 */
var Character = function() {

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Character(context) {
		GraphicalObject.call(this, context, {width: 1, height: 1});
		this.counter = 0;
		this.context.eventManager.addEventListener(EventManager.EVENT_TYPE.PAINT, this.paint, this);
	};
	Character.prototype = Object.create(GraphicalObject.prototype);
	Character.prototype.constructor = Character;
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Character.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Character.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	Character.prototype.activate = function() {
		return this.position;
	}

	return Character;
}();
