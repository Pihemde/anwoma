/**
 * Dummy
 */
var Dummy = function() {
	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Dummy(position) {
		GraphicalObject.call(this, undefined, {width: 1, height: 1});
		this.size = {width: 1, height: 1};
		this.position = position;
	};
	Dummy.prototype = Object.create(GraphicalObject.prototype);
	Dummy.prototype.constructor = Dummy;


	/**
	 * Retrieve painting position
	 */
	Dummy.prototype.load = function() {
		return this.position;
	};
	
	/**
	 * Draw object on canvas
	 */
	Dummy.prototype.paint = function() {
		//
	};
	
	return Dummy;
}();
