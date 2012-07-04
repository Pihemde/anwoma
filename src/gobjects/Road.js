/**
 * Road 
 */
var Road = function() { // FIXME Comment on fait pour hériter ?
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
		this.clazz = 'Road';
		this.size = {width: 1, height: 1};
	};
	
	Class.prototype.init = function(grid) {
		this.grid = grid;
	}
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		var type = this.computeType();
		var name = 'ROAD_SOIL_' + type;
		this.gcontext.drawImage(SET[name], this.size, this.position);
	};
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.computeType = function() {
		var p = this.position;
		var type = '';
		if(this.isRoad(p.i + 1, p.j)) {
			type += 'E';
		}
		if(this.isRoad(p.i, p.j - 1)) {
			type += 'N';
		}
		if(this.isRoad(p.i, p.j + 1)) {
			type += 'S';
		}
		if(type.length == 0 || this.isRoad(p.i - 1, p.j)) {
			type += 'W';
		}
		return type;
	};
	
	Class.prototype.isRoad = function(i, j) {
		return i >= 0 && j >= 0 && i < MAP_SIZE.width && j < MAP_SIZE.height && !!this.grid[j][i].clazz && this.grid[j][i].clazz == 'Road';
	}
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/*
	 * Set attributes from json object
	 */
	Class.prototype.unserialize = function(description) {
		this.position = description.position;
	};
		
	return Class;
}();
