/**
 * Good 
 */
var Good = function() {
	
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
	};
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.serialize = function() {
		return {
			type: this.type,
			quantity: this.quantity
		};
	};
	
	/*
	 * Set attributes from json object
	 */
	Class.prototype.unserialize = function(description) {
		this.type = setData(description.type, undefined);
		this.quantity = setData(description.quantity, 0);
	};
		
	return Class;
}();
