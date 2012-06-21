var IMAGES = [
	{
		name: 'herbe1',
		src: 'terrains/Land1a_00002.png',
		width: 1,
		height: 1
	},
	{
		name: 'herbe2',
		src: 'terrains/Land1a_00003.png',
		width: 1,
		height: 1
	},
	{
		name: 'herbe3',
		src: 'terrains/Land1a_00004.png',
		width: 1,
		height: 1
	}
];

function preload(folder, callback) {
	var loadedImages = 0;
	for(var i = 0 ; i < IMAGES.length ; i++) {
		var image = IMAGES[0];
		object = new Image();
		object.onload = function() {
			if(++loadedImages >= IMAGES.length) {
				callback();
			}
		}
		object.src = folder + image.src;
		image.object = object;
	}
}
