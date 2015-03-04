/**
 * Created by pierre-marie on 04/03/15.
 */

"use strict";

function* generateRightBackgroundNeighbour(position, size, mapSize) {
	if(position.x + size.l < mapSize.l) {
		for (let i = position.y; i < position.y + size.h; i++) {
			yield {x: position.x + size.l, y: i};
		}
	}
}

function* generateRightForegroundNeighbour(position, size, mapSize) {
	if(position.y + size.h < mapSize.h) {
		for (let i = position.x + size.l - 1; i >= position.x; i--) {
			yield {x: i, y: position.y + size.h};
		}
	}
}

var Tile = (function() {
	function TileClass({x, y, l, h, object}, mapSize) {
		this.x = x;
		this.y = y;
		this.l = l;
		this.h = h;
		this.object = object;
		this.backgroundNeighbourIterator = generateRightBackgroundNeighbour({x: x, y: y}, {l: l, h: h}, mapSize);
		this.foregroundNeighbourIterator = generateRightForegroundNeighbour({x: x, y: y}, {l: l, h: h}, mapSize);
	}
	
	TileClass.prototype.before = function(anotherTile) {
		if(this.x < anotherTile.x) {
			return true;
		}
		if(this.x > anotherTile.x) {
			return false;
		}
		if(this.y < anotherTile.y) {
			return true;
		}
		if(this.y > anotherTile.y) {
			return false;
		}
		return false; // same position
	};

	return TileClass;
})();