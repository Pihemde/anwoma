/**
 * Mountain 
 */
var Mountain = function() { // FIXME Comment on fait pour hériter ?
	const SET = SETS['roman'];
	
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		$sc(this, [gcontext, {width: 3, height: 3}]);
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function(p) {
		if(this.position.i + 1 == p.i && this.position.j + 1 == p.j) {
			this.gcontext.drawImage(SET.MOUNTAIN_0, this.size, this.position);
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
