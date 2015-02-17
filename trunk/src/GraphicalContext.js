/**
 * GraphicalContext 
 */
var GraphicalContext = function() {
	const SQUARE_WIDTH = 58;
	const SQUARE_HEIGHT = 30;

	/**
	 * Constructor
	 * @param canvas canvas
	 */
	var GraphicalContext = function(eventManager, canvas, width, height, orientation) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.preRenderCanvas = document.createElement("canvas");
		this.preRenderCanvas.width = canvas.width;
		this.preRenderCanvas.height = canvas.height;
		//this.preRenderContext = this.preRenderCanvas.getContext("2d");
		this.preRenderContext = canvas.getContext("2d");
		this.width = width;
		this.height = height;
		this.orientation = orientation;
		this.angle = orientation*Math.PI/2 + Math.PI/4
		this.zoom = 1;
		this.offset = {x: 0, y: 0};
		this.mousePosition = {x : 0, y : 0};
		this.selectedTile = undefined;
		this.eventManager = eventManager;
		var gcontext = this;
		canvas.addEventListener('mousemove', function(event) {gcontext.onmousemove(event);}, false);
		canvas.addEventListener('click', function(event) {gcontext.onclick(event);}, false);
		canvas.addEventListener("mousewheel", function(event) {gcontext.onmousewheel(event);}, false);
		canvas.addEventListener("DOMMouseScroll", function(event) {gcontext.onmousewheelff(event);}, false);
		canvas.addEventListener("mouseup", function(event) {gcontext.onmouseup(event);}, false);
		canvas.addEventListener("mousedown", function(event) {gcontext.onmousedown(event);}, false);
	};
	
	GraphicalContext.prototype.render = function() {
		//this.context.clearRect(0, 0, this.preRenderCanvas.width, this.preRenderCanvas.height);
		//this.context.drawImage(this.preRenderCanvas, 0, 0);
	}
	
	GraphicalContext.prototype.changeOrientation = function(orientation) {
		this.orientation = orientation;
		this.angle = orientation*Math.PI/2 + Math.PI/4;
		this.fireEvent(EventManager.EVENT_TYPE.ROTATE, {orientation: orientation});
	};
	
	/**
	 * Clear canvas
	 */
	GraphicalContext.prototype.clear = function() {
		this.preRenderContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};
	
	GraphicalContext.prototype.drawSquare = function(position, size, data) {
		var x = position.i;
		var y = position.j;
		this.preRenderContext.beginPath();
		c = this.position2Coord({i:x, j:y});
		this.preRenderContext.moveTo(c.x, c.y);
		c = this.position2Coord({i:x+size.width, j:y});
		this.preRenderContext.lineTo(c.x, c.y);
		c = this.position2Coord({i:x+size.width, j:y+size.height}); 
		this.preRenderContext.lineTo(c.x, c.y);
		c = this.position2Coord({i:x, j:y+size.height});
		this.preRenderContext.lineTo(c.x, c.y);
		c = this.position2Coord({i:x, j:y});
		this.preRenderContext.lineTo(c.x, c.y);
		this.preRenderContext.closePath();
		if(!data) {
			this.preRenderContext.fill(); // On remplit 
		} else {
			if(!!data.color) this.preRenderContext.fillStyle = data.color;
			if(!!data.alpha) this.preRenderContext.globalAlpha = data.alpha; // Transparence 
			this.preRenderContext.fill(); // On remplit 
			if(!!data.alpha) this.preRenderContext.globalAlpha = 1; // On la reset pour les copains 
		}
	}

	GraphicalContext.prototype.drawImage = function(image, size, position, offset) {
		if(!(image instanceof Image)) return;
		var width = image.width * this.zoom;
		var height = image.height * this.zoom;

		var i = position.i;
		var j = position.j;

		i += Math.floor(((this.orientation+2)%4)/2) * (size.width - 2) + 1;
		j += Math.floor(((this.orientation+3)%4)/2) * (size.height - 2) + 1;

		var c = this.position2Coord({i:i,j:j});
		
		var x = c.x - SQUARE_WIDTH / 2 * this.zoom;
		var y = c.y + SQUARE_HEIGHT / 2 * this.zoom;

		x += (SQUARE_WIDTH - image.width) * 0.5 * this.zoom;
		y -= image.height * 0.5 * this.zoom + (image.height - SQUARE_HEIGHT) * 0.5 * this.zoom;
		if(!!offset) {
			x += offset.x * this.zoom;
			y += offset.y * this.zoom;
		}
		this.preRenderContext.drawImage(image, x, y, width, height);
	};

	GraphicalContext.prototype.isVisible = function(gobject) {
		var position = gobject.position;
		if(!position) return false;
		var size = gobject.size;
		var c = this.position2Coord({i: position.i, j: position.j});
		if(c.x>0 && c.y>0 && c.x<this.canvas.width && c.y<this.canvas.height) return true;
		c = this.position2Coord({i: position.i+size.width, j: position.j});
		if(c.x>0 && c.y>0 && c.x<this.canvas.width && c.y<this.canvas.height) return true;
		c = this.position2Coord({i: position.i+size.width, j: position.j+size.height});
		if(c.x>0 && c.y>0 && c.x<this.canvas.width && c.y<this.canvas.height) return true;
		c = this.position2Coord({i: position.i, j: position.j+size.height});
		if(c.x>0 && c.y>0 && c.x<this.canvas.width && c.y<this.canvas.height) return true;
		return false;
	}

	GraphicalContext.prototype.addEventListener = function(eventType, callback, object) {
		this.eventManager.addEventListener(eventType, callback, object);
	}

	GraphicalContext.prototype.fireEvent = function(eventType, event) {
		this.eventManager.fireEvent(eventType, event);
	}

	GraphicalContext.prototype.position2Coord = function(coord) {
		var x = coord.i;
		var y = coord.j;

		// Hack for adjusting values
		//x -= Math.floor(((this.orientation+0)%4)/2);
		//y -= Math.floor(((this.orientation+1)%4)/2);

		// Centrage de la carte sur l'origine des axes
		x -= this.width /2;
		y -= this.height/2;
		// Rotation pour orienter la carte dans le bon sens
		// TODO: Prendre en comte la direction N/E/S/W
		var transform = Matrix.Rotation(this.angle);
		var matrix = $M([[x], [y]]);
		matrix = transform.multiply(matrix);
		// Etirement de la carte pour s'adapter à la taille des images 
		x = matrix.elements[0][0] / Math.sqrt(2) * SQUARE_WIDTH  * this.zoom;
		y = matrix.elements[1][0] / Math.sqrt(2) * SQUARE_HEIGHT * this.zoom;
		// Déplacement de la carte pour la centrer correctement
		x += this.canvas.width /2;
		y += this.canvas.height/2;
		x += this.offset.x * this.zoom;
		y += this.offset.y * this.zoom;
		// Optim pour faire référence a des pixels entier
	//	x = Math.round(x);
	//	y = Math.round(y);
		return {x: x, y: y};
	};

	GraphicalContext.prototype.coord2Position = function(coord) {
		var x = coord.x
		var y = coord.y;
		// Déplacement de la carte pour la centrer correctement
		x -= this.offset.x * this.zoom;
		y -= this.offset.y * this.zoom;

		x -= this.canvas.width/2;
		y -= this.canvas.height/2;

		// Etirement de la carte pour s'adapter à la taille des images
		x = x / SQUARE_WIDTH  * Math.sqrt(2) / this.zoom;
		y = y / SQUARE_HEIGHT * Math.sqrt(2) / this.zoom;
		// Rotation pour orienter la carte dans le bon sens
		// TODO: Prendre en comte la direction N/E/S/W
		var transform = Matrix.Rotation(-this.angle);
		var matrix = $M([[x], [y]]);
		matrix = transform.multiply(matrix);
		x = matrix.elements[0][0];
		y = matrix.elements[1][0];
		// Centrage de la carte sur l'origine des axes
		x += this.width/2;
		y += this.height/2;
		// Hack for adjusting values
/*
		x += Math.floor(((this.orientation+0)%4)/2);
		y += Math.floor(((this.orientation+1)%4)/2);
*/

		x = Math.floor(x);
		y = Math.floor(y);
		return {
			i: x,
			j: y
		};
	};

	GraphicalContext.prototype.onmousemove = function(event) {
		var evt = event || window.event;
		var x = event.clientX - this.canvas.offsetLeft + window.pageXOffset;
		var y = event.clientY - this.canvas.offsetTop + window.pageYOffset;

		var c = this.coord2Position({x: x, y: y});
		if(!this.mousePosition || this.mousePosition.i != c.i || this.mousePosition.j != c.j) {
			this.mousePosition = c;
			this.fireEvent(EventManager.EVENT_TYPE.MOVE, {position: this.mousePosition});
		}


		if(!!this.moveMap) {
			this.offset.x += (evt.clientX - this.moveMap.x) / this.zoom;
			this.offset.y += (evt.clientY - this.moveMap.y) / this.zoom;
			this.moveMap = {x: evt.clientX, y: evt.clientY};
		}
	};

	GraphicalContext.prototype.onclick = function(event) {
		var x = event.clientX - this.canvas.offsetLeft + window.pageXOffset;
		var y = event.clientY - this.canvas.offsetTop + window.pageYOffset;
		var c = this.coord2Position({x: x, y: y});

		this.fireEvent(EventManager.EVENT_TYPE.CLICK, {position: c});
	};
	
	GraphicalContext.prototype.onmousewheel = function(event) {
		if(event.shiftKey) {
			this.onzoom(event.wheelDelta>0);
			event.preventDefault();
			event.stopPropagation();
		}
	};
	
	GraphicalContext.prototype.onmousewheelff = function(event) {
		if(event.altKey) {
			this.onzoom(event.wheelDelta <= 0 || event.detail > 0 );
			event.preventDefault();
			event.stopPropagation();
		}
	};
	
	GraphicalContext.prototype.onzoom = function(isZoomIn) {
			var step = 1.1;
			var tmp = this.zoom;
			if (isZoomIn) {
				tmp *= step;
			} else {
				tmp /= step;
			}
			if(tmp < 0.1) tmp = 0.1;
			else if(tmp > 10) tmp = 10;
			if(tmp != this.zoom) {
				this.zoom = tmp;
				var x = event.clientX - this.canvas.offsetLeft + window.pageXOffset;
				var y = event.clientY - this.canvas.offsetTop + window.pageYOffset;
				var c = this.coord2Position({x: x, y: y});
				this.fireEvent(EventManager.EVENT_TYPE.ZOOM, {position: c});
			}
	};

	GraphicalContext.prototype.onmousedown = function(event) {
		var evt = event || window.event;
		if(event.button==1) { // Middle click
			this.moveMap = {x: evt.clientX, y: evt.clientY}; // FIXME Type mismatch: cannot convert from ___anonymous9364_9395 to ___anonymous7961_7992
		}
		var x = event.clientX - this.canvas.offsetLeft + window.pageXOffset;
		var y = event.clientY - this.canvas.offsetTop + window.pageYOffset;
		var c = this.coord2Position({x: x, y: y});
		this.fireEvent(EventManager.EVENT_TYPE.MOUSE_DOWN, {position: c});
	};

	GraphicalContext.prototype.onmouseup = function(event) {
		this.moveMap = undefined;
		var x = event.clientX - this.canvas.offsetLeft + window.pageXOffset;
		var y = event.clientY - this.canvas.offsetTop + window.pageYOffset;
		var c = this.coord2Position({x: x, y: y});
		this.fireEvent(EventManager.EVENT_TYPE.MOUSE_UP, {position: c});
	};
		
	return GraphicalContext;
}();
