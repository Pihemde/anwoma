/**
 * Grass 
 */
var Grass = function() { // FIXME Comment on fait pour hériter ?
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Grass = function(gcontext) {
		$sc(this, [gcontext, {width: 1, height: 1}]);
		this.number = Math.floor(Math.random()*58);
	};
	
	/**
	 * Draw object on canvas
	 */
	Grass.prototype.paint = function() {
		this.gcontext.drawImage(SET['GRASS_' + this.number], this.size, this.position);
	};
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	Grass.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/*
	 * Set attributes from json object
	 */
	Grass.prototype.unserialize = function(description) {
		this.position = description.position;
	};
		
	return $extends(Grass, GraphicalObject);
}();
