/**
 * Environnement give access to a set of images corresponding to, for example, a civilization. 
 */
var Environnement = function() {

	var Environnement = function(name) {
		this.name = name;
		this.counter = 0;
		this.set = {};
	}
	
	/**
	 * Load images in the set 
	 */
	Environnement.prototype.loadSet = function (callback) {
		this.callback = callback;
		new Loader().loadImage(SETS[this.name], callback);
	}

	return Environnement;
}();

