/**
 * Mountain 
 */
var Mountain = function() { // FIXME Comment on fait pour hériter ?
	const SIZE = {width: 3, height: 3};

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
		this.width = 3;
		this.height = 3;
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		this.gcontext.drawImage(IMAGES.MOUNTAIN1, SIZE, this.position);
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
