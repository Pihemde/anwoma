/**
 * Cursor
 */
var Cursor = function() {

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
		this.gcontext.addEventListener("move", this.onmove, this);
		this.size = {width: 1, height: 1};
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
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

		this.gcontext.drawSquare(this.position, this.size, {color: "red", alpha: 0.5}); 
	};
	
	Class.prototype.onmove = function(e) {
		this.position = e.position;
	}
	return Class;
}();
