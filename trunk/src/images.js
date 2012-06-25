/*
 * Constants
 */

// Images root folder
IMAGES_FOLDER =  "../images/";

// Images path
GRASS1 = IMAGES_FOLDER + 'terrains/Land1a_00002.png';
GRASS2 = IMAGES_FOLDER + 'terrains/Land1a_00003.png';
GRASS3 = IMAGES_FOLDER + 'terrains/Land1a_00004.png';
INDICATOR1 = IMAGES_FOLDER + 'terrains/land3a_00092.png';
ROCK1 = IMAGES_FOLDER + 'terrains/land3a_00083.png';
GRANARY_BASE0 = IMAGES_FOLDER + 'grenier/Commerce_00140.png';
GRANARY_BASE1 = IMAGES_FOLDER + 'grenier/Commerce_00141.png';
GRANARY_STOCK0 = IMAGES_FOLDER + 'grenier/Commerce_00142.png';
GRANARY_STOCK1 = IMAGES_FOLDER + 'grenier/Commerce_00143.png';
GRANARY_STOCK2 = IMAGES_FOLDER + 'grenier/Commerce_00144.png';
GRANARY_STOCK3 = IMAGES_FOLDER + 'grenier/Commerce_00145.png';

function $i(path) {
	var img = new Image();
	img.src = path;
	return img;
}