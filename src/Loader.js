var Loader = function(){
	function Loader() {
		var body = document.getElementsByTagName("body")[0];
		var div = document.createElement("div");
		div.setAttribute("class", "progressbar");
		this.div = document.createElement("div");
		this.div.setAttribute("class", "progression");
		div.appendChild(this.div);
		body.appendChild(div);
		this.imageCount = 0;
		this.remainingImageToLoadCount = 0;

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
			if(typeof set[i] == "string") {
				this.imageCount++;
				this.remainingImageToLoadCount++;
				var loader = this;
				var src = set[i];
				set[i] = new Image();
				set[i].onload = function() {
					loader.remainingImageToLoadCount--;
					progress(loader);
					if(loader.remainingImageToLoadCount == 0 && !!callback) {
						callback();
					}
				};
				set[i].src = src;
			} else {
//				console.log(set[i]);
				this.loadImage(set[i], callback);
			}
		}
	}

	function progress(loader) {
		var progress = Math.round((1-loader.remainingImageToLoadCount/loader.imageCount)*100);
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