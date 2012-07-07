/**
 * GovernorMansion 
 */
var GovernorMansion = function() { // FIXME Comment on fait pour hériter ?
	const SET = SETS['roman'];
	
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		$sc(this, [gcontext, {width: 4, height: 4}]);
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function(p) {
		if(this.position.i + 2 == p.i && this.position.j + 2 == p.j) {
			
			/*
			 * Draw base images
			 */
			this.gcontext.drawImage(SET.GOVERNOR_MANSION, this.size, this.position);
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
