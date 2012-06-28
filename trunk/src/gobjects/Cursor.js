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
		if(x < 0 || x > MAP_SIZE - 1 || y < 0 || y > MAP_SIZE - 1) {
			return;
		}

		this.gcontext.preRenderContext.beginPath();
		c = this.gcontext.position2Coord({i:x, j:y});
		this.gcontext.preRenderContext.moveTo(c.x, c.y);
		c = this.gcontext.position2Coord({i:x+1, j:y});
		this.gcontext.preRenderContext.lineTo(c.x, c.y);
		c = this.gcontext.position2Coord({i:x+1, j:y+1}); 
		this.gcontext.preRenderContext.lineTo(c.x, c.y);
		c = this.gcontext.position2Coord({i:x, j:y+1});
		this.gcontext.preRenderContext.lineTo(c.x, c.y);
		c = this.gcontext.position2Coord({i:x, j:y});
		this.gcontext.preRenderContext.lineTo(c.x, c.y);
		this.gcontext.preRenderContext.closePath();
		this.gcontext.preRenderContext.fillStyle = "red";
		this.gcontext.preRenderContext.globalAlpha = 0.5; // Transparence 
		this.gcontext.preRenderContext.fill(); // On remplit 
		this.gcontext.preRenderContext.globalAlpha = 1; // On la reset pour les copains 
	};
	
	Class.prototype.onmove = function(e) {
		this.position = e.position;
	}
	return Class;
}();
