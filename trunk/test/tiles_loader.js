/**
 * Created by pierre-marie on 04/03/15.
 */

"use strict";

const MAP_FILE = {
	size: {
		l: 6,
		h: 6
	},
	tiles: [
		{
			x: 2,
			y: 3,
			l: 2,
			h: 2,
			object: "market"
		}
		/*{
			x: 0,
			y: 2,
			l: 1,
			h: 1,
			object: "grass"
		},
		{
			x: 0,
			y: 0,
			l: 1,
			h: 1,
			object: "grass"
		},
		{
			x: 0,
			y: 1,
			l: 1,
			h: 1,
			object: "grass"
		},
		{
			x: 1,
			y: 0,
			l: 1,
			h: 1,
			object: "grass"
		},
		{
			x: 0,
			y: 4,
			l: 1,
			h: 1,
			object: "grass"
		},
		{
			x: 0,
			y: 3,
			l: 1,
			h: 1,
			object: "grass"
		},
		{
			x: 1,
			y: 1,
			l: 1,
			h: 1,
			object: "grass"
		}*/
	]
};

function main() {
	let map = new Map(MAP_FILE);

	let firstTile = map.getFirstTile();

	console.log("first tile", firstTile);

	console.log(firstTile.backgroundNeighbourIterator.next().value);
	console.log(firstTile.backgroundNeighbourIterator.next().value);
	console.log(firstTile.backgroundNeighbourIterator.next().value);

	console.log(firstTile.foregroundNeighbourIterator.next().value);
	console.log(firstTile.foregroundNeighbourIterator.next().value);
	console.log(firstTile.foregroundNeighbourIterator.next().value);
}

main();