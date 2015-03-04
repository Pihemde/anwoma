/**
 * Created by pierre-marie on 04/03/15.
 */

"use strict";

let Map = (function() {
	function MapClass({size, tiles}) {
		this.l = size.l;
		this.h = size.h;
		this.tiles = tiles.map(function(tile) {
			return new Tile(tile, {l: this.l, h: this.h});
		}, this);
		this.firstTile = this.tiles.reduce(function(previous, current) {
			if(previous.before(current)) {
				return previous;
			}
			return current;
		});
	}

	MapClass.prototype.getFirstTile = function() {
		return this.firstTile;
	};

	return MapClass;
})();