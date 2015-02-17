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
	var GraphicalObject = function(context, size, position) {
		this.context = context;
		this.size = size;
		this.position = position;
		this.buildable = false;
		this.destructible = false;
		this.parent = undefined;
		this.context.eventManager.addEventListener(EventManager.EVENT_TYPE.ACTIVATE, this.activate, this);
	};

	GraphicalObject.prototype.paint = function() {
	}

	GraphicalObject.prototype.activate = function() {
		if(this==this.parent) {
			console.log(this, this.parent);
			return;
		}
		if(!!this.parent) {
			this.parent.activate();
		}
	}

	/**
	 * Return true if something can be build on it
	 */
	GraphicalObject.prototype.isBuildable = function() {
		return this.buildable;
	};
	
	/**
	 * Return true if it can be destroy
	 */
	GraphicalObject.prototype.isDestructible = function() {
		return this.destructible;
	};
	
	/**
	 * Return true if it can be destroy
	 */
	GraphicalObject.prototype.destroy = function() {
		if(!this.destructible) {
			throw "Not destructible !";
		}
		if(!!this.parent) {
			return this.parent;
		}
	};
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	GraphicalObject.prototype.serialize = function() {
		return {
			position : this.position
		};
	};

	/**
	 * Set attributes from json object
	 */
	GraphicalObject.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	return GraphicalObject;
}();
