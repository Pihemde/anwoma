/**
 * Sign 
 */
var Sign = function() { // FIXME Comment on fait pour hériter ?
	const SIZE = {width: 1, height: 1};
	var SIGNS;

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
		this.gcontext.addEventListener("rotate", this.onrotate, this);
		if (SIGNS == undefined) {
			SIGNS = [];
			SIGNS[ORIENTATION.N] = IMAGES.SIGN_BLUE_N;
			SIGNS[ORIENTATION.E] = IMAGES.SIGN_BLUE_E;
			SIGNS[ORIENTATION.S] = IMAGES.SIGN_BLUE_S;
			SIGNS[ORIENTATION.W] = IMAGES.SIGN_BLUE_W;
		}
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		this.gcontext.drawImage(SIGNS[this.orientation], SIZE, this.position);
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
	Class.prototype.unserialize = function(datas) {
		this.position = datas.position;
		this.orientation = setData(datas.orientation, ORIENTATION.N);
	};
	
	Class.prototype.onrotate = function(event) {
		this.orientation = event.orientation;
	};

	return Class;
}();
