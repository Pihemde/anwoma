/**
 * Grass 
 */
var Grass = function() { // FIXME Comment on fait pour hériter ?
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext, position) {
		this.gcontext = gcontext;
		this.position = position;
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		this.gcontext.drawImage(IMAGES.GRASS1, this.position);
	};
		
	return Class;
}();
