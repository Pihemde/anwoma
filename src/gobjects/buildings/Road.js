/**
 * Road 
 */
var Road = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	function Road(context) {
		GraphicalObject.call(this, context, {width: 1, height: 1});
		this.clazz = 'Road';
		this.orientation = ORIENTATION.N; 
		this.context.eventManager.addEventListener("rotate", this.onrotate, this);
	};
	Road.prototype = Object.create(GraphicalObject.prototype);
	Road.prototype.constructor = Road;
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	Road.prototype.serialize = function () {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	Road.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	/**
	 * Retrieve painting position
	 */
	Road.prototype.load = function() {
		return this.position;
	};
	
	Road.prototype.activate = function() {
//		if(!this.type)
		{
		this.type = this.computeType();
		}
	}
	
	/**
	 * Draw object on canvas
	 */
	Road.prototype.paint = function() {
		this.context.gcontext.drawImage(SET['ROAD_SOIL_' + this.type], this.size, this.position);
	};
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	Road.prototype.computeType = function() {
		var p = this.position;
		if(p.i==1 && p.j==6) {
			console.log("break");
		}
		var type = '';
		var o = this.orientation;
		if(finder.isRoad(p.i + Math.round(Math.cos((0-o)*Math.PI/2)), p.j + Math.round(Math.sin((0-o)*Math.PI/2)))) {
			type += 'E';
		}
		if(finder.isRoad(p.i + Math.round(Math.cos((3-o)*Math.PI/2)), p.j + Math.round(Math.sin((3-o)*Math.PI/2)))) {
			type += 'N';
		}
		if(finder.isRoad(p.i + Math.round(Math.cos((1-o)*Math.PI/2)), p.j + Math.round(Math.sin((1-o)*Math.PI/2)))) {
			type += 'S';
		}
		if(finder.isRoad(p.i + Math.round(Math.cos((2-o)*Math.PI/2)), p.j + Math.round(Math.sin((2-o)*Math.PI/2)))) {
			type += 'W';
		}
		if(type.length == 0) {
			type = 'N';
		}
		return type;
	};
	
	Road.prototype.onrotate = function(event) {
		this.orientation = event.orientation;
		this.type = this.computeType();
	};
		
	return Road;
}();
