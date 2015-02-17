/**
 * Selection
 */
var Selection = function() {

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Selection(context, grid) {
		GraphicalObject.call(this, context, {width: 0, height: 0});
		this.context.eventManager.addEventListener(EventManager.EVENT_TYPE.MOVE, this.onmove, this);
		this.context.eventManager.addEventListener(EventManager.EVENT_TYPE.MOUSE_DOWN, this.onmousedown, this);
		this.context.eventManager.addEventListener(EventManager.EVENT_TYPE.MOUSE_UP, this.onmouseup, this);
		this.grid = grid;
		this.selection = undefined;
	};
	Selection.prototype = Object.create(GraphicalObject.prototype);
	Selection.prototype.constructor = Selection;

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
			// Remove the selection from the old tile
			var tile = this.grid[j][i];
			tile.gObject = this.selection.parent;

			var i = e.position.i;
			var j = e.position.j;
			// Place the selection on the new tile
			tile = this.grid[j][i];
			this.selection.position.i = i;
			this.selection.position.j = j;
			this.selection.parent = tile.gObject;
			tile.gObject = this.selection;
		}
	}

	Selection.prototype.onmousedown = function(e) {
		var tile = this.grid[e.position.j][e.position.i];
		this.selection = tile.gObject;
		console.log(this.selection);
		if(!this.selection.parent) {
			this.selection = undefined;
		}
	}

	Selection.prototype.onmouseup = function(e) {
		this.selection = undefined;
	}

	return Selection;
}();
