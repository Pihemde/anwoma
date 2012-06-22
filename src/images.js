var IMAGES = {
	herbe1: {
		src: 'terrains/Land1a_00002.png',
		width: 1,
		height: 1
	},
	herbe2 :{
		src: 'terrains/Land1a_00003.png',
		width: 1,
		height: 1
	},
	herbe3: {
		src: 'terrains/Land1a_00004.png',
		width: 1,
		height: 1
	},
	panneau1: {
		src: 'terrains/land3a_00092.png',
		width: 1,
		height: 1,
		buildable: false
	},
	rocher1: {
		src: 'terrains/land3a_00083.png',
		width: 3,
		height: 3,
		buildable: false
	},
	grenierplein: {
		src: 'grenier/grenier-plein.png',
		width: 3,
		height: 2
	}
};

function preload(folder, callback) {
	var loadedImages = 0;
	var nbImages = 0;
	for(var i in IMAGES) {
		nbImages++;
		var image = IMAGES[i];
		object = new Image();
		object.onload = function() {
			if(++loadedImages >= nbImages) {
				callback();
			}
		}
		object.src = folder + image.src;
		image.object = object;
	}
}
