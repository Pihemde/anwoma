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

	function scanForRoad(grid, position, lenght, direction) {
		// FIXME rajouter les contrôles
		switch (direction) {
		case DIRECTION.HORIZONTAL:
			for ( var i = position.i; i <= position.i + lenght; i++) {
				if (!!grid[position.j][i][OBJECT_LAYER.BUILDING] && grid[position.j][i][OBJECT_LAYER.BUILDING] instanceof Road) {
					return grid[position.j][i][OBJECT_LAYER.BUILDING];
				}
			}
			break;
		case DIRECTION.VERTICAL:
			for ( var j = position.j; j <= position.j + lenght; j++) {
				if (!!grid[position.j][position.i][OBJECT_LAYER.BUILDING] && grid[j][position.i][OBJECT_LAYER.BUILDING] instanceof Road) {
					return grid[j][position.i];
				}
			}
			break;
		}
		return undefined;
	}

	Finder.prototype.findCommunicationRoad = function(building)
	{
		var road = scanForRoad(this.grid, {
			i : building.position.i,
			j : building.position.j - 1
		}, building.size.width, DIRECTION.HORIZONTAL);
		if(!!road) {
			return road;
		}
		road = scanForRoad(this.grid, {
			i : building.position.i,
			j : building.position.j + building.height
		}, building.size.width, DIRECTION.HORIZONTAL);
		if(!!road) {
			return road;
		}
		road = scanForRoad(this.grid, {
			i : building.position.i - 1,
			j : building.position.j
		}, building.size.height, DIRECTION.VERTICAL);
		if(!!road) {
			return road;
		}
		road = scanForRoad(this.grid, {
			i : building.position.i + building.width,
			j : building.position.j
		}, building.size.height, DIRECTION.VERTICAL);
		return road;
	};

	return Finder;
}();
