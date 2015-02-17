/**
 * Sign 
 */
var Sign = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Sign(context) {
		GraphicalObject.call(this, context, {width: 1, height: 1});
		this.context.eventManager.addEventListener("rotate", this.onrotate, this);
	};
	Sign.prototype = Object.create(GraphicalObject.prototype);
	Sign.prototype.constructor = Sign;

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
	};

	/**
	 * Retrieve painting position
	 */
	Sign.prototype.load = function() {
		this.orientationCorrectionGrid = ORIENTATION_CORRECTION[this.orientation]; 
		this.displayOrientationName = ORIENTATION_NAME[this.orientationCorrectionGrid[ORIENTATION.N]];
		return this.position;
	};
	
	/**
	 * Draw object on canvas
	 */
	Sign.prototype.paint = function() {
		this.context.gcontext.drawImage(SET['SIGN_' + this.color + '_' + this.displayOrientationName], this.size, this.position);
	};
	
	/**
	 * Orientation correction function of board orientation
	 */
	Sign.prototype.onrotate = function(event) {
		this.displayOrientationName = ORIENTATION_NAME[this.orientationCorrectionGrid[event.orientation]];
	};

	return Sign;
}();
