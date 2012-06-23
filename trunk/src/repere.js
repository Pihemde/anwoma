
function toRealCoord(coord) {
	var angle = Math.PI/4;

	var transform = Matrix.Rotation(angle);
	var coord = $M([[coord[0]], [coord[1]]]);
	coord = transform.multiply(coord);
	
	return [coord.elements[0][0] / Math.sqrt(2) * 58, coord.elements[1][0] / Math.sqrt(2) * 30];
}
function run() {
	console.log(toRealCoord([0, 1]));
}


