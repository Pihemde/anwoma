/**
 * Sign 
 */
var Sign = function() { // FIXME Comment on fait pour hériter ?
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
		this.size = {width: 1, height: 1};
		this.gcontext.addEventListener("rotate", this.onrotate, this);
	};
	
	/**
	 * Init
	 */
	Class.prototype.init = function() {
		// 
	}
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		this.gcontext.drawImage(SET['SIGN_' + this.color + '_' + this.displayOrientationName], this.size, this.position);
	};
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.serialize = function() {
		return {
			position: this.position,
			orientation: this.orientation
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Class.prototype.unserialize = function(description) {
		this.position = description.position;
		this.orientation = setData(description.orientation, ORIENTATION.N);
		this.color = setData(description.color, 'BLUE').toUpperCase();
		
		// FIXME move to init() when the method will be call only one time
		this.orientationCorrectionGrid = ORIENTATION_CORRECTION[this.orientation]; 
		this.displayOrientationName = ORIENTATION_NAME[this.orientationCorrectionGrid[ORIENTATION.N]];
	};
	
	/**
	 * Orientation correction function of board orientation
	 */
	Class.prototype.onrotate = function(event) {
		this.displayOrientationName = ORIENTATION_NAME[this.orientationCorrectionGrid[event.orientation]];
	};

	return Class;
}();
