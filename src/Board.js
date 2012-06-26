var Board = function() {
	const REPAINT_DELAI = 50;

	var Class = function(canvas, width, height, boardDescr, orientation) {
		this.gcontext = new GraphicalContext(canvas, width, height, orientation);
		console.log(this.gcontext);
		this.width = width;
		this.height = height;
		this.tiles = [];
		for(var y=0; y<this.height; y++) {
			this.tiles[y] = [];
			for(var x=0; x<this.width; x++) {
/*
				var tileDescr = undefined;
				if(!!boardDescr[y] && !!boardDescr[y][x]) {
					tileDescr = boardDescr[y][x];
				}
				this.tiles[y][x] = new Tile(tileDescr);
*/
				if (x == 5 && y == 13) {
					this.tiles[y][x] = new Granary(this.gcontext, {i:x,j:y});
				} else if (x == 2 && y == 2) {
					this.tiles[y][x] = new Sign(this.gcontext, {i:x,j:y});
					this.tiles[y][x].orientation = W;
				} else if (x == 13 && y == 5) {
					this.tiles[y][x] = new Mountain(this.gcontext, {i:x,j:y});
				} else {
					this.tiles[y][x] = new Grass(this.gcontext, {i:x,j:y});	
				}
			}
		}
		var board = this;
	};

	Class.prototype.paint = function() {
		clear(this);
		paintLand(this);
		//paintGrid(this);
		//paintMousePosition(this);
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
	
	
	function paintLand(board) {
		// Now, we can draw the board
		for(var y=0; y<board.height; y++) {
			for(var x=0; x<board.width; x++) {
				//board.tiles[y][x].paint(board, x, y);
				board.tiles[y][x].paint();
			}
		}
	}

	function paintGrid(board) {
		var c = undefined;
		board.context.lineWidth = 0.5;
		board.context.strokeStyle = "#ff0000";
		for ( var i = 0; i <= board.width; i++) {
			board.context.beginPath();
			c = board.toRealCoord([i, 0]);
			board.context.moveTo(c[0], c[1]);
			c = board.toRealCoord([i, board.height]);
			board.context.lineTo(c[0], c[1]);
			board.context.stroke();
		}
		for ( var i = 0; i <= board.height; i++) {
			board.context.beginPath();
			c = board.toRealCoord([0, i]);
			board.context.moveTo(c[0], c[1]);
			c = board.toRealCoord([board.width, i]);
			board.context.lineTo(c[0], c[1]);
			board.context.stroke();
		}
	}

	function paintMousePosition(board) {
		//if (board.mousePosition.x == 0 && board.mousePosition.y == 0) {
		//	return;
		//}
		
		var c = board.fromRealCoord([board.mousePosition.x, board.mousePosition.y]);
		var x = c[0];
		var y = c[1];
		//if(x < 0 || x > MAP_SIZE - 1 || y < 0 || y > MAP_SIZE - 1) {
		//	return;
		//}

		board.context.beginPath();
		c = board.toRealCoord([x, y]);
		board.context.moveTo(c[0], c[1]);
		c = board.toRealCoord([x + 1, y]);
		board.context.lineTo(c[0], c[1]);
		c = board.toRealCoord([x + 1, y + 1]); 
		board.context.lineTo(c[0], c[1]);
		c = board.toRealCoord([x, y + 1]);
		board.context.lineTo(c[0], c[1]);
		c = board.toRealCoord([x, y]);
		board.context.lineTo(c[0], c[1]);
		board.context.closePath();
		board.context.fillStyle = "red";
		board.context.globalAlpha = 0.5; // Transparence 
		board.context.fill(); // On remplit 
		board.context.globalAlpha = 1; // On la remet à sa valeur par défaut pour les copains 
	}

	function paintSelectedTile(board) {
		var c = board.fromRealCoord([board.mousePosition.x, board.mousePosition.y]);
		var x = c[0];
		var y = c[1];
		
		if(!board.selectedTile || x < 0 || x > MAP_SIZE - 1 || y < 0 || y > MAP_SIZE - 1) {
			return;
		}

		board.context.globalAlpha = 0.5; // Transparence 
		c = board.toRealCoord([x, y]);
		paintTileOnGrid(board.context, board.selectedTile, c[0], c[1]); 
		board.context.globalAlpha = 1; 
	}

	return Class;
}();

