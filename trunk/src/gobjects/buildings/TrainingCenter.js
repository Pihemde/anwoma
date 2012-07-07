/**
 * TrainingCenter 
 */
var TrainingCenter = function() { // FIXME Comment on fait pour hériter ?
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var TrainingCenter = function(gcontext) {
		$sc(this, [gcontext, {width: 3, height: 3}]);
		this.counter = 0;
	};
	
	/**
	 * Draw object on canvas
	 */
	TrainingCenter.prototype.paint = function(p) {
		if(this.position.i + 1 == p.i && this.position.j + 1 == p.j) {
			this.gcontext.drawImage(SET.TRAINING_CENTER_BASE, this.size, this.position);
			this.gcontext.drawImage(SET['TRAINING_CENTER_ANIMATION_' + this.counter], this.size, this.position, {x:15, y:-10});
			if(this.counter >= 17) {
				this.counter = 0;
			} else {
				this.counter++;
			}
		}
	};
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	TrainingCenter.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/*
	 * Set attributes from json object
	 */
	TrainingCenter.prototype.unserialize = function(description) {
		this.position = description.position;
	};

	return $extends(TrainingCenter, GraphicalObject);
}();
