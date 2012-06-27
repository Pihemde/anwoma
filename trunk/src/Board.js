var Board = function() {
	const REPAINT_DELAI = 50;

	var Class = function(canvas, width, height, orientation) {
		this.gcontext = new GraphicalContext(canvas, width, height, orientation);
		this.gcontext.addEventListener("move", function(e) {
			console.log(e.position.i, e.position.j);
		});
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
				if (i == 5 && j == 13) {
					board.gobjects[j][i] = new Sign(board.gcontext);
					board.gobjects[j][i].unserialize({position:{i:i,j:j}, orientation:ORIENTATION.S});
				} else if (i == 2 && j == 2) {
					board.gobjects[j][i] = new Granary(board.gcontext);
					board.gobjects[j][i].unserialize({position:{i:i,j:j}});
				} else if (i == 13 && j == 5) {
					board.gobjects[j][i] = new Mountain(board.gcontext);
					board.gobjects[j][i].unserialize({position:{i:i,j:j}});
				} else {
					board.gobjects[j][i] = new Grass(board.gcontext);
					board.gobjects[j][i].unserialize({position:{i:i,j:j}});
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
						board.gobjects[j][i].paint();
					}
				}
				break;
			case ORIENTATION.E :
				// WARNING j and i is interverted !
				for(var i = 0 ; i < board.width; i++) {
				for(var j = 0  ; j < board.height ; j++) {
						board.gobjects[j][i].paint();
					}
				}
				break;
			case ORIENTATION.S :
				for(var j = board.height -1 ; j >= 0; j--) {
					for(var i = board.width -1 ; i >= 0; i--) {
						board.gobjects[j][i].paint();
					}
				}
				break;
			case ORIENTATION.W :
				for(var j = 0 ; j < board.height; j++) {
					for(var i = board.width -1 ; i >= 0 ; i--) {
						board.gobjects[j][i].paint();
					}
				}
				break;
		}
	}

	function paintGrid(board) {
		var c = undefined;
		board.gcontext.context.lineWidth = 0.5;
		board.gcontext.context.strokeStyle = "#ff0000";
		for ( var i = 0; i <= board.width; i++) {
			board.gcontext.context.beginPath();
			c = board.toRealCoord([i, 0]);
			board.gcontext.context.moveTo(c[0], c[1]);
			c = board.gcontext.toRealCoord([i, board.height]);
			board.gcontext.context.lineTo(c[0], c[1]);
			board.gcontext.context.stroke();
		}
		for ( var i = 0; i <= board.height; i++) {
			board.gcontext.context.beginPath();
			c = board.gcontext.toRealCoord([0, i]);
			board.gcontext.context.moveTo(c[0], c[1]);
			c = board.gcontext.toRealCoord([board.width, i]);
			board.gcontext.context.lineTo(c[0], c[1]);
			board.gcontext.context.stroke();
		}
	}

	function paintSelectedTile(board) {
		var c = board.fromRealCoord([board.mousePosition.x, board.mousePosition.y]);
		var x = c[0];
		var y = c[1];
		
		if(!board.selectedTile || x < 0 || x > MAP_SIZE - 1 || y < 0 || y > MAP_SIZE - 1) {
			return;
		}

		board.gcontext.context.globalAlpha = 0.5; // Transparence 
		c = board.gcontext.toRealCoord([x, y]);
		paintTileOnGrid(board.gcontext.context, board.selectedTile, c[0], c[1]); 
		board.gcontext.context.globalAlpha = 1; // On la reset pour les copains 
	}

	return Class;
}();

