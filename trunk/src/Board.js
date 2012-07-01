/**
 * Board
 */
var Board = function() {
	const REPAINT_DELAI = 50;

	/**
	 * Constructor
	 */
	var Class = function(canvas, map, width, height, orientation) {
		this.gcontext = new GraphicalContext(canvas, width, height, orientation);
		this.map = map;
		this.width = width;
		this.height = height;
		this.gobjects = [];
		this.orientation = orientation;
		this.cursor = new Cursor(this.gcontext);
		this.gcontext.addEventListener("move", function(e) {
			var pos = e.position;
			console.log(pos.i, pos.j);
		}, this);
	};
	
	/**
	 * Load all elements needs to paint the board
	 */
	Class.prototype.load = function() {
		this.loadGObjects();		
	}
	
	/**
	 * Load objects
	 */
	Class.prototype.loadGObjects = function() {
		for(var i = 0 ; i < MAP.length ; i++) {
			var description = MAP[i];
			if(description.id == undefined) {
				description.id = 'obj'-i;
			}
			this.loadGObject(description);
		}
	}
	
	/**
	 * Load an object
	 */
	Class.prototype.loadGObject = function(description) {
		var object;
		try {
			var Clazz = eval(description.clazz.charAt(0).toUpperCase() + description.clazz.slice(1));
			object = new Clazz(this.gcontext);
		} catch(e) {
			object = new Grass(this.gcontext);
		}
		object.unserialize(description);
		var p = description.position;
		for(var i = p.i ; i < p.i + object.size.width ; i++) {
			for(var j = p.j ; j < p.j + object.size.height ; j++) {
				if(this.gobjects[j] == undefined) {
					this.gobjects[j] = [];
				}
				this.gobjects[j][i] = object;
			}
		}
	}		
	
	/**
	 * Paint the board
	 */
	Class.prototype.paint = function() {
		this.clear();
		this.paintGObjects();
		this.cursor.paint();
		this.gcontext.render();

		/*
		 * Repainting
		 */
		var board = this;
		function repaint() {
			board.paint();
		}
		setTimeout(repaint, REPAINT_DELAI);
	};
	
	/**
	 * Clear the board
	 */
	Class.prototype.clear = function(board) {
		this.gcontext.clear();
	}
	
	/**
	 * Paint objects on the board. Objects painting order depending on orientation.
	 */
	Class.prototype.paintGObjects = function() {
		switch (this.orientation) {
		case ORIENTATION.N:
			// V mode, out->in
			for ( var m = 0; m < this.height; m++) {
				for ( var n = 0; n <= m; n++) {
					this.paintGObject(this.gobjects, m, n);
					this.paintGObject(this.gobjects, n, m);
				}
			}
			break;
		case ORIENTATION.E:
			for ( var j = this.height - 1; j >= 0; j--) {
				for ( var i = 0; i < this.width; i++) {
					this.paintGObject(this.gobjects, i, j);
				}
			}
			break;
		case ORIENTATION.S:
			for ( var j = this.height - 1; j >= 0; j--) {
				for ( var i = this.width - 1; i >= 0; i--) {
					this.paintGObject(this.gobjects, i, j);
				}
			}
			break;
		case ORIENTATION.W:
			for ( var j = 0; j < this.height; j++) {
				for ( var i = this.width - 1; i >= 0; i--) {
					this.paintGObject(this.gobjects, i, j);
				}
			}
			break;
		}
	}
	
	/**
	 * Paint an object on the board.
	 */
	Class.prototype.paintGObject = function(objects, i, j) {
		if(!!objects[j] && !!objects[j][i]) {
			objects[j][i].paint();
		}
	}
	
	
	Class.prototype.changeOrientation = function(orientation) {
		this.orientation = orientation;
		this.gcontext.changeOrientation(orientation);
	};

	/**
	 * Paint a grid corresponding to square on board
	 * @deprecated
	 */
	function paintGrid(board) {
		var c = undefined;
		board.gcontext.context.lineWidth = 0.5;
		board.gcontext.context.strokeStyle = "#ff0000";
		for ( var i = 0; i <= board.width; i++) {
			board.gcontext.context.beginPath();
			c = board.position2Coord([i, 0]);
			board.gcontext.context.moveTo(c[0], c[1]);
			c = board.gcontext.position2Coord([i, board.height]);
			board.gcontext.context.lineTo(c[0], c[1]);
			board.gcontext.context.stroke();
		}
		for ( var i = 0; i <= board.height; i++) {
			board.gcontext.context.beginPath();
			c = board.gcontext.position2Coord([0, i]);
			board.gcontext.context.moveTo(c[0], c[1]);
			c = board.gcontext.position2Coord([board.width, i]);
			board.gcontext.context.lineTo(c[0], c[1]);
			board.gcontext.context.stroke();
		}
	}

	/**
	 * Paint selected object
	 * @deprecated
	 */
	function paintSelectedTile(board) {
		var c = board.coord2Position([board.mousePosition.x, board.mousePosition.y]);
		var x = c[0];
		var y = c[1];
		
		if(!board.selectedTile || x < 0 || x > MAP_SIZE.width - 1 || y < 0 || y > MAP_SIZE.height - 1) {
			return;
		}

		board.gcontext.context.globalAlpha = 0.5; // Transparence 
		c = board.gcontext.position2Coord([x, y]);
		paintTileOnGrid(board.gcontext.context, board.selectedTile, c[0], c[1]); 
		board.gcontext.context.globalAlpha = 1; // On la reset pour les copains 
	}

	return Class;
}();
