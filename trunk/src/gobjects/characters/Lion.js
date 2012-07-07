/**
 * Lion
 */
var Lion = function() { // FIXME Comment on fait pour hériter ?
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		$sc(this, [gcontext, {width: 1, height: 1}]);
		this.counter = 0;
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		if(!!this.parent && !!this.parent.paint) {
			this.parent.paint();
		}
		this.gcontext.drawImage(SET['LION_E_' + this.counter], this.size, this.position);
		
		if(this.counter >= 11) {
			this.counter = 0;
		} else {
			this.counter++;
		}
	};
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/*
	 * Set attributes from json object
	 */
	Class.prototype.unserialize = function(description) {
		this.position = description.position;
	};
	
	return $extends(Class, GraphicalObject);
}();
