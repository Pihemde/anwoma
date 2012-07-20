/**
 * Selection
 */
var Selection = function() {

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var Selection = function(gcontext, grid) {
		$sc(this, [gcontext, {width: 0, height: 0}]);
		this.gcontext.addEventListener("move", this.onmove, this);
		this.gcontext.addEventListener("mousedown", this.onmousedown, this);
		this.gcontext.addEventListener("mouseup", this.onmouseup, this);
		this.grid = grid;
		this.selection = undefined;
	};
	
	/**
	 * Draw object on canvas
	 */
	Selection.prototype.paint = function() {
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
	
	Selection.prototype.onmove = function(e) {
		if(!!this.selection) {
			var i = this.selection.position.i;
			var j = this.selection.position.j;
			if(i < 0 || i > MAP_SIZE.width - 1 || j < 0 || j > MAP_SIZE.height - 1) {
				return;
			}
			this.grid[j][i] = this.selection.parent;

			var i = e.position.i;
			var j = e.position.j;
			this.selection.position.i = i;
			this.selection.position.j = j;
			this.selection.parent = this.grid[j][i];
			this.grid[j][i] = this.selection;
		}
	}
	Selection.prototype.onmousedown = function(e) {
		this.selection = this.grid[e.position.j][e.position.i];
		console.log(this.selection);
		if(!this.selection.parent) {
			this.selection = undefined;
		}
	}
	Selection.prototype.onmouseup = function(e) {
		this.selection = undefined;
	}

	return $extends(Selection, GraphicalObject);
}();
