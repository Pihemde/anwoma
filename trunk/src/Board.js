/**
 * Board
 */
var Board = function() {

	/**
	 * Constructor
	 */
	var Board = function(canvas, map, width, height, orientation) {
		this.eventManager = new EventManager();
		this.gcontext = new GraphicalContext(this.eventManager, canvas, width, height, orientation);
		this.context = {eventManager: this.eventManager, gcontext: this.gcontext};
		this.map = map;
		this.width = width;
		this.height = height;
		this.grid = [];
		this.orientation = orientation;
		this.cursor = new Cursor(this.context);
		this.selection = new Selection(this.context, this.grid);
		this.context.eventManager.addEventListener(EventManager.EVENT_TYPE.PAINT, this.paint, this);
	};

	/**
	 * Load all elements needs to paint the board
	 */
	Board.prototype.load = function() {
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
	Board.prototype.loadGObject = function(description) {
		var gObject;
		try {
			var Clazz = eval(description.clazz);
			gObject = new Clazz(this.context);
			gObject.unserialize(description);
		} catch(e) {
			throw "Unknow object class.";
		}
		var p = description.position;
		for(var i = p.i ; i < p.i + gObject.size.width ; i++) {
			for(var j = p.j ; j < p.j + gObject.size.height ; j++) {
				if(this.grid[j] == undefined) {
					this.grid[j] = [];
				}
				var tile = this.grid[j][i];
				if(!tile) {
					tile = new Tile();
					this.grid[j][i] = tile;
				}
				gObject.parent = tile.gObject;
				tile.gObject = gObject;
			}
		}
		gObject.load();
	}

	Board.prototype.start = function() {
		this.context.eventManager.fireEvent(EventManager.EVENT_TYPE.ACTIVATE);
		this.context.eventManager.fireEvent(EventManager.EVENT_TYPE.PAINT);

		/*
		 * Repainting
		 */
		var board = this;
		function loop() {
			board.start();
		}
		setTimeout(loop, REPAINT_DELAI);
	}

	/**
	 * Paint the board
	 */
	Board.prototype.paint = function() {
		this.clear();
		this.paintGrid();
		this.cursor.paint();
		this.gcontext.render();
	};

	/**
	 * Clear the board
	 */
	Board.prototype.clear = function(board) {
		this.gcontext.clear();
	}

	/**
	 * Paint objects on the board. Objects painting order depending on orientation.
	 */
	Board.prototype.paintGrid = function() {
		switch (this.orientation) {
		case ORIENTATION.N:
			for(var m = 0 ; m < this.width ; m++) {
				for(var i = 0, j = m ; j >= 0 ; i++, j--) {
					this.grid[j][i].paint({i:i, j:j});
				}
			}
			for(var m = 1 ; m < this.height ; m++) {
				for(var i = m, j = (this.height - 1) ; i < this.width ; i++, j--) {
					this.grid[j][i].paint({i:i, j:j});
				}
			}
			break;
		case ORIENTATION.E:
			for(var m = 0 ; m < this.width ; m++) {
				for(var i = m, j = (this.height - 1) ; i >= 0 ; i--, j--) {
					this.grid[j][i].paint({i:i, j:j});
				}
			}
			for(var m = 1 ; m < this.height ; m++) {
				for(var i = (this.width - 1), j = (this.height - m - 1) ; j >= 0 ; i--, j--) {
					this.grid[j][i].paint({i:i, j:j});
				}
			}
			break;
		case ORIENTATION.S:
			for(var m = (this.width - 1) ; m >= 0 ; m--) {
				for(var i = (this.width - 1), j = m ; j < this.height ; i--, j++) {
					this.grid[j][i].paint({i:i, j:j});
				}
			}
			for(var m = (this.width - 1) ; m >= 0 ; m--) {
				for(var i = m, j = 0 ; i >= 0 ; i--, j++) {
					this.grid[j][i].paint({i:i, j:j});
				}
			}
			break;
		case ORIENTATION.W:
			for(var m = 0 ; m < this.width ; m++) {
				for(var i = (this.width - m - 1), j = 0 ; i < this.width ; i++, j++) {
					this.grid[j][i].paint({i:i, j:j});
				}
			}
			for(var m = 1 ; m < this.height ; m++) {
				for(var i = 0, j = m ; j < this.height ; i++, j++) {
					this.grid[j][i].paint({i:i, j:j});
				}
			}
			break;
		}
	}

	Board.prototype.changeOrientation = function(orientation) {
		this.orientation = orientation;
		this.gcontext.changeOrientation(orientation);
	};

	Board.prototype.addCharacter = function(character) {
		var position = character.position;
		var i = position.i;
		var j = position.j;
		this.grid[j][i].characters.push(character);
	};

	return Board;
}();
