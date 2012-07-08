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
		this.gObjects = [];
		this.grid = [];
		this.orientation = orientation;
		this.cursor = new Cursor(this.gcontext);
		this.selection = new Selection(this.gcontext, this.grid);
		this.gcontext.addEventListener("move", function(e) {
			var pos = e.position;
			console.log(pos.i, pos.j);
		}, this);
	};
	
	/**
	 * Load all elements needs to paint the board
	 */
	Class.prototype.load = function() {
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
		var gObject;
		try {
			var Clazz = eval(description.clazz);
			gObject = new Clazz(this.gcontext);
		} catch(e) {
			throw "Unknow object class.";
		}
		this.gObjects.push(gObject);
		gObject.unserialize(description);
		var p = description.position;
		for(var i = p.i ; i < p.i + gObject.size.width ; i++) {
			for(var j = p.j ; j < p.j + gObject.size.height ; j++) {
				if(this.grid[j] == undefined) {
					this.grid[j] = [];
				}
				if(!!this.grid[j][i]) {
					gObject.parent.push(this.grid[j][i]); 
					this.grid[j][i] = new Dummy({i:i, j:j});
				}
			}
		}
		p = gObject.load();
		this.grid[p.j][p.i] = gObject;
	}
	
	/**
	 * Init
	 */
	Class.prototype.init = function() {
		for(var n = 0 ; n < this.gObjects.length ; n++) {
			this.initGObject(this.gObjects[n]);
		}
	}
	
	/**
	 * Init an object
	 */
	Class.prototype.initGObject = function(gObject) {
		if(gObject instanceof Road) {
			gObject.init(this.grid);
		} else if(!!gObject.init) {
			gObject.init();
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
	Class.prototype.paintGObject = function(gObjects, i, j) {
		if(!!gObjects[j] && !!gObjects[j][i] && this.gcontext.isVisible(gObjects[j][i])) {
			gObjects[j][i].paint({i:i, j:j});
		}
	}
	
	
	Class.prototype.changeOrientation = function(orientation) {
		this.orientation = orientation;
		this.gcontext.changeOrientation(orientation);
	};

	return Class;
}();
