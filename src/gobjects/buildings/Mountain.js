/**
 * Mountain 
 */
var Mountain = function() {
	const SET = SETS['roman'];
	
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Mountain(context) {
		GraphicalObject.call(this, context, {width: 3, height: 3});
	};
	Mountain.prototype = Object.create(GraphicalObject.prototype);
	Mountain.prototype.constructor = Mountain;
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Mountain.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Mountain.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	/**
	 * Retrieve painting position
	 */
	Mountain.prototype.load = function() {
		return {
			i: this.position.i + 1,
			j: this.position.j + 1
		};
	};
	
	/**
	 * Draw object on canvas
	 */
	Mountain.prototype.paint = function() {
		this.context.gcontext.drawImage(SET.MOUNTAIN[0], this.size, this.position);
	};
		
	return Mountain;
}();
