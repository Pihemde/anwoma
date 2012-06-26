/**
 * Sign 
 */
var Sign = function() { // FIXME Comment on fait pour hériter ?
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext, position) {
		this.gcontext = gcontext;
		this.position = position;
		this.orientation = N;
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		switch(this.orientation) {
			case N :
				this.gcontext.drawImage(INDICATORN, this.position);
				break;
			case E :
				this.gcontext.drawImage(INDICATORE, this.position);
				break;
			case S :
				this.gcontext.drawImage(INDICATORS, this.position);
				break;
			case W :
				this.gcontext.drawImage(INDICATORW, this.position);
				break;
		}
	};
		
	return Class;
}();