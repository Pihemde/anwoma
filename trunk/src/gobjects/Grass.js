/**
 * Grass 
 */
var Grass = function() { // FIXME Comment on fait pour hériter ?
	const SIZE = {width: 1, height: 1};

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
		this.width = 1;
		this.height = 1;
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		this.gcontext.drawImage(IMAGES.GRASS1, SIZE, this.position);
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
		
	return Class;
}();
