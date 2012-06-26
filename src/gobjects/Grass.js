/**
 * Grass 
 */
var Grass = function() { // FIXME Comment on fait pour hériter ?
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		this.gcontext.drawImage(IMAGES.GRASS1, this.position);
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
	Class.prototype.unserialize = function(datas) {
		this.position = datas.position;
	};
		
	return Class;
}();
