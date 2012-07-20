/**
 * Animator 
 */
var Animator = function() {
	/**
	 * Constructor
	 */
	var Animator = function(gcontext, images, size, position, offset, moving) {
		this.gcontext = gcontext;
		this.images = images;
		this.size = size;
		this.position = position;
		this.offset = offset || {x:0, y:0};
		this.stepOffset = moving?{x:58/images.length/2, y:30/images.length/2}:{x:0, y:0};
		this.id = -1;
	};
	
	Animator.prototype.play = function() {
		var image = this.images[this.next()];
		var offset = {
				x:this.offset.x + (this.id-1) * this.stepOffset.x,
				y:this.offset.y + (this.id-1) * this.stepOffset.y
		};
		this.gcontext.drawImage(image, this.size, this.position, offset);
	};
	
	Animator.prototype.next = function() {
		this.id += 1;
		if(this.id == this.images.length) {
			this.id = 0;
		}
		return this.id;
	}
	
	return Animator;
}();
