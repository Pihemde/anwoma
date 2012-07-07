/**
 * Animator 
 */
var Animator = function() {
	/**
	 * Constructor
	 */
	var Animator = function(gcontext, images, size, position, offset) {
		this.gcontext = gcontext;
		this.images = images;
		this.size = size;
		this.position = position;
		this.offset = offset;
		this.id = 0;
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
		var id = this.next();
		var image = this.images[id];
		this.gcontext.drawImage(image, this.size, this.position, this.offset);
//		this.gcontext.drawImage(this.images[this.next()], this.size, this.position, this.offset);
	};
	
	Animator.prototype.nextNumber = function() {
		this.id += 1;
		if(this.id >= this.lenght) {
			this.id = 0;
		}
		return this.id;
	}
	
	Animator.prototype.nextId = function() {
		return this.ids[this.nextNumber()];
	}
	
	return Animator;
}();
