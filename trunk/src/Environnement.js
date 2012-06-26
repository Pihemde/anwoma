var list = [];
var index = 0;
var callback = undefined;
var loadImage = function () {
	if(index == list.length) {
		return callback();
	}
	var id = list[index++];
	var path = IMAGES[id];
	IMAGES[id] = new Image();
	IMAGES[id].onload = loadImage;
	IMAGES[id].src = path;
}

function loadImages(cb) {
	callback = cb;
	var i = 0;
	for(var id in IMAGES) {
		list[i++] = id;
	}
	loadImage();
}