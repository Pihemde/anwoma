/**
 * Library 
 */
var Library = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Library(context) {
		GraphicalObject.call(this, context, {width: 2, height: 2});
	};
	Library.prototype = Object.create(GraphicalObject.prototype);
	Library.prototype.constructor = Library;
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Library.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Library.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	/**
	 * Retrieve painting position
	 */
	Library.prototype.load = function() {
		return {
			i: this.position.i + 1,
			j: this.position.j + 1
		};
	};
	
	/**
	 * Draw object on canvas
	 */
	Library.prototype.paint = function() {
		this.context.gcontext.drawImage(SET.LIBRARY, this.size, this.position);
	};

	return Library;
}();
