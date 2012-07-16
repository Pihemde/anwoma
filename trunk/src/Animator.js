/**
 * Animator 
 */
var Animator = function() {
	/**
	 * Constructor
	 */
	var Animator = function(gcontext, images, size, position, offset, stepOffset) {
		this.gcontext = gcontext;
		this.images = images;
		this.size = size;
		this.position = position;
		this.offset = offset || {x:0, y:0};
		this.stepOffset = stepOffset || {x:0, y:0};
		this.id = -1;
		this.next = this.nextNumber;
	};
	
	Animator.prototype.initIds = function(prefix, lenght) {
		this.ids = new Array();
		for(var i = 0 ; i < lenght ; i++) {
			this.ids.push(prefix + i);
		}		
		this.lenght = lenght;
		this.next = this.nextId;
	}
	
	Animator.prototype.play = function() {
		var image = this.images[this.next()];
		var offset = {
				x:this.offset.x + this.id * this.stepOffset.x,
				y:this.offset.y + this.id * this.stepOffset.y
		};
		this.gcontext.drawImage(image, this.size, this.position, offset);
	};
	
	Animator.prototype.nextNumber = function() {
		this.id += 1;
		if(this.id == this.lenght) {
			this.id = 0;
		}
		return this.id;
	}
	
	Animator.prototype.nextId = function() {
		return this.ids[this.nextNumber()];
	}
	
	return Animator;
}();
