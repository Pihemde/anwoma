/**
 * Warehouse
 */
var Warehouse = function() { // FIXME Comment on fait pour hériter ?
	const
	SET = SETS['roman'];
	const
	POSITIONS = [
	// {x:0, y:-60}, // 0,0
	{
		x : 29,
		y : -45
	}, // 1,0
	{
		x : 58,
		y : -30
	}, // 2,0
	{
		x : -29,
		y : -45
	}, // 0,1
	{
		x : 0,
		y : -30
	}, // 1,1
	{
		x : 29,
		y : -15
	}, // 1,2
	{
		x : -58,
		y : -30
	}, // 0,0
	{
		x : -29,
		y : -15
	}, // 1,0
	{
		x : 0,
		y : 0
	} // 2,0
	];

	/**
	 * Constructor
	 * 
	 * @param gcontext
	 *            the graphical context
	 * @param position
	 *            absolute position object instance on the game board (first :
	 *            0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
		this.size = {
			width : 3,
			height : 3
		};
		this.goods = [];
	};

	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		/*
		 * Draw base images
		 */
		this.gcontext.drawImage(SET.WAREHOUSE_BASE, this.size, this.position, {
			x : 0,
			y : -60
		}); // 0,0
		this.gcontext.drawImage(SET.WAREHOUSE_ROOF, this.size, this.position, {
			x : 0,
			y : -70
		});

		/*
		 * Draw goods * stock
		 */
		for ( var i = 0; i < 9; i++) {
			this.paintSquare(this.goods[i], POSITIONS[i]);
		}
	};

	Class.prototype.paintSquare = function(good, offset) {
		var image = SET.WAREHOUSE_BASE;
		if (!!good && good.quantity > 0) {
			switch (good.type) {
			case GOOD_TYPE.WHEAT:
				image = SET.WAREHOUSE_WHEAT_4;
				break;
			case GOOD_TYPE.FISH:
				image = SET.WAREHOUSE_FISH_4;
				break;
			case GOOD_TYPE.MEAT:
				image = SET.WAREHOUSE_MEAT_4;
				break;
			case GOOD_TYPE.FRUIT:
				image = SET.WAREHOUSE_FRUIT_4;
				break;
			case GOOD_TYPE.VEGETABLE:
				image = SET.WAREHOUSE_VEGETABLE_4;
				break;
			case GOOD_TYPE.OLIVE:
				image = SET.WAREHOUSE_OLIVE_4;
				break;
			case GOOD_TYPE.OIL:
				image = SET.WAREHOUSE_OIL_4;
				break;
			case GOOD_TYPE.GRAPE:
				image = SET.WAREHOUSE_GRAPE_4;
				break;
			case GOOD_TYPE.WINE:
				image = SET.WAREHOUSE_WINE_4;
				break;
			case GOOD_TYPE.TIMBER:
				image = SET.WAREHOUSE_TIMBER_4;
				break;
			case GOOD_TYPE.FURNITURE:
				image = SET.WAREHOUSE_FURNITURE_4;
				break;
			case GOOD_TYPE.CLAY:
				image = SET.WAREHOUSE_CLAY_4;
				break;
			case GOOD_TYPE.POTTERY:
				image = SET.WAREHOUSE_POTTERY_4;
				break;
			case GOOD_TYPE.IRON:
				image = SET.WAREHOUSE_IRON_4;
				break;
			case GOOD_TYPE.WEAPON:
				image = SET.WAREHOUSE_WEAPON_4;
				break;
			case GOOD_TYPE.MARBLE:
				image = SET.WAREHOUSE_MARBLE_4;
				break;
			}
		}
		this.gcontext.drawImage(image, this.size, this.position, offset);
	}

	/*
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.serialize = function() {
		return {
			position : this.position,
		};
	};

	/*
	 * Set attributes from json object
	 */
	Class.prototype.unserialize = function(description) {
		this.position = description.position;
		this.goods = description.goods;
	};

	return Class;
}();
