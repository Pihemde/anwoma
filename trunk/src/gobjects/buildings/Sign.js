/**
 * Sign 
 */
var Sign = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var Sign = function(gcontext) {
		$sc(this, [gcontext, {width: 1, height: 1}]);
		this.gcontext.addEventListener("rotate", this.onrotate, this);
	};
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Sign.prototype.serialize = function() {
		return {
			position: this.position,
			orientation: this.orientation
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Sign.prototype.unserialize = function(description) {
		this.position = description.position;
		this.orientation = setData(description.orientation, ORIENTATION.N);
		this.color = setData(description.color, 'BLUE').toUpperCase();
		
		// FIXME move to init() when the method will be call only one time
		this.orientationCorrectionGrid = ORIENTATION_CORRECTION[this.orientation]; 
		this.displayOrientationName = ORIENTATION_NAME[this.orientationCorrectionGrid[ORIENTATION.N]];
	};

	/**
	 * Retrieve painting position
	 */
	Sign.prototype.load = function() {
		return this.position;
	};
	
	/**
	 * Draw object on canvas
	 */
	Sign.prototype.paint = function() {
		this.gcontext.drawImage(SET['SIGN_' + this.color + '_' + this.displayOrientationName], this.size, this.position);
	};
	
	/**
	 * Orientation correction function of board orientation
	 */
	Sign.prototype.onrotate = function(event) {
		this.displayOrientationName = ORIENTATION_NAME[this.orientationCorrectionGrid[event.orientation]];
	};

	return $extends(Sign, GraphicalObject);
}();
