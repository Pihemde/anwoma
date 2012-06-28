var Board = function() {
	const REPAINT_DELAI = 50;

	var Class = function(canvas, width, height, orientation) {
		this.gcontext = new GraphicalContext(canvas, width, height, orientation);
		this.gcontext.addEventListener("move", function(e) {
			var pos = e.position;
			var real = this.gcontext.position2Coord(pos);
			var pos2 = this.gcontext.coord2Position(real);
			console.log(pos.i, pos.j, real, this.gcontext.coord2Position(real), pos2.i, pos2.j);
		}, this);
		this.width = width;
		this.height = height;
		this.gobjects = [];
		var board = this;
		this.orientation = orientation;
		loadGObjects(board);
		this.cursor = new Cursor(this.gcontext);
	};
	
	Class.prototype.changeOrientation = function(orientation) {
		this.orientation = orientation;
		this.gcontext.changeOrientation(orientation);
	};
	
	function loadGObjects(board) {
		for(var i = 0 ; i < MAP.length ; i++) {
			var description = MAP[i];
			if(description.id == undefined) {
				description.id = 'obj'-i;
			}
			loadGObject(board, description);
		}
	}
	
	function loadGObject(board, description) {
		var object;
		switch(description.clazz) {
		case 'granary' :
			object = new Granary(board.gcontext);
			break;
		case 'mountain' :
			object = new Moutain(board.gcontext);
			break;
		case 'sign' :
			object = new Sign(board.gcontext);
			break;
		case 'grass' :
			default:
				object = new Grass(board.gcontext);
		}
		object.unserialize(description);
		var p = description.position;
		for(var i = p.i ; i < p.i + object.size.width ; i++) {
			for(var j = p.j ; j < p.j + object.size.height ; j++) {
				if(board.gobjects[j] == undefined) {
					board.gobjects[j] = [];
				}
				board.gobjects[j][i] = object;
			}
		}
	}		
		
	Class.prototype.paint = function() {
		clear(this);
		paintGObjects(this);
		this.cursor.paint();
		//paintGrid(this);
		//paintSelectedTile(this);

		this.gcontext.render();
		
		var board = this;
		function repaint() {
			board.paint();
		}
		setTimeout(repaint, REPAINT_DELAI);
	};
	
	
	function clear(board) {
		// Clear all the board
		board.gcontext.clear();
	}
	
	
	function paintGObjects(board) {
		// Now, we can draw the board
		switch (board.orientation) {
		case ORIENTATION.N:
			for ( var j = 0; j < board.height; j++) {
				for ( var i = 0; i < board.width; i++) {
					paintGObject(board.gobjects, i, j);
				}
			}
			break;
		case ORIENTATION.E:
			// WARNING j and i is interverted !
			for ( var i = 0; i < board.width; i++) {
				for ( var j = board.height - 1; j >= 0; j--) {
					paintGObject(board.gobjects, i, j);
				}
			}
			break;
		case ORIENTATION.S:
			for ( var j = board.height - 1; j >= 0; j--) {
				for ( var i = board.width - 1; i >= 0; i--) {
					paintGObject(board.gobjects, i, j);
				}
			}
			break;
		case ORIENTATION.W:
			for ( var j = 0; j < board.height; j++) {
				for ( var i = board.width - 1; i >= 0; i--) {
					paintGObject(board.gobjects, i, j);
				}
			}
			break;
		}
	}
	
	function paintGObject(objects, i, j) {
		if(!!objects[j] && !!objects[j][i]) {
			objects[j][i].paint();
		}
	}

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

	function paintSelectedTile(board) {
		var c = board.coord2Position([board.mousePosition.x, board.mousePosition.y]);
		var x = c[0];
		var y = c[1];
		
		if(!board.selectedTile || x < 0 || x > MAP_SIZE - 1 || y < 0 || y > MAP_SIZE - 1) {
			return;
		}

		board.gcontext.context.globalAlpha = 0.5; // Transparence 
		c = board.gcontext.position2Coord([x, y]);
		paintTileOnGrid(board.gcontext.context, board.selectedTile, c[0], c[1]); 
		board.gcontext.context.globalAlpha = 1; // On la reset pour les copains 
	}

	return Class;
}();

