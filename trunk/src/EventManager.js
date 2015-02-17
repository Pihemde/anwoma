var EventManager = function(){
	
	function EventManager() {
		this.listeners = {};
	}

	EventManager.EVENT_TYPE = {
			ROTATE: "rotate",
			MOVE: "move",
			CLICK: "click",
			ZOOM: "zoom",
			MOUSE_DOWN: "mousedown",
			MOUSE_UP: "mouseup",
			ACTIVATE: "activate",
			PAINT: "paint"
	};

	EventManager.prototype.addEventListener = function(eventType, callback, object) {
		var listeners = this.listeners[eventType];
		if(!listeners) {
			listeners = [];
			this.listeners[eventType] = listeners;
		}
		listeners.push({callback: callback, object: object}); 
	};

	EventManager.prototype.fireEvent = function(eventType, event) {
		var listeners = this.listeners[eventType];
		if(!!listeners) {
			for(var i=0; i<listeners.length; i++) {
				var listener = listeners[i];
				if(listener.object) {
					listener.callback.apply(listener.object, [event]);
				} else {
					listener.callback(event);
				}
			}
		}
	};

	return EventManager;
}();