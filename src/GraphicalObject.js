/**
 * GraphicalObject is parent class of all object that's will be paint.
 */
var GraphicalObject = function() {
	/**
	 * Constructor
	 * @param map ?
	 * @param context a canvas 2D context
	 * @param tile object description. Include image to paint, size, flags (buildable, destructible, ...), lifecycle rules.
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext, size) {
		this.gcontext = gcontext;
		this.size = size;
	};
	
	/**
	 * Return true if something can be build on it
	 */
	Class.prototype.isBuildable = function() {
		return this.buildable;
	};
	
	/**
	 * Return true if it can be destroy
	 */
	Class.prototype.isDestructible = function() {
		return this.destructible;
	};
	
	/**
	 * Return true if it can be destroy
	 */
	Class.prototype.destroy = function() {
		if(!this.destructible) {
			throw "Not destructible !";
		}
		if(!!this.parent) {
			return this.parent;
		}
	};
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.serialize = function() {
		return {
			position : this.position,
			// TODO generic
		};
	};

	/*
	 * Set attributes from json object
	 */
	Class.prototype.unserialize = function(description) {
		this.position = description.position;
		// TODO generic
	};

	return Class;
}();
