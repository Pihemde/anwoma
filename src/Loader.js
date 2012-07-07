var Loader = function(){
	function Loader() {
		var body = document.getElementsByTagName("body")[0];
		var div = document.createElement("div");
		div.setAttribute("class", "progressbar");
		this.div = document.createElement("div");
		this.div.setAttribute("class", "progression");
		div.appendChild(this.div);
		body.appendChild(div);
		this.counter = 0;
		this.count = 0;

/*
		this.counter = 1000;
		this.count = this.counter;
		//TODO: just remove (used for test)
		var instance = this;
		var interval = setInterval(function() {
			instance.count--;
			progress(instance);
			if(instance.count == 0) {
				main();
			}
			if(instance.count == 0) clearInterval(interval);
		}, 1);
//*/
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
					progress(loader);
					if(loader.count == 0) {
						callback();
					}
				};
				set[i].src = src;
			}
		}
	}

	function progress(loader) {
		var progress = Math.round((1-loader.count/loader.counter)*100);
		loader.div.innerHTML = progress+"%";
		loader.div.style.width = progress+"%";
		if(progress==100) {
			setTimeout(function() {
				loader.div.parentNode.className = "progressbar hide";
			}, 500);
		}
	}

	return Loader;

}();