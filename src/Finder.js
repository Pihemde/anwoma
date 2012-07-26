/**
 * Finder
 */
var Finder = function() {
	/**
	 * Constructor
	 */
	var Finder = function(grid) {
		this.grid = grid;
	};

	Finder.prototype.findCommunicationRoad = function(building)
	{
		var road = this.scanForRoad({
			i : building.position.i,
			j : building.position.j - 1
		}, building.size.width, DIRECTION.HORIZONTAL);
		if(!!road) {
			return road;
		}
		road = this.scanForRoad({
			i : building.position.i,
			j : building.position.j + building.size.height
		}, building.size.width, DIRECTION.HORIZONTAL);
		if(!!road) {
			return road;
		}
		road = this.scanForRoad({
			i : building.position.i - 1,
			j : building.position.j
		}, building.size.height, DIRECTION.VERTICAL);
		if(!!road) {
			return road;
		}
		road = this.scanForRoad({
			i : building.position.i + building.size.width,
			j : building.position.j
		}, building.size.height, DIRECTION.VERTICAL);
		return road;
	};

	Finder.prototype.scanForRoad = function(position, lenght, direction) {
		switch (direction) {
		case DIRECTION.HORIZONTAL:
			var j = position.j;
			for ( var i = position.i; i <= position.i + lenght; i++) {
				if (!!this.grid[j][i] && this.isRoad(i, j)) {
					return this.grid[j][i].gObject;
				}
			}
			break;
		case DIRECTION.VERTICAL:
			var i = position.i;
			for ( var j = position.j; j <= position.j + lenght; j++) {
				if (!!this.grid[j][i] && this.isRoad(i, j)) {
					return this.grid[j][i].gObject;
				}
			}
			break;
		}
		return undefined;
	}

	Finder.prototype.isRoad = function(i, j) {
		result = i >= 0 && j >= 0 && i < MAP_SIZE.width && j < MAP_SIZE.height && this.grid[j][i].gObject instanceof Road;
		return result;
	}

	return Finder;
}();
