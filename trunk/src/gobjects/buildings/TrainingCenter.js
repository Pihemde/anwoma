/**
 * TrainingCenter 
 */
var TrainingCenter = function() {
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 */
	var TrainingCenter = function(context) {
		GraphicalObject.call(this, context, {width: 3, height: 3});
		this.lion = undefined;
	};
	TrainingCenter.prototype = Object.create(GraphicalObject.prototype);
	TrainingCenter.prototype.constructor = TrainingCenter;
	
	/**
	 * Retrieve a JSON string to save object state
	 */
	TrainingCenter.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/**
	 * Set attributes from json object
	 */
	TrainingCenter.prototype.unserialize = function(description) {
		this.position = description.position;
	};
	
	TrainingCenter.prototype.activate = function() {
		if(this.lion == undefined) { 
			var road = finder.findCommunicationRoad(this);
			if(!!road) {
				this.lion = new Lion(this.context);
				this.lion.unserialize({position: {i:road.position.i, j:road.position.j}});
				this.lion.load();
				board.addCharacter(this.lion);
			}
		}
	}

	/**
	 * Retrieve painting position
	 */
	TrainingCenter.prototype.load = function() {
		this.animator = new Animator(this.context.gcontext, SET.TRAINING_CENTER.ANIMATION, this.size, this.position, {x:25, y:-12});
		return {
			i: this.position.i + 1,
			j: this.position.j + 1
		};
	};
	
	/**
	 * Draw object on canvas
	 */
	TrainingCenter.prototype.paint = function() {
		this.context.gcontext.drawImage(SET.TRAINING_CENTER.BASE, this.size, this.position);
		this.animator.play();
	};

	return TrainingCenter;
}();
