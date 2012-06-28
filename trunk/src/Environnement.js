/**
 * Environnement give access to a set of images corresponding to, for example, a civilization. 
 */
var Environnement = function() {
	var _environnement = undefined;

	var Class = function(name) {
		this.set = SETS[name];
		this.ids = [];
		_environnement = this;
	}
	
	/**
	 * Load images in the set 
	 */
	Class.prototype.loadSet = function (callback) {
		this.callback = callback;
		for(var id in this.set) {
			this.ids.push(id);
		}
		loadImage();
	}

	/*
	 *  
	 */
	var loadImage = function () {
		if(0 == _environnement.ids.length) {
			return _environnement.callback();
		}
		var id = _environnement.ids.pop();
		var path = _environnement.set[id];
		_environnement.set[id] = new Image();
		_environnement.set[id].onload = loadImage;
		_environnement.set[id].src = path;
	}

	return Class;
}();

