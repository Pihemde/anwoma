


var Environnement = function() {
	var toLoad = [];
	var _callback = undefined;

	var Class = function(images, callback) {
		_callback = callback;
		for(var id in IMAGES) {
			toLoad.push(id);
		}
		loadImage();
	}

	function loadImage() {
		if(0 == toLoad.length) {
			return _callback();
		}
		var id = toLoad.pop();
		var path = IMAGES[id];
		IMAGES[id] = new Image();
		IMAGES[id].onload = loadImage;
		IMAGES[id].src = path;
	}

	return Class;
}();

