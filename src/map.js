var Map = function() {
	var Class = function(canvas, width, height, mapDescr) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.width = width;
		this.height = height;
		this.tiles = [];
		this.offsetX = 100;
		this.offsetY = 50;
		this.zoom = 1;
		this.mousePosition = {x : 0,y : 0};
		this.selectedTile = undefined;
		for(var y=0; y<this.height; y++) {
			this.tiles[y] = [];
			for(var x=0; x<this.width; x++) {
				var tileDescr = undefined;
				if(!!mapDescr[y] && !!mapDescr[y][x]) {
					tileDescr = mapDescr[y][x];
				}
				this.tiles[y][x] = new Tile(tileDescr);
//				if (x  == 5 && y == 13) {
//					this.tiles[y][x] = new Granary(this, this.context, {i:x,j:y});
//				} else {
//					this.tiles[y][x] = new Grass(this, this.context, {i:x,j:y});	
//				}
			}
		}
		var map = this;
		canvas.addEventListener('mousemove', function(event) {map.onmousemove(event);}, false);
		canvas.addEventListener('click', function(event) {map.onclick(event);}, false);
		canvas.addEventListener("mousewheel", function(event) {map.onmousewheel(event);});
	};
	
	Class.prototype.toRealCoord = function(coord) {
		var angle = Math.PI/4;
		// Centrage de la carte sur l'origine des axes
		var x = coord[0] - this.width /2;
		var y = coord[1] - this.height/2;
		// Rotation pour orienter la carte dans le bon sens
		// TODO: Prendre en comte la direction N/E/S/W
		var transform = Matrix.Rotation(angle);
		coord = $M([[x], [y]]);
		coord = transform.multiply(coord);
		// Etirement de la carte pour s'adapter à la taille des images 
		x = coord.elements[0][0] / Math.sqrt(2) * SQUARE_WIDTH  * this.zoom;
		y = coord.elements[1][0] / Math.sqrt(2) * SQUARE_HEIGHT * this.zoom;
		// Déplacement de la carte pour la centrer correctement
		x = x + this.canvas.width /2 + this.offsetX;
		y = y + this.canvas.height/2 + this.offsetY;
		// Optim pour faire référence a des pixels entier
		x = Math.round(x);
		y = Math.round(y);
		return [x, y];
	};

	Class.prototype.fromRealCoord = function(coord) {
		var angle = -Math.PI/4;
		// Déplacement de la carte pour la centrer correctement
		var x = coord[0] - this.offsetX - this.canvas.width/2;
		var y = coord[1] - this.offsetY - this.canvas.height/2;
		// Etirement de la ccarte pour s'adapter à la taille des images
		x = x / SQUARE_WIDTH  * Math.sqrt(2) / this.zoom;
		y = y / SQUARE_HEIGHT * Math.sqrt(2) / this.zoom;
		// Rotation pour orienter la carte dans le bon sens
		// TODO: Prendre en comte la direction N/E/S/W
		var transform = Matrix.Rotation(angle);
		coord = $M([[x], [y]]);
		coord = transform.multiply(coord);
		// Centrage de la carte sur l'origine des axes
		var x = coord.elements[0][0] + this.width/2;
		var y = coord.elements[1][0] + this.height/2;
	
		return [
			Math.floor(x),
			Math.floor(y)
		];
	};
	
	Class.prototype.toPixels = function(c) {
		var p = this.toRealCoord([c.i, c.j]);
		return {x:p[0], y:p[1]};
	};
	
	Class.prototype.fromPixels = function(coord) {
		var p = this.fromRealCoord([c.x, c.y]);
		return {i:p[0], j:p[1]};		
	};

	Class.prototype.paint = function() {
		paintLand(this);
		paintGrid(this);
		paintMousePosition(this);
		paintSelectedTile(this);

		var map = this;
		function repaint() {
			map.paint();
		}
		setTimeout(repaint, REPAINT_DELAI);
	};

	Class.prototype.onmousemove = function(event) {
		this.mousePosition.x = event.clientX - this.canvas.offsetLeft + window.pageXOffset;
		this.mousePosition.y = event.clientY - this.canvas.offsetTop + window.pageYOffset;
		//console.log(this.mousePosition.x, this.mousePosition.y);
		//console.log(fromRealCoord([mousePosition.x, mousePosition.y]));
	};

	Class.prototype.onclick = function(event) {
		this.mousePosition.x = event.clientX - this.canvas.offsetLeft + window.pageXOffset;
		this.mousePosition.y = event.clientY - this.canvas.offsetTop + window.pageYOffset;
		var c = this.fromRealCoord([this.mousePosition.x, this.mousePosition.y]);
		
		// 1er cas, l'utilisateur a selectionné l'outil de destruction 
		
		// 2ème cas, l'utilisateur a selectionné un objet dans la liste des terrains/batiments/... 
		
	};
	
	Class.prototype.onmousewheel = function(event) {
		if(event.shiftKey) {
			if(event.wheelDelta>0) {
				this.zoom *= 1.5;
			} else {
				this.zoom /= 1.5;
			}
			event.stopPropagation();
		}
	};
	
	
	function paintLand(map) {
		// Clear all the map
		map.context.clearRect(0, 0, map.canvas.width, map.canvas.height); // FIXME Ne devrait pas être ici, ce n'est pas seulement pour le décors qu'on nettoye le canvas  
		// Now, we can draw the map
		for(var y=0; y<map.height; y++) {
			for(var x=0; x<map.width; x++) {
				//map.tiles[y][x].paint(map, x, y);
				map.tiles[y][x].paint();
			}
		}
	}

	function paintGrid(map) {
		var c = undefined;
		map.context.lineWidth = 0.5;
		map.context.strokeStyle = "#ff0000";
		for ( var i = 0; i <= map.width; i++) {
			map.context.beginPath();
			c = map.toRealCoord([i, 0]);
			map.context.moveTo(c[0], c[1]);
			c = map.toRealCoord([i, map.height]);
			map.context.lineTo(c[0], c[1]);
			map.context.stroke();
		}
		for ( var i = 0; i <= map.height; i++) {
			map.context.beginPath();
			c = map.toRealCoord([0, i]);
			map.context.moveTo(c[0], c[1]);
			c = map.toRealCoord([map.width, i]);
			map.context.lineTo(c[0], c[1]);
			map.context.stroke();
		}
	}

	function paintMousePosition(map) {
		//if (map.mousePosition.x == 0 && map.mousePosition.y == 0) {
		//	return;
		//}
		
		var c = map.fromRealCoord([map.mousePosition.x, map.mousePosition.y]);
		var x = c[0];
		var y = c[1];
		//if(x < 0 || x > MAP_SIZE - 1 || y < 0 || y > MAP_SIZE - 1) {
		//	return;
		//}

		map.context.beginPath();
		c = map.toRealCoord([x, y]);
		map.context.moveTo(c[0], c[1]);
		c = map.toRealCoord([x + 1, y]);
		map.context.lineTo(c[0], c[1]);
		c = map.toRealCoord([x + 1, y + 1]); 
		map.context.lineTo(c[0], c[1]);
		c = map.toRealCoord([x, y + 1]);
		map.context.lineTo(c[0], c[1]);
		c = map.toRealCoord([x, y]);
		map.context.lineTo(c[0], c[1]);
		map.context.closePath();
		map.context.fillStyle = "red";
		map.context.globalAlpha = 0.5; // Transparence 
		map.context.fill(); // On remplit 
		map.context.globalAlpha = 1; // On la remet à sa valeur par défaut pour les copains 
	}

	function paintSelectedTile(map) {
		var c = map.fromRealCoord([map.mousePosition.x, map.mousePosition.y]);
		var x = c[0];
		var y = c[1];
		
		if(!map.selectedTile || x < 0 || x > MAP_SIZE - 1 || y < 0 || y > MAP_SIZE - 1) {
			return;
		}

		map.context.globalAlpha = 0.5; // Transparence 
		c = map.toRealCoord([x, y]);
		paintTileOnGrid(map.context, map.selectedTile, c[0], c[1]); 
		map.context.globalAlpha = 1; 
	}

	return Class;
}();

