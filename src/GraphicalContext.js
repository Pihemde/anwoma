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
	var Class = function(canvas, width, height, orientation) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.width = width;
		this.height = height;
		this.angle = orientation*Math.PI/2 + Math.PI/4;
		this.zoom = 1;
		this.offsetX = 100;
		this.offsetY = 50;
		this.totoEnSlip = 666;
		this.mousePosition = {x : 0,y : 0};
		this.selectedTile = undefined;
		var gcontext = this;
		canvas.addEventListener('mousemove', function(event) {gcontext.onmousemove(event);}, false);
		canvas.addEventListener('click', function(event) {gcontext.onclick(event);}, false);
		canvas.addEventListener("mousewheel", function(event) {gcontext.onmousewheel(event);});
	};
	
	/**
	 * Clear canvas
	 */
	Class.prototype.clear = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};
	
	Class.prototype.drawImage = function(image, position, offset) {
		var c = this.toPixels(position);
		var x = c.x - SQUARE_WIDTH / 2 * this.zoom;
		var y = c.y + SQUARE_HEIGHT / 2;

		x += (SQUARE_WIDTH - image.width) * 0.5;
		y -= image.height * 0.5 + (image.height - SQUARE_HEIGHT) * 0.5;
		if(!!offset) {
			x += offset.x;
			y += offset.y;
		}
		this.context.drawImage(image, x, y);
	};
	
	Class.prototype.toRealCoord = function(coord) {
		// Centrage de la carte sur l'origine des axes
		var x = coord[0] - this.width /2;
		var y = coord[1] - this.height/2;
		// Rotation pour orienter la carte dans le bon sens
		// TODO: Prendre en comte la direction N/E/S/W
		var transform = Matrix.Rotation(this.angle);
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
		// Déplacement de la carte pour la centrer correctement
		var x = coord[0] - this.offsetX - this.canvas.width/2;
		var y = coord[1] - this.offsetY - this.canvas.height/2;
		// Etirement de la ccarte pour s'adapter à la taille des images
		x = x / SQUARE_WIDTH  * Math.sqrt(2) / this.zoom;
		y = y / SQUARE_HEIGHT * Math.sqrt(2) / this.zoom;
		// Rotation pour orienter la carte dans le bon sens
		// TODO: Prendre en comte la direction N/E/S/W
		var transform = Matrix.Rotation(-this.angle);
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
		
	return Class;
}();
