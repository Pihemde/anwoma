/**
 * Board
 */
var Board = function() {

	/**
	 * Constructor
	 */
	var Class = function(canvas, map, width, height, orientation) {
		this.gcontext = new GraphicalContext(canvas, width, height, orientation);
		this.map = map;
		this.width = width;
		this.height = height;
		this.objects = [];
		this.grid = [];
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
			var Clazz = eval(description.clazz);
			object = new Clazz(this.gcontext);
		} catch(e) {
			throw "Unknow object class.";
		}
		this.objects.push(object);
		object.unserialize(description);
		var p = description.position;
		for(var i = p.i ; i < p.i + object.size.width ; i++) {
			for(var j = p.j ; j < p.j + object.size.height ; j++) {
				if(this.grid[j] == undefined) {
					this.grid[j] = [];
				}
				if(!!this.grid[j][i]) {
					object.parent = this.grid[j][i]; 
				}
				this.grid[j][i] = object;
			}
		}
	}
	
	/**
	 * Paint the board
	 */
	Class.prototype.paint = function() {
		this.init();
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
	 * Init
	 */
	Class.prototype.init = function() {
		this.initGObjects();		
	}
	
	/**
	 * Init objects
	 */
	Class.prototype.initGObjects = function() {
		for(var i = 0 ; i < this.objects.length ; i++) {
			this.initGObject(this.objects[i]);
		}
	}
	
	/**
	 * Init an object
	 */
	Class.prototype.initGObject = function(object) {
		if(object instanceof Road) {
			object.init(this.grid);
		}
	}
	
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
			for(var m = 0 ; m < this.width ; m++) {
				for(var i = 0, j = m ; j >= 0 ; i++, j--) {
					this.paintGObject(this.grid, i, j);
				}
			}
			for(var m = 1 ; m < this.height ; m++) {
				for(var i = m, j = (this.height - 1) ; i < this.width ; i++, j--) {
					this.paintGObject(this.grid, i, j);
				}
			}
			break;
		case ORIENTATION.E:
			for(var m = 0 ; m < this.width ; m++) {
				for(var i = m, j = (this.height - 1) ; i >= 0 ; i--, j--) {
					this.paintGObject(this.grid, i, j);
				}
			}
			for(var m = 1 ; m < this.height ; m++) {
				for(var i = (this.width - 1), j = (this.height - m - 1) ; j >= 0 ; i--, j--) {
					this.paintGObject(this.grid, i, j);
				}
			}
			break;
		case ORIENTATION.S:
			for(var m = (this.width - 1) ; m >= 0 ; m--) {
				for(var i = (this.width - 1), j = m ; j < this.height ; i--, j++) {
					this.paintGObject(this.grid, i, j);
				}
			}
			for(var m = (this.width - 1) ; m >= 0 ; m--) {
				for(var i = m, j = 0 ; i >= 0 ; i--, j++) {
					this.paintGObject(this.grid, i, j);
				}
			}
			break;
		case ORIENTATION.W:
			for(var m = 0 ; m < this.width ; m++) {
				for(var i = (this.width - m - 1), j = 0 ; i < this.width ; i++, j++) {
					this.paintGObject(this.grid, i, j);
				}
			}
			for(var m = 1 ; m < this.height ; m++) {
				for(var i = 0, j = m ; j < this.height ; i++, j++) {
					this.paintGObject(this.grid, i, j);
				}
			}
			break;
		}
	}
	
	/**
	 * Paint an object on the board.
	 */
	Class.prototype.paintGObject = function(objects, i, j) {
		if(!!objects[j] && !!objects[j][i] && this.gcontext.isVisible(objects[j][i])) {
			objects[j][i].paint({i:i, j:j});
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
