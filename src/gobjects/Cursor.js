/**
 * Cursor
 */
var Cursor = function() {

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Cursor(context) {
		GraphicalObject.call(this, context, {width: 1, height: 1});
		this.context.eventManager.addEventListener(EventManager.EVENT_TYPE.MOVE, this.onmove, this);
	};
	Cursor.prototype = Object.create(GraphicalObject.prototype);
	Cursor.prototype.constructor = Cursor;

	/**
	 * Draw object on canvas
	 */
	Cursor.prototype.paint = function() {
		if(!this.position) {
			return;
		}
		if (this.position.x == 0 && this.position.y == 0) {
			return;
		}
		
		var c = this.position;
		var x = c.i;
		var y = c.j;
		if(x < 0 || x > MAP_SIZE.width - 1 || y < 0 || y > MAP_SIZE.height - 1) {
			return;
		}

		this.context.gcontext.drawSquare(this.position, this.size, {color: "red", alpha: 0.5}); 
	};
	
	Cursor.prototype.onmove = function(e) {
		this.position = e.position;
	}

	return Cursor;
}();
