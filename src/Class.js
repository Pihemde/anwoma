/*
function $s(instance) {
	return instance.__proto__.__proto__;
}

function $sc(instance, args) {
	var super_instance = $s(instance)
	return super_instance.constructor.apply(instance, args);
}

function $extends(Class, Parent) {
	Class.prototype.__proto__ = Parent.prototype;
	return Class;
}


var TestClass = function() {
	function Class(body, extend) {
		var Clazz = function () {
			if(typeof(extend) == 'function') {
				this.superclass = extend;
				this.prototype = extend;
				this.superclass();
				delete this.superclass;
			}
			if (typeof(body) == 'object') {
				for (property in body) {
					this[property] = body[property];
				}
			}
			if (typeof this.initilize == 'function') {
				this.initilize();
			}
		};
		return Clazz;
	}

	return Class
}
*/