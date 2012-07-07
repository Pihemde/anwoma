function $s(instance) {
	return instance.__proto__.__proto__;
}

function $sc(instance, args) {
	return $s(instance).constructor.apply(instance, args);
}

function $extends(Class, Parent) {
	Class.prototype.__proto__ = Parent.prototype;
	return Class;
}

