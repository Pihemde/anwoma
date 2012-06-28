/**
 * Sign 
 */
var Sign = function() { // FIXME Comment on fait pour hériter ?
	const SET = SETS['roman'];
	var SIGNS = [];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
		this.size = {width: 1, height: 1};
		this.gcontext.addEventListener("rotate", this.onrotate, this);
		this.init();
	};
	
	Class.prototype.init = function() {
		if (SIGNS.length == 0) {
			SIGNS[ORIENTATION.N] = SET.SIGN_BLUE_N;
			SIGNS[ORIENTATION.E] = SET.SIGN_BLUE_E;
			SIGNS[ORIENTATION.S] = SET.SIGN_BLUE_S;
			SIGNS[ORIENTATION.W] = SET.SIGN_BLUE_W;
		}
	}
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		this.gcontext.drawImage(SIGNS[this.orientation], this.size, this.position);
	};
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.serialize = function() {
		return {
			position: this.position,
			orientation: this.orientation
		};
	};
	
	/*
	 * Set attributes from json object
	 */
	Class.prototype.unserialize = function(description) {
		this.position = description.position;
		this.orientation = setData(description.orientation, ORIENTATION.N);
	};
	
	Class.prototype.onrotate = function(event) {
		this.orientation = event.orientation;
	};

	return Class;
}();
