var Loader = function(){
	function Loader() {
		var body = document.getElementsByTagName("body")[0];
		this.div = document.createElement("div");
		this.div.setAttribute("class", "progression");
		body.appendChild(this.div);
		this.counter = 0;
		this.count = 0;
	}

	/*
	 *  
	 */
	Loader.prototype.loadImage = function(set, callback) {
		for(var i in set) {
			if(set[i] instanceof Array) {
				loadImage(set[i], callback);
			} else {
				this.counter++;
				this.count++;
				var loader = this;
				var src = set[i];
				set[i] = new Image();
				set[i].onload = function() {
					loader.count--;
					loader.div.innerText = Math.round((1-loader.count/loader.counter)*100)+"%";
					if(loader.count == 0) {
						callback();
					}
				};
				set[i].src = src;
			}
		}
	}

	return Loader;

}();