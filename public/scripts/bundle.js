(function () {
	'use strict';

	function noop() {}

	function assign(target) {
		var k,
			source,
			i = 1,
			len = arguments.length;
		for (; i < len; i++) {
			source = arguments[i];
			for (k in source) target[k] = source[k];
		}

		return target;
	}

	function appendNode(node, target) {
		target.appendChild(node);
	}

	function insertNode(node, target, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function reinsertChildren(parent, target) {
		while (parent.firstChild) target.appendChild(parent.firstChild);
	}

	function createFragment() {
		return document.createDocumentFragment();
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function blankObject() {
		return Object.create(null);
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = this.get = noop;

		if (detach !== false) this._fragment.u();
		this._fragment.d();
		this._fragment = this._state = null;
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function dispatchObservers(component, group, changed, newState, oldState) {
		for (var key in group) {
			if (!changed[key]) continue;

			var newValue = newState[key];
			var oldValue = oldState[key];

			var callbacks = group[key];
			if (!callbacks) continue;

			for (var i = 0; i < callbacks.length; i += 1) {
				var callback = callbacks[i];
				if (callback.__calling) continue;

				callback.__calling = true;
				callback.call(component, newValue, oldValue);
				callback.__calling = false;
			}
		}
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			handlers[i].call(this, data);
		}
	}

	function get(key) {
		return key ? this._state[key] : this._state;
	}

	function init(component, options) {
		component._observers = { pre: blankObject(), post: blankObject() };
		component._handlers = blankObject();
		component._bind = options._bind;

		component.options = options;
		component.root = options.root || component;
		component.store = component.root.store || options.store;
	}

	function observe(key, callback, options) {
		var group = options && options.defer
			? this._observers.post
			: this._observers.pre;

		(group[key] || (group[key] = [])).push(callback);

		if (!options || options.init !== false) {
			callback.__calling = true;
			callback.call(this, this._state[key]);
			callback.__calling = false;
		}

		return {
			cancel: function() {
				var index = group[key].indexOf(callback);
				if (~index) group[key].splice(index, 1);
			}
		};
	}

	function on(eventName, handler) {
		if (eventName === 'teardown') return this.on('destroy', handler);

		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		this.root._lock = true;
		callAll(this.root._beforecreate);
		callAll(this.root._oncreate);
		callAll(this.root._aftercreate);
		this.root._lock = false;
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign({}, oldState, newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
			this._fragment.p(changed, this._state);
			dispatchObservers(this, this._observers.post, changed, this._state, oldState);
		}
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	function _unmount() {
		if (this._fragment) this._fragment.u();
	}

	var proto = {
		destroy: destroy,
		get: get,
		fire: fire,
		observe: observe,
		on: on,
		set: set,
		teardown: destroy,
		_recompute: noop,
		_set: _set,
		_mount: _mount,
		_unmount: _unmount,
		_differs: _differs
	};

	/* src/components/Page.html generated by Svelte v1.58.2 */

	function create_main_fragment(component, state) {
		var text, content, slot_content_default = component._slotted.default, p;

		document.title = state.title;

		return {
			c: function create() {
				text = createText("\n");
				content = createElement("content");
				if (!slot_content_default) {
					p = createElement("p");
					p.textContent = "This is an empty page.";
				}
				this.h();
			},

			h: function hydrate() {
				content.className = "page svelte-hvz6aa";
			},

			m: function mount(target, anchor) {
				insertNode(text, target, anchor);
				insertNode(content, target, anchor);
				if (!slot_content_default) {
					appendNode(p, content);
				}

				else {
					appendNode(slot_content_default, content);
				}
			},

			p: function update(changed, state) {
				if (changed.title) {
					document.title = state.title;
				}
			},

			u: function unmount() {
				detachNode(text);
				detachNode(content);

				if (slot_content_default) {
					reinsertChildren(content, slot_content_default);
				}
			},

			d: noop
		};
	}

	function Page(options) {
		init(this, options);
		this._state = assign({}, options.data);

		this._slotted = options.slots || {};

		this.slots = {};

		this._fragment = create_main_fragment(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(Page.prototype, proto);

	/* src/App.html generated by Svelte v1.58.2 */



	function create_main_fragment$1(component, state) {
		var text, h1, text_1, text_2, text_3;

		var page = new Page({
			root: component.root,
			slots: { default: createFragment() }
		});

		return {
			c: function create() {
				text = createText("\n  ");
				h1 = createElement("h1");
				text_1 = createText("Hey ");
				text_2 = createText(state.name);
				text_3 = createText("\n");
				page._fragment.c();
				this.h();
			},

			h: function hydrate() {
				h1.className = "svelte-vaprhm";
			},

			m: function mount(target, anchor) {
				appendNode(text, page._slotted.default);
				appendNode(h1, page._slotted.default);
				appendNode(text_1, h1);
				appendNode(text_2, h1);
				appendNode(text_3, page._slotted.default);
				page._mount(target, anchor);
			},

			p: function update(changed, state) {
				if (changed.name) {
					text_2.data = state.name;
				}
			},

			u: function unmount() {
				page._unmount();
			},

			d: function destroy$$1() {
				page.destroy(false);
			}
		};
	}

	function App(options) {
		init(this, options);
		this._state = assign({}, options.data);

		if (!options.root) {
			this._oncreate = [];
			this._beforecreate = [];
			this._aftercreate = [];
		}

		this._fragment = create_main_fragment$1(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			this._lock = true;
			callAll(this._beforecreate);
			callAll(this._oncreate);
			callAll(this._aftercreate);
			this._lock = false;
		}
	}

	assign(App.prototype, proto);

	var app = new App({
	  target: document.querySelector('main'),
	  data: {
	    name: 'test 1'
	  }
	});

}());
