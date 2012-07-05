/**
 * Some common stuffs 
 */

function setData(value, defaultValue) {
	if(undefined == value && undefined != defaultValue) {
		return defaultValue;
	}
	return value;
}