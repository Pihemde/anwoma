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
		this.gObjects = []; // ground, building, road, ... FIXME change name 
		this.land = []; // ground, building, road, ... FIXME change name
		this.characters = [];
		this.charactersGrid = [];
		this.orientation = orientation;
		this.cursor = new Cursor(this.gcontext);
		this.selection = new Selection(this.gcontext, this.land);
//		this.gcontext.addEventListener("move", function(e) {
//			var pos = e.position;
//			console.log(pos.i, pos.j);
//		}, this);
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
		this.gObjects.push(gObject); // Some objects will be replace by dummys in grid, should be placed in gObjects?
		gObject.unserialize(description);
		var p = description.position;
		for(var i = p.i ; i < p.i + gObject.size.width ; i++) {
			for(var j = p.j ; j < p.j + gObject.size.height ; j++) {
				if(this.land[j] == undefined) {
					this.land[j] = [];
				}
				if(!!this.land[j][i]) {
					gObject.parent.push(this.land[j][i]); 
					this.land[j][i] = new Dummy({i:i, j:j});
				}
			}
		}
		p = gObject.load();
		this.land[p.j][p.i] = gObject;
	}
	
	Class.prototype.start = function() {
		this.activate();
		this.paint();
		
		/*
		 * Repainting
		 */
		var board = this;
		function loop() {
			board.start();
		}
		setTimeout(loop, REPAINT_DELAI);
	}
	
	Class.prototype.activate = function() {
		for(var n = 0 ; n < this.gObjects.length ; n++) {
			this.activateGObject(this.gObjects[n]);
		}
		this.charactersGrid = [];
		for(var n = 0 ; n < this.characters.length ; n++) {
			this.activateCharacter(this.characters[n]);
		}
	}
	
	Class.prototype.activateGObject = function(object) {
		if(!!object.activate)
			object.activate();		
	}
	
	Class.prototype.activateCharacter = function(character) {
		var position = character.activate();
		this.placeCharacterInGrid(character, position);
	}

	Class.prototype.placeCharacterInGrid = function(character, position) {
		if(this.charactersGrid[position.j] == undefined) {
			this.charactersGrid[position.j] = [];
		}
		if(this.charactersGrid[position.j][position.i] == undefined) {
			this.charactersGrid[position.j][position.i] = [];
		}
		this.charactersGrid[position.j][position.i].push(character);
	};
	
	/**
	 * Paint the board
	 */
	Class.prototype.paint = function() {
		this.clear();
		this.paintGObjects();
		this.cursor.paint();
		this.gcontext.render();
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
					this.paintGObject(i, j);
				}
			}
			for(var m = 1 ; m < this.height ; m++) {
				for(var i = m, j = (this.height - 1) ; i < this.width ; i++, j--) {
					this.paintGObject(i, j);
				}
			}
			break;
		case ORIENTATION.E:
			for(var m = 0 ; m < this.width ; m++) {
				for(var i = m, j = (this.height - 1) ; i >= 0 ; i--, j--) {
					this.paintGObject(i, j);
				}
			}
			for(var m = 1 ; m < this.height ; m++) {
				for(var i = (this.width - 1), j = (this.height - m - 1) ; j >= 0 ; i--, j--) {
					this.paintGObject(i, j);
				}
			}
			break;
		case ORIENTATION.S:
			for(var m = (this.width - 1) ; m >= 0 ; m--) {
				for(var i = (this.width - 1), j = m ; j < this.height ; i--, j++) {
					this.paintGObject(i, j);
				}
			}
			for(var m = (this.width - 1) ; m >= 0 ; m--) {
				for(var i = m, j = 0 ; i >= 0 ; i--, j++) {
					this.paintGObject(i, j);
				}
			}
			break;
		case ORIENTATION.W:
			for(var m = 0 ; m < this.width ; m++) {
				for(var i = (this.width - m - 1), j = 0 ; i < this.width ; i++, j++) {
					this.paintGObject(i, j);
				}
			}
			for(var m = 1 ; m < this.height ; m++) {
				for(var i = 0, j = m ; j < this.height ; i++, j++) {
					this.paintGObject(i, j);
				}
			}
			break;
		}
	}
	
	/**
	 * Paint an object on the board.
	 */
	Class.prototype.paintGObject = function(i, j) {
		if(!!this.land[j] && !!this.land[j][i] && this.gcontext.isVisible(this.land[j][i])) {
			// Paint land (ground, decoration, buildings, road, ...)
			this.land[j][i].paint();
			// Paint characters
			if(!!this.charactersGrid[j]) {
				var place = this.charactersGrid[j][i];
				if(!!place) {
					for(var n = 0 ; n < place.length ; n++) {
						place[n].paint();
					}
				}
			}
		}
	}
	
	
	Class.prototype.changeOrientation = function(orientation) {
		this.orientation = orientation;
		this.gcontext.changeOrientation(orientation);
	};

	Class.prototype.addCharacter = function(character) {
		this.characters.push(character);
	};
	
	return Class;
}();
