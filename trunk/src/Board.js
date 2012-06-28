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
		loadGObject(board);
		this.cursor = new Cursor(this.gcontext);
	};
	
	Class.prototype.changeOrientation = function(orientation) {
		this.orientation = orientation;
		this.gcontext.changeOrientation(orientation);
	};
	
	function loadGObject(board) {
		for(var j=0; j<board.height; j++) {
			board.gobjects[j] = [];
			for(var i=0; i<board.width; i++) {
				var s = MAP[j][i];
				if(s != undefined) {
					s.data.position = {i:i, j:j};
					if (s.clazz == 'sign') {
						board.gobjects[j][i] = new Sign(board.gcontext);
					} else if (s.clazz == 'granary') {
						board.gobjects[j][i] = new Granary(board.gcontext);
					} else if (s.clazz == 'mountain') {
						board.gobjects[j][i] = new Mountain(board.gcontext);
					} else if(s.clazz == 'grass') {
						board.gobjects[j][i] = new Grass(board.gcontext);
					}
					board.gobjects[j][i].unserialize(s.data);
				}
			}
		}
	}
		
		
	Class.prototype.paint = function() {
		clear(this);
		paintGObjects(this);
		this.cursor.paint();
		//paintGrid(this);
		//paintSelectedTile(this);

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
		switch(board.orientation) {
			case ORIENTATION.N :
				for(var j = 0 ; j < board.height; j++) {
					for(var i = 0 ; i < board.width; i++) {
						paintGObject(board.gobjects[j][i]);
					}
				}
				break;
			case ORIENTATION.E :
				// WARNING j and i is interverted !
				for(var i = 0 ; i < board.width; i++) {
				for(var j = 0  ; j < board.height ; j++) {
					paintGObject(board.gobjects[j][i]);
					}
				}
				break;
			case ORIENTATION.S :
				for(var j = board.height -1 ; j >= 0; j--) {
					for(var i = board.width -1 ; i >= 0; i--) {
						paintGObject(board.gobjects[j][i]);
					}
				}
				break;
			case ORIENTATION.W :
				for(var j = 0 ; j < board.height; j++) {
					for(var i = board.width -1 ; i >= 0 ; i--) {
						paintGObject(board.gobjects[j][i]);
					}
				}
				break;
		}
	}
	
	function paintGObject(object) {
		if(undefined != object) {
			object.paint();
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

