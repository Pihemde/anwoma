/**
 * Grass 
 */
var Grass = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Grass(context) {
		GraphicalObject.call(this, context, {width: 1, height: 1});
		this.number = Math.floor(Math.random()*58);
	};
	Grass.prototype = Object.create(GraphicalObject.prototype);
	Grass.prototype.constructor = Grass;
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Grass.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Grass.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	/**
	 * Retrieve painting position
	 */
	Grass.prototype.load = function() {
		return this.position;
	};
	
	/**
	 * Draw object on canvas
	 */
	Grass.prototype.paint = function() {
		this.context.gcontext.drawImage(SET['GRASS'][this.number], this.size, this.position);
	};
		
	return Grass;
}();
