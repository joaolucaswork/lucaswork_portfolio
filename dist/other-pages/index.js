"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/Global-Codes/global.ts
  var global = () => {
    function toggleTheme() {
      const currentTheme = document.body.getAttribute("element-theme");
      const newTheme = currentTheme === "1" ? "2" : "1";
      document.body.setAttribute("element-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
    window.addEventListener("load", function() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.body.setAttribute("element-theme", savedTheme);
      }
    });
    const changeModeLink = document.querySelector(".change-mode");
    changeModeLink.addEventListener("click", function(event) {
      event.preventDefault();
      toggleTheme();
    });
  };

  // node_modules/.pnpm/muuri@0.9.5/node_modules/muuri/dist/muuri.module.js
  var GRID_INSTANCES = {};
  var ITEM_ELEMENT_MAP = typeof Map === "function" ? /* @__PURE__ */ new Map() : null;
  var ACTION_SWAP = "swap";
  var ACTION_MOVE = "move";
  var EVENT_SYNCHRONIZE = "synchronize";
  var EVENT_LAYOUT_START = "layoutStart";
  var EVENT_LAYOUT_END = "layoutEnd";
  var EVENT_LAYOUT_ABORT = "layoutAbort";
  var EVENT_ADD = "add";
  var EVENT_REMOVE = "remove";
  var EVENT_SHOW_START = "showStart";
  var EVENT_SHOW_END = "showEnd";
  var EVENT_HIDE_START = "hideStart";
  var EVENT_HIDE_END = "hideEnd";
  var EVENT_FILTER = "filter";
  var EVENT_SORT = "sort";
  var EVENT_MOVE = "move";
  var EVENT_SEND = "send";
  var EVENT_BEFORE_SEND = "beforeSend";
  var EVENT_RECEIVE = "receive";
  var EVENT_BEFORE_RECEIVE = "beforeReceive";
  var EVENT_DRAG_INIT = "dragInit";
  var EVENT_DRAG_START = "dragStart";
  var EVENT_DRAG_MOVE = "dragMove";
  var EVENT_DRAG_SCROLL = "dragScroll";
  var EVENT_DRAG_END = "dragEnd";
  var EVENT_DRAG_RELEASE_START = "dragReleaseStart";
  var EVENT_DRAG_RELEASE_END = "dragReleaseEnd";
  var EVENT_DESTROY = "destroy";
  var HAS_TOUCH_EVENTS = "ontouchstart" in window;
  var HAS_POINTER_EVENTS = !!window.PointerEvent;
  var HAS_MS_POINTER_EVENTS = !!window.navigator.msPointerEnabled;
  var MAX_SAFE_FLOAT32_INTEGER = 16777216;
  function Emitter() {
    this._events = {};
    this._queue = [];
    this._counter = 0;
    this._clearOnEmit = false;
  }
  Emitter.prototype.on = function(event, listener) {
    if (!this._events || !event || !listener)
      return this;
    var listeners = this._events[event];
    if (!listeners)
      listeners = this._events[event] = [];
    listeners.push(listener);
    return this;
  };
  Emitter.prototype.off = function(event, listener) {
    if (!this._events || !event || !listener)
      return this;
    var listeners = this._events[event];
    if (!listeners || !listeners.length)
      return this;
    var index;
    while ((index = listeners.indexOf(listener)) !== -1) {
      listeners.splice(index, 1);
    }
    return this;
  };
  Emitter.prototype.clear = function(event) {
    if (!this._events || !event)
      return this;
    var listeners = this._events[event];
    if (listeners) {
      listeners.length = 0;
      delete this._events[event];
    }
    return this;
  };
  Emitter.prototype.emit = function(event) {
    if (!this._events || !event) {
      this._clearOnEmit = false;
      return this;
    }
    var listeners = this._events[event];
    if (!listeners || !listeners.length) {
      this._clearOnEmit = false;
      return this;
    }
    var queue = this._queue;
    var startIndex = queue.length;
    var argsLength = arguments.length - 1;
    var args;
    if (argsLength > 3) {
      args = [];
      args.push.apply(args, arguments);
      args.shift();
    }
    queue.push.apply(queue, listeners);
    if (this._clearOnEmit) {
      listeners.length = 0;
      this._clearOnEmit = false;
    }
    ++this._counter;
    var i = startIndex;
    var endIndex = queue.length;
    for (; i < endIndex; i++) {
      argsLength === 0 ? queue[i]() : argsLength === 1 ? queue[i](arguments[1]) : argsLength === 2 ? queue[i](arguments[1], arguments[2]) : argsLength === 3 ? queue[i](arguments[1], arguments[2], arguments[3]) : queue[i].apply(null, args);
      if (!this._events)
        return this;
    }
    --this._counter;
    if (!this._counter)
      queue.length = 0;
    return this;
  };
  Emitter.prototype.burst = function() {
    if (!this._events)
      return this;
    this._clearOnEmit = true;
    this.emit.apply(this, arguments);
    return this;
  };
  Emitter.prototype.countListeners = function(event) {
    if (!this._events)
      return 0;
    var listeners = this._events[event];
    return listeners ? listeners.length : 0;
  };
  Emitter.prototype.destroy = function() {
    if (!this._events)
      return this;
    this._queue.length = this._counter = 0;
    this._events = null;
    return this;
  };
  var pointerout = HAS_POINTER_EVENTS ? "pointerout" : HAS_MS_POINTER_EVENTS ? "MSPointerOut" : "";
  var waitDuration = 100;
  function EdgeHack(dragger) {
    if (!pointerout)
      return;
    this._dragger = dragger;
    this._timeout = null;
    this._outEvent = null;
    this._isActive = false;
    this._addBehaviour = this._addBehaviour.bind(this);
    this._removeBehaviour = this._removeBehaviour.bind(this);
    this._onTimeout = this._onTimeout.bind(this);
    this._resetData = this._resetData.bind(this);
    this._onStart = this._onStart.bind(this);
    this._onOut = this._onOut.bind(this);
    this._dragger.on("start", this._onStart);
  }
  EdgeHack.prototype._addBehaviour = function() {
    if (this._isActive)
      return;
    this._isActive = true;
    this._dragger.on("move", this._resetData);
    this._dragger.on("cancel", this._removeBehaviour);
    this._dragger.on("end", this._removeBehaviour);
    window.addEventListener(pointerout, this._onOut);
  };
  EdgeHack.prototype._removeBehaviour = function() {
    if (!this._isActive)
      return;
    this._dragger.off("move", this._resetData);
    this._dragger.off("cancel", this._removeBehaviour);
    this._dragger.off("end", this._removeBehaviour);
    window.removeEventListener(pointerout, this._onOut);
    this._resetData();
    this._isActive = false;
  };
  EdgeHack.prototype._resetData = function() {
    window.clearTimeout(this._timeout);
    this._timeout = null;
    this._outEvent = null;
  };
  EdgeHack.prototype._onStart = function(e) {
    if (e.pointerType === "mouse")
      return;
    this._addBehaviour();
  };
  EdgeHack.prototype._onOut = function(e) {
    if (!this._dragger._getTrackedTouch(e))
      return;
    this._resetData();
    this._outEvent = e;
    this._timeout = window.setTimeout(this._onTimeout, waitDuration);
  };
  EdgeHack.prototype._onTimeout = function() {
    var e = this._outEvent;
    this._resetData();
    if (this._dragger.isActive())
      this._dragger._onCancel(e);
  };
  EdgeHack.prototype.destroy = function() {
    if (!pointerout)
      return;
    this._dragger.off("start", this._onStart);
    this._removeBehaviour();
  };
  var vendorPrefixes = ["", "webkit", "moz", "ms", "o", "Webkit", "Moz", "MS", "O"];
  var cache$2 = {};
  function getPrefixedPropName(style, prop) {
    var prefixedProp = cache$2[prop] || "";
    if (prefixedProp)
      return prefixedProp;
    var camelProp = prop[0].toUpperCase() + prop.slice(1);
    var i = 0;
    while (i < vendorPrefixes.length) {
      prefixedProp = vendorPrefixes[i] ? vendorPrefixes[i] + camelProp : prop;
      if (prefixedProp in style) {
        cache$2[prop] = prefixedProp;
        return prefixedProp;
      }
      ++i;
    }
    return "";
  }
  function hasPassiveEvents() {
    var isPassiveEventsSupported = false;
    try {
      var passiveOpts = Object.defineProperty({}, "passive", {
        get: function() {
          isPassiveEventsSupported = true;
        }
      });
      window.addEventListener("testPassive", null, passiveOpts);
      window.removeEventListener("testPassive", null, passiveOpts);
    } catch (e) {
    }
    return isPassiveEventsSupported;
  }
  var ua = window.navigator.userAgent.toLowerCase();
  var isEdge = ua.indexOf("edge") > -1;
  var isIE = ua.indexOf("trident") > -1;
  var isFirefox = ua.indexOf("firefox") > -1;
  var isAndroid = ua.indexOf("android") > -1;
  var listenerOptions = hasPassiveEvents() ? { passive: true } : false;
  var taProp = "touchAction";
  var taPropPrefixed = getPrefixedPropName(document.documentElement.style, taProp);
  var taDefaultValue = "auto";
  function Dragger(element2, cssProps) {
    this._element = element2;
    this._emitter = new Emitter();
    this._isDestroyed = false;
    this._cssProps = {};
    this._touchAction = "";
    this._isActive = false;
    this._pointerId = null;
    this._startTime = 0;
    this._startX = 0;
    this._startY = 0;
    this._currentX = 0;
    this._currentY = 0;
    this._onStart = this._onStart.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onEnd = this._onEnd.bind(this);
    this._edgeHack = null;
    if ((isEdge || isIE) && (HAS_POINTER_EVENTS || HAS_MS_POINTER_EVENTS)) {
      this._edgeHack = new EdgeHack(this);
    }
    this.setCssProps(cssProps);
    if (!this._touchAction) {
      this.setTouchAction(taDefaultValue);
    }
    element2.addEventListener("dragstart", Dragger._preventDefault, false);
    element2.addEventListener(Dragger._inputEvents.start, this._onStart, listenerOptions);
  }
  Dragger._pointerEvents = {
    start: "pointerdown",
    move: "pointermove",
    cancel: "pointercancel",
    end: "pointerup"
  };
  Dragger._msPointerEvents = {
    start: "MSPointerDown",
    move: "MSPointerMove",
    cancel: "MSPointerCancel",
    end: "MSPointerUp"
  };
  Dragger._touchEvents = {
    start: "touchstart",
    move: "touchmove",
    cancel: "touchcancel",
    end: "touchend"
  };
  Dragger._mouseEvents = {
    start: "mousedown",
    move: "mousemove",
    cancel: "",
    end: "mouseup"
  };
  Dragger._inputEvents = function() {
    if (HAS_TOUCH_EVENTS)
      return Dragger._touchEvents;
    if (HAS_POINTER_EVENTS)
      return Dragger._pointerEvents;
    if (HAS_MS_POINTER_EVENTS)
      return Dragger._msPointerEvents;
    return Dragger._mouseEvents;
  }();
  Dragger._emitter = new Emitter();
  Dragger._emitterEvents = {
    start: "start",
    move: "move",
    end: "end",
    cancel: "cancel"
  };
  Dragger._activeInstances = [];
  Dragger._preventDefault = function(e) {
    if (e.preventDefault && e.cancelable !== false)
      e.preventDefault();
  };
  Dragger._activateInstance = function(instance) {
    var index = Dragger._activeInstances.indexOf(instance);
    if (index > -1)
      return;
    Dragger._activeInstances.push(instance);
    Dragger._emitter.on(Dragger._emitterEvents.move, instance._onMove);
    Dragger._emitter.on(Dragger._emitterEvents.cancel, instance._onCancel);
    Dragger._emitter.on(Dragger._emitterEvents.end, instance._onEnd);
    if (Dragger._activeInstances.length === 1) {
      Dragger._bindListeners();
    }
  };
  Dragger._deactivateInstance = function(instance) {
    var index = Dragger._activeInstances.indexOf(instance);
    if (index === -1)
      return;
    Dragger._activeInstances.splice(index, 1);
    Dragger._emitter.off(Dragger._emitterEvents.move, instance._onMove);
    Dragger._emitter.off(Dragger._emitterEvents.cancel, instance._onCancel);
    Dragger._emitter.off(Dragger._emitterEvents.end, instance._onEnd);
    if (!Dragger._activeInstances.length) {
      Dragger._unbindListeners();
    }
  };
  Dragger._bindListeners = function() {
    window.addEventListener(Dragger._inputEvents.move, Dragger._onMove, listenerOptions);
    window.addEventListener(Dragger._inputEvents.end, Dragger._onEnd, listenerOptions);
    if (Dragger._inputEvents.cancel) {
      window.addEventListener(Dragger._inputEvents.cancel, Dragger._onCancel, listenerOptions);
    }
  };
  Dragger._unbindListeners = function() {
    window.removeEventListener(Dragger._inputEvents.move, Dragger._onMove, listenerOptions);
    window.removeEventListener(Dragger._inputEvents.end, Dragger._onEnd, listenerOptions);
    if (Dragger._inputEvents.cancel) {
      window.removeEventListener(Dragger._inputEvents.cancel, Dragger._onCancel, listenerOptions);
    }
  };
  Dragger._getEventPointerId = function(event) {
    if (typeof event.pointerId === "number") {
      return event.pointerId;
    }
    if (event.changedTouches) {
      return event.changedTouches[0] ? event.changedTouches[0].identifier : null;
    }
    return 1;
  };
  Dragger._getTouchById = function(event, id2) {
    if (typeof event.pointerId === "number") {
      return event.pointerId === id2 ? event : null;
    }
    if (event.changedTouches) {
      for (var i = 0; i < event.changedTouches.length; i++) {
        if (event.changedTouches[i].identifier === id2) {
          return event.changedTouches[i];
        }
      }
      return null;
    }
    return event;
  };
  Dragger._onMove = function(e) {
    Dragger._emitter.emit(Dragger._emitterEvents.move, e);
  };
  Dragger._onCancel = function(e) {
    Dragger._emitter.emit(Dragger._emitterEvents.cancel, e);
  };
  Dragger._onEnd = function(e) {
    Dragger._emitter.emit(Dragger._emitterEvents.end, e);
  };
  Dragger.prototype._reset = function() {
    this._pointerId = null;
    this._startTime = 0;
    this._startX = 0;
    this._startY = 0;
    this._currentX = 0;
    this._currentY = 0;
    this._isActive = false;
    Dragger._deactivateInstance(this);
  };
  Dragger.prototype._createEvent = function(type, e) {
    var touch = this._getTrackedTouch(e);
    return {
      // Hammer.js compatibility interface.
      type,
      srcEvent: e,
      distance: this.getDistance(),
      deltaX: this.getDeltaX(),
      deltaY: this.getDeltaY(),
      deltaTime: type === Dragger._emitterEvents.start ? 0 : this.getDeltaTime(),
      isFirst: type === Dragger._emitterEvents.start,
      isFinal: type === Dragger._emitterEvents.end || type === Dragger._emitterEvents.cancel,
      pointerType: e.pointerType || (e.touches ? "touch" : "mouse"),
      // Partial Touch API interface.
      identifier: this._pointerId,
      screenX: touch.screenX,
      screenY: touch.screenY,
      clientX: touch.clientX,
      clientY: touch.clientY,
      pageX: touch.pageX,
      pageY: touch.pageY,
      target: touch.target
    };
  };
  Dragger.prototype._emit = function(type, e) {
    this._emitter.emit(type, this._createEvent(type, e));
  };
  Dragger.prototype._getTrackedTouch = function(e) {
    if (this._pointerId === null)
      return null;
    return Dragger._getTouchById(e, this._pointerId);
  };
  Dragger.prototype._onStart = function(e) {
    if (this._isDestroyed)
      return;
    if (this._pointerId !== null)
      return;
    this._pointerId = Dragger._getEventPointerId(e);
    if (this._pointerId === null)
      return;
    var touch = this._getTrackedTouch(e);
    this._startX = this._currentX = touch.clientX;
    this._startY = this._currentY = touch.clientY;
    this._startTime = Date.now();
    this._isActive = true;
    this._emit(Dragger._emitterEvents.start, e);
    if (this._isActive) {
      Dragger._activateInstance(this);
    }
  };
  Dragger.prototype._onMove = function(e) {
    var touch = this._getTrackedTouch(e);
    if (!touch)
      return;
    this._currentX = touch.clientX;
    this._currentY = touch.clientY;
    this._emit(Dragger._emitterEvents.move, e);
  };
  Dragger.prototype._onCancel = function(e) {
    if (!this._getTrackedTouch(e))
      return;
    this._emit(Dragger._emitterEvents.cancel, e);
    this._reset();
  };
  Dragger.prototype._onEnd = function(e) {
    if (!this._getTrackedTouch(e))
      return;
    this._emit(Dragger._emitterEvents.end, e);
    this._reset();
  };
  Dragger.prototype.isActive = function() {
    return this._isActive;
  };
  Dragger.prototype.setTouchAction = function(value) {
    this._touchAction = value;
    if (taPropPrefixed) {
      this._cssProps[taPropPrefixed] = "";
      this._element.style[taPropPrefixed] = value;
    }
    if (HAS_TOUCH_EVENTS) {
      this._element.removeEventListener(Dragger._touchEvents.start, Dragger._preventDefault, true);
      if (this._element.style[taPropPrefixed] !== value || isFirefox && isAndroid) {
        this._element.addEventListener(Dragger._touchEvents.start, Dragger._preventDefault, true);
      }
    }
  };
  Dragger.prototype.setCssProps = function(newProps) {
    if (!newProps)
      return;
    var currentProps2 = this._cssProps;
    var element2 = this._element;
    var prop;
    var prefixedProp;
    for (prop in currentProps2) {
      element2.style[prop] = currentProps2[prop];
      delete currentProps2[prop];
    }
    for (prop in newProps) {
      if (!newProps[prop])
        continue;
      if (prop === taProp) {
        this.setTouchAction(newProps[prop]);
        continue;
      }
      prefixedProp = getPrefixedPropName(element2.style, prop);
      if (!prefixedProp)
        continue;
      currentProps2[prefixedProp] = "";
      element2.style[prefixedProp] = newProps[prop];
    }
  };
  Dragger.prototype.getDeltaX = function() {
    return this._currentX - this._startX;
  };
  Dragger.prototype.getDeltaY = function() {
    return this._currentY - this._startY;
  };
  Dragger.prototype.getDistance = function() {
    var x = this.getDeltaX();
    var y = this.getDeltaY();
    return Math.sqrt(x * x + y * y);
  };
  Dragger.prototype.getDeltaTime = function() {
    return this._startTime ? Date.now() - this._startTime : 0;
  };
  Dragger.prototype.on = function(eventName, listener) {
    this._emitter.on(eventName, listener);
  };
  Dragger.prototype.off = function(eventName, listener) {
    this._emitter.off(eventName, listener);
  };
  Dragger.prototype.destroy = function() {
    if (this._isDestroyed)
      return;
    var element2 = this._element;
    if (this._edgeHack)
      this._edgeHack.destroy();
    this._reset();
    this._emitter.destroy();
    element2.removeEventListener(Dragger._inputEvents.start, this._onStart, listenerOptions);
    element2.removeEventListener("dragstart", Dragger._preventDefault, false);
    element2.removeEventListener(Dragger._touchEvents.start, Dragger._preventDefault, true);
    for (var prop in this._cssProps) {
      element2.style[prop] = this._cssProps[prop];
      delete this._cssProps[prop];
    }
    this._element = null;
    this._isDestroyed = true;
  };
  var dt = 1e3 / 60;
  var raf = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    return this.setTimeout(function() {
      callback(Date.now());
    }, dt);
  }).bind(window);
  function Ticker(numLanes) {
    this._nextStep = null;
    this._lanes = [];
    this._stepQueue = [];
    this._stepCallbacks = {};
    this._step = this._step.bind(this);
    for (var i = 0; i < numLanes; i++) {
      this._lanes.push(new TickerLane());
    }
  }
  Ticker.prototype._step = function(time) {
    var lanes = this._lanes;
    var stepQueue = this._stepQueue;
    var stepCallbacks = this._stepCallbacks;
    var i, j, id2, laneQueue, laneCallbacks, laneIndices;
    this._nextStep = null;
    for (i = 0; i < lanes.length; i++) {
      laneQueue = lanes[i].queue;
      laneCallbacks = lanes[i].callbacks;
      laneIndices = lanes[i].indices;
      for (j = 0; j < laneQueue.length; j++) {
        id2 = laneQueue[j];
        if (!id2)
          continue;
        stepQueue.push(id2);
        stepCallbacks[id2] = laneCallbacks[id2];
        delete laneCallbacks[id2];
        delete laneIndices[id2];
      }
      laneQueue.length = 0;
    }
    for (i = 0; i < stepQueue.length; i++) {
      id2 = stepQueue[i];
      if (stepCallbacks[id2])
        stepCallbacks[id2](time);
      delete stepCallbacks[id2];
    }
    stepQueue.length = 0;
  };
  Ticker.prototype.add = function(laneIndex, id2, callback) {
    this._lanes[laneIndex].add(id2, callback);
    if (!this._nextStep)
      this._nextStep = raf(this._step);
  };
  Ticker.prototype.remove = function(laneIndex, id2) {
    this._lanes[laneIndex].remove(id2);
  };
  function TickerLane() {
    this.queue = [];
    this.indices = {};
    this.callbacks = {};
  }
  TickerLane.prototype.add = function(id2, callback) {
    var index = this.indices[id2];
    if (index !== void 0)
      this.queue[index] = void 0;
    this.queue.push(id2);
    this.callbacks[id2] = callback;
    this.indices[id2] = this.queue.length - 1;
  };
  TickerLane.prototype.remove = function(id2) {
    var index = this.indices[id2];
    if (index === void 0)
      return;
    this.queue[index] = void 0;
    delete this.callbacks[id2];
    delete this.indices[id2];
  };
  var LAYOUT_READ = "layoutRead";
  var LAYOUT_WRITE = "layoutWrite";
  var VISIBILITY_READ = "visibilityRead";
  var VISIBILITY_WRITE = "visibilityWrite";
  var DRAG_START_READ = "dragStartRead";
  var DRAG_START_WRITE = "dragStartWrite";
  var DRAG_MOVE_READ = "dragMoveRead";
  var DRAG_MOVE_WRITE = "dragMoveWrite";
  var DRAG_SCROLL_READ = "dragScrollRead";
  var DRAG_SCROLL_WRITE = "dragScrollWrite";
  var DRAG_SORT_READ = "dragSortRead";
  var PLACEHOLDER_LAYOUT_READ = "placeholderLayoutRead";
  var PLACEHOLDER_LAYOUT_WRITE = "placeholderLayoutWrite";
  var PLACEHOLDER_RESIZE_WRITE = "placeholderResizeWrite";
  var AUTO_SCROLL_READ = "autoScrollRead";
  var AUTO_SCROLL_WRITE = "autoScrollWrite";
  var DEBOUNCE_READ = "debounceRead";
  var LANE_READ = 0;
  var LANE_READ_TAIL = 1;
  var LANE_WRITE = 2;
  var ticker = new Ticker(3);
  function addLayoutTick(itemId, read, write) {
    ticker.add(LANE_READ, LAYOUT_READ + itemId, read);
    ticker.add(LANE_WRITE, LAYOUT_WRITE + itemId, write);
  }
  function cancelLayoutTick(itemId) {
    ticker.remove(LANE_READ, LAYOUT_READ + itemId);
    ticker.remove(LANE_WRITE, LAYOUT_WRITE + itemId);
  }
  function addVisibilityTick(itemId, read, write) {
    ticker.add(LANE_READ, VISIBILITY_READ + itemId, read);
    ticker.add(LANE_WRITE, VISIBILITY_WRITE + itemId, write);
  }
  function cancelVisibilityTick(itemId) {
    ticker.remove(LANE_READ, VISIBILITY_READ + itemId);
    ticker.remove(LANE_WRITE, VISIBILITY_WRITE + itemId);
  }
  function addDragStartTick(itemId, read, write) {
    ticker.add(LANE_READ, DRAG_START_READ + itemId, read);
    ticker.add(LANE_WRITE, DRAG_START_WRITE + itemId, write);
  }
  function cancelDragStartTick(itemId) {
    ticker.remove(LANE_READ, DRAG_START_READ + itemId);
    ticker.remove(LANE_WRITE, DRAG_START_WRITE + itemId);
  }
  function addDragMoveTick(itemId, read, write) {
    ticker.add(LANE_READ, DRAG_MOVE_READ + itemId, read);
    ticker.add(LANE_WRITE, DRAG_MOVE_WRITE + itemId, write);
  }
  function cancelDragMoveTick(itemId) {
    ticker.remove(LANE_READ, DRAG_MOVE_READ + itemId);
    ticker.remove(LANE_WRITE, DRAG_MOVE_WRITE + itemId);
  }
  function addDragScrollTick(itemId, read, write) {
    ticker.add(LANE_READ, DRAG_SCROLL_READ + itemId, read);
    ticker.add(LANE_WRITE, DRAG_SCROLL_WRITE + itemId, write);
  }
  function cancelDragScrollTick(itemId) {
    ticker.remove(LANE_READ, DRAG_SCROLL_READ + itemId);
    ticker.remove(LANE_WRITE, DRAG_SCROLL_WRITE + itemId);
  }
  function addDragSortTick(itemId, read) {
    ticker.add(LANE_READ_TAIL, DRAG_SORT_READ + itemId, read);
  }
  function cancelDragSortTick(itemId) {
    ticker.remove(LANE_READ_TAIL, DRAG_SORT_READ + itemId);
  }
  function addPlaceholderLayoutTick(itemId, read, write) {
    ticker.add(LANE_READ, PLACEHOLDER_LAYOUT_READ + itemId, read);
    ticker.add(LANE_WRITE, PLACEHOLDER_LAYOUT_WRITE + itemId, write);
  }
  function cancelPlaceholderLayoutTick(itemId) {
    ticker.remove(LANE_READ, PLACEHOLDER_LAYOUT_READ + itemId);
    ticker.remove(LANE_WRITE, PLACEHOLDER_LAYOUT_WRITE + itemId);
  }
  function addPlaceholderResizeTick(itemId, write) {
    ticker.add(LANE_WRITE, PLACEHOLDER_RESIZE_WRITE + itemId, write);
  }
  function cancelPlaceholderResizeTick(itemId) {
    ticker.remove(LANE_WRITE, PLACEHOLDER_RESIZE_WRITE + itemId);
  }
  function addAutoScrollTick(read, write) {
    ticker.add(LANE_READ, AUTO_SCROLL_READ, read);
    ticker.add(LANE_WRITE, AUTO_SCROLL_WRITE, write);
  }
  function cancelAutoScrollTick() {
    ticker.remove(LANE_READ, AUTO_SCROLL_READ);
    ticker.remove(LANE_WRITE, AUTO_SCROLL_WRITE);
  }
  function addDebounceTick(debounceId2, read) {
    ticker.add(LANE_READ, DEBOUNCE_READ + debounceId2, read);
  }
  function cancelDebounceTick(debounceId2) {
    ticker.remove(LANE_READ, DEBOUNCE_READ + debounceId2);
  }
  var AXIS_X = 1;
  var AXIS_Y = 2;
  var FORWARD = 4;
  var BACKWARD = 8;
  var LEFT = AXIS_X | BACKWARD;
  var RIGHT = AXIS_X | FORWARD;
  var UP = AXIS_Y | BACKWARD;
  var DOWN = AXIS_Y | FORWARD;
  var functionType = "function";
  function isFunction(val) {
    return typeof val === functionType;
  }
  var cache$1 = typeof WeakMap === "function" ? /* @__PURE__ */ new WeakMap() : null;
  function getStyle(element2, style) {
    var styles = cache$1 && cache$1.get(element2);
    if (!styles) {
      styles = window.getComputedStyle(element2, null);
      if (cache$1)
        cache$1.set(element2, styles);
    }
    return styles.getPropertyValue(style);
  }
  function getStyleAsFloat(el, style) {
    return parseFloat(getStyle(el, style)) || 0;
  }
  var DOC_ELEM = document.documentElement;
  var BODY = document.body;
  var THRESHOLD_DATA = { value: 0, offset: 0 };
  function getScrollElement(element2) {
    if (element2 === window || element2 === DOC_ELEM || element2 === BODY) {
      return window;
    } else {
      return element2;
    }
  }
  function getScrollLeft(element2) {
    return element2 === window ? element2.pageXOffset : element2.scrollLeft;
  }
  function getScrollTop(element2) {
    return element2 === window ? element2.pageYOffset : element2.scrollTop;
  }
  function getScrollLeftMax(element2) {
    if (element2 === window) {
      return DOC_ELEM.scrollWidth - DOC_ELEM.clientWidth;
    } else {
      return element2.scrollWidth - element2.clientWidth;
    }
  }
  function getScrollTopMax(element2) {
    if (element2 === window) {
      return DOC_ELEM.scrollHeight - DOC_ELEM.clientHeight;
    } else {
      return element2.scrollHeight - element2.clientHeight;
    }
  }
  function getContentRect(element2, result) {
    result = result || {};
    if (element2 === window) {
      result.width = DOC_ELEM.clientWidth;
      result.height = DOC_ELEM.clientHeight;
      result.left = 0;
      result.right = result.width;
      result.top = 0;
      result.bottom = result.height;
    } else {
      var bcr = element2.getBoundingClientRect();
      var borderLeft = element2.clientLeft || getStyleAsFloat(element2, "border-left-width");
      var borderTop = element2.clientTop || getStyleAsFloat(element2, "border-top-width");
      result.width = element2.clientWidth;
      result.height = element2.clientHeight;
      result.left = bcr.left + borderLeft;
      result.right = result.left + result.width;
      result.top = bcr.top + borderTop;
      result.bottom = result.top + result.height;
    }
    return result;
  }
  function getItemAutoScrollSettings(item) {
    return item._drag._getGrid()._settings.dragAutoScroll;
  }
  function prepareItemScrollSync(item) {
    if (!item._drag)
      return;
    item._drag._prepareScroll();
  }
  function applyItemScrollSync(item) {
    if (!item._drag || !item._isActive)
      return;
    var drag = item._drag;
    drag._scrollDiffX = drag._scrollDiffY = 0;
    item._setTranslate(drag._left, drag._top);
  }
  function computeThreshold(threshold, safeZone, itemSize, targetSize) {
    THRESHOLD_DATA.value = Math.min(targetSize / 2, threshold);
    THRESHOLD_DATA.offset = Math.max(0, itemSize + THRESHOLD_DATA.value * 2 + targetSize * safeZone - targetSize) / 2;
    return THRESHOLD_DATA;
  }
  function ScrollRequest() {
    this.reset();
  }
  ScrollRequest.prototype.reset = function() {
    if (this.isActive)
      this.onStop();
    this.item = null;
    this.element = null;
    this.isActive = false;
    this.isEnding = false;
    this.direction = null;
    this.value = null;
    this.maxValue = 0;
    this.threshold = 0;
    this.distance = 0;
    this.speed = 0;
    this.duration = 0;
    this.action = null;
  };
  ScrollRequest.prototype.hasReachedEnd = function() {
    return FORWARD & this.direction ? this.value >= this.maxValue : this.value <= 0;
  };
  ScrollRequest.prototype.computeCurrentScrollValue = function() {
    if (this.value === null) {
      return AXIS_X & this.direction ? getScrollLeft(this.element) : getScrollTop(this.element);
    }
    return Math.max(0, Math.min(this.value, this.maxValue));
  };
  ScrollRequest.prototype.computeNextScrollValue = function(deltaTime) {
    var delta = this.speed * (deltaTime / 1e3);
    var nextValue = FORWARD & this.direction ? this.value + delta : this.value - delta;
    return Math.max(0, Math.min(nextValue, this.maxValue));
  };
  ScrollRequest.prototype.computeSpeed = /* @__PURE__ */ function() {
    var data = {
      direction: null,
      threshold: 0,
      distance: 0,
      value: 0,
      maxValue: 0,
      deltaTime: 0,
      duration: 0,
      isEnding: false
    };
    return function(deltaTime) {
      var item = this.item;
      var speed = getItemAutoScrollSettings(item).speed;
      if (isFunction(speed)) {
        data.direction = this.direction;
        data.threshold = this.threshold;
        data.distance = this.distance;
        data.value = this.value;
        data.maxValue = this.maxValue;
        data.duration = this.duration;
        data.speed = this.speed;
        data.deltaTime = deltaTime;
        data.isEnding = this.isEnding;
        return speed(item, this.element, data);
      } else {
        return speed;
      }
    };
  }();
  ScrollRequest.prototype.tick = function(deltaTime) {
    if (!this.isActive) {
      this.isActive = true;
      this.onStart();
    }
    this.value = this.computeCurrentScrollValue();
    this.speed = this.computeSpeed(deltaTime);
    this.value = this.computeNextScrollValue(deltaTime);
    this.duration += deltaTime;
    return this.value;
  };
  ScrollRequest.prototype.onStart = function() {
    var item = this.item;
    var onStart = getItemAutoScrollSettings(item).onStart;
    if (isFunction(onStart))
      onStart(item, this.element, this.direction);
  };
  ScrollRequest.prototype.onStop = function() {
    var item = this.item;
    var onStop = getItemAutoScrollSettings(item).onStop;
    if (isFunction(onStop))
      onStop(item, this.element, this.direction);
    if (item._drag)
      item._drag.sort();
  };
  function ScrollAction() {
    this.element = null;
    this.requestX = null;
    this.requestY = null;
    this.scrollLeft = 0;
    this.scrollTop = 0;
  }
  ScrollAction.prototype.reset = function() {
    if (this.requestX)
      this.requestX.action = null;
    if (this.requestY)
      this.requestY.action = null;
    this.element = null;
    this.requestX = null;
    this.requestY = null;
    this.scrollLeft = 0;
    this.scrollTop = 0;
  };
  ScrollAction.prototype.addRequest = function(request) {
    if (AXIS_X & request.direction) {
      this.removeRequest(this.requestX);
      this.requestX = request;
    } else {
      this.removeRequest(this.requestY);
      this.requestY = request;
    }
    request.action = this;
  };
  ScrollAction.prototype.removeRequest = function(request) {
    if (!request)
      return;
    if (this.requestX === request) {
      this.requestX = null;
      request.action = null;
    } else if (this.requestY === request) {
      this.requestY = null;
      request.action = null;
    }
  };
  ScrollAction.prototype.computeScrollValues = function() {
    this.scrollLeft = this.requestX ? this.requestX.value : getScrollLeft(this.element);
    this.scrollTop = this.requestY ? this.requestY.value : getScrollTop(this.element);
  };
  ScrollAction.prototype.scroll = function() {
    var element2 = this.element;
    if (!element2)
      return;
    if (element2.scrollTo) {
      element2.scrollTo(this.scrollLeft, this.scrollTop);
    } else {
      element2.scrollLeft = this.scrollLeft;
      element2.scrollTop = this.scrollTop;
    }
  };
  function Pool(createItem, releaseItem) {
    this.pool = [];
    this.createItem = createItem;
    this.releaseItem = releaseItem;
  }
  Pool.prototype.pick = function() {
    return this.pool.pop() || this.createItem();
  };
  Pool.prototype.release = function(item) {
    this.releaseItem(item);
    if (this.pool.indexOf(item) !== -1)
      return;
    this.pool.push(item);
  };
  Pool.prototype.reset = function() {
    this.pool.length = 0;
  };
  function isOverlapping(a, b) {
    return !(a.left + a.width <= b.left || b.left + b.width <= a.left || a.top + a.height <= b.top || b.top + b.height <= a.top);
  }
  function getIntersectionArea(a, b) {
    if (!isOverlapping(a, b))
      return 0;
    var width = Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left);
    var height = Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top);
    return width * height;
  }
  function getIntersectionScore(a, b) {
    var area = getIntersectionArea(a, b);
    if (!area)
      return 0;
    var maxArea = Math.min(a.width, b.width) * Math.min(a.height, b.height);
    return area / maxArea * 100;
  }
  var RECT_1 = {
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  };
  var RECT_2 = {
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  };
  function AutoScroller() {
    this._isDestroyed = false;
    this._isTicking = false;
    this._tickTime = 0;
    this._tickDeltaTime = 0;
    this._items = [];
    this._actions = [];
    this._requests = {};
    this._requests[AXIS_X] = {};
    this._requests[AXIS_Y] = {};
    this._requestOverlapCheck = {};
    this._dragPositions = {};
    this._dragDirections = {};
    this._overlapCheckInterval = 150;
    this._requestPool = new Pool(
      function() {
        return new ScrollRequest();
      },
      function(request) {
        request.reset();
      }
    );
    this._actionPool = new Pool(
      function() {
        return new ScrollAction();
      },
      function(action) {
        action.reset();
      }
    );
    this._readTick = this._readTick.bind(this);
    this._writeTick = this._writeTick.bind(this);
  }
  AutoScroller.AXIS_X = AXIS_X;
  AutoScroller.AXIS_Y = AXIS_Y;
  AutoScroller.FORWARD = FORWARD;
  AutoScroller.BACKWARD = BACKWARD;
  AutoScroller.LEFT = LEFT;
  AutoScroller.RIGHT = RIGHT;
  AutoScroller.UP = UP;
  AutoScroller.DOWN = DOWN;
  AutoScroller.smoothSpeed = function(maxSpeed, acceleration, deceleration) {
    return function(item, element2, data) {
      var targetSpeed = 0;
      if (!data.isEnding) {
        if (data.threshold > 0) {
          var factor = data.threshold - Math.max(0, data.distance);
          targetSpeed = maxSpeed / data.threshold * factor;
        } else {
          targetSpeed = maxSpeed;
        }
      }
      var currentSpeed = data.speed;
      var nextSpeed = targetSpeed;
      if (currentSpeed === targetSpeed) {
        return nextSpeed;
      }
      if (currentSpeed < targetSpeed) {
        nextSpeed = currentSpeed + acceleration * (data.deltaTime / 1e3);
        return Math.min(targetSpeed, nextSpeed);
      } else {
        nextSpeed = currentSpeed - deceleration * (data.deltaTime / 1e3);
        return Math.max(targetSpeed, nextSpeed);
      }
    };
  };
  AutoScroller.pointerHandle = function(pointerSize) {
    var rect = { left: 0, top: 0, width: 0, height: 0 };
    var size = pointerSize || 1;
    return function(item, x, y, w, h, pX, pY) {
      rect.left = pX - size * 0.5;
      rect.top = pY - size * 0.5;
      rect.width = size;
      rect.height = size;
      return rect;
    };
  };
  AutoScroller.prototype._readTick = function(time) {
    if (this._isDestroyed)
      return;
    if (time && this._tickTime) {
      this._tickDeltaTime = time - this._tickTime;
      this._tickTime = time;
      this._updateRequests();
      this._updateActions();
    } else {
      this._tickTime = time;
      this._tickDeltaTime = 0;
    }
  };
  AutoScroller.prototype._writeTick = function() {
    if (this._isDestroyed)
      return;
    this._applyActions();
    addAutoScrollTick(this._readTick, this._writeTick);
  };
  AutoScroller.prototype._startTicking = function() {
    this._isTicking = true;
    addAutoScrollTick(this._readTick, this._writeTick);
  };
  AutoScroller.prototype._stopTicking = function() {
    this._isTicking = false;
    this._tickTime = 0;
    this._tickDeltaTime = 0;
    cancelAutoScrollTick();
  };
  AutoScroller.prototype._getItemHandleRect = function(item, handle, rect) {
    var itemDrag = item._drag;
    if (handle) {
      var ev = itemDrag._dragMoveEvent || itemDrag._dragStartEvent;
      var data = handle(
        item,
        itemDrag._clientX,
        itemDrag._clientY,
        item._width,
        item._height,
        ev.clientX,
        ev.clientY
      );
      rect.left = data.left;
      rect.top = data.top;
      rect.width = data.width;
      rect.height = data.height;
    } else {
      rect.left = itemDrag._clientX;
      rect.top = itemDrag._clientY;
      rect.width = item._width;
      rect.height = item._height;
    }
    rect.right = rect.left + rect.width;
    rect.bottom = rect.top + rect.height;
    return rect;
  };
  AutoScroller.prototype._requestItemScroll = function(item, axis, element2, direction, threshold, distance, maxValue) {
    var reqMap = this._requests[axis];
    var request = reqMap[item._id];
    if (request) {
      if (request.element !== element2 || request.direction !== direction) {
        request.reset();
      }
    } else {
      request = this._requestPool.pick();
    }
    request.item = item;
    request.element = element2;
    request.direction = direction;
    request.threshold = threshold;
    request.distance = distance;
    request.maxValue = maxValue;
    reqMap[item._id] = request;
  };
  AutoScroller.prototype._cancelItemScroll = function(item, axis) {
    var reqMap = this._requests[axis];
    var request = reqMap[item._id];
    if (!request)
      return;
    if (request.action)
      request.action.removeRequest(request);
    this._requestPool.release(request);
    delete reqMap[item._id];
  };
  AutoScroller.prototype._checkItemOverlap = function(item, checkX, checkY) {
    var settings = getItemAutoScrollSettings(item);
    var targets = isFunction(settings.targets) ? settings.targets(item) : settings.targets;
    var threshold = settings.threshold;
    var safeZone = settings.safeZone;
    if (!targets || !targets.length) {
      checkX && this._cancelItemScroll(item, AXIS_X);
      checkY && this._cancelItemScroll(item, AXIS_Y);
      return;
    }
    var dragDirections = this._dragDirections[item._id];
    var dragDirectionX = dragDirections[0];
    var dragDirectionY = dragDirections[1];
    if (!dragDirectionX && !dragDirectionY) {
      checkX && this._cancelItemScroll(item, AXIS_X);
      checkY && this._cancelItemScroll(item, AXIS_Y);
      return;
    }
    var itemRect = this._getItemHandleRect(item, settings.handle, RECT_1);
    var testRect = RECT_2;
    var target = null;
    var testElement = null;
    var testAxisX = true;
    var testAxisY = true;
    var testScore = 0;
    var testPriority = 0;
    var testThreshold = null;
    var testDirection = null;
    var testDistance = 0;
    var testMaxScrollX = 0;
    var testMaxScrollY = 0;
    var xElement = null;
    var xPriority = -Infinity;
    var xThreshold = 0;
    var xScore = 0;
    var xDirection = null;
    var xDistance = 0;
    var xMaxScroll = 0;
    var yElement = null;
    var yPriority = -Infinity;
    var yThreshold = 0;
    var yScore = 0;
    var yDirection = null;
    var yDistance = 0;
    var yMaxScroll = 0;
    for (var i = 0; i < targets.length; i++) {
      target = targets[i];
      testAxisX = checkX && dragDirectionX && target.axis !== AXIS_Y;
      testAxisY = checkY && dragDirectionY && target.axis !== AXIS_X;
      testPriority = target.priority || 0;
      if ((!testAxisX || testPriority < xPriority) && (!testAxisY || testPriority < yPriority)) {
        continue;
      }
      testElement = getScrollElement(target.element || target);
      testMaxScrollX = testAxisX ? getScrollLeftMax(testElement) : -1;
      testMaxScrollY = testAxisY ? getScrollTopMax(testElement) : -1;
      if (!testMaxScrollX && !testMaxScrollY)
        continue;
      testRect = getContentRect(testElement, testRect);
      testScore = getIntersectionScore(itemRect, testRect);
      if (testScore <= 0)
        continue;
      if (testAxisX && testPriority >= xPriority && testMaxScrollX > 0 && (testPriority > xPriority || testScore > xScore)) {
        testDirection = null;
        testThreshold = computeThreshold(
          typeof target.threshold === "number" ? target.threshold : threshold,
          safeZone,
          itemRect.width,
          testRect.width
        );
        if (dragDirectionX === RIGHT) {
          testDistance = testRect.right + testThreshold.offset - itemRect.right;
          if (testDistance <= testThreshold.value && getScrollLeft(testElement) < testMaxScrollX) {
            testDirection = RIGHT;
          }
        } else if (dragDirectionX === LEFT) {
          testDistance = itemRect.left - (testRect.left - testThreshold.offset);
          if (testDistance <= testThreshold.value && getScrollLeft(testElement) > 0) {
            testDirection = LEFT;
          }
        }
        if (testDirection !== null) {
          xElement = testElement;
          xPriority = testPriority;
          xThreshold = testThreshold.value;
          xScore = testScore;
          xDirection = testDirection;
          xDistance = testDistance;
          xMaxScroll = testMaxScrollX;
        }
      }
      if (testAxisY && testPriority >= yPriority && testMaxScrollY > 0 && (testPriority > yPriority || testScore > yScore)) {
        testDirection = null;
        testThreshold = computeThreshold(
          typeof target.threshold === "number" ? target.threshold : threshold,
          safeZone,
          itemRect.height,
          testRect.height
        );
        if (dragDirectionY === DOWN) {
          testDistance = testRect.bottom + testThreshold.offset - itemRect.bottom;
          if (testDistance <= testThreshold.value && getScrollTop(testElement) < testMaxScrollY) {
            testDirection = DOWN;
          }
        } else if (dragDirectionY === UP) {
          testDistance = itemRect.top - (testRect.top - testThreshold.offset);
          if (testDistance <= testThreshold.value && getScrollTop(testElement) > 0) {
            testDirection = UP;
          }
        }
        if (testDirection !== null) {
          yElement = testElement;
          yPriority = testPriority;
          yThreshold = testThreshold.value;
          yScore = testScore;
          yDirection = testDirection;
          yDistance = testDistance;
          yMaxScroll = testMaxScrollY;
        }
      }
    }
    if (checkX) {
      if (xElement) {
        this._requestItemScroll(
          item,
          AXIS_X,
          xElement,
          xDirection,
          xThreshold,
          xDistance,
          xMaxScroll
        );
      } else {
        this._cancelItemScroll(item, AXIS_X);
      }
    }
    if (checkY) {
      if (yElement) {
        this._requestItemScroll(
          item,
          AXIS_Y,
          yElement,
          yDirection,
          yThreshold,
          yDistance,
          yMaxScroll
        );
      } else {
        this._cancelItemScroll(item, AXIS_Y);
      }
    }
  };
  AutoScroller.prototype._updateScrollRequest = function(scrollRequest) {
    var item = scrollRequest.item;
    var settings = getItemAutoScrollSettings(item);
    var targets = isFunction(settings.targets) ? settings.targets(item) : settings.targets;
    var targetCount = targets && targets.length || 0;
    var threshold = settings.threshold;
    var safeZone = settings.safeZone;
    var itemRect = this._getItemHandleRect(item, settings.handle, RECT_1);
    var testRect = RECT_2;
    var target = null;
    var testElement = null;
    var testIsAxisX = false;
    var testScore = null;
    var testThreshold = null;
    var testDistance = null;
    var testScroll = null;
    var testMaxScroll = null;
    var hasReachedEnd = null;
    for (var i = 0; i < targetCount; i++) {
      target = targets[i];
      testElement = getScrollElement(target.element || target);
      if (testElement !== scrollRequest.element)
        continue;
      testIsAxisX = !!(AXIS_X & scrollRequest.direction);
      if (testIsAxisX) {
        if (target.axis === AXIS_Y)
          continue;
      } else {
        if (target.axis === AXIS_X)
          continue;
      }
      testMaxScroll = testIsAxisX ? getScrollLeftMax(testElement) : getScrollTopMax(testElement);
      if (testMaxScroll <= 0) {
        break;
      }
      testRect = getContentRect(testElement, testRect);
      testScore = getIntersectionScore(itemRect, testRect);
      if (testScore <= 0) {
        break;
      }
      testThreshold = computeThreshold(
        typeof target.threshold === "number" ? target.threshold : threshold,
        safeZone,
        testIsAxisX ? itemRect.width : itemRect.height,
        testIsAxisX ? testRect.width : testRect.height
      );
      if (scrollRequest.direction === LEFT) {
        testDistance = itemRect.left - (testRect.left - testThreshold.offset);
      } else if (scrollRequest.direction === RIGHT) {
        testDistance = testRect.right + testThreshold.offset - itemRect.right;
      } else if (scrollRequest.direction === UP) {
        testDistance = itemRect.top - (testRect.top - testThreshold.offset);
      } else {
        testDistance = testRect.bottom + testThreshold.offset - itemRect.bottom;
      }
      if (testDistance > testThreshold.value) {
        break;
      }
      testScroll = testIsAxisX ? getScrollLeft(testElement) : getScrollTop(testElement);
      hasReachedEnd = FORWARD & scrollRequest.direction ? testScroll >= testMaxScroll : testScroll <= 0;
      if (hasReachedEnd) {
        break;
      }
      scrollRequest.maxValue = testMaxScroll;
      scrollRequest.threshold = testThreshold.value;
      scrollRequest.distance = testDistance;
      scrollRequest.isEnding = false;
      return true;
    }
    if (settings.smoothStop === true && scrollRequest.speed > 0) {
      if (hasReachedEnd === null)
        hasReachedEnd = scrollRequest.hasReachedEnd();
      scrollRequest.isEnding = hasReachedEnd ? false : true;
    } else {
      scrollRequest.isEnding = false;
    }
    return scrollRequest.isEnding;
  };
  AutoScroller.prototype._updateRequests = function() {
    var items = this._items;
    var requestsX = this._requests[AXIS_X];
    var requestsY = this._requests[AXIS_Y];
    var item, reqX, reqY, checkTime, needsCheck, checkX, checkY;
    for (var i = 0; i < items.length; i++) {
      item = items[i];
      checkTime = this._requestOverlapCheck[item._id];
      needsCheck = checkTime > 0 && this._tickTime - checkTime > this._overlapCheckInterval;
      checkX = true;
      reqX = requestsX[item._id];
      if (reqX && reqX.isActive) {
        checkX = !this._updateScrollRequest(reqX);
        if (checkX) {
          needsCheck = true;
          this._cancelItemScroll(item, AXIS_X);
        }
      }
      checkY = true;
      reqY = requestsY[item._id];
      if (reqY && reqY.isActive) {
        checkY = !this._updateScrollRequest(reqY);
        if (checkY) {
          needsCheck = true;
          this._cancelItemScroll(item, AXIS_Y);
        }
      }
      if (needsCheck) {
        this._requestOverlapCheck[item._id] = 0;
        this._checkItemOverlap(item, checkX, checkY);
      }
    }
  };
  AutoScroller.prototype._requestAction = function(request, axis) {
    var actions = this._actions;
    var isAxisX = axis === AXIS_X;
    var action = null;
    for (var i = 0; i < actions.length; i++) {
      action = actions[i];
      if (request.element !== action.element) {
        action = null;
        continue;
      }
      if (isAxisX ? action.requestX : action.requestY) {
        this._cancelItemScroll(request.item, axis);
        return;
      }
      break;
    }
    if (!action)
      action = this._actionPool.pick();
    action.element = request.element;
    action.addRequest(request);
    request.tick(this._tickDeltaTime);
    actions.push(action);
  };
  AutoScroller.prototype._updateActions = function() {
    var items = this._items;
    var requests = this._requests;
    var actions = this._actions;
    var itemId;
    var reqX;
    var reqY;
    var i;
    for (i = 0; i < items.length; i++) {
      itemId = items[i]._id;
      reqX = requests[AXIS_X][itemId];
      reqY = requests[AXIS_Y][itemId];
      if (reqX)
        this._requestAction(reqX, AXIS_X);
      if (reqY)
        this._requestAction(reqY, AXIS_Y);
    }
    for (i = 0; i < actions.length; i++) {
      actions[i].computeScrollValues();
    }
  };
  AutoScroller.prototype._applyActions = function() {
    var actions = this._actions;
    var items = this._items;
    var i;
    if (!actions.length)
      return;
    for (i = 0; i < actions.length; i++) {
      actions[i].scroll();
      this._actionPool.release(actions[i]);
    }
    actions.length = 0;
    for (i = 0; i < items.length; i++)
      prepareItemScrollSync(items[i]);
    for (i = 0; i < items.length; i++)
      applyItemScrollSync(items[i]);
  };
  AutoScroller.prototype._updateDragDirection = function(item) {
    var dragPositions = this._dragPositions[item._id];
    var dragDirections = this._dragDirections[item._id];
    var x1 = item._drag._left;
    var y1 = item._drag._top;
    if (dragPositions.length) {
      var x2 = dragPositions[0];
      var y2 = dragPositions[1];
      dragDirections[0] = x1 > x2 ? RIGHT : x1 < x2 ? LEFT : dragDirections[0] || 0;
      dragDirections[1] = y1 > y2 ? DOWN : y1 < y2 ? UP : dragDirections[1] || 0;
    }
    dragPositions[0] = x1;
    dragPositions[1] = y1;
  };
  AutoScroller.prototype.addItem = function(item) {
    if (this._isDestroyed)
      return;
    var index = this._items.indexOf(item);
    if (index === -1) {
      this._items.push(item);
      this._requestOverlapCheck[item._id] = this._tickTime;
      this._dragDirections[item._id] = [0, 0];
      this._dragPositions[item._id] = [];
      if (!this._isTicking)
        this._startTicking();
    }
  };
  AutoScroller.prototype.updateItem = function(item) {
    if (this._isDestroyed)
      return;
    if (!this._dragDirections[item._id])
      return;
    this._updateDragDirection(item);
    if (!this._requestOverlapCheck[item._id]) {
      this._requestOverlapCheck[item._id] = this._tickTime;
    }
  };
  AutoScroller.prototype.removeItem = function(item) {
    if (this._isDestroyed)
      return;
    var index = this._items.indexOf(item);
    if (index === -1)
      return;
    var itemId = item._id;
    var reqX = this._requests[AXIS_X][itemId];
    if (reqX) {
      this._cancelItemScroll(item, AXIS_X);
      delete this._requests[AXIS_X][itemId];
    }
    var reqY = this._requests[AXIS_Y][itemId];
    if (reqY) {
      this._cancelItemScroll(item, AXIS_Y);
      delete this._requests[AXIS_Y][itemId];
    }
    delete this._requestOverlapCheck[itemId];
    delete this._dragPositions[itemId];
    delete this._dragDirections[itemId];
    this._items.splice(index, 1);
    if (this._isTicking && !this._items.length) {
      this._stopTicking();
    }
  };
  AutoScroller.prototype.isItemScrollingX = function(item) {
    var reqX = this._requests[AXIS_X][item._id];
    return !!(reqX && reqX.isActive);
  };
  AutoScroller.prototype.isItemScrollingY = function(item) {
    var reqY = this._requests[AXIS_Y][item._id];
    return !!(reqY && reqY.isActive);
  };
  AutoScroller.prototype.isItemScrolling = function(item) {
    return this.isItemScrollingX(item) || this.isItemScrollingY(item);
  };
  AutoScroller.prototype.destroy = function() {
    if (this._isDestroyed)
      return;
    var items = this._items.slice(0);
    for (var i = 0; i < items.length; i++) {
      this.removeItem(items[i]);
    }
    this._actions.length = 0;
    this._requestPool.reset();
    this._actionPool.reset();
    this._isDestroyed = true;
  };
  var ElProto = window.Element.prototype;
  var matchesFn = ElProto.matches || ElProto.matchesSelector || ElProto.webkitMatchesSelector || ElProto.mozMatchesSelector || ElProto.msMatchesSelector || ElProto.oMatchesSelector || function() {
    return false;
  };
  function elementMatches(el, selector3) {
    return matchesFn.call(el, selector3);
  }
  function addClass(element2, className) {
    if (!className)
      return;
    if (element2.classList) {
      element2.classList.add(className);
    } else {
      if (!elementMatches(element2, "." + className)) {
        element2.className += " " + className;
      }
    }
  }
  var tempArray = [];
  var numberType = "number";
  function arrayInsert(array, items, index) {
    var startIndex = typeof index === numberType ? index : -1;
    if (startIndex < 0)
      startIndex = array.length - startIndex + 1;
    array.splice.apply(array, tempArray.concat(startIndex, 0, items));
    tempArray.length = 0;
  }
  function normalizeArrayIndex(array, index, sizeOffset) {
    var maxIndex = Math.max(0, array.length - 1 + (sizeOffset || 0));
    return index > maxIndex ? maxIndex : index < 0 ? Math.max(maxIndex + index + 1, 0) : index;
  }
  function arrayMove(array, fromIndex, toIndex) {
    if (array.length < 2)
      return;
    var from = normalizeArrayIndex(array, fromIndex);
    var to = normalizeArrayIndex(array, toIndex);
    if (from !== to) {
      array.splice(to, 0, array.splice(from, 1)[0]);
    }
  }
  function arraySwap(array, index, withIndex) {
    if (array.length < 2)
      return;
    var indexA = normalizeArrayIndex(array, index);
    var indexB = normalizeArrayIndex(array, withIndex);
    var temp;
    if (indexA !== indexB) {
      temp = array[indexA];
      array[indexA] = array[indexB];
      array[indexB] = temp;
    }
  }
  var transformProp = getPrefixedPropName(document.documentElement.style, "transform") || "transform";
  var styleNameRegEx = /([A-Z])/g;
  var prefixRegex = /^(webkit-|moz-|ms-|o-)/;
  var msPrefixRegex = /^(-m-s-)/;
  function getStyleName(property) {
    var styleName = property.replace(styleNameRegEx, "-$1").toLowerCase();
    styleName = styleName.replace(prefixRegex, "-$1");
    styleName = styleName.replace(msPrefixRegex, "-ms-");
    return styleName;
  }
  var transformStyle = getStyleName(transformProp);
  var transformNone$1 = "none";
  var displayInline = "inline";
  var displayNone = "none";
  var displayStyle = "display";
  function isTransformed(element2) {
    var transform = getStyle(element2, transformStyle);
    if (!transform || transform === transformNone$1)
      return false;
    var display = getStyle(element2, displayStyle);
    if (display === displayInline || display === displayNone)
      return false;
    return true;
  }
  function getContainingBlock(element2) {
    var doc = document;
    var res = element2 || doc;
    while (res && res !== doc && getStyle(res, "position") === "static" && !isTransformed(res)) {
      res = res.parentElement || doc;
    }
    return res;
  }
  var offsetA = {};
  var offsetB = {};
  var offsetDiff = {};
  function getOffset(element2, offsetData) {
    var offset = offsetData || {};
    var rect;
    offset.left = 0;
    offset.top = 0;
    if (element2 === document)
      return offset;
    offset.left = window.pageXOffset || 0;
    offset.top = window.pageYOffset || 0;
    if (element2.self === window.self)
      return offset;
    rect = element2.getBoundingClientRect();
    offset.left += rect.left;
    offset.top += rect.top;
    offset.left += getStyleAsFloat(element2, "border-left-width");
    offset.top += getStyleAsFloat(element2, "border-top-width");
    return offset;
  }
  function getOffsetDiff(elemA, elemB, compareContainingBlocks) {
    offsetDiff.left = 0;
    offsetDiff.top = 0;
    if (elemA === elemB)
      return offsetDiff;
    if (compareContainingBlocks) {
      elemA = getContainingBlock(elemA);
      elemB = getContainingBlock(elemB);
      if (elemA === elemB)
        return offsetDiff;
    }
    getOffset(elemA, offsetA);
    getOffset(elemB, offsetB);
    offsetDiff.left = offsetB.left - offsetA.left;
    offsetDiff.top = offsetB.top - offsetA.top;
    return offsetDiff;
  }
  function isScrollableOverflow(value) {
    return value === "auto" || value === "scroll" || value === "overlay";
  }
  function isScrollable(element2) {
    return isScrollableOverflow(getStyle(element2, "overflow")) || isScrollableOverflow(getStyle(element2, "overflow-x")) || isScrollableOverflow(getStyle(element2, "overflow-y"));
  }
  function getScrollableAncestors(element2, result) {
    result = result || [];
    while (element2 && element2 !== document) {
      if (element2.getRootNode && element2 instanceof DocumentFragment) {
        element2 = element2.getRootNode().host;
        continue;
      }
      if (isScrollable(element2)) {
        result.push(element2);
      }
      element2 = element2.parentNode;
    }
    result.push(window);
    return result;
  }
  var translateValue = {};
  var transformNone = "none";
  var rxMat3d = /^matrix3d/;
  var rxMatTx = /([^,]*,){4}/;
  var rxMat3dTx = /([^,]*,){12}/;
  var rxNextItem = /[^,]*,/;
  function getTranslate(element2) {
    translateValue.x = 0;
    translateValue.y = 0;
    var transform = getStyle(element2, transformStyle);
    if (!transform || transform === transformNone) {
      return translateValue;
    }
    var isMat3d = rxMat3d.test(transform);
    var tX = transform.replace(isMat3d ? rxMat3dTx : rxMatTx, "");
    var tY = tX.replace(rxNextItem, "");
    translateValue.x = parseFloat(tX) || 0;
    translateValue.y = parseFloat(tY) || 0;
    return translateValue;
  }
  function removeClass(element2, className) {
    if (!className)
      return;
    if (element2.classList) {
      element2.classList.remove(className);
    } else {
      if (elementMatches(element2, "." + className)) {
        element2.className = (" " + element2.className + " ").replace(" " + className + " ", " ").trim();
      }
    }
  }
  var IS_IOS = /^(iPad|iPhone|iPod)/.test(window.navigator.platform) || /^Mac/.test(window.navigator.platform) && window.navigator.maxTouchPoints > 1;
  var START_PREDICATE_INACTIVE = 0;
  var START_PREDICATE_PENDING = 1;
  var START_PREDICATE_RESOLVED = 2;
  var SCROLL_LISTENER_OPTIONS = hasPassiveEvents() ? { passive: true } : false;
  function ItemDrag(item) {
    var element2 = item._element;
    var grid = item.getGrid();
    var settings = grid._settings;
    this._item = item;
    this._gridId = grid._id;
    this._isDestroyed = false;
    this._isMigrating = false;
    this._startPredicate = isFunction(settings.dragStartPredicate) ? settings.dragStartPredicate : ItemDrag.defaultStartPredicate;
    this._startPredicateState = START_PREDICATE_INACTIVE;
    this._startPredicateResult = void 0;
    this._isSortNeeded = false;
    this._sortTimer = void 0;
    this._blockedSortIndex = null;
    this._sortX1 = 0;
    this._sortX2 = 0;
    this._sortY1 = 0;
    this._sortY2 = 0;
    this._reset();
    this._preStartCheck = this._preStartCheck.bind(this);
    this._preEndCheck = this._preEndCheck.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._prepareStart = this._prepareStart.bind(this);
    this._applyStart = this._applyStart.bind(this);
    this._prepareMove = this._prepareMove.bind(this);
    this._applyMove = this._applyMove.bind(this);
    this._prepareScroll = this._prepareScroll.bind(this);
    this._applyScroll = this._applyScroll.bind(this);
    this._handleSort = this._handleSort.bind(this);
    this._handleSortDelayed = this._handleSortDelayed.bind(this);
    this._handle = settings.dragHandle && element2.querySelector(settings.dragHandle) || element2;
    this._dragger = new Dragger(this._handle, settings.dragCssProps);
    this._dragger.on("start", this._preStartCheck);
    this._dragger.on("move", this._preStartCheck);
    this._dragger.on("cancel", this._preEndCheck);
    this._dragger.on("end", this._preEndCheck);
  }
  ItemDrag.autoScroller = new AutoScroller();
  ItemDrag.defaultStartPredicate = function(item, event, options) {
    var drag = item._drag;
    if (event.isFirst && event.srcEvent.button) {
      return false;
    }
    if (!IS_IOS && event.isFirst && event.srcEvent.isTrusted === true && event.srcEvent.defaultPrevented === false && event.srcEvent.cancelable === false) {
      return false;
    }
    if (event.isFinal) {
      drag._finishStartPredicate(event);
      return;
    }
    var predicate = drag._startPredicateData;
    if (!predicate) {
      var config3 = options || drag._getGrid()._settings.dragStartPredicate || {};
      drag._startPredicateData = predicate = {
        distance: Math.max(config3.distance, 0) || 0,
        delay: Math.max(config3.delay, 0) || 0
      };
    }
    if (predicate.delay) {
      predicate.event = event;
      if (!predicate.delayTimer) {
        predicate.delayTimer = window.setTimeout(function() {
          predicate.delay = 0;
          if (drag._resolveStartPredicate(predicate.event)) {
            drag._forceResolveStartPredicate(predicate.event);
            drag._resetStartPredicate();
          }
        }, predicate.delay);
      }
    }
    return drag._resolveStartPredicate(event);
  };
  ItemDrag.defaultSortPredicate = /* @__PURE__ */ function() {
    var itemRect = {};
    var targetRect = {};
    var returnData = {};
    var gridsArray = [];
    var minThreshold = 1;
    var maxThreshold = 100;
    function getTargetGrid(item, rootGrid, threshold) {
      var target = null;
      var dragSort = rootGrid._settings.dragSort;
      var bestScore = -1;
      var gridScore;
      var grids;
      var grid;
      var container;
      var containerRect;
      var left;
      var top;
      var right;
      var bottom;
      var i;
      if (dragSort === true) {
        gridsArray[0] = rootGrid;
        grids = gridsArray;
      } else if (isFunction(dragSort)) {
        grids = dragSort.call(rootGrid, item);
      }
      if (!grids || !Array.isArray(grids) || !grids.length) {
        return target;
      }
      for (i = 0; i < grids.length; i++) {
        grid = grids[i];
        if (grid._isDestroyed)
          continue;
        grid._updateBoundingRect();
        left = Math.max(0, grid._left);
        top = Math.max(0, grid._top);
        right = Math.min(window.innerWidth, grid._right);
        bottom = Math.min(window.innerHeight, grid._bottom);
        container = grid._element.parentNode;
        while (container && container !== document && container !== document.documentElement && container !== document.body) {
          if (container.getRootNode && container instanceof DocumentFragment) {
            container = container.getRootNode().host;
            continue;
          }
          if (getStyle(container, "overflow") !== "visible") {
            containerRect = container.getBoundingClientRect();
            left = Math.max(left, containerRect.left);
            top = Math.max(top, containerRect.top);
            right = Math.min(right, containerRect.right);
            bottom = Math.min(bottom, containerRect.bottom);
          }
          if (getStyle(container, "position") === "fixed") {
            break;
          }
          container = container.parentNode;
        }
        if (left >= right || top >= bottom)
          continue;
        targetRect.left = left;
        targetRect.top = top;
        targetRect.width = right - left;
        targetRect.height = bottom - top;
        gridScore = getIntersectionScore(itemRect, targetRect);
        if (gridScore > threshold && gridScore > bestScore) {
          bestScore = gridScore;
          target = grid;
        }
      }
      gridsArray.length = 0;
      return target;
    }
    return function(item, options) {
      var drag = item._drag;
      var rootGrid = drag._getGrid();
      var sortThreshold = options && typeof options.threshold === "number" ? options.threshold : 50;
      var sortAction = options && options.action === ACTION_SWAP ? ACTION_SWAP : ACTION_MOVE;
      var migrateAction = options && options.migrateAction === ACTION_SWAP ? ACTION_SWAP : ACTION_MOVE;
      sortThreshold = Math.min(Math.max(sortThreshold, minThreshold), maxThreshold);
      itemRect.width = item._width;
      itemRect.height = item._height;
      itemRect.left = drag._clientX;
      itemRect.top = drag._clientY;
      var grid = getTargetGrid(item, rootGrid, sortThreshold);
      if (!grid)
        return null;
      var isMigration = item.getGrid() !== grid;
      var gridOffsetLeft = 0;
      var gridOffsetTop = 0;
      var matchScore = 0;
      var matchIndex = -1;
      var hasValidTargets = false;
      var target;
      var score;
      var i;
      if (grid === rootGrid) {
        itemRect.left = drag._gridX + item._marginLeft;
        itemRect.top = drag._gridY + item._marginTop;
      } else {
        grid._updateBorders(1, 0, 1, 0);
        gridOffsetLeft = grid._left + grid._borderLeft;
        gridOffsetTop = grid._top + grid._borderTop;
      }
      for (i = 0; i < grid._items.length; i++) {
        target = grid._items[i];
        if (!target._isActive || target === item) {
          continue;
        }
        hasValidTargets = true;
        targetRect.width = target._width;
        targetRect.height = target._height;
        targetRect.left = target._left + target._marginLeft + gridOffsetLeft;
        targetRect.top = target._top + target._marginTop + gridOffsetTop;
        score = getIntersectionScore(itemRect, targetRect);
        if (score > matchScore) {
          matchIndex = i;
          matchScore = score;
        }
      }
      if (isMigration && matchScore < sortThreshold) {
        matchIndex = hasValidTargets ? matchIndex : 0;
        matchScore = sortThreshold;
      }
      if (matchScore >= sortThreshold) {
        returnData.grid = grid;
        returnData.index = matchIndex;
        returnData.action = isMigration ? migrateAction : sortAction;
        return returnData;
      }
      return null;
    };
  }();
  ItemDrag.prototype.stop = function() {
    if (!this._isActive)
      return;
    if (this._isMigrating) {
      this._finishMigration();
      return;
    }
    var item = this._item;
    var itemId = item._id;
    ItemDrag.autoScroller.removeItem(item);
    cancelDragStartTick(itemId);
    cancelDragMoveTick(itemId);
    cancelDragScrollTick(itemId);
    this._cancelSort();
    if (this._isStarted) {
      this._unbindScrollListeners();
      var element2 = item._element;
      var grid = this._getGrid();
      var draggingClass = grid._settings.itemDraggingClass;
      if (element2.parentNode !== grid._element) {
        grid._element.appendChild(element2);
        item._setTranslate(this._gridX, this._gridY);
        if (draggingClass)
          element2.clientWidth;
      }
      removeClass(element2, draggingClass);
    }
    this._reset();
  };
  ItemDrag.prototype.sort = function(force) {
    var item = this._item;
    if (this._isActive && item._isActive && this._dragMoveEvent) {
      if (force === true) {
        this._handleSort();
      } else {
        addDragSortTick(item._id, this._handleSort);
      }
    }
  };
  ItemDrag.prototype.destroy = function() {
    if (this._isDestroyed)
      return;
    this.stop();
    this._dragger.destroy();
    ItemDrag.autoScroller.removeItem(this._item);
    this._isDestroyed = true;
  };
  ItemDrag.prototype._getGrid = function() {
    return GRID_INSTANCES[this._gridId] || null;
  };
  ItemDrag.prototype._reset = function() {
    this._isActive = false;
    this._isStarted = false;
    this._container = null;
    this._containingBlock = null;
    this._dragStartEvent = null;
    this._dragMoveEvent = null;
    this._dragPrevMoveEvent = null;
    this._scrollEvent = null;
    this._scrollers = [];
    this._left = 0;
    this._top = 0;
    this._gridX = 0;
    this._gridY = 0;
    this._clientX = 0;
    this._clientY = 0;
    this._scrollDiffX = 0;
    this._scrollDiffY = 0;
    this._moveDiffX = 0;
    this._moveDiffY = 0;
    this._containerDiffX = 0;
    this._containerDiffY = 0;
  };
  ItemDrag.prototype._bindScrollListeners = function() {
    var gridContainer = this._getGrid()._element;
    var dragContainer = this._container;
    var scrollers = this._scrollers;
    var gridScrollers;
    var i;
    scrollers.length = 0;
    getScrollableAncestors(this._item._element.parentNode, scrollers);
    if (dragContainer !== gridContainer) {
      gridScrollers = [];
      getScrollableAncestors(gridContainer, gridScrollers);
      for (i = 0; i < gridScrollers.length; i++) {
        if (scrollers.indexOf(gridScrollers[i]) < 0) {
          scrollers.push(gridScrollers[i]);
        }
      }
    }
    for (i = 0; i < scrollers.length; i++) {
      scrollers[i].addEventListener("scroll", this._onScroll, SCROLL_LISTENER_OPTIONS);
    }
  };
  ItemDrag.prototype._unbindScrollListeners = function() {
    var scrollers = this._scrollers;
    var i;
    for (i = 0; i < scrollers.length; i++) {
      scrollers[i].removeEventListener("scroll", this._onScroll, SCROLL_LISTENER_OPTIONS);
    }
    scrollers.length = 0;
  };
  ItemDrag.prototype._resolveStartPredicate = function(event) {
    var predicate = this._startPredicateData;
    if (event.distance < predicate.distance || predicate.delay)
      return;
    this._resetStartPredicate();
    return true;
  };
  ItemDrag.prototype._forceResolveStartPredicate = function(event) {
    if (!this._isDestroyed && this._startPredicateState === START_PREDICATE_PENDING) {
      this._startPredicateState = START_PREDICATE_RESOLVED;
      this._onStart(event);
    }
  };
  ItemDrag.prototype._finishStartPredicate = function(event) {
    var element2 = this._item._element;
    var isClick = Math.abs(event.deltaX) < 2 && Math.abs(event.deltaY) < 2 && event.deltaTime < 200;
    this._resetStartPredicate();
    if (isClick)
      openAnchorHref(element2);
  };
  ItemDrag.prototype._resetHeuristics = function(x, y) {
    this._blockedSortIndex = null;
    this._sortX1 = this._sortX2 = x;
    this._sortY1 = this._sortY2 = y;
  };
  ItemDrag.prototype._checkHeuristics = function(x, y) {
    var settings = this._getGrid()._settings.dragSortHeuristics;
    var minDist = settings.minDragDistance;
    if (minDist <= 0) {
      this._blockedSortIndex = null;
      return true;
    }
    var diffX = x - this._sortX2;
    var diffY = y - this._sortY2;
    var canCheckBounceBack = minDist > 3 && settings.minBounceBackAngle > 0;
    if (!canCheckBounceBack) {
      this._blockedSortIndex = null;
    }
    if (Math.abs(diffX) > minDist || Math.abs(diffY) > minDist) {
      if (canCheckBounceBack) {
        var angle = Math.atan2(diffX, diffY);
        var prevAngle = Math.atan2(this._sortX2 - this._sortX1, this._sortY2 - this._sortY1);
        var deltaAngle = Math.atan2(Math.sin(angle - prevAngle), Math.cos(angle - prevAngle));
        if (Math.abs(deltaAngle) > settings.minBounceBackAngle) {
          this._blockedSortIndex = null;
        }
      }
      this._sortX1 = this._sortX2;
      this._sortY1 = this._sortY2;
      this._sortX2 = x;
      this._sortY2 = y;
      return true;
    }
    return false;
  };
  ItemDrag.prototype._resetStartPredicate = function() {
    var predicate = this._startPredicateData;
    if (predicate) {
      if (predicate.delayTimer) {
        predicate.delayTimer = window.clearTimeout(predicate.delayTimer);
      }
      this._startPredicateData = null;
    }
  };
  ItemDrag.prototype._handleSort = function() {
    if (!this._isActive)
      return;
    var settings = this._getGrid()._settings;
    if (!settings.dragSort || !settings.dragAutoScroll.sortDuringScroll && ItemDrag.autoScroller.isItemScrolling(this._item)) {
      this._sortX1 = this._sortX2 = this._gridX;
      this._sortY1 = this._sortY2 = this._gridY;
      this._isSortNeeded = true;
      if (this._sortTimer !== void 0) {
        this._sortTimer = window.clearTimeout(this._sortTimer);
      }
      return;
    }
    var shouldSort = this._checkHeuristics(this._gridX, this._gridY);
    if (!this._isSortNeeded && !shouldSort)
      return;
    var sortInterval = settings.dragSortHeuristics.sortInterval;
    if (sortInterval <= 0 || this._isSortNeeded) {
      this._isSortNeeded = false;
      if (this._sortTimer !== void 0) {
        this._sortTimer = window.clearTimeout(this._sortTimer);
      }
      this._checkOverlap();
    } else if (this._sortTimer === void 0) {
      this._sortTimer = window.setTimeout(this._handleSortDelayed, sortInterval);
    }
  };
  ItemDrag.prototype._handleSortDelayed = function() {
    this._isSortNeeded = true;
    this._sortTimer = void 0;
    addDragSortTick(this._item._id, this._handleSort);
  };
  ItemDrag.prototype._cancelSort = function() {
    this._isSortNeeded = false;
    if (this._sortTimer !== void 0) {
      this._sortTimer = window.clearTimeout(this._sortTimer);
    }
    cancelDragSortTick(this._item._id);
  };
  ItemDrag.prototype._finishSort = function() {
    var isSortEnabled = this._getGrid()._settings.dragSort;
    var needsFinalCheck = isSortEnabled && (this._isSortNeeded || this._sortTimer !== void 0);
    this._cancelSort();
    if (needsFinalCheck)
      this._checkOverlap();
  };
  ItemDrag.prototype._checkOverlap = function() {
    if (!this._isActive)
      return;
    var item = this._item;
    var settings = this._getGrid()._settings;
    var result;
    var currentGrid;
    var currentIndex;
    var targetGrid;
    var targetIndex;
    var targetItem;
    var sortAction;
    var isMigration;
    if (isFunction(settings.dragSortPredicate)) {
      result = settings.dragSortPredicate(item, this._dragMoveEvent);
    } else {
      result = ItemDrag.defaultSortPredicate(item, settings.dragSortPredicate);
    }
    if (!result || typeof result.index !== "number")
      return;
    sortAction = result.action === ACTION_SWAP ? ACTION_SWAP : ACTION_MOVE;
    currentGrid = item.getGrid();
    targetGrid = result.grid || currentGrid;
    isMigration = currentGrid !== targetGrid;
    currentIndex = currentGrid._items.indexOf(item);
    targetIndex = normalizeArrayIndex(
      targetGrid._items,
      result.index,
      isMigration && sortAction === ACTION_MOVE ? 1 : 0
    );
    if (!isMigration && targetIndex === this._blockedSortIndex) {
      return;
    }
    if (!isMigration) {
      if (currentIndex !== targetIndex) {
        this._blockedSortIndex = currentIndex;
        (sortAction === ACTION_SWAP ? arraySwap : arrayMove)(
          currentGrid._items,
          currentIndex,
          targetIndex
        );
        if (currentGrid._hasListeners(EVENT_MOVE)) {
          currentGrid._emit(EVENT_MOVE, {
            item,
            fromIndex: currentIndex,
            toIndex: targetIndex,
            action: sortAction
          });
        }
        currentGrid.layout();
      }
    } else {
      this._blockedSortIndex = null;
      targetItem = targetGrid._items[targetIndex];
      if (currentGrid._hasListeners(EVENT_BEFORE_SEND)) {
        currentGrid._emit(EVENT_BEFORE_SEND, {
          item,
          fromGrid: currentGrid,
          fromIndex: currentIndex,
          toGrid: targetGrid,
          toIndex: targetIndex
        });
      }
      if (targetGrid._hasListeners(EVENT_BEFORE_RECEIVE)) {
        targetGrid._emit(EVENT_BEFORE_RECEIVE, {
          item,
          fromGrid: currentGrid,
          fromIndex: currentIndex,
          toGrid: targetGrid,
          toIndex: targetIndex
        });
      }
      item._gridId = targetGrid._id;
      this._isMigrating = item._gridId !== this._gridId;
      currentGrid._items.splice(currentIndex, 1);
      arrayInsert(targetGrid._items, item, targetIndex);
      item._sortData = null;
      if (currentGrid._hasListeners(EVENT_SEND)) {
        currentGrid._emit(EVENT_SEND, {
          item,
          fromGrid: currentGrid,
          fromIndex: currentIndex,
          toGrid: targetGrid,
          toIndex: targetIndex
        });
      }
      if (targetGrid._hasListeners(EVENT_RECEIVE)) {
        targetGrid._emit(EVENT_RECEIVE, {
          item,
          fromGrid: currentGrid,
          fromIndex: currentIndex,
          toGrid: targetGrid,
          toIndex: targetIndex
        });
      }
      if (sortAction === ACTION_SWAP && targetItem && targetItem.isActive()) {
        if (targetGrid._items.indexOf(targetItem) > -1) {
          targetGrid.send(targetItem, currentGrid, currentIndex, {
            appendTo: this._container || document.body,
            layoutSender: false,
            layoutReceiver: false
          });
        }
      }
      currentGrid.layout();
      targetGrid.layout();
    }
  };
  ItemDrag.prototype._finishMigration = function() {
    var item = this._item;
    var release = item._dragRelease;
    var element2 = item._element;
    var isActive = item._isActive;
    var targetGrid = item.getGrid();
    var targetGridElement = targetGrid._element;
    var targetSettings = targetGrid._settings;
    var targetContainer = targetSettings.dragContainer || targetGridElement;
    var currentSettings = this._getGrid()._settings;
    var currentContainer = element2.parentNode;
    var currentVisClass = isActive ? currentSettings.itemVisibleClass : currentSettings.itemHiddenClass;
    var nextVisClass = isActive ? targetSettings.itemVisibleClass : targetSettings.itemHiddenClass;
    var translate;
    var offsetDiff2;
    this._isMigrating = false;
    this.destroy();
    if (currentSettings.itemClass !== targetSettings.itemClass) {
      removeClass(element2, currentSettings.itemClass);
      addClass(element2, targetSettings.itemClass);
    }
    if (currentVisClass !== nextVisClass) {
      removeClass(element2, currentVisClass);
      addClass(element2, nextVisClass);
    }
    if (targetContainer !== currentContainer) {
      targetContainer.appendChild(element2);
      offsetDiff2 = getOffsetDiff(currentContainer, targetContainer, true);
      translate = getTranslate(element2);
      translate.x -= offsetDiff2.left;
      translate.y -= offsetDiff2.top;
    }
    item._refreshDimensions();
    offsetDiff2 = getOffsetDiff(targetContainer, targetGridElement, true);
    release._containerDiffX = offsetDiff2.left;
    release._containerDiffY = offsetDiff2.top;
    item._drag = targetSettings.dragEnabled ? new ItemDrag(item) : null;
    if (targetContainer !== currentContainer) {
      item._setTranslate(translate.x, translate.y);
    }
    item._visibility.setStyles(isActive ? targetSettings.visibleStyles : targetSettings.hiddenStyles);
    release.start();
  };
  ItemDrag.prototype._preStartCheck = function(event) {
    if (this._startPredicateState === START_PREDICATE_INACTIVE) {
      this._startPredicateState = START_PREDICATE_PENDING;
    }
    if (this._startPredicateState === START_PREDICATE_PENDING) {
      this._startPredicateResult = this._startPredicate(this._item, event);
      if (this._startPredicateResult === true) {
        this._startPredicateState = START_PREDICATE_RESOLVED;
        this._onStart(event);
      } else if (this._startPredicateResult === false) {
        this._resetStartPredicate(event);
        this._dragger._reset();
        this._startPredicateState = START_PREDICATE_INACTIVE;
      }
    } else if (this._startPredicateState === START_PREDICATE_RESOLVED && this._isActive) {
      this._onMove(event);
    }
  };
  ItemDrag.prototype._preEndCheck = function(event) {
    var isResolved = this._startPredicateState === START_PREDICATE_RESOLVED;
    this._startPredicate(this._item, event);
    this._startPredicateState = START_PREDICATE_INACTIVE;
    if (!isResolved || !this._isActive)
      return;
    if (this._isStarted) {
      this._onEnd(event);
    } else {
      this.stop();
    }
  };
  ItemDrag.prototype._onStart = function(event) {
    var item = this._item;
    if (!item._isActive)
      return;
    this._isActive = true;
    this._dragStartEvent = event;
    ItemDrag.autoScroller.addItem(item);
    addDragStartTick(item._id, this._prepareStart, this._applyStart);
  };
  ItemDrag.prototype._prepareStart = function() {
    if (!this._isActive)
      return;
    var item = this._item;
    if (!item._isActive)
      return;
    var element2 = item._element;
    var grid = this._getGrid();
    var settings = grid._settings;
    var gridContainer = grid._element;
    var dragContainer = settings.dragContainer || gridContainer;
    var containingBlock = getContainingBlock(dragContainer);
    var translate = getTranslate(element2);
    var elementRect = element2.getBoundingClientRect();
    var hasDragContainer = dragContainer !== gridContainer;
    this._container = dragContainer;
    this._containingBlock = containingBlock;
    this._clientX = elementRect.left;
    this._clientY = elementRect.top;
    this._left = this._gridX = translate.x;
    this._top = this._gridY = translate.y;
    this._scrollDiffX = this._scrollDiffY = 0;
    this._moveDiffX = this._moveDiffY = 0;
    this._resetHeuristics(this._gridX, this._gridY);
    if (hasDragContainer) {
      var offsetDiff2 = getOffsetDiff(containingBlock, gridContainer);
      this._containerDiffX = offsetDiff2.left;
      this._containerDiffY = offsetDiff2.top;
    }
  };
  ItemDrag.prototype._applyStart = function() {
    if (!this._isActive)
      return;
    var item = this._item;
    if (!item._isActive)
      return;
    var grid = this._getGrid();
    var element2 = item._element;
    var release = item._dragRelease;
    var migrate = item._migrate;
    var hasDragContainer = this._container !== grid._element;
    if (item.isPositioning()) {
      item._layout.stop(true, this._left, this._top);
    }
    if (migrate._isActive) {
      this._left -= migrate._containerDiffX;
      this._top -= migrate._containerDiffY;
      this._gridX -= migrate._containerDiffX;
      this._gridY -= migrate._containerDiffY;
      migrate.stop(true, this._left, this._top);
    }
    if (item.isReleasing()) {
      release._reset();
    }
    if (grid._settings.dragPlaceholder.enabled) {
      item._dragPlaceholder.create();
    }
    this._isStarted = true;
    grid._emit(EVENT_DRAG_INIT, item, this._dragStartEvent);
    if (hasDragContainer) {
      if (element2.parentNode === this._container) {
        this._gridX -= this._containerDiffX;
        this._gridY -= this._containerDiffY;
      } else {
        this._left += this._containerDiffX;
        this._top += this._containerDiffY;
        this._container.appendChild(element2);
        item._setTranslate(this._left, this._top);
      }
    }
    addClass(element2, grid._settings.itemDraggingClass);
    this._bindScrollListeners();
    grid._emit(EVENT_DRAG_START, item, this._dragStartEvent);
  };
  ItemDrag.prototype._onMove = function(event) {
    var item = this._item;
    if (!item._isActive) {
      this.stop();
      return;
    }
    this._dragMoveEvent = event;
    addDragMoveTick(item._id, this._prepareMove, this._applyMove);
    addDragSortTick(item._id, this._handleSort);
  };
  ItemDrag.prototype._prepareMove = function() {
    if (!this._isActive)
      return;
    var item = this._item;
    if (!item._isActive)
      return;
    var settings = this._getGrid()._settings;
    var axis = settings.dragAxis;
    var nextEvent = this._dragMoveEvent;
    var prevEvent = this._dragPrevMoveEvent || this._dragStartEvent || nextEvent;
    if (axis !== "y") {
      var moveDiffX = nextEvent.clientX - prevEvent.clientX;
      this._left = this._left - this._moveDiffX + moveDiffX;
      this._gridX = this._gridX - this._moveDiffX + moveDiffX;
      this._clientX = this._clientX - this._moveDiffX + moveDiffX;
      this._moveDiffX = moveDiffX;
    }
    if (axis !== "x") {
      var moveDiffY = nextEvent.clientY - prevEvent.clientY;
      this._top = this._top - this._moveDiffY + moveDiffY;
      this._gridY = this._gridY - this._moveDiffY + moveDiffY;
      this._clientY = this._clientY - this._moveDiffY + moveDiffY;
      this._moveDiffY = moveDiffY;
    }
    this._dragPrevMoveEvent = nextEvent;
  };
  ItemDrag.prototype._applyMove = function() {
    if (!this._isActive)
      return;
    var item = this._item;
    if (!item._isActive)
      return;
    this._moveDiffX = this._moveDiffY = 0;
    item._setTranslate(this._left, this._top);
    this._getGrid()._emit(EVENT_DRAG_MOVE, item, this._dragMoveEvent);
    ItemDrag.autoScroller.updateItem(item);
  };
  ItemDrag.prototype._onScroll = function(event) {
    var item = this._item;
    if (!item._isActive) {
      this.stop();
      return;
    }
    this._scrollEvent = event;
    addDragScrollTick(item._id, this._prepareScroll, this._applyScroll);
    addDragSortTick(item._id, this._handleSort);
  };
  ItemDrag.prototype._prepareScroll = function() {
    if (!this._isActive)
      return;
    var item = this._item;
    if (!item._isActive)
      return;
    var element2 = item._element;
    var grid = this._getGrid();
    var gridContainer = grid._element;
    var rect = element2.getBoundingClientRect();
    if (this._container !== gridContainer) {
      var offsetDiff2 = getOffsetDiff(this._containingBlock, gridContainer);
      this._containerDiffX = offsetDiff2.left;
      this._containerDiffY = offsetDiff2.top;
    }
    var scrollDiffX = this._clientX - this._moveDiffX - rect.left;
    this._left = this._left - this._scrollDiffX + scrollDiffX;
    this._scrollDiffX = scrollDiffX;
    var scrollDiffY = this._clientY - this._moveDiffY - rect.top;
    this._top = this._top - this._scrollDiffY + scrollDiffY;
    this._scrollDiffY = scrollDiffY;
    this._gridX = this._left - this._containerDiffX;
    this._gridY = this._top - this._containerDiffY;
  };
  ItemDrag.prototype._applyScroll = function() {
    if (!this._isActive)
      return;
    var item = this._item;
    if (!item._isActive)
      return;
    this._scrollDiffX = this._scrollDiffY = 0;
    item._setTranslate(this._left, this._top);
    this._getGrid()._emit(EVENT_DRAG_SCROLL, item, this._scrollEvent);
  };
  ItemDrag.prototype._onEnd = function(event) {
    var item = this._item;
    var element2 = item._element;
    var grid = this._getGrid();
    var settings = grid._settings;
    var release = item._dragRelease;
    if (!item._isActive) {
      this.stop();
      return;
    }
    cancelDragStartTick(item._id);
    cancelDragMoveTick(item._id);
    cancelDragScrollTick(item._id);
    this._finishSort();
    this._unbindScrollListeners();
    release._containerDiffX = this._containerDiffX;
    release._containerDiffY = this._containerDiffY;
    this._reset();
    removeClass(element2, settings.itemDraggingClass);
    ItemDrag.autoScroller.removeItem(item);
    grid._emit(EVENT_DRAG_END, item, event);
    this._isMigrating ? this._finishMigration() : release.start();
  };
  function openAnchorHref(element2) {
    if (element2.tagName.toLowerCase() !== "a")
      return;
    var href = element2.getAttribute("href");
    if (!href)
      return;
    var target = element2.getAttribute("target");
    if (target && target !== "_self") {
      window.open(href, target);
    } else {
      window.location.href = href;
    }
  }
  function getCurrentStyles(element2, styles) {
    var result = {};
    var prop, i;
    if (Array.isArray(styles)) {
      for (i = 0; i < styles.length; i++) {
        prop = styles[i];
        result[prop] = getStyle(element2, getStyleName(prop));
      }
    } else {
      for (prop in styles) {
        result[prop] = getStyle(element2, getStyleName(prop));
      }
    }
    return result;
  }
  var unprefixRegEx = /^(webkit|moz|ms|o|Webkit|Moz|MS|O)(?=[A-Z])/;
  var cache = {};
  function getUnprefixedPropName(prop) {
    var result = cache[prop];
    if (result)
      return result;
    result = prop.replace(unprefixRegEx, "");
    if (result !== prop) {
      result = result[0].toLowerCase() + result.slice(1);
    }
    cache[prop] = result;
    return result;
  }
  var nativeCode = "[native code]";
  function isNative(feat) {
    var S = window.Symbol;
    return !!(feat && isFunction(S) && isFunction(S.toString) && S(feat).toString().indexOf(nativeCode) > -1);
  }
  function setStyles(element2, styles) {
    for (var prop in styles) {
      element2.style[prop] = styles[prop];
    }
  }
  var HAS_WEB_ANIMATIONS = !!(Element && isFunction(Element.prototype.animate));
  var HAS_NATIVE_WEB_ANIMATIONS = !!(Element && isNative(Element.prototype.animate));
  function Animator(element2) {
    this._element = element2;
    this._animation = null;
    this._duration = 0;
    this._easing = "";
    this._callback = null;
    this._props = [];
    this._values = [];
    this._isDestroyed = false;
    this._onFinish = this._onFinish.bind(this);
  }
  Animator.prototype.start = function(propsFrom, propsTo, options) {
    if (this._isDestroyed)
      return;
    var element2 = this._element;
    var opts = options || {};
    if (!HAS_WEB_ANIMATIONS) {
      setStyles(element2, propsTo);
      this._callback = isFunction(opts.onFinish) ? opts.onFinish : null;
      this._onFinish();
      return;
    }
    var animation = this._animation;
    var currentProps2 = this._props;
    var currentValues = this._values;
    var duration = opts.duration || 300;
    var easing = opts.easing || "ease";
    var cancelAnimation = false;
    var propName, propCount, propIndex;
    if (animation) {
      propCount = 0;
      if (duration !== this._duration || easing !== this._easing) {
        cancelAnimation = true;
      }
      if (!cancelAnimation) {
        for (propName in propsTo) {
          ++propCount;
          propIndex = currentProps2.indexOf(propName);
          if (propIndex === -1 || propsTo[propName] !== currentValues[propIndex]) {
            cancelAnimation = true;
            break;
          }
        }
        if (propCount !== currentProps2.length) {
          cancelAnimation = true;
        }
      }
    }
    if (cancelAnimation)
      animation.cancel();
    this._callback = isFunction(opts.onFinish) ? opts.onFinish : null;
    if (animation && !cancelAnimation)
      return;
    currentProps2.length = currentValues.length = 0;
    for (propName in propsTo) {
      currentProps2.push(propName);
      currentValues.push(propsTo[propName]);
    }
    this._duration = duration;
    this._easing = easing;
    this._animation = element2.animate(
      [
        createFrame(propsFrom, HAS_NATIVE_WEB_ANIMATIONS),
        createFrame(propsTo, HAS_NATIVE_WEB_ANIMATIONS)
      ],
      {
        duration,
        easing
      }
    );
    this._animation.onfinish = this._onFinish;
    setStyles(element2, propsTo);
  };
  Animator.prototype.stop = function() {
    if (this._isDestroyed || !this._animation)
      return;
    this._animation.cancel();
    this._animation = this._callback = null;
    this._props.length = this._values.length = 0;
  };
  Animator.prototype.getCurrentStyles = function() {
    return getCurrentStyles(element, currentProps);
  };
  Animator.prototype.isAnimating = function() {
    return !!this._animation;
  };
  Animator.prototype.destroy = function() {
    if (this._isDestroyed)
      return;
    this.stop();
    this._element = null;
    this._isDestroyed = true;
  };
  Animator.prototype._onFinish = function() {
    var callback = this._callback;
    this._animation = this._callback = null;
    this._props.length = this._values.length = 0;
    callback && callback();
  };
  function createFrame(props, prefix) {
    var frame = {};
    for (var prop in props) {
      frame[prefix ? prop : getUnprefixedPropName(prop)] = props[prop];
    }
    return frame;
  }
  function getTranslateString(x, y) {
    return "translateX(" + x + "px) translateY(" + y + "px)";
  }
  function ItemDragPlaceholder(item) {
    this._item = item;
    this._animation = new Animator();
    this._element = null;
    this._className = "";
    this._didMigrate = false;
    this._resetAfterLayout = false;
    this._left = 0;
    this._top = 0;
    this._transX = 0;
    this._transY = 0;
    this._nextTransX = 0;
    this._nextTransY = 0;
    this._setupAnimation = this._setupAnimation.bind(this);
    this._startAnimation = this._startAnimation.bind(this);
    this._updateDimensions = this._updateDimensions.bind(this);
    this._onLayoutStart = this._onLayoutStart.bind(this);
    this._onLayoutEnd = this._onLayoutEnd.bind(this);
    this._onReleaseEnd = this._onReleaseEnd.bind(this);
    this._onMigrate = this._onMigrate.bind(this);
    this._onHide = this._onHide.bind(this);
  }
  ItemDragPlaceholder.prototype._updateDimensions = function() {
    if (!this.isActive())
      return;
    setStyles(this._element, {
      width: this._item._width + "px",
      height: this._item._height + "px"
    });
  };
  ItemDragPlaceholder.prototype._onLayoutStart = function(items, isInstant) {
    var item = this._item;
    if (items.indexOf(item) === -1) {
      this.reset();
      return;
    }
    var nextLeft = item._left;
    var nextTop = item._top;
    var currentLeft = this._left;
    var currentTop = this._top;
    this._left = nextLeft;
    this._top = nextTop;
    if (!isInstant && !this._didMigrate && currentLeft === nextLeft && currentTop === nextTop) {
      return;
    }
    var nextX = nextLeft + item._marginLeft;
    var nextY = nextTop + item._marginTop;
    var grid = item.getGrid();
    var animEnabled = !isInstant && grid._settings.layoutDuration > 0;
    if (!animEnabled || this._didMigrate) {
      cancelPlaceholderLayoutTick(item._id);
      this._element.style[transformProp] = getTranslateString(nextX, nextY);
      this._animation.stop();
      if (this._didMigrate) {
        grid.getElement().appendChild(this._element);
        this._didMigrate = false;
      }
      return;
    }
    this._nextTransX = nextX;
    this._nextTransY = nextY;
    addPlaceholderLayoutTick(item._id, this._setupAnimation, this._startAnimation);
  };
  ItemDragPlaceholder.prototype._setupAnimation = function() {
    if (!this.isActive())
      return;
    var translate = getTranslate(this._element);
    this._transX = translate.x;
    this._transY = translate.y;
  };
  ItemDragPlaceholder.prototype._startAnimation = function() {
    if (!this.isActive())
      return;
    var animation = this._animation;
    var currentX = this._transX;
    var currentY = this._transY;
    var nextX = this._nextTransX;
    var nextY = this._nextTransY;
    if (currentX === nextX && currentY === nextY) {
      if (animation.isAnimating()) {
        this._element.style[transformProp] = getTranslateString(nextX, nextY);
        animation.stop();
      }
      return;
    }
    var settings = this._item.getGrid()._settings;
    var currentStyles = {};
    var targetStyles = {};
    currentStyles[transformProp] = getTranslateString(currentX, currentY);
    targetStyles[transformProp] = getTranslateString(nextX, nextY);
    animation.start(currentStyles, targetStyles, {
      duration: settings.layoutDuration,
      easing: settings.layoutEasing,
      onFinish: this._onLayoutEnd
    });
  };
  ItemDragPlaceholder.prototype._onLayoutEnd = function() {
    if (this._resetAfterLayout) {
      this.reset();
    }
  };
  ItemDragPlaceholder.prototype._onReleaseEnd = function(item) {
    if (item._id === this._item._id) {
      if (!this._animation.isAnimating()) {
        this.reset();
        return;
      }
      this._resetAfterLayout = true;
    }
  };
  ItemDragPlaceholder.prototype._onMigrate = function(data) {
    if (data.item !== this._item)
      return;
    var grid = this._item.getGrid();
    var nextGrid = data.toGrid;
    grid.off(EVENT_DRAG_RELEASE_END, this._onReleaseEnd);
    grid.off(EVENT_LAYOUT_START, this._onLayoutStart);
    grid.off(EVENT_BEFORE_SEND, this._onMigrate);
    grid.off(EVENT_HIDE_START, this._onHide);
    nextGrid.on(EVENT_DRAG_RELEASE_END, this._onReleaseEnd);
    nextGrid.on(EVENT_LAYOUT_START, this._onLayoutStart);
    nextGrid.on(EVENT_BEFORE_SEND, this._onMigrate);
    nextGrid.on(EVENT_HIDE_START, this._onHide);
    this._didMigrate = true;
  };
  ItemDragPlaceholder.prototype._onHide = function(items) {
    if (items.indexOf(this._item) > -1)
      this.reset();
  };
  ItemDragPlaceholder.prototype.create = function() {
    if (this.isActive()) {
      this._resetAfterLayout = false;
      return;
    }
    var item = this._item;
    var grid = item.getGrid();
    var settings = grid._settings;
    var animation = this._animation;
    this._left = item._left;
    this._top = item._top;
    var element2;
    if (isFunction(settings.dragPlaceholder.createElement)) {
      element2 = settings.dragPlaceholder.createElement(item);
    } else {
      element2 = document.createElement("div");
    }
    this._element = element2;
    animation._element = element2;
    this._className = settings.itemPlaceholderClass || "";
    if (this._className) {
      addClass(element2, this._className);
    }
    setStyles(element2, {
      position: "absolute",
      left: "0px",
      top: "0px",
      width: item._width + "px",
      height: item._height + "px"
    });
    element2.style[transformProp] = getTranslateString(
      item._left + item._marginLeft,
      item._top + item._marginTop
    );
    grid.on(EVENT_LAYOUT_START, this._onLayoutStart);
    grid.on(EVENT_DRAG_RELEASE_END, this._onReleaseEnd);
    grid.on(EVENT_BEFORE_SEND, this._onMigrate);
    grid.on(EVENT_HIDE_START, this._onHide);
    if (isFunction(settings.dragPlaceholder.onCreate)) {
      settings.dragPlaceholder.onCreate(item, element2);
    }
    grid.getElement().appendChild(element2);
  };
  ItemDragPlaceholder.prototype.reset = function() {
    if (!this.isActive())
      return;
    var element2 = this._element;
    var item = this._item;
    var grid = item.getGrid();
    var settings = grid._settings;
    var animation = this._animation;
    this._resetAfterLayout = false;
    cancelPlaceholderLayoutTick(item._id);
    cancelPlaceholderResizeTick(item._id);
    animation.stop();
    animation._element = null;
    grid.off(EVENT_DRAG_RELEASE_END, this._onReleaseEnd);
    grid.off(EVENT_LAYOUT_START, this._onLayoutStart);
    grid.off(EVENT_BEFORE_SEND, this._onMigrate);
    grid.off(EVENT_HIDE_START, this._onHide);
    if (this._className) {
      removeClass(element2, this._className);
      this._className = "";
    }
    element2.parentNode.removeChild(element2);
    this._element = null;
    if (isFunction(settings.dragPlaceholder.onRemove)) {
      settings.dragPlaceholder.onRemove(item, element2);
    }
  };
  ItemDragPlaceholder.prototype.isActive = function() {
    return !!this._element;
  };
  ItemDragPlaceholder.prototype.getElement = function() {
    return this._element;
  };
  ItemDragPlaceholder.prototype.updateDimensions = function() {
    if (!this.isActive())
      return;
    addPlaceholderResizeTick(this._item._id, this._updateDimensions);
  };
  ItemDragPlaceholder.prototype.destroy = function() {
    this.reset();
    this._animation.destroy();
    this._item = this._animation = null;
  };
  function ItemDragRelease(item) {
    this._item = item;
    this._isActive = false;
    this._isDestroyed = false;
    this._isPositioningStarted = false;
    this._containerDiffX = 0;
    this._containerDiffY = 0;
  }
  ItemDragRelease.prototype.start = function() {
    if (this._isDestroyed || this._isActive)
      return;
    var item = this._item;
    var grid = item.getGrid();
    var settings = grid._settings;
    this._isActive = true;
    addClass(item._element, settings.itemReleasingClass);
    if (!settings.dragRelease.useDragContainer) {
      this._placeToGrid();
    }
    grid._emit(EVENT_DRAG_RELEASE_START, item);
    if (!grid._nextLayoutData)
      item._layout.start(false);
  };
  ItemDragRelease.prototype.stop = function(abort, left, top) {
    if (this._isDestroyed || !this._isActive)
      return;
    var item = this._item;
    var grid = item.getGrid();
    if (!abort && (left === void 0 || top === void 0)) {
      left = item._left;
      top = item._top;
    }
    var didReparent = this._placeToGrid(left, top);
    this._reset(didReparent);
    if (!abort)
      grid._emit(EVENT_DRAG_RELEASE_END, item);
  };
  ItemDragRelease.prototype.isJustReleased = function() {
    return this._isActive && this._isPositioningStarted === false;
  };
  ItemDragRelease.prototype.destroy = function() {
    if (this._isDestroyed)
      return;
    this.stop(true);
    this._item = null;
    this._isDestroyed = true;
  };
  ItemDragRelease.prototype._placeToGrid = function(left, top) {
    if (this._isDestroyed)
      return;
    var item = this._item;
    var element2 = item._element;
    var container = item.getGrid()._element;
    var didReparent = false;
    if (element2.parentNode !== container) {
      if (left === void 0 || top === void 0) {
        var translate = getTranslate(element2);
        left = translate.x - this._containerDiffX;
        top = translate.y - this._containerDiffY;
      }
      container.appendChild(element2);
      item._setTranslate(left, top);
      didReparent = true;
    }
    this._containerDiffX = 0;
    this._containerDiffY = 0;
    return didReparent;
  };
  ItemDragRelease.prototype._reset = function(needsReflow) {
    if (this._isDestroyed)
      return;
    var item = this._item;
    var releasingClass = item.getGrid()._settings.itemReleasingClass;
    this._isActive = false;
    this._isPositioningStarted = false;
    this._containerDiffX = 0;
    this._containerDiffY = 0;
    if (releasingClass) {
      if (needsReflow)
        item._element.clientWidth;
      removeClass(item._element, releasingClass);
    }
  };
  var MIN_ANIMATION_DISTANCE = 2;
  function ItemLayout(item) {
    var element2 = item._element;
    var elementStyle = element2.style;
    this._item = item;
    this._isActive = false;
    this._isDestroyed = false;
    this._isInterrupted = false;
    this._currentStyles = {};
    this._targetStyles = {};
    this._nextLeft = 0;
    this._nextTop = 0;
    this._offsetLeft = 0;
    this._offsetTop = 0;
    this._skipNextAnimation = false;
    this._animOptions = {
      onFinish: this._finish.bind(this),
      duration: 0,
      easing: 0
    };
    elementStyle.left = "0px";
    elementStyle.top = "0px";
    item._setTranslate(0, 0);
    this._animation = new Animator(element2);
    this._queue = "layout-" + item._id;
    this._setupAnimation = this._setupAnimation.bind(this);
    this._startAnimation = this._startAnimation.bind(this);
  }
  ItemLayout.prototype.start = function(instant, onFinish) {
    if (this._isDestroyed)
      return;
    var item = this._item;
    var release = item._dragRelease;
    var gridSettings = item.getGrid()._settings;
    var isPositioning = this._isActive;
    var isJustReleased = release.isJustReleased();
    var animDuration = isJustReleased ? gridSettings.dragRelease.duration : gridSettings.layoutDuration;
    var animEasing = isJustReleased ? gridSettings.dragRelease.easing : gridSettings.layoutEasing;
    var animEnabled = !instant && !this._skipNextAnimation && animDuration > 0;
    if (isPositioning) {
      cancelLayoutTick(item._id);
      item._emitter.burst(this._queue, true, item);
    }
    if (isJustReleased)
      release._isPositioningStarted = true;
    if (isFunction(onFinish)) {
      item._emitter.on(this._queue, onFinish);
    }
    this._skipNextAnimation = false;
    if (!animEnabled) {
      this._updateOffsets();
      item._setTranslate(this._nextLeft, this._nextTop);
      this._animation.stop();
      this._finish();
      return;
    }
    if (this._animation.isAnimating()) {
      this._animation._animation.onfinish = null;
    }
    this._isActive = true;
    this._animOptions.easing = animEasing;
    this._animOptions.duration = animDuration;
    this._isInterrupted = isPositioning;
    addLayoutTick(item._id, this._setupAnimation, this._startAnimation);
  };
  ItemLayout.prototype.stop = function(processCallbackQueue, left, top) {
    if (this._isDestroyed || !this._isActive)
      return;
    var item = this._item;
    cancelLayoutTick(item._id);
    if (this._animation.isAnimating()) {
      if (left === void 0 || top === void 0) {
        var translate = getTranslate(item._element);
        left = translate.x;
        top = translate.y;
      }
      item._setTranslate(left, top);
      this._animation.stop();
    }
    removeClass(item._element, item.getGrid()._settings.itemPositioningClass);
    this._isActive = false;
    if (processCallbackQueue) {
      item._emitter.burst(this._queue, true, item);
    }
  };
  ItemLayout.prototype.destroy = function() {
    if (this._isDestroyed)
      return;
    var elementStyle = this._item._element.style;
    this.stop(true, 0, 0);
    this._item._emitter.clear(this._queue);
    this._animation.destroy();
    elementStyle[transformProp] = "";
    elementStyle.left = "";
    elementStyle.top = "";
    this._item = null;
    this._currentStyles = null;
    this._targetStyles = null;
    this._animOptions = null;
    this._isDestroyed = true;
  };
  ItemLayout.prototype._updateOffsets = function() {
    if (this._isDestroyed)
      return;
    var item = this._item;
    var migrate = item._migrate;
    var release = item._dragRelease;
    this._offsetLeft = release._isActive ? release._containerDiffX : migrate._isActive ? migrate._containerDiffX : 0;
    this._offsetTop = release._isActive ? release._containerDiffY : migrate._isActive ? migrate._containerDiffY : 0;
    this._nextLeft = this._item._left + this._offsetLeft;
    this._nextTop = this._item._top + this._offsetTop;
  };
  ItemLayout.prototype._finish = function() {
    if (this._isDestroyed)
      return;
    var item = this._item;
    var migrate = item._migrate;
    var release = item._dragRelease;
    item._tX = this._nextLeft;
    item._tY = this._nextTop;
    if (this._isActive) {
      this._isActive = false;
      removeClass(item._element, item.getGrid()._settings.itemPositioningClass);
    }
    if (release._isActive)
      release.stop();
    if (migrate._isActive)
      migrate.stop();
    item._emitter.burst(this._queue, false, item);
  };
  ItemLayout.prototype._setupAnimation = function() {
    var item = this._item;
    if (item._tX === void 0 || item._tY === void 0) {
      var translate = getTranslate(item._element);
      item._tX = translate.x;
      item._tY = translate.y;
    }
  };
  ItemLayout.prototype._startAnimation = function() {
    var item = this._item;
    var settings = item.getGrid()._settings;
    var isInstant = this._animOptions.duration <= 0;
    this._updateOffsets();
    var xDiff = Math.abs(item._left - (item._tX - this._offsetLeft));
    var yDiff = Math.abs(item._top - (item._tY - this._offsetTop));
    if (isInstant || xDiff < MIN_ANIMATION_DISTANCE && yDiff < MIN_ANIMATION_DISTANCE) {
      if (xDiff || yDiff || this._isInterrupted) {
        item._setTranslate(this._nextLeft, this._nextTop);
      }
      this._animation.stop();
      this._finish();
      return;
    }
    if (!this._isInterrupted) {
      addClass(item._element, settings.itemPositioningClass);
    }
    this._currentStyles[transformProp] = getTranslateString(item._tX, item._tY);
    this._targetStyles[transformProp] = getTranslateString(this._nextLeft, this._nextTop);
    item._tX = item._tY = void 0;
    this._animation.start(this._currentStyles, this._targetStyles, this._animOptions);
  };
  function ItemMigrate(item) {
    this._item = item;
    this._isActive = false;
    this._isDestroyed = false;
    this._container = false;
    this._containerDiffX = 0;
    this._containerDiffY = 0;
  }
  ItemMigrate.prototype.start = function(targetGrid, position, container) {
    if (this._isDestroyed)
      return;
    var item = this._item;
    var element2 = item._element;
    var isActive = item.isActive();
    var isVisible = item.isVisible();
    var grid = item.getGrid();
    var settings = grid._settings;
    var targetSettings = targetGrid._settings;
    var targetElement = targetGrid._element;
    var targetItems = targetGrid._items;
    var currentIndex = grid._items.indexOf(item);
    var targetContainer = container || document.body;
    var targetIndex;
    var targetItem;
    var currentContainer;
    var offsetDiff2;
    var containerDiff;
    var translate;
    var translateX;
    var translateY;
    var currentVisClass;
    var nextVisClass;
    if (typeof position === "number") {
      targetIndex = normalizeArrayIndex(targetItems, position, 1);
    } else {
      targetItem = targetGrid.getItem(position);
      if (!targetItem)
        return;
      targetIndex = targetItems.indexOf(targetItem);
    }
    if (item.isPositioning() || this._isActive || item.isReleasing()) {
      translate = getTranslate(element2);
      translateX = translate.x;
      translateY = translate.y;
    }
    if (item.isPositioning()) {
      item._layout.stop(true, translateX, translateY);
    }
    if (this._isActive) {
      translateX -= this._containerDiffX;
      translateY -= this._containerDiffY;
      this.stop(true, translateX, translateY);
    }
    if (item.isReleasing()) {
      translateX -= item._dragRelease._containerDiffX;
      translateY -= item._dragRelease._containerDiffY;
      item._dragRelease.stop(true, translateX, translateY);
    }
    item._visibility.stop(true);
    if (item._drag)
      item._drag.destroy();
    if (grid._hasListeners(EVENT_BEFORE_SEND)) {
      grid._emit(EVENT_BEFORE_SEND, {
        item,
        fromGrid: grid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });
    }
    if (targetGrid._hasListeners(EVENT_BEFORE_RECEIVE)) {
      targetGrid._emit(EVENT_BEFORE_RECEIVE, {
        item,
        fromGrid: grid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });
    }
    if (settings.itemClass !== targetSettings.itemClass) {
      removeClass(element2, settings.itemClass);
      addClass(element2, targetSettings.itemClass);
    }
    currentVisClass = isVisible ? settings.itemVisibleClass : settings.itemHiddenClass;
    nextVisClass = isVisible ? targetSettings.itemVisibleClass : targetSettings.itemHiddenClass;
    if (currentVisClass !== nextVisClass) {
      removeClass(element2, currentVisClass);
      addClass(element2, nextVisClass);
    }
    grid._items.splice(currentIndex, 1);
    arrayInsert(targetItems, item, targetIndex);
    item._gridId = targetGrid._id;
    if (isActive) {
      currentContainer = element2.parentNode;
      if (targetContainer !== currentContainer) {
        targetContainer.appendChild(element2);
        offsetDiff2 = getOffsetDiff(targetContainer, currentContainer, true);
        if (!translate) {
          translate = getTranslate(element2);
          translateX = translate.x;
          translateY = translate.y;
        }
        item._setTranslate(translateX + offsetDiff2.left, translateY + offsetDiff2.top);
      }
    } else {
      targetElement.appendChild(element2);
    }
    item._visibility.setStyles(
      isVisible ? targetSettings.visibleStyles : targetSettings.hiddenStyles
    );
    if (isActive) {
      containerDiff = getOffsetDiff(targetContainer, targetElement, true);
    }
    item._refreshDimensions();
    item._sortData = null;
    item._drag = targetSettings.dragEnabled ? new ItemDrag(item) : null;
    if (isActive) {
      this._isActive = true;
      this._container = targetContainer;
      this._containerDiffX = containerDiff.left;
      this._containerDiffY = containerDiff.top;
    } else {
      this._isActive = false;
      this._container = null;
      this._containerDiffX = 0;
      this._containerDiffY = 0;
    }
    if (grid._hasListeners(EVENT_SEND)) {
      grid._emit(EVENT_SEND, {
        item,
        fromGrid: grid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });
    }
    if (targetGrid._hasListeners(EVENT_RECEIVE)) {
      targetGrid._emit(EVENT_RECEIVE, {
        item,
        fromGrid: grid,
        fromIndex: currentIndex,
        toGrid: targetGrid,
        toIndex: targetIndex
      });
    }
  };
  ItemMigrate.prototype.stop = function(abort, left, top) {
    if (this._isDestroyed || !this._isActive)
      return;
    var item = this._item;
    var element2 = item._element;
    var grid = item.getGrid();
    var gridElement = grid._element;
    var translate;
    if (this._container !== gridElement) {
      if (left === void 0 || top === void 0) {
        if (abort) {
          translate = getTranslate(element2);
          left = translate.x - this._containerDiffX;
          top = translate.y - this._containerDiffY;
        } else {
          left = item._left;
          top = item._top;
        }
      }
      gridElement.appendChild(element2);
      item._setTranslate(left, top);
    }
    this._isActive = false;
    this._container = null;
    this._containerDiffX = 0;
    this._containerDiffY = 0;
  };
  ItemMigrate.prototype.destroy = function() {
    if (this._isDestroyed)
      return;
    this.stop(true);
    this._item = null;
    this._isDestroyed = true;
  };
  function ItemVisibility(item) {
    var isActive = item._isActive;
    var element2 = item._element;
    var childElement = element2.children[0];
    var settings = item.getGrid()._settings;
    if (!childElement) {
      throw new Error("No valid child element found within item element.");
    }
    this._item = item;
    this._isDestroyed = false;
    this._isHidden = !isActive;
    this._isHiding = false;
    this._isShowing = false;
    this._childElement = childElement;
    this._currentStyleProps = [];
    this._animation = new Animator(childElement);
    this._queue = "visibility-" + item._id;
    this._finishShow = this._finishShow.bind(this);
    this._finishHide = this._finishHide.bind(this);
    element2.style.display = isActive ? "" : "none";
    addClass(element2, isActive ? settings.itemVisibleClass : settings.itemHiddenClass);
    this.setStyles(isActive ? settings.visibleStyles : settings.hiddenStyles);
  }
  ItemVisibility.prototype.show = function(instant, onFinish) {
    if (this._isDestroyed)
      return;
    var item = this._item;
    var element2 = item._element;
    var callback = isFunction(onFinish) ? onFinish : null;
    var grid = item.getGrid();
    var settings = grid._settings;
    if (!this._isShowing && !this._isHidden) {
      callback && callback(false, item);
      return;
    }
    if (this._isShowing && !instant) {
      callback && item._emitter.on(this._queue, callback);
      return;
    }
    if (!this._isShowing) {
      item._emitter.burst(this._queue, true, item);
      removeClass(element2, settings.itemHiddenClass);
      addClass(element2, settings.itemVisibleClass);
      if (!this._isHiding)
        element2.style.display = "";
    }
    callback && item._emitter.on(this._queue, callback);
    this._isShowing = true;
    this._isHiding = this._isHidden = false;
    this._startAnimation(true, instant, this._finishShow);
  };
  ItemVisibility.prototype.hide = function(instant, onFinish) {
    if (this._isDestroyed)
      return;
    var item = this._item;
    var element2 = item._element;
    var callback = isFunction(onFinish) ? onFinish : null;
    var grid = item.getGrid();
    var settings = grid._settings;
    if (!this._isHiding && this._isHidden) {
      callback && callback(false, item);
      return;
    }
    if (this._isHiding && !instant) {
      callback && item._emitter.on(this._queue, callback);
      return;
    }
    if (!this._isHiding) {
      item._emitter.burst(this._queue, true, item);
      addClass(element2, settings.itemHiddenClass);
      removeClass(element2, settings.itemVisibleClass);
    }
    callback && item._emitter.on(this._queue, callback);
    this._isHidden = this._isHiding = true;
    this._isShowing = false;
    this._startAnimation(false, instant, this._finishHide);
  };
  ItemVisibility.prototype.stop = function(processCallbackQueue) {
    if (this._isDestroyed)
      return;
    if (!this._isHiding && !this._isShowing)
      return;
    var item = this._item;
    cancelVisibilityTick(item._id);
    this._animation.stop();
    if (processCallbackQueue) {
      item._emitter.burst(this._queue, true, item);
    }
  };
  ItemVisibility.prototype.setStyles = function(styles) {
    var childElement = this._childElement;
    var currentStyleProps = this._currentStyleProps;
    this._removeCurrentStyles();
    for (var prop in styles) {
      currentStyleProps.push(prop);
      childElement.style[prop] = styles[prop];
    }
  };
  ItemVisibility.prototype.destroy = function() {
    if (this._isDestroyed)
      return;
    var item = this._item;
    var element2 = item._element;
    var grid = item.getGrid();
    var settings = grid._settings;
    this.stop(true);
    item._emitter.clear(this._queue);
    this._animation.destroy();
    this._removeCurrentStyles();
    removeClass(element2, settings.itemVisibleClass);
    removeClass(element2, settings.itemHiddenClass);
    element2.style.display = "";
    this._isHiding = this._isShowing = false;
    this._isDestroyed = this._isHidden = true;
  };
  ItemVisibility.prototype._startAnimation = function(toVisible, instant, onFinish) {
    if (this._isDestroyed)
      return;
    var item = this._item;
    var animation = this._animation;
    var childElement = this._childElement;
    var settings = item.getGrid()._settings;
    var targetStyles = toVisible ? settings.visibleStyles : settings.hiddenStyles;
    var duration = toVisible ? settings.showDuration : settings.hideDuration;
    var easing = toVisible ? settings.showEasing : settings.hideEasing;
    var isInstant = instant || duration <= 0;
    var currentStyles;
    if (!targetStyles) {
      onFinish && onFinish();
      return;
    }
    cancelVisibilityTick(item._id);
    if (isInstant) {
      setStyles(childElement, targetStyles);
      animation.stop();
      onFinish && onFinish();
      return;
    }
    if (animation.isAnimating()) {
      animation._animation.onfinish = null;
    }
    addVisibilityTick(
      item._id,
      function() {
        currentStyles = getCurrentStyles(childElement, targetStyles);
      },
      function() {
        animation.start(currentStyles, targetStyles, {
          duration,
          easing,
          onFinish
        });
      }
    );
  };
  ItemVisibility.prototype._finishShow = function() {
    if (this._isHidden)
      return;
    this._isShowing = false;
    this._item._emitter.burst(this._queue, false, this._item);
  };
  ItemVisibility.prototype._finishHide = function() {
    if (!this._isHidden)
      return;
    var item = this._item;
    this._isHiding = false;
    item._layout.stop(true, 0, 0);
    item._element.style.display = "none";
    item._emitter.burst(this._queue, false, item);
  };
  ItemVisibility.prototype._removeCurrentStyles = function() {
    var childElement = this._childElement;
    var currentStyleProps = this._currentStyleProps;
    for (var i = 0; i < currentStyleProps.length; i++) {
      childElement.style[currentStyleProps[i]] = "";
    }
    currentStyleProps.length = 0;
  };
  var id = 0;
  function createUid() {
    return ++id;
  }
  function Item(grid, element2, isActive) {
    var settings = grid._settings;
    if (ITEM_ELEMENT_MAP) {
      if (ITEM_ELEMENT_MAP.has(element2)) {
        throw new Error("You can only create one Muuri Item per element!");
      } else {
        ITEM_ELEMENT_MAP.set(element2, this);
      }
    }
    this._id = createUid();
    this._gridId = grid._id;
    this._element = element2;
    this._isDestroyed = false;
    this._left = 0;
    this._top = 0;
    this._width = 0;
    this._height = 0;
    this._marginLeft = 0;
    this._marginRight = 0;
    this._marginTop = 0;
    this._marginBottom = 0;
    this._tX = void 0;
    this._tY = void 0;
    this._sortData = null;
    this._emitter = new Emitter();
    if (element2.parentNode !== grid._element) {
      grid._element.appendChild(element2);
    }
    addClass(element2, settings.itemClass);
    if (typeof isActive !== "boolean") {
      isActive = getStyle(element2, "display") !== "none";
    }
    this._isActive = isActive;
    this._visibility = new ItemVisibility(this);
    this._layout = new ItemLayout(this);
    this._migrate = new ItemMigrate(this);
    this._drag = settings.dragEnabled ? new ItemDrag(this) : null;
    this._dragRelease = new ItemDragRelease(this);
    this._dragPlaceholder = new ItemDragPlaceholder(this);
  }
  Item.prototype.getGrid = function() {
    return GRID_INSTANCES[this._gridId];
  };
  Item.prototype.getElement = function() {
    return this._element;
  };
  Item.prototype.getWidth = function() {
    return this._width;
  };
  Item.prototype.getHeight = function() {
    return this._height;
  };
  Item.prototype.getMargin = function() {
    return {
      left: this._marginLeft,
      right: this._marginRight,
      top: this._marginTop,
      bottom: this._marginBottom
    };
  };
  Item.prototype.getPosition = function() {
    return {
      left: this._left,
      top: this._top
    };
  };
  Item.prototype.isActive = function() {
    return this._isActive;
  };
  Item.prototype.isVisible = function() {
    return !!this._visibility && !this._visibility._isHidden;
  };
  Item.prototype.isShowing = function() {
    return !!(this._visibility && this._visibility._isShowing);
  };
  Item.prototype.isHiding = function() {
    return !!(this._visibility && this._visibility._isHiding);
  };
  Item.prototype.isPositioning = function() {
    return !!(this._layout && this._layout._isActive);
  };
  Item.prototype.isDragging = function() {
    return !!(this._drag && this._drag._isActive);
  };
  Item.prototype.isReleasing = function() {
    return !!(this._dragRelease && this._dragRelease._isActive);
  };
  Item.prototype.isDestroyed = function() {
    return this._isDestroyed;
  };
  Item.prototype._refreshDimensions = function(force) {
    if (this._isDestroyed)
      return;
    if (force !== true && this._visibility._isHidden)
      return;
    var element2 = this._element;
    var dragPlaceholder = this._dragPlaceholder;
    var rect = element2.getBoundingClientRect();
    this._width = rect.width;
    this._height = rect.height;
    this._marginLeft = Math.max(0, getStyleAsFloat(element2, "margin-left"));
    this._marginRight = Math.max(0, getStyleAsFloat(element2, "margin-right"));
    this._marginTop = Math.max(0, getStyleAsFloat(element2, "margin-top"));
    this._marginBottom = Math.max(0, getStyleAsFloat(element2, "margin-bottom"));
    if (dragPlaceholder)
      dragPlaceholder.updateDimensions();
  };
  Item.prototype._refreshSortData = function() {
    if (this._isDestroyed)
      return;
    var data = this._sortData = {};
    var getters = this.getGrid()._settings.sortData;
    var prop;
    for (prop in getters) {
      data[prop] = getters[prop](this, this._element);
    }
  };
  Item.prototype._addToLayout = function(left, top) {
    if (this._isActive === true)
      return;
    this._isActive = true;
    this._left = left || 0;
    this._top = top || 0;
  };
  Item.prototype._removeFromLayout = function() {
    if (this._isActive === false)
      return;
    this._isActive = false;
    this._left = 0;
    this._top = 0;
  };
  Item.prototype._canSkipLayout = function(left, top) {
    return this._left === left && this._top === top && !this._migrate._isActive && !this._layout._skipNextAnimation && !this._dragRelease.isJustReleased();
  };
  Item.prototype._setTranslate = function(left, top) {
    if (this._tX === left && this._tY === top)
      return false;
    this._tX = left;
    this._tY = top;
    this._element.style[transformProp] = getTranslateString(left, top);
    return true;
  };
  Item.prototype._destroy = function(removeElement) {
    if (this._isDestroyed)
      return;
    var element2 = this._element;
    var grid = this.getGrid();
    var settings = grid._settings;
    this._dragPlaceholder.destroy();
    this._dragRelease.destroy();
    this._migrate.destroy();
    this._layout.destroy();
    this._visibility.destroy();
    if (this._drag)
      this._drag.destroy();
    this._emitter.destroy();
    removeClass(element2, settings.itemClass);
    if (removeElement)
      element2.parentNode.removeChild(element2);
    if (ITEM_ELEMENT_MAP)
      ITEM_ELEMENT_MAP.delete(element2);
    this._isActive = false;
    this._isDestroyed = true;
  };
  function createPackerProcessor(isWorker) {
    var FILL_GAPS2 = 1;
    var HORIZONTAL2 = 2;
    var ALIGN_RIGHT2 = 4;
    var ALIGN_BOTTOM2 = 8;
    var ROUNDING2 = 16;
    var EPS = 1e-3;
    var MIN_SLOT_SIZE = 0.5;
    function roundNumber(number) {
      return ((number * 1e3 + 0.5 << 0) / 10 << 0) / 100;
    }
    function PackerProcessor2() {
      this.currentRects = [];
      this.nextRects = [];
      this.rectTarget = {};
      this.rectStore = [];
      this.slotSizes = [];
      this.rectId = 0;
      this.slotIndex = -1;
      this.slotData = { left: 0, top: 0, width: 0, height: 0 };
      this.sortRectsLeftTop = this.sortRectsLeftTop.bind(this);
      this.sortRectsTopLeft = this.sortRectsTopLeft.bind(this);
    }
    PackerProcessor2.prototype.computeLayout = function(layout, settings) {
      var items = layout.items;
      var slots = layout.slots;
      var fillGaps = !!(settings & FILL_GAPS2);
      var horizontal = !!(settings & HORIZONTAL2);
      var alignRight = !!(settings & ALIGN_RIGHT2);
      var alignBottom = !!(settings & ALIGN_BOTTOM2);
      var rounding = !!(settings & ROUNDING2);
      var isPreProcessed = typeof items[0] === "number";
      var i, bump, item, slotWidth, slotHeight, slot;
      if (!items.length)
        return layout;
      bump = isPreProcessed ? 2 : 1;
      for (i = 0; i < items.length; i += bump) {
        if (isPreProcessed) {
          slotWidth = items[i];
          slotHeight = items[i + 1];
        } else {
          item = items[i];
          slotWidth = item._width + item._marginLeft + item._marginRight;
          slotHeight = item._height + item._marginTop + item._marginBottom;
        }
        if (rounding) {
          slotWidth = roundNumber(slotWidth);
          slotHeight = roundNumber(slotHeight);
        }
        slot = this.computeNextSlot(layout, slotWidth, slotHeight, fillGaps, horizontal);
        if (horizontal) {
          if (slot.left + slot.width > layout.width) {
            layout.width = slot.left + slot.width;
          }
        } else {
          if (slot.top + slot.height > layout.height) {
            layout.height = slot.top + slot.height;
          }
        }
        slots[++this.slotIndex] = slot.left;
        slots[++this.slotIndex] = slot.top;
        if (alignRight || alignBottom) {
          this.slotSizes.push(slot.width, slot.height);
        }
      }
      if (alignRight) {
        for (i = 0; i < slots.length; i += 2) {
          slots[i] = layout.width - (slots[i] + this.slotSizes[i]);
        }
      }
      if (alignBottom) {
        for (i = 1; i < slots.length; i += 2) {
          slots[i] = layout.height - (slots[i] + this.slotSizes[i]);
        }
      }
      this.slotSizes.length = 0;
      this.currentRects.length = 0;
      this.nextRects.length = 0;
      this.rectStore.length = 0;
      this.rectId = 0;
      this.slotIndex = -1;
      return layout;
    };
    PackerProcessor2.prototype.computeNextSlot = function(layout, slotWidth, slotHeight, fillGaps, horizontal) {
      var slot = this.slotData;
      var currentRects = this.currentRects;
      var nextRects = this.nextRects;
      var ignoreCurrentRects = false;
      var rect;
      var rectId;
      var shards;
      var i;
      var j;
      nextRects.length = 0;
      slot.left = null;
      slot.top = null;
      slot.width = slotWidth;
      slot.height = slotHeight;
      for (i = 0; i < currentRects.length; i++) {
        rectId = currentRects[i];
        if (!rectId)
          continue;
        rect = this.getRect(rectId);
        if (slot.width <= rect.width + EPS && slot.height <= rect.height + EPS) {
          slot.left = rect.left;
          slot.top = rect.top;
          break;
        }
      }
      if (slot.left === null) {
        if (horizontal) {
          slot.left = layout.width;
          slot.top = 0;
        } else {
          slot.left = 0;
          slot.top = layout.height;
        }
        if (!fillGaps) {
          ignoreCurrentRects = true;
        }
      }
      if (!horizontal && slot.top + slot.height > layout.height + EPS) {
        if (slot.left > MIN_SLOT_SIZE) {
          nextRects.push(this.addRect(0, layout.height, slot.left, Infinity));
        }
        if (slot.left + slot.width < layout.width - MIN_SLOT_SIZE) {
          nextRects.push(
            this.addRect(
              slot.left + slot.width,
              layout.height,
              layout.width - slot.left - slot.width,
              Infinity
            )
          );
        }
        layout.height = slot.top + slot.height;
      }
      if (horizontal && slot.left + slot.width > layout.width + EPS) {
        if (slot.top > MIN_SLOT_SIZE) {
          nextRects.push(this.addRect(layout.width, 0, Infinity, slot.top));
        }
        if (slot.top + slot.height < layout.height - MIN_SLOT_SIZE) {
          nextRects.push(
            this.addRect(
              layout.width,
              slot.top + slot.height,
              Infinity,
              layout.height - slot.top - slot.height
            )
          );
        }
        layout.width = slot.left + slot.width;
      }
      if (!ignoreCurrentRects) {
        if (fillGaps)
          i = 0;
        for (; i < currentRects.length; i++) {
          rectId = currentRects[i];
          if (!rectId)
            continue;
          rect = this.getRect(rectId);
          shards = this.splitRect(rect, slot);
          for (j = 0; j < shards.length; j++) {
            rectId = shards[j];
            rect = this.getRect(rectId);
            if (horizontal ? rect.left + EPS < layout.width - EPS : rect.top + EPS < layout.height - EPS) {
              nextRects.push(rectId);
            }
          }
        }
      }
      if (nextRects.length > 1) {
        this.purgeRects(nextRects).sort(horizontal ? this.sortRectsLeftTop : this.sortRectsTopLeft);
      }
      this.currentRects = nextRects;
      this.nextRects = currentRects;
      return slot;
    };
    PackerProcessor2.prototype.addRect = function(left, top, width, height) {
      var rectId = ++this.rectId;
      this.rectStore[rectId] = left || 0;
      this.rectStore[++this.rectId] = top || 0;
      this.rectStore[++this.rectId] = width || 0;
      this.rectStore[++this.rectId] = height || 0;
      return rectId;
    };
    PackerProcessor2.prototype.getRect = function(id2, target) {
      if (!target)
        target = this.rectTarget;
      target.left = this.rectStore[id2] || 0;
      target.top = this.rectStore[++id2] || 0;
      target.width = this.rectStore[++id2] || 0;
      target.height = this.rectStore[++id2] || 0;
      return target;
    };
    PackerProcessor2.prototype.splitRect = /* @__PURE__ */ function() {
      var shards = [];
      var width = 0;
      var height = 0;
      return function(rect, hole) {
        shards.length = 0;
        if (rect.left + rect.width <= hole.left + EPS || hole.left + hole.width <= rect.left + EPS || rect.top + rect.height <= hole.top + EPS || hole.top + hole.height <= rect.top + EPS) {
          shards.push(this.addRect(rect.left, rect.top, rect.width, rect.height));
          return shards;
        }
        width = hole.left - rect.left;
        if (width >= MIN_SLOT_SIZE) {
          shards.push(this.addRect(rect.left, rect.top, width, rect.height));
        }
        width = rect.left + rect.width - (hole.left + hole.width);
        if (width >= MIN_SLOT_SIZE) {
          shards.push(this.addRect(hole.left + hole.width, rect.top, width, rect.height));
        }
        height = hole.top - rect.top;
        if (height >= MIN_SLOT_SIZE) {
          shards.push(this.addRect(rect.left, rect.top, rect.width, height));
        }
        height = rect.top + rect.height - (hole.top + hole.height);
        if (height >= MIN_SLOT_SIZE) {
          shards.push(this.addRect(rect.left, hole.top + hole.height, rect.width, height));
        }
        return shards;
      };
    }();
    PackerProcessor2.prototype.isRectAWithinRectB = function(a, b) {
      return a.left + EPS >= b.left && a.top + EPS >= b.top && a.left + a.width - EPS <= b.left + b.width && a.top + a.height - EPS <= b.top + b.height;
    };
    PackerProcessor2.prototype.purgeRects = /* @__PURE__ */ function() {
      var rectA = {};
      var rectB = {};
      return function(rectIds) {
        var i = rectIds.length;
        var j;
        while (i--) {
          j = rectIds.length;
          if (!rectIds[i])
            continue;
          this.getRect(rectIds[i], rectA);
          while (j--) {
            if (!rectIds[j] || i === j)
              continue;
            this.getRect(rectIds[j], rectB);
            if (this.isRectAWithinRectB(rectA, rectB)) {
              rectIds[i] = 0;
              break;
            }
          }
        }
        return rectIds;
      };
    }();
    PackerProcessor2.prototype.sortRectsTopLeft = /* @__PURE__ */ function() {
      var rectA = {};
      var rectB = {};
      return function(aId, bId) {
        this.getRect(aId, rectA);
        this.getRect(bId, rectB);
        return rectA.top < rectB.top && rectA.top + EPS < rectB.top ? -1 : rectA.top > rectB.top && rectA.top - EPS > rectB.top ? 1 : rectA.left < rectB.left && rectA.left + EPS < rectB.left ? -1 : rectA.left > rectB.left && rectA.left - EPS > rectB.left ? 1 : 0;
      };
    }();
    PackerProcessor2.prototype.sortRectsLeftTop = /* @__PURE__ */ function() {
      var rectA = {};
      var rectB = {};
      return function(aId, bId) {
        this.getRect(aId, rectA);
        this.getRect(bId, rectB);
        return rectA.left < rectB.left && rectA.left + EPS < rectB.left ? -1 : rectA.left > rectB.left && rectA.left - EPS < rectB.left ? 1 : rectA.top < rectB.top && rectA.top + EPS < rectB.top ? -1 : rectA.top > rectB.top && rectA.top - EPS > rectB.top ? 1 : 0;
      };
    }();
    if (isWorker) {
      var PACKET_INDEX_WIDTH2 = 1;
      var PACKET_INDEX_HEIGHT2 = 2;
      var PACKET_INDEX_OPTIONS2 = 3;
      var PACKET_HEADER_SLOTS2 = 4;
      var processor = new PackerProcessor2();
      self.onmessage = function(msg) {
        var data = new Float32Array(msg.data);
        var items = data.subarray(PACKET_HEADER_SLOTS2, data.length);
        var slots = new Float32Array(items.length);
        var settings = data[PACKET_INDEX_OPTIONS2];
        var layout = {
          items,
          slots,
          width: data[PACKET_INDEX_WIDTH2],
          height: data[PACKET_INDEX_HEIGHT2]
        };
        processor.computeLayout(layout, settings);
        data[PACKET_INDEX_WIDTH2] = layout.width;
        data[PACKET_INDEX_HEIGHT2] = layout.height;
        data.set(layout.slots, PACKET_HEADER_SLOTS2);
        postMessage(data.buffer, [data.buffer]);
      };
    }
    return PackerProcessor2;
  }
  var PackerProcessor = createPackerProcessor();
  var blobUrl = null;
  var activeWorkers = [];
  function createWorkerProcessors(amount, onmessage) {
    var workers = [];
    if (amount > 0) {
      if (!blobUrl) {
        blobUrl = URL.createObjectURL(
          new Blob(["(" + createPackerProcessor.toString() + ")(true)"], {
            type: "application/javascript"
          })
        );
      }
      for (var i = 0, worker; i < amount; i++) {
        worker = new Worker(blobUrl);
        if (onmessage)
          worker.onmessage = onmessage;
        workers.push(worker);
        activeWorkers.push(worker);
      }
    }
    return workers;
  }
  function destroyWorkerProcessors(workers) {
    var worker;
    var index;
    for (var i = 0; i < workers.length; i++) {
      worker = workers[i];
      worker.onmessage = null;
      worker.onerror = null;
      worker.onmessageerror = null;
      worker.terminate();
      index = activeWorkers.indexOf(worker);
      if (index > -1)
        activeWorkers.splice(index, 1);
    }
    if (blobUrl && !activeWorkers.length) {
      URL.revokeObjectURL(blobUrl);
      blobUrl = null;
    }
  }
  function isWorkerProcessorsSupported() {
    return !!(window.Worker && window.URL && window.Blob);
  }
  var FILL_GAPS = 1;
  var HORIZONTAL = 2;
  var ALIGN_RIGHT = 4;
  var ALIGN_BOTTOM = 8;
  var ROUNDING = 16;
  var PACKET_INDEX_ID = 0;
  var PACKET_INDEX_WIDTH = 1;
  var PACKET_INDEX_HEIGHT = 2;
  var PACKET_INDEX_OPTIONS = 3;
  var PACKET_HEADER_SLOTS = 4;
  function Packer(numWorkers, options) {
    this._options = 0;
    this._processor = null;
    this._layoutQueue = [];
    this._layouts = {};
    this._layoutCallbacks = {};
    this._layoutWorkers = {};
    this._layoutWorkerData = {};
    this._workers = [];
    this._onWorkerMessage = this._onWorkerMessage.bind(this);
    this.setOptions(options);
    numWorkers = typeof numWorkers === "number" ? Math.max(0, numWorkers) : 0;
    if (numWorkers && isWorkerProcessorsSupported()) {
      try {
        this._workers = createWorkerProcessors(numWorkers, this._onWorkerMessage);
      } catch (e) {
        this._processor = new PackerProcessor();
      }
    } else {
      this._processor = new PackerProcessor();
    }
  }
  Packer.prototype._sendToWorker = function() {
    if (!this._layoutQueue.length || !this._workers.length)
      return;
    var layoutId2 = this._layoutQueue.shift();
    var worker = this._workers.pop();
    var data = this._layoutWorkerData[layoutId2];
    delete this._layoutWorkerData[layoutId2];
    this._layoutWorkers[layoutId2] = worker;
    worker.postMessage(data.buffer, [data.buffer]);
  };
  Packer.prototype._onWorkerMessage = function(msg) {
    var data = new Float32Array(msg.data);
    var layoutId2 = data[PACKET_INDEX_ID];
    var layout = this._layouts[layoutId2];
    var callback = this._layoutCallbacks[layoutId2];
    var worker = this._layoutWorkers[layoutId2];
    if (layout)
      delete this._layouts[layoutId2];
    if (callback)
      delete this._layoutCallbacks[layoutId2];
    if (worker)
      delete this._layoutWorkers[layoutId2];
    if (layout && callback) {
      layout.width = data[PACKET_INDEX_WIDTH];
      layout.height = data[PACKET_INDEX_HEIGHT];
      layout.slots = data.subarray(PACKET_HEADER_SLOTS, data.length);
      this._finalizeLayout(layout);
      callback(layout);
    }
    if (worker) {
      this._workers.push(worker);
      this._sendToWorker();
    }
  };
  Packer.prototype._finalizeLayout = function(layout) {
    var grid = layout._grid;
    var isHorizontal = layout._settings & HORIZONTAL;
    var isBorderBox = grid._boxSizing === "border-box";
    delete layout._grid;
    delete layout._settings;
    layout.styles = {};
    if (isHorizontal) {
      layout.styles.width = (isBorderBox ? layout.width + grid._borderLeft + grid._borderRight : layout.width) + "px";
    } else {
      layout.styles.height = (isBorderBox ? layout.height + grid._borderTop + grid._borderBottom : layout.height) + "px";
    }
    return layout;
  };
  Packer.prototype.setOptions = function(options) {
    if (!options)
      return;
    var fillGaps;
    if (typeof options.fillGaps === "boolean") {
      fillGaps = options.fillGaps ? FILL_GAPS : 0;
    } else {
      fillGaps = this._options & FILL_GAPS;
    }
    var horizontal;
    if (typeof options.horizontal === "boolean") {
      horizontal = options.horizontal ? HORIZONTAL : 0;
    } else {
      horizontal = this._options & HORIZONTAL;
    }
    var alignRight;
    if (typeof options.alignRight === "boolean") {
      alignRight = options.alignRight ? ALIGN_RIGHT : 0;
    } else {
      alignRight = this._options & ALIGN_RIGHT;
    }
    var alignBottom;
    if (typeof options.alignBottom === "boolean") {
      alignBottom = options.alignBottom ? ALIGN_BOTTOM : 0;
    } else {
      alignBottom = this._options & ALIGN_BOTTOM;
    }
    var rounding;
    if (typeof options.rounding === "boolean") {
      rounding = options.rounding ? ROUNDING : 0;
    } else {
      rounding = this._options & ROUNDING;
    }
    this._options = fillGaps | horizontal | alignRight | alignBottom | rounding;
  };
  Packer.prototype.createLayout = function(grid, layoutId2, items, width, height, callback) {
    if (this._layouts[layoutId2]) {
      throw new Error("A layout with the provided id is currently being processed.");
    }
    var horizontal = this._options & HORIZONTAL;
    var layout = {
      id: layoutId2,
      items,
      slots: null,
      width: horizontal ? 0 : width,
      height: !horizontal ? 0 : height,
      // Temporary data, which will be removed before sending the layout data
      // outside of Packer's context.
      _grid: grid,
      _settings: this._options
    };
    if (!items.length) {
      layout.slots = [];
      this._finalizeLayout(layout);
      callback(layout);
      return;
    }
    if (this._processor) {
      layout.slots = window.Float32Array ? new Float32Array(items.length * 2) : new Array(items.length * 2);
      this._processor.computeLayout(layout, layout._settings);
      this._finalizeLayout(layout);
      callback(layout);
      return;
    }
    var data = new Float32Array(PACKET_HEADER_SLOTS + items.length * 2);
    data[PACKET_INDEX_ID] = layoutId2;
    data[PACKET_INDEX_WIDTH] = layout.width;
    data[PACKET_INDEX_HEIGHT] = layout.height;
    data[PACKET_INDEX_OPTIONS] = layout._settings;
    var i, j, item;
    for (i = 0, j = PACKET_HEADER_SLOTS - 1, item; i < items.length; i++) {
      item = items[i];
      data[++j] = item._width + item._marginLeft + item._marginRight;
      data[++j] = item._height + item._marginTop + item._marginBottom;
    }
    this._layoutQueue.push(layoutId2);
    this._layouts[layoutId2] = layout;
    this._layoutCallbacks[layoutId2] = callback;
    this._layoutWorkerData[layoutId2] = data;
    this._sendToWorker();
    return this.cancelLayout.bind(this, layoutId2);
  };
  Packer.prototype.cancelLayout = function(layoutId2) {
    var layout = this._layouts[layoutId2];
    if (!layout)
      return;
    delete this._layouts[layoutId2];
    delete this._layoutCallbacks[layoutId2];
    if (this._layoutWorkerData[layoutId2]) {
      delete this._layoutWorkerData[layoutId2];
      var queueIndex = this._layoutQueue.indexOf(layoutId2);
      if (queueIndex > -1)
        this._layoutQueue.splice(queueIndex, 1);
    }
  };
  Packer.prototype.destroy = function() {
    for (var key in this._layoutWorkers) {
      this._workers.push(this._layoutWorkers[key]);
    }
    destroyWorkerProcessors(this._workers);
    this._workers.length = 0;
    this._layoutQueue.length = 0;
    this._layouts = {};
    this._layoutCallbacks = {};
    this._layoutWorkers = {};
    this._layoutWorkerData = {};
  };
  var debounceId = 0;
  function debounce(fn, durationMs) {
    var id2 = ++debounceId;
    var timer = 0;
    var lastTime = 0;
    var isCanceled = false;
    var tick = function(time) {
      if (isCanceled)
        return;
      if (lastTime)
        timer -= time - lastTime;
      lastTime = time;
      if (timer > 0) {
        addDebounceTick(id2, tick);
      } else {
        timer = lastTime = 0;
        fn();
      }
    };
    return function(cancel) {
      if (isCanceled)
        return;
      if (durationMs <= 0) {
        if (cancel !== true)
          fn();
        return;
      }
      if (cancel === true) {
        isCanceled = true;
        timer = lastTime = 0;
        tick = void 0;
        cancelDebounceTick(id2);
        return;
      }
      if (timer <= 0) {
        timer = durationMs;
        tick(0);
      } else {
        timer = durationMs;
      }
    };
  }
  var htmlCollectionType = "[object HTMLCollection]";
  var nodeListType = "[object NodeList]";
  function isNodeList(val) {
    var type = Object.prototype.toString.call(val);
    return type === htmlCollectionType || type === nodeListType;
  }
  var objectType = "object";
  var objectToStringType = "[object Object]";
  var toString = Object.prototype.toString;
  function isPlainObject(val) {
    return typeof val === objectType && toString.call(val) === objectToStringType;
  }
  function noop() {
  }
  function toArray(val) {
    return isNodeList(val) ? Array.prototype.slice.call(val) : Array.prototype.concat(val);
  }
  var NUMBER_TYPE = "number";
  var STRING_TYPE = "string";
  var INSTANT_LAYOUT = "instant";
  var layoutId = 0;
  function Grid(element2, options) {
    if (typeof element2 === STRING_TYPE) {
      element2 = document.querySelector(element2);
    }
    var isElementInDom = element2.getRootNode ? element2.getRootNode({ composed: true }) === document : document.body.contains(element2);
    if (!isElementInDom || element2 === document.documentElement) {
      throw new Error("Container element must be an existing DOM element.");
    }
    var settings = mergeSettings(Grid.defaultOptions, options);
    settings.visibleStyles = normalizeStyles(settings.visibleStyles);
    settings.hiddenStyles = normalizeStyles(settings.hiddenStyles);
    if (!isFunction(settings.dragSort)) {
      settings.dragSort = !!settings.dragSort;
    }
    this._id = createUid();
    this._element = element2;
    this._settings = settings;
    this._isDestroyed = false;
    this._items = [];
    this._layout = {
      id: 0,
      items: [],
      slots: []
    };
    this._isLayoutFinished = true;
    this._nextLayoutData = null;
    this._emitter = new Emitter();
    this._onLayoutDataReceived = this._onLayoutDataReceived.bind(this);
    GRID_INSTANCES[this._id] = this;
    addClass(element2, settings.containerClass);
    bindLayoutOnResize(this, settings.layoutOnResize);
    this.add(getInitialGridElements(element2, settings.items), { layout: false });
    if (settings.layoutOnInit) {
      this.layout(true);
    }
  }
  Grid.Item = Item;
  Grid.ItemLayout = ItemLayout;
  Grid.ItemVisibility = ItemVisibility;
  Grid.ItemMigrate = ItemMigrate;
  Grid.ItemDrag = ItemDrag;
  Grid.ItemDragRelease = ItemDragRelease;
  Grid.ItemDragPlaceholder = ItemDragPlaceholder;
  Grid.Emitter = Emitter;
  Grid.Animator = Animator;
  Grid.Dragger = Dragger;
  Grid.Packer = Packer;
  Grid.AutoScroller = AutoScroller;
  Grid.defaultPacker = new Packer(2);
  Grid.defaultOptions = {
    // Initial item elements
    items: "*",
    // Default show animation
    showDuration: 300,
    showEasing: "ease",
    // Default hide animation
    hideDuration: 300,
    hideEasing: "ease",
    // Item's visible/hidden state styles
    visibleStyles: {
      opacity: "1",
      transform: "scale(1)"
    },
    hiddenStyles: {
      opacity: "0",
      transform: "scale(0.5)"
    },
    // Layout
    layout: {
      fillGaps: false,
      horizontal: false,
      alignRight: false,
      alignBottom: false,
      rounding: false
    },
    layoutOnResize: 150,
    layoutOnInit: true,
    layoutDuration: 300,
    layoutEasing: "ease",
    // Sorting
    sortData: null,
    // Drag & Drop
    dragEnabled: false,
    dragContainer: null,
    dragHandle: null,
    dragStartPredicate: {
      distance: 0,
      delay: 0
    },
    dragAxis: "xy",
    dragSort: true,
    dragSortHeuristics: {
      sortInterval: 100,
      minDragDistance: 10,
      minBounceBackAngle: 1
    },
    dragSortPredicate: {
      threshold: 50,
      action: ACTION_MOVE,
      migrateAction: ACTION_MOVE
    },
    dragRelease: {
      duration: 300,
      easing: "ease",
      useDragContainer: true
    },
    dragCssProps: {
      touchAction: "none",
      userSelect: "none",
      userDrag: "none",
      tapHighlightColor: "rgba(0, 0, 0, 0)",
      touchCallout: "none",
      contentZooming: "none"
    },
    dragPlaceholder: {
      enabled: false,
      createElement: null,
      onCreate: null,
      onRemove: null
    },
    dragAutoScroll: {
      targets: [],
      handle: null,
      threshold: 50,
      safeZone: 0.2,
      speed: AutoScroller.smoothSpeed(1e3, 2e3, 2500),
      sortDuringScroll: true,
      smoothStop: false,
      onStart: null,
      onStop: null
    },
    // Classnames
    containerClass: "muuri",
    itemClass: "muuri-item",
    itemVisibleClass: "muuri-item-shown",
    itemHiddenClass: "muuri-item-hidden",
    itemPositioningClass: "muuri-item-positioning",
    itemDraggingClass: "muuri-item-dragging",
    itemReleasingClass: "muuri-item-releasing",
    itemPlaceholderClass: "muuri-item-placeholder"
  };
  Grid.prototype.on = function(event, listener) {
    this._emitter.on(event, listener);
    return this;
  };
  Grid.prototype.off = function(event, listener) {
    this._emitter.off(event, listener);
    return this;
  };
  Grid.prototype.getElement = function() {
    return this._element;
  };
  Grid.prototype.getItem = function(target) {
    if (this._isDestroyed || !target && target !== 0) {
      return null;
    }
    if (typeof target === NUMBER_TYPE) {
      return this._items[target > -1 ? target : this._items.length + target] || null;
    }
    if (target instanceof Item) {
      return target._gridId === this._id ? target : null;
    }
    if (ITEM_ELEMENT_MAP) {
      var item = ITEM_ELEMENT_MAP.get(target);
      return item && item._gridId === this._id ? item : null;
    } else {
      for (var i = 0; i < this._items.length; i++) {
        if (this._items[i]._element === target) {
          return this._items[i];
        }
      }
    }
    return null;
  };
  Grid.prototype.getItems = function(targets) {
    if (this._isDestroyed || targets === void 0) {
      return this._items.slice(0);
    }
    var items = [];
    var i, item;
    if (Array.isArray(targets) || isNodeList(targets)) {
      for (i = 0; i < targets.length; i++) {
        item = this.getItem(targets[i]);
        if (item)
          items.push(item);
      }
    } else {
      item = this.getItem(targets);
      if (item)
        items.push(item);
    }
    return items;
  };
  Grid.prototype.refreshItems = function(items, force) {
    if (this._isDestroyed)
      return this;
    var targets = items || this._items;
    var i, item, style, hiddenItemStyles;
    if (force === true) {
      hiddenItemStyles = [];
      for (i = 0; i < targets.length; i++) {
        item = targets[i];
        if (!item.isVisible() && !item.isHiding()) {
          style = item.getElement().style;
          style.visibility = "hidden";
          style.display = "";
          hiddenItemStyles.push(style);
        }
      }
    }
    for (i = 0; i < targets.length; i++) {
      targets[i]._refreshDimensions(force);
    }
    if (force === true) {
      for (i = 0; i < hiddenItemStyles.length; i++) {
        style = hiddenItemStyles[i];
        style.visibility = "";
        style.display = "none";
      }
      hiddenItemStyles.length = 0;
    }
    return this;
  };
  Grid.prototype.refreshSortData = function(items) {
    if (this._isDestroyed)
      return this;
    var targets = items || this._items;
    for (var i = 0; i < targets.length; i++) {
      targets[i]._refreshSortData();
    }
    return this;
  };
  Grid.prototype.synchronize = function() {
    if (this._isDestroyed)
      return this;
    var items = this._items;
    if (!items.length)
      return this;
    var fragment;
    var element2;
    for (var i = 0; i < items.length; i++) {
      element2 = items[i]._element;
      if (element2.parentNode === this._element) {
        fragment = fragment || document.createDocumentFragment();
        fragment.appendChild(element2);
      }
    }
    if (!fragment)
      return this;
    this._element.appendChild(fragment);
    this._emit(EVENT_SYNCHRONIZE);
    return this;
  };
  Grid.prototype.layout = function(instant, onFinish) {
    if (this._isDestroyed)
      return this;
    var unfinishedLayout = this._nextLayoutData;
    if (unfinishedLayout && isFunction(unfinishedLayout.cancel)) {
      unfinishedLayout.cancel();
    }
    layoutId = layoutId % MAX_SAFE_FLOAT32_INTEGER + 1;
    var nextLayoutId = layoutId;
    this._nextLayoutData = {
      id: nextLayoutId,
      instant,
      onFinish,
      cancel: null
    };
    var items = this._items;
    var layoutItems = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i]._isActive)
        layoutItems.push(items[i]);
    }
    this._refreshDimensions();
    var gridWidth = this._width - this._borderLeft - this._borderRight;
    var gridHeight = this._height - this._borderTop - this._borderBottom;
    var layoutSettings = this._settings.layout;
    var cancelLayout;
    if (isFunction(layoutSettings)) {
      cancelLayout = layoutSettings(
        this,
        nextLayoutId,
        layoutItems,
        gridWidth,
        gridHeight,
        this._onLayoutDataReceived
      );
    } else {
      Grid.defaultPacker.setOptions(layoutSettings);
      cancelLayout = Grid.defaultPacker.createLayout(
        this,
        nextLayoutId,
        layoutItems,
        gridWidth,
        gridHeight,
        this._onLayoutDataReceived
      );
    }
    if (isFunction(cancelLayout) && this._nextLayoutData && this._nextLayoutData.id === nextLayoutId) {
      this._nextLayoutData.cancel = cancelLayout;
    }
    return this;
  };
  Grid.prototype.add = function(elements, options) {
    if (this._isDestroyed || !elements)
      return [];
    var newItems = toArray(elements);
    if (!newItems.length)
      return newItems;
    var opts = options || {};
    var layout = opts.layout ? opts.layout : opts.layout === void 0;
    var items = this._items;
    var needsLayout = false;
    var fragment;
    var element2;
    var item;
    var i;
    for (i = 0; i < newItems.length; i++) {
      element2 = newItems[i];
      if (element2.parentNode !== this._element) {
        fragment = fragment || document.createDocumentFragment();
        fragment.appendChild(element2);
      }
    }
    if (fragment) {
      this._element.appendChild(fragment);
    }
    for (i = 0; i < newItems.length; i++) {
      element2 = newItems[i];
      item = newItems[i] = new Item(this, element2, opts.active);
      if (item._isActive) {
        needsLayout = true;
        item._layout._skipNextAnimation = true;
      }
    }
    for (i = 0; i < newItems.length; i++) {
      item = newItems[i];
      item._refreshDimensions();
      item._refreshSortData();
    }
    arrayInsert(items, newItems, opts.index);
    if (this._hasListeners(EVENT_ADD)) {
      this._emit(EVENT_ADD, newItems.slice(0));
    }
    if (needsLayout && layout) {
      this.layout(layout === INSTANT_LAYOUT, isFunction(layout) ? layout : void 0);
    }
    return newItems;
  };
  Grid.prototype.remove = function(items, options) {
    if (this._isDestroyed || !items.length)
      return [];
    var opts = options || {};
    var layout = opts.layout ? opts.layout : opts.layout === void 0;
    var needsLayout = false;
    var allItems = this.getItems();
    var targetItems = [];
    var indices = [];
    var index;
    var item;
    var i;
    for (i = 0; i < items.length; i++) {
      item = items[i];
      if (item._isDestroyed)
        continue;
      index = this._items.indexOf(item);
      if (index === -1)
        continue;
      if (item._isActive)
        needsLayout = true;
      targetItems.push(item);
      indices.push(allItems.indexOf(item));
      item._destroy(opts.removeElements);
      this._items.splice(index, 1);
    }
    if (this._hasListeners(EVENT_REMOVE)) {
      this._emit(EVENT_REMOVE, targetItems.slice(0), indices);
    }
    if (needsLayout && layout) {
      this.layout(layout === INSTANT_LAYOUT, isFunction(layout) ? layout : void 0);
    }
    return targetItems;
  };
  Grid.prototype.show = function(items, options) {
    if (!this._isDestroyed && items.length) {
      this._setItemsVisibility(items, true, options);
    }
    return this;
  };
  Grid.prototype.hide = function(items, options) {
    if (!this._isDestroyed && items.length) {
      this._setItemsVisibility(items, false, options);
    }
    return this;
  };
  Grid.prototype.filter = function(predicate, options) {
    if (this._isDestroyed || !this._items.length)
      return this;
    var itemsToShow = [];
    var itemsToHide = [];
    var isPredicateString = typeof predicate === STRING_TYPE;
    var isPredicateFn = isFunction(predicate);
    var opts = options || {};
    var isInstant = opts.instant === true;
    var syncWithLayout = opts.syncWithLayout;
    var layout = opts.layout ? opts.layout : opts.layout === void 0;
    var onFinish = isFunction(opts.onFinish) ? opts.onFinish : null;
    var tryFinishCounter = -1;
    var tryFinish = noop;
    var item;
    var i;
    if (onFinish) {
      tryFinish = function() {
        ++tryFinishCounter && onFinish(itemsToShow.slice(0), itemsToHide.slice(0));
      };
    }
    if (isPredicateFn || isPredicateString) {
      for (i = 0; i < this._items.length; i++) {
        item = this._items[i];
        if (isPredicateFn ? predicate(item) : elementMatches(item._element, predicate)) {
          itemsToShow.push(item);
        } else {
          itemsToHide.push(item);
        }
      }
    }
    if (itemsToShow.length) {
      this.show(itemsToShow, {
        instant: isInstant,
        syncWithLayout,
        onFinish: tryFinish,
        layout: false
      });
    } else {
      tryFinish();
    }
    if (itemsToHide.length) {
      this.hide(itemsToHide, {
        instant: isInstant,
        syncWithLayout,
        onFinish: tryFinish,
        layout: false
      });
    } else {
      tryFinish();
    }
    if (itemsToShow.length || itemsToHide.length) {
      if (this._hasListeners(EVENT_FILTER)) {
        this._emit(EVENT_FILTER, itemsToShow.slice(0), itemsToHide.slice(0));
      }
      if (layout) {
        this.layout(layout === INSTANT_LAYOUT, isFunction(layout) ? layout : void 0);
      }
    }
    return this;
  };
  Grid.prototype.sort = /* @__PURE__ */ function() {
    var sortComparer;
    var isDescending;
    var origItems;
    var indexMap;
    function defaultComparer(a, b) {
      var result = 0;
      var criteriaName;
      var criteriaOrder;
      var valA;
      var valB;
      for (var i = 0; i < sortComparer.length; i++) {
        criteriaName = sortComparer[i][0];
        criteriaOrder = sortComparer[i][1];
        valA = (a._sortData ? a : a._refreshSortData())._sortData[criteriaName];
        valB = (b._sortData ? b : b._refreshSortData())._sortData[criteriaName];
        if (criteriaOrder === "desc" || !criteriaOrder && isDescending) {
          result = valB < valA ? -1 : valB > valA ? 1 : 0;
        } else {
          result = valA < valB ? -1 : valA > valB ? 1 : 0;
        }
        if (result)
          return result;
      }
      if (!result) {
        if (!indexMap)
          indexMap = createIndexMap(origItems);
        result = isDescending ? compareIndexMap(indexMap, b, a) : compareIndexMap(indexMap, a, b);
      }
      return result;
    }
    function customComparer(a, b) {
      var result = isDescending ? -sortComparer(a, b) : sortComparer(a, b);
      if (!result) {
        if (!indexMap)
          indexMap = createIndexMap(origItems);
        result = isDescending ? compareIndexMap(indexMap, b, a) : compareIndexMap(indexMap, a, b);
      }
      return result;
    }
    return function(comparer, options) {
      if (this._isDestroyed || this._items.length < 2)
        return this;
      var items = this._items;
      var opts = options || {};
      var layout = opts.layout ? opts.layout : opts.layout === void 0;
      isDescending = !!opts.descending;
      origItems = items.slice(0);
      indexMap = null;
      if (isFunction(comparer)) {
        sortComparer = comparer;
        items.sort(customComparer);
      } else if (typeof comparer === STRING_TYPE) {
        sortComparer = comparer.trim().split(" ").filter(function(val) {
          return val;
        }).map(function(val) {
          return val.split(":");
        });
        items.sort(defaultComparer);
      } else if (Array.isArray(comparer)) {
        items.length = 0;
        items.push.apply(items, comparer);
      } else {
        sortComparer = isDescending = origItems = indexMap = null;
        throw new Error("Invalid comparer argument provided.");
      }
      if (this._hasListeners(EVENT_SORT)) {
        this._emit(EVENT_SORT, items.slice(0), origItems);
      }
      if (layout) {
        this.layout(layout === INSTANT_LAYOUT, isFunction(layout) ? layout : void 0);
      }
      sortComparer = isDescending = origItems = indexMap = null;
      return this;
    };
  }();
  Grid.prototype.move = function(item, position, options) {
    if (this._isDestroyed || this._items.length < 2)
      return this;
    var items = this._items;
    var opts = options || {};
    var layout = opts.layout ? opts.layout : opts.layout === void 0;
    var isSwap = opts.action === ACTION_SWAP;
    var action = isSwap ? ACTION_SWAP : ACTION_MOVE;
    var fromItem = this.getItem(item);
    var toItem = this.getItem(position);
    var fromIndex;
    var toIndex;
    if (fromItem && toItem && fromItem !== toItem) {
      fromIndex = items.indexOf(fromItem);
      toIndex = items.indexOf(toItem);
      if (isSwap) {
        arraySwap(items, fromIndex, toIndex);
      } else {
        arrayMove(items, fromIndex, toIndex);
      }
      if (this._hasListeners(EVENT_MOVE)) {
        this._emit(EVENT_MOVE, {
          item: fromItem,
          fromIndex,
          toIndex,
          action
        });
      }
      if (layout) {
        this.layout(layout === INSTANT_LAYOUT, isFunction(layout) ? layout : void 0);
      }
    }
    return this;
  };
  Grid.prototype.send = function(item, targetGrid, position, options) {
    if (this._isDestroyed || targetGrid._isDestroyed || this === targetGrid)
      return this;
    item = this.getItem(item);
    if (!item)
      return this;
    var opts = options || {};
    var container = opts.appendTo || document.body;
    var layoutSender = opts.layoutSender ? opts.layoutSender : opts.layoutSender === void 0;
    var layoutReceiver = opts.layoutReceiver ? opts.layoutReceiver : opts.layoutReceiver === void 0;
    item._migrate.start(targetGrid, position, container);
    if (item._migrate._isActive && item._isActive) {
      if (layoutSender) {
        this.layout(
          layoutSender === INSTANT_LAYOUT,
          isFunction(layoutSender) ? layoutSender : void 0
        );
      }
      if (layoutReceiver) {
        targetGrid.layout(
          layoutReceiver === INSTANT_LAYOUT,
          isFunction(layoutReceiver) ? layoutReceiver : void 0
        );
      }
    }
    return this;
  };
  Grid.prototype.destroy = function(removeElements) {
    if (this._isDestroyed)
      return this;
    var container = this._element;
    var items = this._items.slice(0);
    var layoutStyles = this._layout && this._layout.styles || {};
    var i, prop;
    unbindLayoutOnResize(this);
    for (i = 0; i < items.length; i++)
      items[i]._destroy(removeElements);
    this._items.length = 0;
    removeClass(container, this._settings.containerClass);
    for (prop in layoutStyles)
      container.style[prop] = "";
    this._emit(EVENT_DESTROY);
    this._emitter.destroy();
    delete GRID_INSTANCES[this._id];
    this._isDestroyed = true;
    return this;
  };
  Grid.prototype._emit = function() {
    if (this._isDestroyed)
      return;
    this._emitter.emit.apply(this._emitter, arguments);
  };
  Grid.prototype._hasListeners = function(event) {
    if (this._isDestroyed)
      return false;
    return this._emitter.countListeners(event) > 0;
  };
  Grid.prototype._updateBoundingRect = function() {
    var element2 = this._element;
    var rect = element2.getBoundingClientRect();
    this._width = rect.width;
    this._height = rect.height;
    this._left = rect.left;
    this._top = rect.top;
    this._right = rect.right;
    this._bottom = rect.bottom;
  };
  Grid.prototype._updateBorders = function(left, right, top, bottom) {
    var element2 = this._element;
    if (left)
      this._borderLeft = getStyleAsFloat(element2, "border-left-width");
    if (right)
      this._borderRight = getStyleAsFloat(element2, "border-right-width");
    if (top)
      this._borderTop = getStyleAsFloat(element2, "border-top-width");
    if (bottom)
      this._borderBottom = getStyleAsFloat(element2, "border-bottom-width");
  };
  Grid.prototype._refreshDimensions = function() {
    this._updateBoundingRect();
    this._updateBorders(1, 1, 1, 1);
    this._boxSizing = getStyle(this._element, "box-sizing");
  };
  Grid.prototype._onLayoutDataReceived = /* @__PURE__ */ function() {
    var itemsToLayout = [];
    return function(layout) {
      if (this._isDestroyed || !this._nextLayoutData || this._nextLayoutData.id !== layout.id)
        return;
      var grid = this;
      var instant = this._nextLayoutData.instant;
      var onFinish = this._nextLayoutData.onFinish;
      var numItems = layout.items.length;
      var counter = numItems;
      var item;
      var left;
      var top;
      var i;
      this._nextLayoutData = null;
      if (!this._isLayoutFinished && this._hasListeners(EVENT_LAYOUT_ABORT)) {
        this._emit(EVENT_LAYOUT_ABORT, this._layout.items.slice(0));
      }
      this._layout = layout;
      itemsToLayout.length = 0;
      for (i = 0; i < numItems; i++) {
        item = layout.items[i];
        if (!item) {
          --counter;
          continue;
        }
        left = layout.slots[i * 2];
        top = layout.slots[i * 2 + 1];
        if (item._canSkipLayout(left, top)) {
          --counter;
          continue;
        }
        item._left = left;
        item._top = top;
        if (item.isActive() && !item.isDragging()) {
          itemsToLayout.push(item);
        } else {
          --counter;
        }
      }
      if (layout.styles) {
        setStyles(this._element, layout.styles);
      }
      if (this._hasListeners(EVENT_LAYOUT_START)) {
        this._emit(EVENT_LAYOUT_START, layout.items.slice(0), instant === true);
        if (this._layout.id !== layout.id)
          return;
      }
      var tryFinish = function() {
        if (--counter > 0)
          return;
        var hasLayoutChanged = grid._layout.id !== layout.id;
        var callback = isFunction(instant) ? instant : onFinish;
        if (!hasLayoutChanged) {
          grid._isLayoutFinished = true;
        }
        if (isFunction(callback)) {
          callback(layout.items.slice(0), hasLayoutChanged);
        }
        if (!hasLayoutChanged && grid._hasListeners(EVENT_LAYOUT_END)) {
          grid._emit(EVENT_LAYOUT_END, layout.items.slice(0));
        }
      };
      if (!itemsToLayout.length) {
        tryFinish();
        return this;
      }
      this._isLayoutFinished = false;
      for (i = 0; i < itemsToLayout.length; i++) {
        if (this._layout.id !== layout.id)
          break;
        itemsToLayout[i]._layout.start(instant === true, tryFinish);
      }
      if (this._layout.id === layout.id) {
        itemsToLayout.length = 0;
      }
      return this;
    };
  }();
  Grid.prototype._setItemsVisibility = function(items, toVisible, options) {
    var grid = this;
    var targetItems = items.slice(0);
    var opts = options || {};
    var isInstant = opts.instant === true;
    var callback = opts.onFinish;
    var layout = opts.layout ? opts.layout : opts.layout === void 0;
    var counter = targetItems.length;
    var startEvent = toVisible ? EVENT_SHOW_START : EVENT_HIDE_START;
    var endEvent = toVisible ? EVENT_SHOW_END : EVENT_HIDE_END;
    var method = toVisible ? "show" : "hide";
    var needsLayout = false;
    var completedItems = [];
    var hiddenItems = [];
    var item;
    var i;
    if (!counter) {
      if (isFunction(callback))
        callback(targetItems);
      return;
    }
    for (i = 0; i < targetItems.length; i++) {
      item = targetItems[i];
      if (toVisible && !item._isActive || !toVisible && item._isActive) {
        needsLayout = true;
      }
      item._layout._skipNextAnimation = !!(toVisible && !item._isActive);
      if (toVisible && item._visibility._isHidden) {
        hiddenItems.push(item);
      }
      if (toVisible) {
        item._addToLayout();
      } else {
        item._removeFromLayout();
      }
    }
    if (hiddenItems.length) {
      this.refreshItems(hiddenItems, true);
      hiddenItems.length = 0;
    }
    function triggerVisibilityChange() {
      if (needsLayout && opts.syncWithLayout !== false) {
        grid.off(EVENT_LAYOUT_START, triggerVisibilityChange);
      }
      if (grid._hasListeners(startEvent)) {
        grid._emit(startEvent, targetItems.slice(0));
      }
      for (i = 0; i < targetItems.length; i++) {
        if (targetItems[i]._gridId !== grid._id) {
          if (--counter < 1) {
            if (isFunction(callback))
              callback(completedItems.slice(0));
            if (grid._hasListeners(endEvent))
              grid._emit(endEvent, completedItems.slice(0));
          }
          continue;
        }
        targetItems[i]._visibility[method](isInstant, function(interrupted, item2) {
          if (!interrupted)
            completedItems.push(item2);
          if (--counter < 1) {
            if (isFunction(callback))
              callback(completedItems.slice(0));
            if (grid._hasListeners(endEvent))
              grid._emit(endEvent, completedItems.slice(0));
          }
        });
      }
    }
    if (needsLayout && opts.syncWithLayout !== false) {
      this.on(EVENT_LAYOUT_START, triggerVisibilityChange);
    } else {
      triggerVisibilityChange();
    }
    if (needsLayout && layout) {
      this.layout(layout === INSTANT_LAYOUT, isFunction(layout) ? layout : void 0);
    }
  };
  function mergeSettings(defaultSettings, userSettings) {
    var settings = mergeObjects({}, defaultSettings);
    if (userSettings) {
      settings = mergeObjects(settings, userSettings);
    }
    if (userSettings && userSettings.visibleStyles) {
      settings.visibleStyles = userSettings.visibleStyles;
    } else if (defaultSettings && defaultSettings.visibleStyles) {
      settings.visibleStyles = defaultSettings.visibleStyles;
    }
    if (userSettings && userSettings.hiddenStyles) {
      settings.hiddenStyles = userSettings.hiddenStyles;
    } else if (defaultSettings && defaultSettings.hiddenStyles) {
      settings.hiddenStyles = defaultSettings.hiddenStyles;
    }
    return settings;
  }
  function mergeObjects(target, source) {
    var sourceKeys = Object.keys(source);
    var length = sourceKeys.length;
    var isSourceObject;
    var propName;
    var i;
    for (i = 0; i < length; i++) {
      propName = sourceKeys[i];
      isSourceObject = isPlainObject(source[propName]);
      if (isPlainObject(target[propName]) && isSourceObject) {
        target[propName] = mergeObjects(mergeObjects({}, target[propName]), source[propName]);
        continue;
      }
      if (isSourceObject) {
        target[propName] = mergeObjects({}, source[propName]);
        continue;
      }
      if (Array.isArray(source[propName])) {
        target[propName] = source[propName].slice(0);
        continue;
      }
      target[propName] = source[propName];
    }
    return target;
  }
  function getInitialGridElements(gridElement, elements) {
    if (elements === "*") {
      return gridElement.children;
    }
    if (typeof elements === STRING_TYPE) {
      var result = [];
      var children = gridElement.children;
      for (var i = 0; i < children.length; i++) {
        if (elementMatches(children[i], elements)) {
          result.push(children[i]);
        }
      }
      return result;
    }
    if (Array.isArray(elements) || isNodeList(elements)) {
      return elements;
    }
    return [];
  }
  function bindLayoutOnResize(grid, delay) {
    if (typeof delay !== NUMBER_TYPE) {
      delay = delay === true ? 0 : -1;
    }
    if (delay >= 0) {
      grid._resizeHandler = debounce(function() {
        grid.refreshItems().layout();
      }, delay);
      window.addEventListener("resize", grid._resizeHandler);
    }
  }
  function unbindLayoutOnResize(grid) {
    if (grid._resizeHandler) {
      grid._resizeHandler(true);
      window.removeEventListener("resize", grid._resizeHandler);
      grid._resizeHandler = null;
    }
  }
  function normalizeStyles(styles) {
    var normalized = {};
    var docElemStyle = document.documentElement.style;
    var prop, prefixedProp;
    for (prop in styles) {
      if (!styles[prop])
        continue;
      prefixedProp = getPrefixedPropName(docElemStyle, prop);
      if (!prefixedProp)
        continue;
      normalized[prefixedProp] = styles[prop];
    }
    return normalized;
  }
  function createIndexMap(items) {
    var result = {};
    for (var i = 0; i < items.length; i++) {
      result[items[i]._id] = i;
    }
    return result;
  }
  function compareIndexMap(indexMap, itemA, itemB) {
    var indexA = indexMap[itemA._id];
    var indexB = indexMap[itemB._id];
    return indexA - indexB;
  }
  var muuri_module_default = Grid;

  // src/other-pages/drag-drop.ts
  var Dragdrop = () => {
    let grid;
    function initializeGrid() {
      if (!grid) {
        const grid2 = new muuri_module_default(".proposal_contain", {
          dragEnabled: true,
          fillGaps: true,
          alignRight: false,
          alignBottom: false,
          items: ".proposal-contain"
        });
      }
    }
    function destroyGrid() {
      if (grid) {
        grid.destroy();
        grid = null;
      }
    }
    function checkScreenWidth() {
      if (window.innerWidth > 1024) {
        initializeGrid();
      } else {
        destroyGrid();
      }
    }
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
  };

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/gsap-core.js
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  };
  var _defaults = {
    duration: 0.5,
    overwrite: false,
    delay: 0
  };
  var _suppressOverwrites;
  var _reverting;
  var _context;
  var _bigNum = 1e8;
  var _tinyNum = 1 / _bigNum;
  var _2PI = Math.PI * 2;
  var _HALF_PI = _2PI / 4;
  var _gsID = 0;
  var _sqrt = Math.sqrt;
  var _cos = Math.cos;
  var _sin = Math.sin;
  var _isString = function _isString2(value) {
    return typeof value === "string";
  };
  var _isFunction = function _isFunction2(value) {
    return typeof value === "function";
  };
  var _isNumber = function _isNumber2(value) {
    return typeof value === "number";
  };
  var _isUndefined = function _isUndefined2(value) {
    return typeof value === "undefined";
  };
  var _isObject = function _isObject2(value) {
    return typeof value === "object";
  };
  var _isNotFalse = function _isNotFalse2(value) {
    return value !== false;
  };
  var _windowExists = function _windowExists2() {
    return typeof window !== "undefined";
  };
  var _isFuncOrString = function _isFuncOrString2(value) {
    return _isFunction(value) || _isString(value);
  };
  var _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
  };
  var _isArray = Array.isArray;
  var _strictNumExp = /(?:-?\.?\d|\.)+/gi;
  var _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g;
  var _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g;
  var _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi;
  var _relExp = /[+-]=-?[.\d]+/;
  var _delimitedValueExp = /[^,'"\[\]\s]+/gi;
  var _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i;
  var _globalTimeline;
  var _win;
  var _coreInitted;
  var _doc;
  var _globals = {};
  var _installScope = {};
  var _coreReady;
  var _install = function _install2(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  };
  var _missingPlugin = function _missingPlugin2(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  };
  var _warn = function _warn2(message, suppress) {
    return !suppress && console.warn(message);
  };
  var _addGlobal = function _addGlobal2(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  };
  var _emptyFunc = function _emptyFunc2() {
    return 0;
  };
  var _startAtRevertConfig = {
    suppressEvents: true,
    isStart: true,
    kill: false
  };
  var _revertConfigNoKill = {
    suppressEvents: true,
    kill: false
  };
  var _revertConfig = {
    suppressEvents: true
  };
  var _reservedProps = {};
  var _lazyTweens = [];
  var _lazyLookup = {};
  var _lastRenderedFrame;
  var _plugins = {};
  var _effects = {};
  var _nextGCFrame = 30;
  var _harnessPlugins = [];
  var _callbackNames = "";
  var _harness = function _harness2(targets) {
    var target = targets[0], harnessPlugin, i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);
    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      i = _harnessPlugins.length;
      while (i-- && !_harnessPlugins[i].targetTest(target)) {
      }
      harnessPlugin = _harnessPlugins[i];
    }
    i = targets.length;
    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }
    return targets;
  };
  var _getCache = function _getCache2(target) {
    return target._gsap || _harness(toArray2(target))[0]._gsap;
  };
  var _getProperty = function _getProperty2(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  };
  var _forEachName = function _forEachName2(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  };
  var _round = function _round2(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _roundPrecise = function _roundPrecise2(value) {
    return Math.round(value * 1e7) / 1e7 || 0;
  };
  var _parseRelative = function _parseRelative2(start, value) {
    var operator = value.charAt(0), end = parseFloat(value.substr(2));
    start = parseFloat(start);
    return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
  };
  var _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
    var l = toFind.length, i = 0;
    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) {
    }
    return i < l;
  };
  var _lazyRender = function _lazyRender2() {
    var l = _lazyTweens.length, a = _lazyTweens.slice(0), i, tween;
    _lazyLookup = {};
    _lazyTweens.length = 0;
    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  };
  var _lazySafeRender = function _lazySafeRender2(animation, time, suppressEvents, force) {
    _lazyTweens.length && !_reverting && _lazyRender();
    animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
    _lazyTweens.length && !_reverting && _lazyRender();
  };
  var _numericIfPossible = function _numericIfPossible2(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  };
  var _passThrough = function _passThrough2(p) {
    return p;
  };
  var _setDefaults = function _setDefaults2(obj, defaults2) {
    for (var p in defaults2) {
      p in obj || (obj[p] = defaults2[p]);
    }
    return obj;
  };
  var _setKeyframeDefaults = function _setKeyframeDefaults2(excludeDuration) {
    return function(obj, defaults2) {
      for (var p in defaults2) {
        p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults2[p]);
      }
    };
  };
  var _merge = function _merge2(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }
    return base;
  };
  var _mergeDeep = function _mergeDeep2(base, toMerge) {
    for (var p in toMerge) {
      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep2(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    }
    return base;
  };
  var _copyExcluding = function _copyExcluding2(obj, excluding) {
    var copy = {}, p;
    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }
    return copy;
  };
  var _inheritDefaults = function _inheritDefaults2(vars) {
    var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }
    return vars;
  };
  var _arraysMatch = function _arraysMatch2(a1, a2) {
    var i = a1.length, match = i === a2.length;
    while (match && i-- && a1[i] === a2[i]) {
    }
    return i < 0;
  };
  var _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = parent[lastProp], t;
    if (sortBy) {
      t = child[sortBy];
      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }
    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }
    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }
    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  };
  var _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = child._prev, next = child._next;
    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }
    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }
    child._next = child._prev = child.parent = null;
  };
  var _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
    child._act = 0;
  };
  var _uncache = function _uncache2(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      var a = animation;
      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }
    return animation;
  };
  var _recacheAncestors = function _recacheAncestors2(animation) {
    var parent = animation.parent;
    while (parent && parent.parent) {
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }
    return animation;
  };
  var _rewindStartAt = function _rewindStartAt2(tween, totalTime, suppressEvents, force) {
    return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
  };
  var _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
  };
  var _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  };
  var _animationCycle = function _animationCycle2(tTime, cycleDuration) {
    var whole = Math.floor(tTime /= cycleDuration);
    return tTime && whole === tTime ? whole - 1 : whole;
  };
  var _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  };
  var _setEnd = function _setEnd2(animation) {
    return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  };
  var _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
    var parent = animation._dp;
    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
      _setEnd(animation);
      parent._dirty || _uncache(parent, animation);
    }
    return animation;
  };
  var _postAddChecks = function _postAddChecks2(timeline2, child) {
    var t;
    if (child._time || !child._dur && child._initted || child._start < timeline2._time && (child._dur || !child.add)) {
      t = _parentToChildTotalTime(timeline2.rawTime(), child);
      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    }
    if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
      if (timeline2._dur < timeline2.duration()) {
        t = timeline2;
        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime);
          t = t._dp;
        }
      }
      timeline2._zTime = -_tinyNum;
    }
  };
  var _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _roundPrecise((_isNumber(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition(timeline2, position, child) : timeline2._time) + child._delay);
    child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
    _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
    _isFromOrFromStart(child) || (timeline2._recent = child);
    skipChecks || _postAddChecks(timeline2, child);
    timeline2._ts < 0 && _alignPlayhead(timeline2, timeline2._tTime);
    return timeline2;
  };
  var _scrollTrigger = function _scrollTrigger2(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  };
  var _attemptInitTween = function _attemptInitTween2(tween, time, force, suppressEvents, tTime) {
    _initTween(tween, time, tTime);
    if (!tween._initted) {
      return 1;
    }
    if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);
      tween._lazy = [tTime, suppressEvents];
      return 1;
    }
  };
  var _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
  };
  var _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
  };
  var _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
    if (repeatDelay && tween._repeat) {
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
      if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }
    if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
        return;
      }
      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
      suppressEvents || (suppressEvents = totalTime && !prevIteration);
      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      pt = tween._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);
        if (!suppressEvents && !_reverting) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  };
  var _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time) {
    var child;
    if (time > prevTime) {
      child = animation._first;
      while (child && child._start <= time) {
        if (child.data === "isPause" && child._start > prevTime) {
          return child;
        }
        child = child._next;
      }
    } else {
      child = animation._last;
      while (child && child._start >= time) {
        if (child.data === "isPause" && child._start < prevTime) {
          return child;
        }
        child = child._prev;
      }
    }
  };
  var _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
    animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  };
  var _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  };
  var _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc,
    totalDuration: _emptyFunc
  };
  var _parsePosition = function _parsePosition2(animation, position, percentAnimation) {
    var labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur, i, offset, isPercent;
    if (_isString(position) && (isNaN(position) || position in labels)) {
      offset = position.charAt(0);
      isPercent = position.substr(-1) === "%";
      i = position.indexOf("=");
      if (offset === "<" || offset === ">") {
        i >= 0 && (position = position.replace(/=/, ""));
        return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
      }
      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }
      offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
      if (isPercent && percentAnimation) {
        offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
      }
      return i > 1 ? _parsePosition2(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }
    return position == null ? clippedDuration : +position;
  };
  var _createTweenType = function _createTweenType2(type, params, timeline2) {
    var isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
    isLegacy && (vars.duration = params[1]);
    vars.parent = timeline2;
    if (type) {
      irVars = vars;
      parent = timeline2;
      while (parent && !("immediateRender" in irVars)) {
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }
      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
    }
    return new Tween(params[0], vars, params[varsIndex + 1]);
  };
  var _conditionalReturn = function _conditionalReturn2(value, func) {
    return value || value === 0 ? func(value) : func;
  };
  var _clamp = function _clamp2(min, max, value) {
    return value < min ? min : value > max ? max : value;
  };
  var getUnit = function getUnit2(value, v) {
    return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
  };
  var clamp = function clamp2(min, max, value) {
    return _conditionalReturn(value, function(v) {
      return _clamp(min, max, v);
    });
  };
  var _slice = [].slice;
  var _isArrayLike = function _isArrayLike2(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  };
  var _flatten = function _flatten2(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }
    return ar.forEach(function(value) {
      var _accumulator;
      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray2(value)) : accumulator.push(value);
    }) || accumulator;
  };
  var toArray2 = function toArray3(value, scope, leaveStrings) {
    return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  };
  var selector = function selector2(value) {
    value = toArray2(value)[0] || _warn("Invalid scope") || {};
    return function(v) {
      var el = value.current || value.nativeElement || value;
      return toArray2(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
    };
  };
  var shuffle = function shuffle2(a) {
    return a.sort(function() {
      return 0.5 - Math.random();
    });
  };
  var distribute = function distribute2(v) {
    if (_isFunction(v)) {
      return v;
    }
    var vars = _isObject(v) ? v : {
      each: v
    }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache2 = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
    if (_isString(from)) {
      ratioX = ratioY = {
        center: 0.5,
        edges: 0.5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }
    return function(i, target, a) {
      var l = (a || vars).length, distances = cache2[l], originX, originY, x, y, d, j, max, min, wrapAt;
      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
        if (!wrapAt) {
          max = -_bigNum;
          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {
          }
          wrapAt < l && wrapAt--;
        }
        distances = cache2[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
        originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum;
        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }
        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0;
        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }
      l = (distances[i] - distances.min) / distances.max || 0;
      return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
    };
  };
  var _roundModifier = function _roundModifier2(v) {
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
    return function(raw) {
      var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
      return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
    };
  };
  var snap = function snap2(snapTo, value) {
    var isArray = _isArray(snapTo), radius, is2D;
    if (!isArray && _isObject(snapTo)) {
      radius = isArray = snapTo.radius || _bigNum;
      if (snapTo.values) {
        snapTo = toArray2(snapTo.values);
        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius;
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }
    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function(raw) {
      var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum, closest = 0, i = snapTo.length, dx, dy;
      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }
        if (dx < min) {
          min = dx;
          closest = i;
        }
      }
      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  };
  var random = function random2(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  };
  var pipe = function pipe2() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }
    return function(value) {
      return functions.reduce(function(v, f) {
        return f(v);
      }, value);
    };
  };
  var unitize = function unitize2(func, unit) {
    return function(value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  };
  var normalize = function normalize2(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  };
  var _wrapArray = function _wrapArray2(a, wrapper, value) {
    return _conditionalReturn(value, function(index) {
      return a[~~wrapper(index)];
    });
  };
  var wrap = function wrap2(min, max, value) {
    var range = max - min;
    return _isArray(min) ? _wrapArray(min, wrap2(0, min.length), max) : _conditionalReturn(value, function(value2) {
      return (range + (value2 - min) % range) % range + min;
    });
  };
  var wrapYoyo = function wrapYoyo2(min, max, value) {
    var range = max - min, total = range * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo2(0, min.length - 1), max) : _conditionalReturn(value, function(value2) {
      value2 = (total + (value2 - min) % total) % total || 0;
      return min + (value2 > range ? total - value2 : value2);
    });
  };
  var _replaceRandom = function _replaceRandom2(value) {
    var prev = 0, s = "", i, nums, end, isArray;
    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }
    return s + value.substr(prev, value.length - prev);
  };
  var mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin, outRange = outMax - outMin;
    return _conditionalReturn(value, function(value2) {
      return outMin + ((value2 - inMin) / inRange * outRange || 0);
    });
  };
  var interpolate = function interpolate2(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function(p2) {
      return (1 - p2) * start + p2 * end;
    };
    if (!func) {
      var isString = _isString(start), master = {}, p, i, interpolators, l, il;
      progress === true && (mutate = 1) && (progress = null);
      if (isString) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;
        for (i = 1; i < l; i++) {
          interpolators.push(interpolate2(start[i - 1], start[i]));
        }
        l--;
        func = function func2(p2) {
          p2 *= l;
          var i2 = Math.min(il, ~~p2);
          return interpolators[i2](p2 - i2);
        };
        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }
      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }
        func = function func2(p2) {
          return _renderPropTweens(p2, master) || (isString ? start.p : start);
        };
      }
    }
    return _conditionalReturn(progress, func);
  };
  var _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
    var labels = timeline2.labels, min = _bigNum, p, distance, label;
    for (p in labels) {
      distance = labels[p] - fromTime;
      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }
    return label;
  };
  var _callback = function _callback2(animation, type, executeLazyFirst) {
    var v = animation.vars, callback = v[type], prevContext = _context, context3 = animation._ctx, params, scope, result;
    if (!callback) {
      return;
    }
    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender();
    context3 && (_context = context3);
    result = params ? callback.apply(scope, params) : callback.call(scope);
    _context = prevContext;
    return result;
  };
  var _interrupt = function _interrupt2(animation) {
    _removeFromParent(animation);
    animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  };
  var _quickTween;
  var _registerPluginQueue = [];
  var _createPlugin = function _createPlugin2(config3) {
    if (!config3)
      return;
    config3 = !config3.name && config3["default"] || config3;
    if (_windowExists() || config3.headless) {
      var name = config3.name, isFunc = _isFunction(config3), Plugin = name && !isFunc && config3.init ? function() {
        this._props = [];
      } : config3, instanceDefaults = {
        init: _emptyFunc,
        render: _renderPropTweens,
        add: _addPropTween,
        kill: _killPropTweensOf,
        modifier: _addPluginModifier,
        rawVars: 0
      }, statics = {
        targetTest: 0,
        get: 0,
        getSetter: _getSetter,
        aliases: {},
        register: 0
      };
      _wake();
      if (config3 !== Plugin) {
        if (_plugins[name]) {
          return;
        }
        _setDefaults(Plugin, _setDefaults(_copyExcluding(config3, instanceDefaults), statics));
        _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
        _plugins[Plugin.prop = name] = Plugin;
        if (config3.targetTest) {
          _harnessPlugins.push(Plugin);
          _reservedProps[name] = 1;
        }
        name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
      }
      _addGlobal(name, Plugin);
      config3.register && config3.register(gsap, Plugin, PropTween);
    } else {
      _registerPluginQueue.push(config3);
    }
  };
  var _255 = 255;
  var _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  };
  var _hue = function _hue2(h, m1, m2) {
    h += h < 0 ? 1 : h > 1 ? -1 : 0;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + 0.5 | 0;
  };
  var splitColor = function splitColor2(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0, r, g, b, h, s, l, max, min, d, wasHSL;
    if (!a) {
      if (v.substr(-1) === ",") {
        v = v.substr(0, v.length - 1);
      }
      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length < 6) {
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
        }
        if (v.length === 9) {
          a = parseInt(v.substr(1, 6), 16);
          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);
        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1);
          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }
      a = a.map(Number);
    }
    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }
      a[0] = ~~(h + 0.5);
      a[1] = ~~(s * 100 + 0.5);
      a[2] = ~~(l * 100 + 0.5);
    }
    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  };
  var _colorOrderData = function _colorOrderData2(v) {
    var values = [], c = [], i = -1;
    v.split(_colorExp).forEach(function(v2) {
      var a = v2.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  };
  var _formatColors = function _formatColors2(s, toHSL, orderMatchData) {
    var result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
    if (!colors) {
      return s;
    }
    colors = colors.map(function(color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });
    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;
      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;
        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }
    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }
    return result + shell[l];
  };
  var _colorExp = function() {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p;
    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }
    return new RegExp(s + ")", "gi");
  }();
  var _hslExp = /hsl[a]?\(/;
  var _colorStringFilter = function _colorStringFilter2(a) {
    var combined = a.join(" "), toHSL;
    _colorExp.lastIndex = 0;
    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
      return true;
    }
  };
  var _tickerActive;
  var _ticker = function() {
    var _getTime3 = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime3(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners3 = [], _id, _req, _raf, _self, _delta, _i2, _tick = function _tick2(v) {
      var elapsed = _getTime3() - _lastUpdate, manual = v === true, overlap, dispatch, time, frame;
      (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
      _lastUpdate += elapsed;
      time = _lastUpdate - _startTime;
      overlap = time - _nextTime;
      if (overlap > 0 || manual) {
        frame = ++_self.frame;
        _delta = time - _self.time * 1e3;
        _self.time = time = time / 1e3;
        _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
        dispatch = 1;
      }
      manual || (_id = _req(_tick2));
      if (dispatch) {
        for (_i2 = 0; _i2 < _listeners3.length; _i2++) {
          _listeners3[_i2](time, _delta, frame, v);
        }
      }
    };
    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1e3 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
            _registerPluginQueue.forEach(_createPlugin);
          }
          _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
          _id && _self.sleep();
          _req = _raf || function(f) {
            return setTimeout(f, _nextTime - _self.time * 1e3 + 1 | 0);
          };
          _tickerActive = 1;
          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? cancelAnimationFrame : clearTimeout)(_id);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || Infinity;
        _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
      },
      fps: function fps(_fps) {
        _gap = 1e3 / (_fps || 240);
        _nextTime = _self.time * 1e3 + _gap;
      },
      add: function add(callback, once, prioritize) {
        var func = once ? function(t, d, f, v) {
          callback(t, d, f, v);
          _self.remove(func);
        } : callback;
        _self.remove(callback);
        _listeners3[prioritize ? "unshift" : "push"](func);
        _wake();
        return func;
      },
      remove: function remove(callback, i) {
        ~(i = _listeners3.indexOf(callback)) && _listeners3.splice(i, 1) && _i2 >= i && _i2--;
      },
      _listeners: _listeners3
    };
    return _self;
  }();
  var _wake = function _wake2() {
    return !_tickerActive && _ticker.wake();
  };
  var _easeMap = {};
  var _customEaseExp = /^[\d.\-M][\d.\-,\s]/;
  var _quotesExp = /["']/g;
  var _parseObjectInString = function _parseObjectInString2(value) {
    var obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length, index, val, parsedVal;
    for (; i < l; i++) {
      val = split[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }
    return obj;
  };
  var _valueInParentheses = function _valueInParentheses2(value) {
    var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  };
  var _configEaseFromString = function _configEaseFromString2(name) {
    var split = (name + "").split("("), ease = _easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  };
  var _invertEase = function _invertEase2(ease) {
    return function(p) {
      return 1 - ease(1 - p);
    };
  };
  var _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
    var child = timeline2._first, ease;
    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase2(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase2(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }
      child = child._next;
    }
  };
  var _parseEase = function _parseEase2(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  };
  var _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut2(p) {
        return 1 - easeIn(1 - p);
      };
    }
    if (easeInOut === void 0) {
      easeInOut = function easeInOut2(p) {
        return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }
    var ease = {
      easeIn,
      easeOut,
      easeInOut
    }, lowercaseName;
    _forEachName(names, function(name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });
    return ease;
  };
  var _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
    return function(p) {
      return p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;
    };
  };
  var _configElastic = function _configElastic2(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p) {
      return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    p2 = _2PI / p2;
    ease.config = function(amplitude2, period2) {
      return _configElastic2(type, amplitude2, period2);
    };
    return ease;
  };
  var _configBack = function _configBack2(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }
    var easeOut = function easeOut2(p) {
      return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    ease.config = function(overshoot2) {
      return _configBack2(type, overshoot2);
    };
    return ease;
  };
  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
    var power = i < 5 ? i + 1 : i;
    _insertEase(name + ",Power" + (power - 1), i ? function(p) {
      return Math.pow(p, power);
    } : function(p) {
      return p;
    }, function(p) {
      return 1 - Math.pow(1 - p, power);
    }, function(p) {
      return p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });
  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
  (function(n, c) {
    var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + 0.75 : p < n3 ? n * (p -= 2.25 / c) * p + 0.9375 : n * Math.pow(p - 2.625 / c, 2) + 0.984375;
    };
    _insertEase("Bounce", function(p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);
  _insertEase("Expo", function(p) {
    return p ? Math.pow(2, 10 * (p - 1)) : 0;
  });
  _insertEase("Circ", function(p) {
    return -(_sqrt(1 - p * p) - 1);
  });
  _insertEase("Sine", function(p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });
  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }
      var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
      return function(p) {
        return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];
  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
    return _callbackNames += name + "," + name + "Params,";
  });
  var GSCache = function GSCache2(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  var Animation = /* @__PURE__ */ function() {
    function Animation2(vars) {
      this.vars = vars;
      this._delay = +vars.delay || 0;
      if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }
      this._ts = 1;
      _setDuration(this, +vars.duration, 1, 1);
      this.data = vars.data;
      if (_context) {
        this._ctx = _context;
        _context.data.push(this);
      }
      _tickerActive || _ticker.wake();
    }
    var _proto = Animation2.prototype;
    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }
      return this._delay;
    };
    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };
    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }
      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };
    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();
      if (!arguments.length) {
        return this._tTime;
      }
      var parent = this._dp;
      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime);
        !parent._dp || parent.parent || _postAddChecks(parent, this);
        while (parent && parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }
          parent = parent.parent;
        }
        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }
      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        this._ts || (this._pTime = _totalTime);
        _lazySafeRender(this, _totalTime, suppressEvents);
      }
      return this;
    };
    _proto.time = function time(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
    };
    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
    };
    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
    };
    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;
      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    };
    _proto.timeScale = function timeScale(value, suppressEvents) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts;
      }
      if (this._rts === value) {
        return this;
      }
      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
      this.totalTime(_clamp(-Math.abs(this._delay), this._tDur, tTime), suppressEvents !== false);
      _setEnd(this);
      return _recacheAncestors(this);
    };
    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }
      if (this._ps !== value) {
        this._ps = value;
        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
          this._ts = this._act = 0;
        } else {
          _wake();
          this._ts = this._rts;
          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
        }
      }
      return this;
    };
    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }
      return this._start;
    };
    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };
    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp;
      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };
    _proto.revert = function revert(config3) {
      if (config3 === void 0) {
        config3 = _revertConfig;
      }
      var prevIsReverting = _reverting;
      _reverting = config3;
      if (this._initted || this._startAt) {
        this.timeline && this.timeline.revert(config3);
        this.totalTime(-0.01, config3.suppressEvents);
      }
      this.data !== "nested" && config3.kill !== false && this.kill();
      _reverting = prevIsReverting;
      return this;
    };
    _proto.globalTime = function globalTime(rawTime) {
      var animation = this, time = arguments.length ? rawTime : animation.rawTime();
      while (animation) {
        time = animation._start + time / (Math.abs(animation._ts) || 1);
        animation = animation._dp;
      }
      return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time;
    };
    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value === Infinity ? -2 : value;
        return _onUpdateTotalDuration(this);
      }
      return this._repeat === -2 ? Infinity : this._repeat;
    };
    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        var time = this._time;
        this._rDelay = value;
        _onUpdateTotalDuration(this);
        return time ? this.time(time) : this;
      }
      return this._rDelay;
    };
    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }
      return this._yoyo;
    };
    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };
    _proto.restart = function restart(includeDelay, suppressEvents) {
      return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
    };
    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };
    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };
    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };
    _proto.resume = function resume() {
      return this.paused(false);
    };
    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
        return this;
      }
      return this._rts < 0;
    };
    _proto.invalidate = function invalidate() {
      this._initted = this._act = 0;
      this._zTime = -_tinyNum;
      return this;
    };
    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp, start = this._start, rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };
    _proto.eventCallback = function eventCallback(type, callback, params) {
      var vars = this.vars;
      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params && (vars[type + "Params"] = params);
          type === "onUpdate" && (this._onUpdate = callback);
        }
        return this;
      }
      return vars[type];
    };
    _proto.then = function then(onFulfilled) {
      var self2 = this;
      return new Promise(function(resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve2() {
          var _then = self2.then;
          self2.then = null;
          _isFunction(f) && (f = f(self2)) && (f.then || f === self2) && (self2.then = _then);
          resolve(f);
          self2.then = _then;
        };
        if (self2._initted && self2.totalProgress() === 1 && self2._ts >= 0 || !self2._tTime && self2._ts < 0) {
          _resolve();
        } else {
          self2._prom = _resolve;
        }
      });
    };
    _proto.kill = function kill() {
      _interrupt(this);
    };
    return Animation2;
  }();
  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });
  var Timeline = /* @__PURE__ */ function(_Animation) {
    _inheritsLoose(Timeline2, _Animation);
    function Timeline2(vars, position) {
      var _this;
      if (vars === void 0) {
        vars = {};
      }
      _this = _Animation.call(this, vars) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
      vars.reversed && _this.reverse();
      vars.paused && _this.paused(true);
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
      return _this;
    }
    var _proto2 = Timeline2.prototype;
    _proto2.to = function to(targets, vars, position) {
      _createTweenType(0, arguments, this);
      return this;
    };
    _proto2.from = function from(targets, vars, position) {
      _createTweenType(1, arguments, this);
      return this;
    };
    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      _createTweenType(2, arguments, this);
      return this;
    };
    _proto2.set = function set(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };
    _proto2.call = function call(callback, params, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
    };
    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };
    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.render = function render3(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
      this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }
        time = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;
        if (crossingStart) {
          dur || (prevTime = this._zTime);
          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }
        if (this._repeat) {
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);
            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }
            time > dur && (time = dur);
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
          if (yoyo && iteration & 1) {
            time = dur - time;
            isYoyo = 1;
          }
          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : tTime % dur ? dur : tTime;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            this._tTime = tTime;
            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
            if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
              return this;
            }
            dur = this._dur;
            tDur = this._tDur;
            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -1e-4;
              this.render(prevTime, true);
              this.vars.repeatRefresh && !isYoyo && this.invalidate();
            }
            this._lock = 0;
            if (!this._ts && !prevPaused) {
              return this;
            }
            _propagateYoyoEase(this, isYoyo);
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
          if (pauseTween) {
            tTime -= time - (time = pauseTween._start);
          }
        }
        this._tTime = tTime;
        this._time = time;
        this._act = !timeScale;
        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
          prevTime = 0;
        }
        if (!prevTime && time && !suppressEvents && !iteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        if (time >= prevTime && totalTime >= 0) {
          child = this._first;
          while (child) {
            next = child._next;
            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = -_tinyNum);
                break;
              }
            }
            child = next;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time;
          while (child) {
            next = child._prev;
            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt));
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                break;
              }
            }
            child = next;
          }
        }
        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
          if (this._ts) {
            this._start = prevStart;
            _setEnd(this);
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) {
          if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
            if (!this._lock) {
              (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
              if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
              }
            }
          }
        }
      }
      return this;
    };
    _proto2.add = function add(child, position) {
      var _this2 = this;
      _isNumber(position) || (position = _parsePosition(this, position, child));
      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function(obj) {
            return _this2.add(obj, position);
          });
          return this;
        }
        if (_isString(child)) {
          return this.addLabel(child, position);
        }
        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }
      return this !== child ? _addToTimeline(this, child, position) : this;
    };
    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }
      if (tweens === void 0) {
        tweens = true;
      }
      if (timelines === void 0) {
        timelines = true;
      }
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum;
      }
      var a = [], child = this._first;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }
        child = child._next;
      }
      return a;
    };
    _proto2.getById = function getById2(id2) {
      var animations = this.getChildren(1, 1, 1), i = animations.length;
      while (i--) {
        if (animations[i].vars.id === id2) {
          return animations[i];
        }
      }
    };
    _proto2.remove = function remove(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }
      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }
      _removeLinkedListItem(this, child);
      if (child === this._recent) {
        this._recent = this._last;
      }
      return _uncache(this);
    };
    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }
      this._forcing = 1;
      if (!this._dp && this._ts) {
        this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }
      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
      this._forcing = 0;
      return this;
    };
    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };
    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };
    _proto2.addPause = function addPause(position, callback, params) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };
    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);
      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }
        child = child._next;
      }
    };
    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }
      return this;
    };
    _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
      var a = [], parsedTargets = toArray2(targets), child = this._first, isGlobalTime = _isNumber(onlyActive), children;
      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }
        child = child._next;
      }
      return a;
    };
    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};
      var tl = this, endTime = _parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl, _setDefaults({
        ease: vars.ease || "none",
        lazy: false,
        immediateRender: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();
          if (!initted) {
            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
            initted = 1;
          }
          _onStart && _onStart.apply(tween, onStartParams || []);
        }
      }, vars));
      return immediateRender ? tween.render(0) : tween;
    };
    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };
    _proto2.recent = function recent() {
      return this._recent;
    };
    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };
    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };
    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };
    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }
      var child = this._first, labels = this.labels, p;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }
        child = child._next;
      }
      if (adjustLabels) {
        for (p in labels) {
          if (labels[p] >= ignoreBeforeTime) {
            labels[p] += amount;
          }
        }
      }
      return _uncache(this);
    };
    _proto2.invalidate = function invalidate(soft) {
      var child = this._first;
      this._lock = 0;
      while (child) {
        child.invalidate(soft);
        child = child._next;
      }
      return _Animation.prototype.invalidate.call(this, soft);
    };
    _proto2.clear = function clear(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }
      var child = this._first, next;
      while (child) {
        next = child._next;
        this.remove(child);
        child = next;
      }
      this._dp && (this._time = this._tTime = this._pTime = 0);
      includeLabels && (this.labels = {});
      return _uncache(this);
    };
    _proto2.totalDuration = function totalDuration(value) {
      var max = 0, self2 = this, child = self2._last, prevStart = _bigNum, prev, start, parent;
      if (arguments.length) {
        return self2.timeScale((self2._repeat < 0 ? self2.duration() : self2.totalDuration()) / (self2.reversed() ? -value : value));
      }
      if (self2._dirty) {
        parent = self2.parent;
        while (child) {
          prev = child._prev;
          child._dirty && child.totalDuration();
          start = child._start;
          if (start > prevStart && self2._sort && child._ts && !self2._lock) {
            self2._lock = 1;
            _addToTimeline(self2, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }
          if (start < 0 && child._ts) {
            max -= start;
            if (!parent && !self2._dp || parent && parent.smoothChildTiming) {
              self2._start += start / self2._ts;
              self2._time -= start;
              self2._tTime -= start;
            }
            self2.shiftChildren(-start, false, -Infinity);
            prevStart = 0;
          }
          child._end > max && child._ts && (max = child._end);
          child = prev;
        }
        _setDuration(self2, self2 === _globalTimeline && self2._time > max ? self2._time : max, 1, 1);
        self2._dirty = 0;
      }
      return self2._tDur;
    };
    Timeline2.updateRoot = function updateRoot(time) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
        _lastRenderedFrame = _ticker.frame;
      }
      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) {
          if (_config.autoSleep && _ticker._listeners.length < 2) {
            while (child && !child._ts) {
              child = child._next;
            }
            child || _ticker.sleep();
          }
        }
      }
    };
    return Timeline2;
  }(Animation);
  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });
  var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop);
      start = a[0];
      end = a[1];
    }
    startNums = start.match(_complexStringNumExp) || [];
    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }
      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0;
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : "";
    pt.fp = funcParam;
    if (_relExp.test(end) || hasRandom) {
      pt.e = 0;
    }
    this._pt = pt;
    return pt;
  };
  var _addPropTween = function _addPropTween2(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt;
    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }
      if (end.charAt(1) === "=") {
        pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
        if (pt || pt === 0) {
          end = pt;
        }
      }
    }
    if (!optional || parsedStart !== end || _forceAllPropTweens) {
      if (!isNaN(parsedStart * end) && end !== "") {
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }
      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  };
  var _processVars = function _processVars2(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }
    var copy = {}, p;
    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }
    return copy;
  };
  var _checkPlugin = function _checkPlugin2(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;
    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
        i = plugin._props.length;
        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }
    return plugin;
  };
  var _overwritingTween;
  var _forceAllPropTweens;
  var _initTween = function _initTween2(tween, time, tTime) {
    var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites, tl = tween.timeline, cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
    if (yoyoEase && tween._yoyo && !tween._repeat) {
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }
    tween._from = !tl && !!vars.runBackwards;
    if (!tl || keyframes && !vars.stagger) {
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop];
      cleanVars = _copyExcluding(vars, _reservedProps);
      if (prevStartAt) {
        prevStartAt._zTime < 0 && prevStartAt.progress(1);
        time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
        prevStartAt._lazy = 0;
      }
      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent,
          immediateRender: true,
          lazy: !prevStartAt && _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate && function() {
            return _callback(tween, "onUpdate");
          },
          stagger: 0
        }, startAt)));
        tween._startAt._dp = 0;
        tween._startAt._sat = tween;
        time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
        if (immediateRender) {
          if (dur && time <= 0 && tTime <= 0) {
            time && (tween._zTime = time);
            return;
          }
        }
      } else if (runBackwards && dur) {
        if (!prevStartAt) {
          time && (immediateRender = false);
          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
            lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
            immediateRender,
            //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
            stagger: 0,
            parent
            //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars);
          _removeFromParent(tween._startAt = Tween.set(targets, p));
          tween._startAt._dp = 0;
          tween._startAt._sat = tween;
          time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
          tween._zTime = time;
          if (!immediateRender) {
            _initTween2(tween._startAt, _tinyNum, _tinyNum);
          } else if (!time) {
            return;
          }
        }
      }
      tween._pt = tween._ptCache = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;
      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
        index = fullTargets === targets ? i : fullTargets.indexOf(target);
        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
          plugin._props.forEach(function(name) {
            ptLookup[name] = pt;
          });
          plugin.priority && (hasPriority = 1);
        }
        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }
        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;
          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
          overwritten = !tween.parent;
          _overwritingTween = 0;
        }
        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }
      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween);
    }
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten;
    keyframes && time <= 0 && tl.render(_bigNum, true, true);
  };
  var _updatePropTweens = function _updatePropTweens2(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
    var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property], pt, rootPT, lookup, i;
    if (!ptCache) {
      ptCache = tween._ptCache[property] = [];
      lookup = tween._ptLookup;
      i = tween._targets.length;
      while (i--) {
        pt = lookup[i][property];
        if (pt && pt.d && pt.d._pt) {
          pt = pt.d._pt;
          while (pt && pt.p !== property && pt.fp !== property) {
            pt = pt._next;
          }
        }
        if (!pt) {
          _forceAllPropTweens = 1;
          tween.vars[property] = "+=0";
          _initTween(tween, time);
          _forceAllPropTweens = 0;
          return skipRecursion ? _warn(property + " not eligible for reset") : 1;
        }
        ptCache.push(pt);
      }
    }
    i = ptCache.length;
    while (i--) {
      rootPT = ptCache[i];
      pt = rootPT._pt || rootPT;
      pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
      pt.c = value - pt.s;
      rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
      rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
    }
  };
  var _addAliasesToVars = function _addAliasesToVars2(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p, i, aliases;
    if (!propertyAliases) {
      return vars;
    }
    copy = _merge({}, vars);
    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;
        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }
    return copy;
  };
  var _parseKeyframe = function _parseKeyframe2(prop, obj, allProps, easeEach) {
    var ease = obj.ease || easeEach || "power1.inOut", p, a;
    if (_isArray(obj)) {
      a = allProps[prop] || (allProps[prop] = []);
      obj.forEach(function(value, i) {
        return a.push({
          t: i / (obj.length - 1) * 100,
          v: value,
          e: ease
        });
      });
    } else {
      for (p in obj) {
        a = allProps[p] || (allProps[p] = []);
        p === "ease" || a.push({
          t: parseFloat(prop),
          v: obj[p],
          e: ease
        });
      }
    }
  };
  var _parseFuncOrString = function _parseFuncOrString2(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  };
  var _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert";
  var _staggerPropsToSkip = {};
  _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
    return _staggerPropsToSkip[name] = 1;
  });
  var Tween = /* @__PURE__ */ function(_Animation2) {
    _inheritsLoose(Tween2, _Animation2);
    function Tween2(targets, vars, position, skipInherit) {
      var _this3;
      if (typeof vars === "number") {
        position.duration = vars;
        vars = position;
        position = null;
      }
      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
      var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults2 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray2(targets), tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = [];
      _this3._overwrite = overwrite;
      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults2 || {},
          targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
        });
        tl.kill();
        tl.parent = tl._dp = _assertThisInitialized(_this3);
        tl._start = 0;
        if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
          l = parsedTargets.length;
          staggerFunc = stagger && distribute(stagger);
          if (_isObject(stagger)) {
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }
          for (i = 0; i < l; i++) {
            copy = _copyExcluding(vars, _staggerPropsToSkip);
            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i];
            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
            if (!stagger && l === 1 && copy.delay) {
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }
            tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
            tl._ease = _easeMap.none;
          }
          tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
        } else if (keyframes) {
          _inheritDefaults(_setDefaults(tl.vars.defaults, {
            ease: "none"
          }));
          tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
          var time = 0, a, kf, v;
          if (_isArray(keyframes)) {
            keyframes.forEach(function(frame) {
              return tl.to(parsedTargets, frame, ">");
            });
            tl.duration();
          } else {
            copy = {};
            for (p in keyframes) {
              p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
            }
            for (p in copy) {
              a = copy[p].sort(function(a2, b) {
                return a2.t - b.t;
              });
              time = 0;
              for (i = 0; i < a.length; i++) {
                kf = a[i];
                v = {
                  ease: kf.e,
                  duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                };
                v[p] = kf.v;
                tl.to(parsedTargets, v, time);
                time += v.duration;
              }
            }
            tl.duration() < duration && tl.to({}, {
              duration: duration - tl.duration()
            });
          }
        }
        duration || _this3.duration(duration = tl.duration());
      } else {
        _this3.timeline = 0;
      }
      if (overwrite === true && !_suppressOverwrites) {
        _overwritingTween = _assertThisInitialized(_this3);
        _globalTimeline.killTweensOf(parsedTargets);
        _overwritingTween = 0;
      }
      _addToTimeline(parent, _assertThisInitialized(_this3), position);
      vars.reversed && _this3.reverse();
      vars.paused && _this3.paused(true);
      if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum;
        _this3.render(Math.max(0, -delay) || 0);
      }
      scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
      return _this3;
    }
    var _proto3 = Tween2.prototype;
    _proto3.render = function render3(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
        time = tTime;
        timeline2 = this.timeline;
        if (this._repeat) {
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && isNegative) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);
            if (iteration && iteration === _roundPrecise(tTime / cycleDuration)) {
              time = dur;
              iteration--;
            }
            time > dur && (time = dur);
          }
          isYoyo = this._yoyo && iteration & 1;
          if (isYoyo) {
            yoyoEase = this._yEase;
            time = dur - time;
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          if (time === prevTime && !force && this._initted && iteration === prevIteration) {
            this._tTime = tTime;
            return this;
          }
          if (iteration !== prevIteration) {
            timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
            if (this.vars.repeatRefresh && !isYoyo && !this._lock && this._time !== cycleDuration && this._initted) {
              this._lock = force = 1;
              this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }
        if (!this._initted) {
          if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
            this._tTime = 0;
            return this;
          }
          if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
            return this;
          }
          if (dur !== this._dur) {
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._tTime = tTime;
        this._time = time;
        if (!this._act && this._ts) {
          this._act = 1;
          this._lazy = 0;
        }
        this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }
        if (time && !prevTime && !suppressEvents && !iteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        pt = this._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        timeline2 && timeline2.render(totalTime < 0 ? totalTime : timeline2._dur * timeline2._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
        if (this._onUpdate && !suppressEvents) {
          isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
          _callback(this, "onUpdate");
        }
        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
          if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }
      return this;
    };
    _proto3.targets = function targets() {
      return this._targets;
    };
    _proto3.invalidate = function invalidate(soft) {
      (!soft || !this.vars.runBackwards) && (this._startAt = 0);
      this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate(soft);
      return _Animation2.prototype.invalidate.call(this, soft);
    };
    _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
      _tickerActive || _ticker.wake();
      this._ts || this.play();
      var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts), ratio;
      this._initted || _initTween(this, time);
      ratio = this._ease(time / this._dur);
      if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) {
        return this.resetTo(property, value, start, startIsRelative, 1);
      }
      _alignPlayhead(this, 0);
      this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
      return this.render(0);
    };
    _proto3.kill = function kill(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }
      if (!targets && (!vars || vars === "all")) {
        this._lazy = this._pt = 0;
        return this.parent ? _interrupt(this) : this;
      }
      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
        return this;
      }
      var parsedTargets = this._targets, killingTargets = targets ? toArray2(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i;
      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }
      overwrittenProps = this._op = this._op || [];
      if (vars !== "all") {
        if (_isString(vars)) {
          p = {};
          _forEachName(vars, function(name) {
            return p[name] = 1;
          });
          vars = p;
        }
        vars = _addAliasesToVars(parsedTargets, vars);
      }
      i = parsedTargets.length;
      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];
          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }
          for (p in props) {
            pt = curLookup && curLookup[p];
            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }
              delete curLookup[p];
            }
            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }
      this._initted && !this._pt && firstPT && _interrupt(this);
      return this;
    };
    Tween2.to = function to(targets, vars) {
      return new Tween2(targets, vars, arguments[2]);
    };
    Tween2.from = function from(targets, vars) {
      return _createTweenType(1, arguments);
    };
    Tween2.delayedCall = function delayedCall(delay, callback, params, scope) {
      return new Tween2(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params,
        onReverseCompleteParams: params,
        callbackScope: scope
      });
    };
    Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
      return _createTweenType(2, arguments);
    };
    Tween2.set = function set(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween2(targets, vars);
    };
    Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };
    return Tween2;
  }(Animation);
  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  });
  _forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
    Tween[name] = function() {
      var tl = new Timeline(), params = _slice.call(arguments, 0);
      params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl[name].apply(tl, params);
    };
  });
  var _setterPlain = function _setterPlain2(target, property, value) {
    return target[property] = value;
  };
  var _setterFunc = function _setterFunc2(target, property, value) {
    return target[property](value);
  };
  var _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
    return target[property](data.fp, value);
  };
  var _setterAttribute = function _setterAttribute2(target, property, value) {
    return target.setAttribute(property, value);
  };
  var _getSetter = function _getSetter2(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  };
  var _renderPlain = function _renderPlain2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
  };
  var _renderBoolean = function _renderBoolean2(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  };
  var _renderComplexString = function _renderComplexString2(ratio, data) {
    var pt = data._pt, s = "";
    if (!ratio && data.b) {
      s = data.b;
    } else if (ratio === 1 && data.e) {
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s;
        pt = pt._next;
      }
      s += data.c;
    }
    data.set(data.t, data.p, s, data);
  };
  var _renderPropTweens = function _renderPropTweens2(ratio, data) {
    var pt = data._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  };
  var _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
    var pt = this._pt, next;
    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  };
  var _killPropTweensOf = function _killPropTweensOf2(property) {
    var pt = this._pt, hasNonDependentRemaining, next;
    while (pt) {
      next = pt._next;
      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }
      pt = next;
    }
    return !hasNonDependentRemaining;
  };
  var _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  };
  var _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
    var pt = parent._pt, next, pt2, first, last;
    while (pt) {
      next = pt._next;
      pt2 = first;
      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }
      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }
      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }
      pt = next;
    }
    parent._pt = first;
  };
  var PropTween = /* @__PURE__ */ function() {
    function PropTween2(next, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next;
      if (next) {
        next._prev = this;
      }
    }
    var _proto4 = PropTween2.prototype;
    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set;
      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target;
      this.tween = tween;
    };
    return PropTween2;
  }();
  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
    return _reservedProps[name] = 1;
  });
  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  var _media = [];
  var _listeners = {};
  var _emptyArray = [];
  var _lastMediaTime = 0;
  var _contextID = 0;
  var _dispatch = function _dispatch2(type) {
    return (_listeners[type] || _emptyArray).map(function(f) {
      return f();
    });
  };
  var _onMediaChange = function _onMediaChange2() {
    var time = Date.now(), matches = [];
    if (time - _lastMediaTime > 2) {
      _dispatch("matchMediaInit");
      _media.forEach(function(c) {
        var queries = c.queries, conditions = c.conditions, match, p, anyMatch, toggled;
        for (p in queries) {
          match = _win.matchMedia(queries[p]).matches;
          match && (anyMatch = 1);
          if (match !== conditions[p]) {
            conditions[p] = match;
            toggled = 1;
          }
        }
        if (toggled) {
          c.revert();
          anyMatch && matches.push(c);
        }
      });
      _dispatch("matchMediaRevert");
      matches.forEach(function(c) {
        return c.onMatch(c, function(func) {
          return c.add(null, func);
        });
      });
      _lastMediaTime = time;
      _dispatch("matchMedia");
    }
  };
  var Context = /* @__PURE__ */ function() {
    function Context2(func, scope) {
      this.selector = scope && selector(scope);
      this.data = [];
      this._r = [];
      this.isReverted = false;
      this.id = _contextID++;
      func && this.add(func);
    }
    var _proto5 = Context2.prototype;
    _proto5.add = function add(name, func, scope) {
      if (_isFunction(name)) {
        scope = func;
        func = name;
        name = _isFunction;
      }
      var self2 = this, f = function f2() {
        var prev = _context, prevSelector = self2.selector, result;
        prev && prev !== self2 && prev.data.push(self2);
        scope && (self2.selector = selector(scope));
        _context = self2;
        result = func.apply(self2, arguments);
        _isFunction(result) && self2._r.push(result);
        _context = prev;
        self2.selector = prevSelector;
        self2.isReverted = false;
        return result;
      };
      self2.last = f;
      return name === _isFunction ? f(self2, function(func2) {
        return self2.add(null, func2);
      }) : name ? self2[name] = f : f;
    };
    _proto5.ignore = function ignore(func) {
      var prev = _context;
      _context = null;
      func(this);
      _context = prev;
    };
    _proto5.getTweens = function getTweens() {
      var a = [];
      this.data.forEach(function(e) {
        return e instanceof Context2 ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
      });
      return a;
    };
    _proto5.clear = function clear() {
      this._r.length = this.data.length = 0;
    };
    _proto5.kill = function kill(revert, matchMedia2) {
      var _this4 = this;
      if (revert) {
        (function() {
          var tweens = _this4.getTweens(), i2 = _this4.data.length, t;
          while (i2--) {
            t = _this4.data[i2];
            if (t.data === "isFlip") {
              t.revert();
              t.getChildren(true, true, false).forEach(function(tween) {
                return tweens.splice(tweens.indexOf(tween), 1);
              });
            }
          }
          tweens.map(function(t2) {
            return {
              g: t2._dur || t2._delay || t2._sat && !t2._sat.vars.immediateRender ? t2.globalTime(0) : -Infinity,
              t: t2
            };
          }).sort(function(a, b) {
            return b.g - a.g || -Infinity;
          }).forEach(function(o) {
            return o.t.revert(revert);
          });
          i2 = _this4.data.length;
          while (i2--) {
            t = _this4.data[i2];
            if (t instanceof Timeline) {
              if (t.data !== "nested") {
                t.scrollTrigger && t.scrollTrigger.revert();
                t.kill();
              }
            } else {
              !(t instanceof Tween) && t.revert && t.revert(revert);
            }
          }
          _this4._r.forEach(function(f) {
            return f(revert, _this4);
          });
          _this4.isReverted = true;
        })();
      } else {
        this.data.forEach(function(e) {
          return e.kill && e.kill();
        });
      }
      this.clear();
      if (matchMedia2) {
        var i = _media.length;
        while (i--) {
          _media[i].id === this.id && _media.splice(i, 1);
        }
      }
    };
    _proto5.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    return Context2;
  }();
  var MatchMedia = /* @__PURE__ */ function() {
    function MatchMedia2(scope) {
      this.contexts = [];
      this.scope = scope;
      _context && _context.data.push(this);
    }
    var _proto6 = MatchMedia2.prototype;
    _proto6.add = function add(conditions, func, scope) {
      _isObject(conditions) || (conditions = {
        matches: conditions
      });
      var context3 = new Context(0, scope || this.scope), cond = context3.conditions = {}, mq, p, active;
      _context && !context3.selector && (context3.selector = _context.selector);
      this.contexts.push(context3);
      func = context3.add("onMatch", func);
      context3.queries = conditions;
      for (p in conditions) {
        if (p === "all") {
          active = 1;
        } else {
          mq = _win.matchMedia(conditions[p]);
          if (mq) {
            _media.indexOf(context3) < 0 && _media.push(context3);
            (cond[p] = mq.matches) && (active = 1);
            mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
          }
        }
      }
      active && func(context3, function(f) {
        return context3.add(null, f);
      });
      return this;
    };
    _proto6.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    _proto6.kill = function kill(revert) {
      this.contexts.forEach(function(c) {
        return c.kill(revert, true);
      });
    };
    return MatchMedia2;
  }();
  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      args.forEach(function(config3) {
        return _createPlugin(config3);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray2(target)[0]);
      var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
      unit === "native" && (unit = "");
      return !target ? target : !property ? function(property2, unit2, uncache2) {
        return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray2(target);
      if (target.length > 1) {
        var setters = target.map(function(t) {
          return gsap.quickSetter(t, property, unit);
        }), l = setters.length;
        return function(value) {
          var i = l;
          while (i--) {
            setters[i](value);
          }
        };
      }
      target = target[0] || {};
      var Plugin = _plugins[property], cache2 = _getCache(target), p = cache2.harness && (cache2.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
        var p2 = new Plugin();
        _quickTween._pt = 0;
        p2.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p2.render(1, p2);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache2.set(target, p);
      return Plugin ? setter : function(value) {
        return setter(target, p, unit ? value + unit : value, cache2, 1);
      };
    },
    quickTo: function quickTo(target, property, vars) {
      var _merge22;
      var tween = gsap.to(target, _merge((_merge22 = {}, _merge22[property] = "+=0.1", _merge22.paused = true, _merge22), vars || {})), func = function func2(value, start, startIsRelative) {
        return tween.resetTo(property, value, start, startIsRelative);
      };
      func.tween = tween;
      return func;
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config2(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref3) {
      var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults2 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
      (plugins || "").split(",").forEach(function(pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });
      _effects[name] = function(targets, vars, tl) {
        return effect(toArray2(targets), _setDefaults(vars || {}, defaults2), tl);
      };
      if (extendTimeline) {
        Timeline.prototype[name] = function(targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id2) {
      return _globalTimeline.getById(id2);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }
      var tl = new Timeline(vars), child, next;
      tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
      _globalTimeline.remove(tl);
      tl._dp = 0;
      tl._time = tl._tTime = _globalTimeline._time;
      child = _globalTimeline._first;
      while (child) {
        next = child._next;
        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl, child, child._start - child._delay);
        }
        child = next;
      }
      _addToTimeline(_globalTimeline, tl, 0);
      return tl;
    },
    context: function context(func, scope) {
      return func ? new Context(func, scope) : _context;
    },
    matchMedia: function matchMedia(scope) {
      return new MatchMedia(scope);
    },
    matchMediaRefresh: function matchMediaRefresh() {
      return _media.forEach(function(c) {
        var cond = c.conditions, found, p;
        for (p in cond) {
          if (cond[p]) {
            cond[p] = false;
            found = 1;
          }
        }
        found && c.revert();
      }) || _onMediaChange();
    },
    addEventListener: function addEventListener(type, callback) {
      var a = _listeners[type] || (_listeners[type] = []);
      ~a.indexOf(callback) || a.push(callback);
    },
    removeEventListener: function removeEventListener(type, callback) {
      var a = _listeners[type], i = a && a.indexOf(callback);
      i >= 0 && a.splice(i, 1);
    },
    utils: {
      wrap,
      wrapYoyo,
      distribute,
      random,
      snap,
      normalize,
      getUnit,
      clamp,
      splitColor,
      toArray: toArray2,
      selector,
      mapRange,
      pipe,
      unitize,
      interpolate,
      shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween,
      globals: _addGlobal,
      Tween,
      Timeline,
      Animation,
      getCache: _getCache,
      _removeLinkedListItem,
      reverting: function reverting() {
        return _reverting;
      },
      context: function context2(toAdd) {
        if (toAdd && _context) {
          _context.data.push(toAdd);
          toAdd._ctx = _context;
        }
        return _context;
      },
      suppressOverwrites: function suppressOverwrites(value) {
        return _suppressOverwrites = value;
      }
    }
  };
  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
    return _gsap[name] = Tween[name];
  });
  _ticker.add(Timeline.updateRoot);
  _quickTween = _gsap.to({}, {
    duration: 0
  });
  var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
    var pt = plugin._pt;
    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }
    return pt;
  };
  var _addModifiers = function _addModifiers2(tween, modifiers) {
    var targets = tween._targets, p, i, pt;
    for (p in modifiers) {
      i = targets.length;
      while (i--) {
        pt = tween._ptLookup[i][p];
        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            pt = _getPluginPropTween(pt, p);
          }
          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  };
  var _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
    return {
      name,
      rawVars: 1,
      //don't pre-process function-based values or "random()" strings.
      init: function init4(target, vars, tween) {
        tween._onInit = function(tween2) {
          var temp, p;
          if (_isString(vars)) {
            temp = {};
            _forEachName(vars, function(name2) {
              return temp[name2] = 1;
            });
            vars = temp;
          }
          if (modifier) {
            temp = {};
            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }
            vars = temp;
          }
          _addModifiers(tween2, vars);
        };
      }
    };
  };
  var gsap = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt, v;
      this.tween = tween;
      for (p in vars) {
        v = target.getAttribute(p) || "";
        pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
        pt.op = p;
        pt.b = v;
        this._props.push(p);
      }
    },
    render: function render(ratio, data) {
      var pt = data._pt;
      while (pt) {
        _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
        pt = pt._next;
      }
    }
  }, {
    name: "endArray",
    init: function init2(target, value) {
      var i = value.length;
      while (i--) {
        this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
  Tween.version = Timeline.version = gsap.version = "3.12.5";
  _coreReady = 1;
  _windowExists() && _wake();
  var Power0 = _easeMap.Power0;
  var Power1 = _easeMap.Power1;
  var Power2 = _easeMap.Power2;
  var Power3 = _easeMap.Power3;
  var Power4 = _easeMap.Power4;
  var Linear = _easeMap.Linear;
  var Quad = _easeMap.Quad;
  var Cubic = _easeMap.Cubic;
  var Quart = _easeMap.Quart;
  var Quint = _easeMap.Quint;
  var Strong = _easeMap.Strong;
  var Elastic = _easeMap.Elastic;
  var Back = _easeMap.Back;
  var SteppedEase = _easeMap.SteppedEase;
  var Bounce = _easeMap.Bounce;
  var Sine = _easeMap.Sine;
  var Expo = _easeMap.Expo;
  var Circ = _easeMap.Circ;

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/CSSPlugin.js
  var _win2;
  var _doc2;
  var _docElement;
  var _pluginInitted;
  var _tempDiv;
  var _tempDivStyler;
  var _recentSetterPlugin;
  var _reverting2;
  var _windowExists3 = function _windowExists4() {
    return typeof window !== "undefined";
  };
  var _transformProps = {};
  var _RAD2DEG = 180 / Math.PI;
  var _DEG2RAD = Math.PI / 180;
  var _atan2 = Math.atan2;
  var _bigNum2 = 1e8;
  var _capsExp = /([A-Z])/g;
  var _horizontalExp = /(left|right|width|margin|padding|x)/i;
  var _complexExp = /[\s,\(]\S/;
  var _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  };
  var _renderCSSProp = function _renderCSSProp2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
  };
  var _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
  };
  var _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  };
  var _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  };
  var _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
    return target.style[property] = value;
  };
  var _setterCSSProp = function _setterCSSProp2(target, property, value) {
    return target.style.setProperty(property, value);
  };
  var _setterTransform = function _setterTransform2(target, property, value) {
    return target._gsap[property] = value;
  };
  var _setterScale = function _setterScale2(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  };
  var _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
    var cache2 = target._gsap;
    cache2.scaleX = cache2.scaleY = value;
    cache2.renderTransform(ratio, cache2);
  };
  var _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
    var cache2 = target._gsap;
    cache2[property] = value;
    cache2.renderTransform(ratio, cache2);
  };
  var _transformProp = "transform";
  var _transformOriginProp = _transformProp + "Origin";
  var _saveStyle = function _saveStyle2(property, isNotCSS) {
    var _this = this;
    var target = this.target, style = target.style, cache2 = target._gsap;
    if (property in _transformProps && style) {
      this.tfm = this.tfm || {};
      if (property !== "transform") {
        property = _propertyAliases[property] || property;
        ~property.indexOf(",") ? property.split(",").forEach(function(a) {
          return _this.tfm[a] = _get(target, a);
        }) : this.tfm[property] = cache2.x ? cache2[property] : _get(target, property);
        property === _transformOriginProp && (this.tfm.zOrigin = cache2.zOrigin);
      } else {
        return _propertyAliases.transform.split(",").forEach(function(p) {
          return _saveStyle2.call(_this, p, isNotCSS);
        });
      }
      if (this.props.indexOf(_transformProp) >= 0) {
        return;
      }
      if (cache2.svg) {
        this.svgo = target.getAttribute("data-svg-origin");
        this.props.push(_transformOriginProp, isNotCSS, "");
      }
      property = _transformProp;
    }
    (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
  };
  var _removeIndependentTransforms = function _removeIndependentTransforms2(style) {
    if (style.translate) {
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  };
  var _revertStyle = function _revertStyle2() {
    var props = this.props, target = this.target, style = target.style, cache2 = target._gsap, i, p;
    for (i = 0; i < props.length; i += 3) {
      props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
    }
    if (this.tfm) {
      for (p in this.tfm) {
        cache2[p] = this.tfm[p];
      }
      if (cache2.svg) {
        cache2.renderTransform();
        target.setAttribute("data-svg-origin", this.svgo || "");
      }
      i = _reverting2();
      if ((!i || !i.isStart) && !style[_transformProp]) {
        _removeIndependentTransforms(style);
        if (cache2.zOrigin && style[_transformOriginProp]) {
          style[_transformOriginProp] += " " + cache2.zOrigin + "px";
          cache2.zOrigin = 0;
          cache2.renderTransform();
        }
        cache2.uncache = 1;
      }
    }
  };
  var _getStyleSaver = function _getStyleSaver2(target, properties) {
    var saver = {
      target,
      props: [],
      revert: _revertStyle,
      save: _saveStyle
    };
    target._gsap || gsap.core.getCache(target);
    properties && properties.split(",").forEach(function(p) {
      return saver.save(p);
    });
    return saver;
  };
  var _supports3D;
  var _createElement = function _createElement2(type, ns) {
    var e = _doc2.createElementNS ? _doc2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc2.createElement(type);
    return e && e.style ? e : _doc2.createElement(type);
  };
  var _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
  };
  var _prefixes = "O,Moz,ms,Ms,Webkit".split(",");
  var _checkPropPrefix = function _checkPropPrefix2(property, element2, preferPrefix) {
    var e = element2 || _tempDiv, s = e.style, i = 5;
    if (property in s && !preferPrefix) {
      return property;
    }
    property = property.charAt(0).toUpperCase() + property.substr(1);
    while (i-- && !(_prefixes[i] + property in s)) {
    }
    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  };
  var _initCore = function _initCore2() {
    if (_windowExists3() && window.document) {
      _win2 = window;
      _doc2 = _win2.document;
      _docElement = _doc2.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
      _supports3D = !!_checkPropPrefix("perspective");
      _reverting2 = gsap.core.reverting;
      _pluginInitted = 1;
    }
  };
  var _getBBoxHack = function _getBBoxHack2(swapIfPossible) {
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), oldParent = this.parentNode, oldSibling = this.nextSibling, oldCSS = this.style.cssText, bbox;
    _docElement.appendChild(svg);
    svg.appendChild(this);
    this.style.display = "block";
    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._gsapBBox = this.getBBox;
        this.getBBox = _getBBoxHack2;
      } catch (e) {
      }
    } else if (this._gsapBBox) {
      bbox = this._gsapBBox();
    }
    if (oldParent) {
      if (oldSibling) {
        oldParent.insertBefore(this, oldSibling);
      } else {
        oldParent.appendChild(this);
      }
    }
    _docElement.removeChild(svg);
    this.style.cssText = oldCSS;
    return bbox;
  };
  var _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
    var i = attributesArray.length;
    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  };
  var _getBBox = function _getBBox2(target) {
    var bounds;
    try {
      bounds = target.getBBox();
    } catch (error) {
      bounds = _getBBoxHack.call(target, true);
    }
    bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true));
    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  };
  var _isSVG = function _isSVG2(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  };
  var _removeProperty = function _removeProperty2(target, property) {
    if (property) {
      var style = target.style, first2Chars;
      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }
      if (style.removeProperty) {
        first2Chars = property.substr(0, 2);
        if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
          property = "-" + property;
        }
        style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        style.removeAttribute(property);
      }
    }
  };
  var _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;
    plugin._props.push(property);
    return pt;
  };
  var _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  };
  var _nonStandardLayouts = {
    grid: 1,
    flex: 1
  };
  var _convertToUnit = function _convertToUnit2(target, property, value, unit) {
    var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache2, isSVG;
    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }
    curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);
    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
      return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
    }
    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }
    if (!parent || parent === _doc2 || !parent.appendChild) {
      parent = _doc2.body;
    }
    cache2 = parent._gsap;
    if (cache2 && toPercent && cache2.width && horizontal && cache2.time === _ticker.time && !cache2.uncache) {
      return _round(curValue / cache2.width * amount);
    } else {
      if (toPercent && (property === "height" || property === "width")) {
        var v = target.style[property];
        target.style[property] = amount + unit;
        px = target[measureProperty];
        v ? target.style[property] = v : _removeProperty(target, property);
      } else {
        (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
        parent === target && (style.position = "static");
        parent.appendChild(_tempDiv);
        px = _tempDiv[measureProperty];
        parent.removeChild(_tempDiv);
        style.position = "absolute";
      }
      if (horizontal && toPercent) {
        cache2 = _getCache(parent);
        cache2.time = _ticker.time;
        cache2.width = parent[measureProperty];
      }
    }
    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  };
  var _get = function _get2(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();
    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];
      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }
    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];
      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
      }
    }
    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  };
  var _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
    if (!start || start === "none") {
      var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor");
      }
    }
    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (end === "auto") {
      startValue = target.style[prop];
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
    }
    a = [start, end];
    _colorStringFilter(a);
    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];
    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);
        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }
        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;
          if (!endUnit) {
            endUnit = endUnit || _config.units[prop] || startUnit;
            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }
          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          }
          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
            s: startNum,
            c: endNum - startNum,
            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
          };
        }
      }
      pt.c = index < end.length ? end.substring(index, end.length) : "";
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }
    _relExp.test(end) && (pt.e = 0);
    this._pt = pt;
    return pt;
  };
  var _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  };
  var _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
    var split = value.split(" "), x = split[0], y = split[1] || "50%";
    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      value = x;
      x = y;
      y = value;
    }
    split[0] = _keywordToPercent[x] || x;
    split[1] = _keywordToPercent[y] || y;
    return split.join(" ");
  };
  var _renderClearProps = function _renderClearProps2(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t, style = target.style, props = data.u, cache2 = target._gsap, prop, clearTransforms, i;
      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;
        while (--i > -1) {
          prop = props[i];
          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }
          _removeProperty(target, prop);
        }
      }
      if (clearTransforms) {
        _removeProperty(target, _transformProp);
        if (cache2) {
          cache2.svg && target.removeAttribute("transform");
          _parseTransform(target, 1);
          cache2.uncache = 1;
          _removeIndependentTransforms(style);
        }
      }
    }
  };
  var _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;
        plugin._props.push(property);
        return 1;
      }
    }
    /* className feature (about 0.4kb gzipped).
    , className(plugin, target, property, endValue, tween) {
    	let _renderClassName = (ratio, data) => {
    			data.css.render(ratio, data.css);
    			if (!ratio || ratio === 1) {
    				let inline = data.rmv,
    					target = data.t,
    					p;
    				target.setAttribute("class", ratio ? data.e : data.b);
    				for (p in inline) {
    					_removeProperty(target, p);
    				}
    			}
    		},
    		_getAllStyles = (target) => {
    			let styles = {},
    				computed = getComputedStyle(target),
    				p;
    			for (p in computed) {
    				if (isNaN(p) && p !== "cssText" && p !== "length") {
    					styles[p] = computed[p];
    				}
    			}
    			_setDefaults(styles, _parseTransform(target, 1));
    			return styles;
    		},
    		startClassList = target.getAttribute("class"),
    		style = target.style,
    		cssText = style.cssText,
    		cache = target._gsap,
    		classPT = cache.classPT,
    		inlineToRemoveAtEnd = {},
    		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
    		changingVars = {},
    		startVars = _getAllStyles(target),
    		transformRelated = /(transform|perspective)/i,
    		endVars, p;
    	if (classPT) {
    		classPT.r(1, classPT.d);
    		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
    	}
    	target.setAttribute("class", data.e);
    	endVars = _getAllStyles(target, true);
    	target.setAttribute("class", startClassList);
    	for (p in endVars) {
    		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
    			changingVars[p] = endVars[p];
    			if (!style[p] && style[p] !== "0") {
    				inlineToRemoveAtEnd[p] = 1;
    			}
    		}
    	}
    	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
    	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
    		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
    	}
    	_parseTransform(target, true); //to clear the caching of transforms
    	data.css = new gsap.plugins.css();
    	data.css.init(target, changingVars, tween);
    	plugin._props.push(...data.css._props);
    	return 1;
    }
    */
  };
  var _identity2DMatrix = [1, 0, 0, 1, 0, 0];
  var _rotationalProperties = {};
  var _isNullTransform = function _isNullTransform2(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  };
  var _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
    var matrixString = _getComputedProperty(target, _transformProp);
    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  };
  var _getMatrix = function _getMatrix2(target, force2D) {
    var cache2 = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
    if (cache2.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix;
      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache2.svg) {
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;
      if (!parent || !target.offsetParent) {
        addedToDOM = 1;
        nextSibling = target.nextElementSibling;
        _docElement.appendChild(target);
      }
      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");
      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }
    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  };
  var _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache2 = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache2.xOrigin || 0, yOriginOld = cache2.yOrigin || 0, xOffsetOld = cache2.xOffset || 0, yOffsetOld = cache2.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }
    if (smooth || smooth !== false && cache2.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache2.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache2.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache2.xOffset = cache2.yOffset = 0;
    }
    cache2.xOrigin = xOrigin;
    cache2.yOrigin = yOrigin;
    cache2.smooth = !!smooth;
    cache2.origin = origin;
    cache2.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px";
    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "xOrigin", xOriginOld, xOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "yOrigin", yOriginOld, yOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "xOffset", xOffsetOld, cache2.xOffset);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache2, "yOffset", yOffsetOld, cache2.yOffset);
    }
    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  };
  var _parseTransform = function _parseTransform2(target, uncache) {
    var cache2 = target._gsap || new GSCache(target);
    if ("x" in cache2 && !uncache && !cache2.uncache) {
      return cache2;
    }
    var style = target.style, invertedScaleX = cache2.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache2.svg = !!(target.getCTM && _isSVG(target));
    if (cs.translate) {
      if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
        style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
      }
      style.scale = style.rotate = style.translate = "none";
    }
    matrix = _getMatrix(target, cache2.svg);
    if (cache2.svg) {
      if (cache2.uncache) {
        t2 = target.getBBox();
        origin = cache2.xOrigin - t2.x + "px " + (cache2.yOrigin - t2.y) + "px";
        t1 = "";
      } else {
        t1 = !uncache && target.getAttribute("data-svg-origin");
      }
      _applySVGOrigin(target, t1 || origin, !!t1 || cache2.originIsAbsolute, cache2.smooth !== false, matrix);
    }
    xOrigin = cache2.xOrigin || 0;
    yOrigin = cache2.yOrigin || 0;
    if (matrix !== _identity2DMatrix) {
      a = matrix[0];
      b = matrix[1];
      c = matrix[2];
      d = matrix[3];
      x = a12 = matrix[4];
      y = a22 = matrix[5];
      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
        if (cache2.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        }
      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        }
        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b = t2;
          c = t3;
        }
        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b * sin;
          t2 = a12 * cos + a22 * sin;
          b = b * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }
        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }
        scaleX = _round(Math.sqrt(a * a + b * b + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }
      if (cache2.svg) {
        t1 = target.getAttribute("transform");
        cache2.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }
    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }
    uncache = uncache || cache2.uncache;
    cache2.x = x - ((cache2.xPercent = x && (!uncache && cache2.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache2.xPercent / 100 : 0) + px;
    cache2.y = y - ((cache2.yPercent = y && (!uncache && cache2.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache2.yPercent / 100 : 0) + px;
    cache2.z = z + px;
    cache2.scaleX = _round(scaleX);
    cache2.scaleY = _round(scaleY);
    cache2.rotation = _round(rotation) + deg;
    cache2.rotationX = _round(rotationX) + deg;
    cache2.rotationY = _round(rotationY) + deg;
    cache2.skewX = skewX + deg;
    cache2.skewY = skewY + deg;
    cache2.transformPerspective = perspective + px;
    if (cache2.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache2.zOrigin || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }
    cache2.xOffset = cache2.yOffset = 0;
    cache2.force3D = _config.force3D;
    cache2.renderTransform = cache2.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache2.uncache = 0;
    return cache2;
  };
  var _firstTwoOnly = function _firstTwoOnly2(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  };
  var _addPxTranslate = function _addPxTranslate2(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  };
  var _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache2) {
    cache2.z = "0px";
    cache2.rotationY = cache2.rotationX = "0deg";
    cache2.force3D = 0;
    _renderCSSTransforms(ratio, cache2);
  };
  var _zeroDeg = "0deg";
  var _zeroPx = "0px";
  var _endParenthesis = ") ";
  var _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache2) {
    var _ref = cache2 || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }
    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }
    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }
    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }
    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }
    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }
    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }
    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }
    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }
    target.style[_transformProp] = transforms || "translate(0, 0)";
  };
  var _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache2) {
    var _ref2 = cache2 || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp;
    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);
    if (skewY) {
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }
    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;
      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;
        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }
      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }
    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }
    if (xPercent || yPercent) {
      temp = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp.width);
      ty = _round(ty + yPercent / 100 * temp.height);
    }
    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[_transformProp] = temp);
  };
  var _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue) {
    var cap = 360, isString = _isString(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
    if (isString) {
      direction = endValue.split("_")[1];
      if (direction === "short") {
        change %= cap;
        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }
      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum2) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum2) % cap - ~~(change / cap) * cap;
      }
    }
    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";
    plugin._props.push(property);
    return pt;
  };
  var _assign = function _assign2(target, source) {
    for (var p in source) {
      target[p] = source[p];
    }
    return target;
  };
  var _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
    var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit;
    if (startCache.svg) {
      startValue = target.getAttribute("transform");
      target.setAttribute("transform", "");
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      _removeProperty(target, _transformProp);
      target.setAttribute("transform", startValue);
    } else {
      startValue = getComputedStyle(target)[_transformProp];
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      style[_transformProp] = startValue;
    }
    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];
      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;
        plugin._props.push(p);
      }
    }
    _assign(endCache, startCache);
  };
  _forEachName("padding,margin,Width,Radius", function(name, index) {
    var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function(side) {
      return index < 2 ? name + side : "border" + side + name;
    });
    _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
      var a, vars;
      if (arguments.length < 4) {
        a = props.map(function(prop) {
          return _get(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }
      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function(prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });
  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init3(target, vars, tween, index, targets) {
      var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache2, smooth, hasPriority, inlineProps;
      _pluginInitted || _initCore();
      this.styles = this.styles || _getStyleSaver(target);
      inlineProps = this.styles.props;
      this.tween = tween;
      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }
        endValue = vars[p];
        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          continue;
        }
        type = typeof endValue;
        specialProp = _specialProps[p];
        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = typeof endValue;
        }
        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }
        if (specialProp) {
          specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
        } else if (p.substr(0, 2) === "--") {
          startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
          endValue += "";
          _colorExp.lastIndex = 0;
          if (!_colorExp.test(startValue)) {
            startUnit = getUnit(startValue);
            endUnit = getUnit(endValue);
          }
          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
          this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
          props.push(p);
          inlineProps.push(p, 0, style[p]);
        } else if (type !== "undefined") {
          if (startAt && p in startAt) {
            startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
            _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
            getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
            (startValue + "").charAt(1) === "=" && (startValue = _get(target, p));
          } else {
            startValue = _get(target, p);
          }
          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
          relative && (endValue = endValue.substr(2));
          endNum = parseFloat(endValue);
          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
                startNum = 0;
              }
              inlineProps.push("visibility", 0, style.visibility);
              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }
            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }
          isTransformRelated = p in _transformProps;
          if (isTransformRelated) {
            this.styles.save(p);
            if (!transformPropTween) {
              cache2 = target._gsap;
              cache2.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
              smooth = vars.smoothOrigin !== false && cache2.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache2.renderTransform, cache2, 0, -1);
              transformPropTween.dep = 1;
            }
            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache2, "scaleY", cache2.scaleY, (relative ? _parseRelative(cache2.scaleY, relative + endNum) : endNum) - cache2.scaleY || 0, _renderCSSProp);
              this._pt.u = 0;
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
              endValue = _convertKeywordsToPercentages(endValue);
              if (cache2.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                endUnit !== cache2.zOrigin && _addNonTweeningPT(this, cache2, "zOrigin", cache2.zOrigin, endUnit);
                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }
              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);
              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache2, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache2, "smooth", cache2.smooth, endValue);
              continue;
            } else if (p === "force3D") {
              cache2[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);
              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }
          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0);
            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache2 : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;
            if (startUnit !== endUnit && endUnit !== "%") {
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
            } else if (p !== "parseTransform") {
              _missingPlugin(p, endValue);
              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
          }
          isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
          props.push(p);
        }
      }
      hasPriority && _sortPropTweensByPriority(this);
    },
    render: function render2(ratio, data) {
      if (data.tween._time || !_reverting2()) {
        var pt = data._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
      } else {
        data.styles.revert();
      }
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty,
      _getMatrix
    }
  };
  gsap.utils.checkPrefix = _checkPropPrefix;
  gsap.core.getStyleSaver = _getStyleSaver;
  (function(positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
      _transformProps[name] = 1;
    });
    _forEachName(rotation, function(name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });
    _propertyAliases[all[13]] = positionAndScale + "," + rotation;
    _forEachName(aliases, function(name) {
      var split = name.split(":");
      _propertyAliases[split[1]] = all[split[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
    _config.units[name] = "px";
  });
  gsap.registerPlugin(CSSPlugin);

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/index.js
  var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
  var TweenMaxWithCSS = gsapWithCSS.core.Tween;

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/Observer.js
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var gsap2;
  var _coreInitted2;
  var _clamp3;
  var _win3;
  var _doc3;
  var _docEl;
  var _body;
  var _isTouch;
  var _pointerType;
  var ScrollTrigger;
  var _root;
  var _normalizer;
  var _eventTypes;
  var _context2;
  var _getGSAP = function _getGSAP2() {
    return gsap2 || typeof window !== "undefined" && (gsap2 = window.gsap) && gsap2.registerPlugin && gsap2;
  };
  var _startup = 1;
  var _observers = [];
  var _scrollers = [];
  var _proxies = [];
  var _getTime = Date.now;
  var _bridge = function _bridge2(name, value) {
    return value;
  };
  var _integrate = function _integrate2() {
    var core = ScrollTrigger.core, data = core.bridge || {}, scrollers = core._scrollers, proxies = core._proxies;
    scrollers.push.apply(scrollers, _scrollers);
    proxies.push.apply(proxies, _proxies);
    _scrollers = scrollers;
    _proxies = proxies;
    _bridge = function _bridge3(name, value) {
      return data[name](value);
    };
  };
  var _getProxyProp = function _getProxyProp2(element2, property) {
    return ~_proxies.indexOf(element2) && _proxies[_proxies.indexOf(element2) + 1][property];
  };
  var _isViewport = function _isViewport2(el) {
    return !!~_root.indexOf(el);
  };
  var _addListener = function _addListener2(element2, type, func, passive, capture) {
    return element2.addEventListener(type, func, {
      passive: passive !== false,
      capture: !!capture
    });
  };
  var _removeListener = function _removeListener2(element2, type, func, capture) {
    return element2.removeEventListener(type, func, !!capture);
  };
  var _scrollLeft = "scrollLeft";
  var _scrollTop = "scrollTop";
  var _onScroll = function _onScroll2() {
    return _normalizer && _normalizer.isPressed || _scrollers.cache++;
  };
  var _scrollCacheFunc = function _scrollCacheFunc2(f, doNotCache) {
    var cachingFunc = function cachingFunc2(value) {
      if (value || value === 0) {
        _startup && (_win3.history.scrollRestoration = "manual");
        var isNormalizing = _normalizer && _normalizer.isPressed;
        value = cachingFunc2.v = Math.round(value) || (_normalizer && _normalizer.iOS ? 1 : 0);
        f(value);
        cachingFunc2.cacheID = _scrollers.cache;
        isNormalizing && _bridge("ss", value);
      } else if (doNotCache || _scrollers.cache !== cachingFunc2.cacheID || _bridge("ref")) {
        cachingFunc2.cacheID = _scrollers.cache;
        cachingFunc2.v = f();
      }
      return cachingFunc2.v + cachingFunc2.offset;
    };
    cachingFunc.offset = 0;
    return f && cachingFunc;
  };
  var _horizontal = {
    s: _scrollLeft,
    p: "left",
    p2: "Left",
    os: "right",
    os2: "Right",
    d: "width",
    d2: "Width",
    a: "x",
    sc: _scrollCacheFunc(function(value) {
      return arguments.length ? _win3.scrollTo(value, _vertical.sc()) : _win3.pageXOffset || _doc3[_scrollLeft] || _docEl[_scrollLeft] || _body[_scrollLeft] || 0;
    })
  };
  var _vertical = {
    s: _scrollTop,
    p: "top",
    p2: "Top",
    os: "bottom",
    os2: "Bottom",
    d: "height",
    d2: "Height",
    a: "y",
    op: _horizontal,
    sc: _scrollCacheFunc(function(value) {
      return arguments.length ? _win3.scrollTo(_horizontal.sc(), value) : _win3.pageYOffset || _doc3[_scrollTop] || _docEl[_scrollTop] || _body[_scrollTop] || 0;
    })
  };
  var _getTarget = function _getTarget2(t, self2) {
    return (self2 && self2._ctx && self2._ctx.selector || gsap2.utils.toArray)(t)[0] || (typeof t === "string" && gsap2.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
  };
  var _getScrollFunc = function _getScrollFunc2(element2, _ref) {
    var s = _ref.s, sc = _ref.sc;
    _isViewport(element2) && (element2 = _doc3.scrollingElement || _docEl);
    var i = _scrollers.indexOf(element2), offset = sc === _vertical.sc ? 1 : 2;
    !~i && (i = _scrollers.push(element2) - 1);
    _scrollers[i + offset] || _addListener(element2, "scroll", _onScroll);
    var prev = _scrollers[i + offset], func = prev || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element2, s), true) || (_isViewport(element2) ? sc : _scrollCacheFunc(function(value) {
      return arguments.length ? element2[s] = value : element2[s];
    })));
    func.target = element2;
    prev || (func.smooth = gsap2.getProperty(element2, "scrollBehavior") === "smooth");
    return func;
  };
  var _getVelocityProp = function _getVelocityProp2(value, minTimeRefresh, useDelta) {
    var v1 = value, v2 = value, t1 = _getTime(), t2 = t1, min = minTimeRefresh || 50, dropToZeroTime = Math.max(500, min * 3), update = function update2(value2, force) {
      var t = _getTime();
      if (force || t - t1 > min) {
        v2 = v1;
        v1 = value2;
        t2 = t1;
        t1 = t;
      } else if (useDelta) {
        v1 += value2;
      } else {
        v1 = v2 + (value2 - v2) / (t - t2) * (t1 - t2);
      }
    }, reset = function reset2() {
      v2 = v1 = useDelta ? 0 : v1;
      t2 = t1 = 0;
    }, getVelocity = function getVelocity2(latestValue) {
      var tOld = t2, vOld = v2, t = _getTime();
      (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
      return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1e3;
    };
    return {
      update,
      reset,
      getVelocity
    };
  };
  var _getEvent = function _getEvent2(e, preventDefault) {
    preventDefault && !e._gsapAllow && e.preventDefault();
    return e.changedTouches ? e.changedTouches[0] : e;
  };
  var _getAbsoluteMax = function _getAbsoluteMax2(a) {
    var max = Math.max.apply(Math, a), min = Math.min.apply(Math, a);
    return Math.abs(max) >= Math.abs(min) ? max : min;
  };
  var _setScrollTrigger = function _setScrollTrigger2() {
    ScrollTrigger = gsap2.core.globals().ScrollTrigger;
    ScrollTrigger && ScrollTrigger.core && _integrate();
  };
  var _initCore3 = function _initCore4(core) {
    gsap2 = core || _getGSAP();
    if (!_coreInitted2 && gsap2 && typeof document !== "undefined" && document.body) {
      _win3 = window;
      _doc3 = document;
      _docEl = _doc3.documentElement;
      _body = _doc3.body;
      _root = [_win3, _doc3, _docEl, _body];
      _clamp3 = gsap2.utils.clamp;
      _context2 = gsap2.core.context || function() {
      };
      _pointerType = "onpointerenter" in _body ? "pointer" : "mouse";
      _isTouch = Observer.isTouch = _win3.matchMedia && _win3.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win3 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
      _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
      setTimeout(function() {
        return _startup = 0;
      }, 500);
      _setScrollTrigger();
      _coreInitted2 = 1;
    }
    return _coreInitted2;
  };
  _horizontal.op = _vertical;
  _scrollers.cache = 0;
  var Observer = /* @__PURE__ */ function() {
    function Observer2(vars) {
      this.init(vars);
    }
    var _proto = Observer2.prototype;
    _proto.init = function init4(vars) {
      _coreInitted2 || _initCore3(gsap2) || console.warn("Please gsap.registerPlugin(Observer)");
      ScrollTrigger || _setScrollTrigger();
      var tolerance = vars.tolerance, dragMinimum = vars.dragMinimum, type = vars.type, target = vars.target, lineHeight = vars.lineHeight, debounce2 = vars.debounce, preventDefault = vars.preventDefault, onStop = vars.onStop, onStopDelay = vars.onStopDelay, ignore = vars.ignore, wheelSpeed = vars.wheelSpeed, event = vars.event, onDragStart = vars.onDragStart, onDragEnd = vars.onDragEnd, onDrag = vars.onDrag, onPress = vars.onPress, onRelease = vars.onRelease, onRight = vars.onRight, onLeft = vars.onLeft, onUp = vars.onUp, onDown = vars.onDown, onChangeX = vars.onChangeX, onChangeY = vars.onChangeY, onChange = vars.onChange, onToggleX = vars.onToggleX, onToggleY = vars.onToggleY, onHover = vars.onHover, onHoverEnd = vars.onHoverEnd, onMove = vars.onMove, ignoreCheck = vars.ignoreCheck, isNormalizer = vars.isNormalizer, onGestureStart = vars.onGestureStart, onGestureEnd = vars.onGestureEnd, onWheel = vars.onWheel, onEnable = vars.onEnable, onDisable = vars.onDisable, onClick = vars.onClick, scrollSpeed = vars.scrollSpeed, capture = vars.capture, allowClicks = vars.allowClicks, lockAxis = vars.lockAxis, onLockAxis = vars.onLockAxis;
      this.target = target = _getTarget(target) || _docEl;
      this.vars = vars;
      ignore && (ignore = gsap2.utils.toArray(ignore));
      tolerance = tolerance || 1e-9;
      dragMinimum = dragMinimum || 0;
      wheelSpeed = wheelSpeed || 1;
      scrollSpeed = scrollSpeed || 1;
      type = type || "wheel,touch,pointer";
      debounce2 = debounce2 !== false;
      lineHeight || (lineHeight = parseFloat(_win3.getComputedStyle(_body).lineHeight) || 22);
      var id2, onStopDelayedCall, dragged, moved, wheeled, locked, axis, self2 = this, prevDeltaX = 0, prevDeltaY = 0, passive = vars.passive || !preventDefault, scrollFuncX = _getScrollFunc(target, _horizontal), scrollFuncY = _getScrollFunc(target, _vertical), scrollX = scrollFuncX(), scrollY = scrollFuncY(), limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown", isViewport = _isViewport(target), ownerDoc = target.ownerDocument || _doc3, deltaX = [0, 0, 0], deltaY = [0, 0, 0], onClickTime = 0, clickCapture = function clickCapture2() {
        return onClickTime = _getTime();
      }, _ignoreCheck = function _ignoreCheck2(e, isPointerOrTouch) {
        return (self2.event = e) && ignore && ~ignore.indexOf(e.target) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
      }, onStopFunc = function onStopFunc2() {
        self2._vx.reset();
        self2._vy.reset();
        onStopDelayedCall.pause();
        onStop && onStop(self2);
      }, update = function update2() {
        var dx = self2.deltaX = _getAbsoluteMax(deltaX), dy = self2.deltaY = _getAbsoluteMax(deltaY), changedX = Math.abs(dx) >= tolerance, changedY = Math.abs(dy) >= tolerance;
        onChange && (changedX || changedY) && onChange(self2, dx, dy, deltaX, deltaY);
        if (changedX) {
          onRight && self2.deltaX > 0 && onRight(self2);
          onLeft && self2.deltaX < 0 && onLeft(self2);
          onChangeX && onChangeX(self2);
          onToggleX && self2.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self2);
          prevDeltaX = self2.deltaX;
          deltaX[0] = deltaX[1] = deltaX[2] = 0;
        }
        if (changedY) {
          onDown && self2.deltaY > 0 && onDown(self2);
          onUp && self2.deltaY < 0 && onUp(self2);
          onChangeY && onChangeY(self2);
          onToggleY && self2.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self2);
          prevDeltaY = self2.deltaY;
          deltaY[0] = deltaY[1] = deltaY[2] = 0;
        }
        if (moved || dragged) {
          onMove && onMove(self2);
          if (dragged) {
            onDrag(self2);
            dragged = false;
          }
          moved = false;
        }
        locked && !(locked = false) && onLockAxis && onLockAxis(self2);
        if (wheeled) {
          onWheel(self2);
          wheeled = false;
        }
        id2 = 0;
      }, onDelta = function onDelta2(x, y, index) {
        deltaX[index] += x;
        deltaY[index] += y;
        self2._vx.update(x);
        self2._vy.update(y);
        debounce2 ? id2 || (id2 = requestAnimationFrame(update)) : update();
      }, onTouchOrPointerDelta = function onTouchOrPointerDelta2(x, y) {
        if (lockAxis && !axis) {
          self2.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
          locked = true;
        }
        if (axis !== "y") {
          deltaX[2] += x;
          self2._vx.update(x, true);
        }
        if (axis !== "x") {
          deltaY[2] += y;
          self2._vy.update(y, true);
        }
        debounce2 ? id2 || (id2 = requestAnimationFrame(update)) : update();
      }, _onDrag = function _onDrag2(e) {
        if (_ignoreCheck(e, 1)) {
          return;
        }
        e = _getEvent(e, preventDefault);
        var x = e.clientX, y = e.clientY, dx = x - self2.x, dy = y - self2.y, isDragging = self2.isDragging;
        self2.x = x;
        self2.y = y;
        if (isDragging || Math.abs(self2.startX - x) >= dragMinimum || Math.abs(self2.startY - y) >= dragMinimum) {
          onDrag && (dragged = true);
          isDragging || (self2.isDragging = true);
          onTouchOrPointerDelta(dx, dy);
          isDragging || onDragStart && onDragStart(self2);
        }
      }, _onPress = self2.onPress = function(e) {
        if (_ignoreCheck(e, 1) || e && e.button) {
          return;
        }
        self2.axis = axis = null;
        onStopDelayedCall.pause();
        self2.isPressed = true;
        e = _getEvent(e);
        prevDeltaX = prevDeltaY = 0;
        self2.startX = self2.x = e.clientX;
        self2.startY = self2.y = e.clientY;
        self2._vx.reset();
        self2._vy.reset();
        _addListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, passive, true);
        self2.deltaX = self2.deltaY = 0;
        onPress && onPress(self2);
      }, _onRelease = self2.onRelease = function(e) {
        if (_ignoreCheck(e, 1)) {
          return;
        }
        _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
        var isTrackingDrag = !isNaN(self2.y - self2.startY), wasDragging = self2.isDragging, isDragNotClick = wasDragging && (Math.abs(self2.x - self2.startX) > 3 || Math.abs(self2.y - self2.startY) > 3), eventData = _getEvent(e);
        if (!isDragNotClick && isTrackingDrag) {
          self2._vx.reset();
          self2._vy.reset();
          if (preventDefault && allowClicks) {
            gsap2.delayedCall(0.08, function() {
              if (_getTime() - onClickTime > 300 && !e.defaultPrevented) {
                if (e.target.click) {
                  e.target.click();
                } else if (ownerDoc.createEvent) {
                  var syntheticEvent = ownerDoc.createEvent("MouseEvents");
                  syntheticEvent.initMouseEvent("click", true, true, _win3, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
                  e.target.dispatchEvent(syntheticEvent);
                }
              }
            });
          }
        }
        self2.isDragging = self2.isGesturing = self2.isPressed = false;
        onStop && wasDragging && !isNormalizer && onStopDelayedCall.restart(true);
        onDragEnd && wasDragging && onDragEnd(self2);
        onRelease && onRelease(self2, isDragNotClick);
      }, _onGestureStart = function _onGestureStart2(e) {
        return e.touches && e.touches.length > 1 && (self2.isGesturing = true) && onGestureStart(e, self2.isDragging);
      }, _onGestureEnd = function _onGestureEnd2() {
        return (self2.isGesturing = false) || onGestureEnd(self2);
      }, onScroll = function onScroll2(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        var x = scrollFuncX(), y = scrollFuncY();
        onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
        scrollX = x;
        scrollY = y;
        onStop && onStopDelayedCall.restart(true);
      }, _onWheel = function _onWheel2(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        e = _getEvent(e, preventDefault);
        onWheel && (wheeled = true);
        var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win3.innerHeight : 1) * wheelSpeed;
        onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
        onStop && !isNormalizer && onStopDelayedCall.restart(true);
      }, _onMove = function _onMove2(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        var x = e.clientX, y = e.clientY, dx = x - self2.x, dy = y - self2.y;
        self2.x = x;
        self2.y = y;
        moved = true;
        onStop && onStopDelayedCall.restart(true);
        (dx || dy) && onTouchOrPointerDelta(dx, dy);
      }, _onHover = function _onHover2(e) {
        self2.event = e;
        onHover(self2);
      }, _onHoverEnd = function _onHoverEnd2(e) {
        self2.event = e;
        onHoverEnd(self2);
      }, _onClick = function _onClick2(e) {
        return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self2);
      };
      onStopDelayedCall = self2._dc = gsap2.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
      self2.deltaX = self2.deltaY = 0;
      self2._vx = _getVelocityProp(0, 50, true);
      self2._vy = _getVelocityProp(0, 50, true);
      self2.scrollX = scrollFuncX;
      self2.scrollY = scrollFuncY;
      self2.isDragging = self2.isGesturing = self2.isPressed = false;
      _context2(this);
      self2.enable = function(e) {
        if (!self2.isEnabled) {
          _addListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
          type.indexOf("scroll") >= 0 && _addListener(isViewport ? ownerDoc : target, "scroll", onScroll, passive, capture);
          type.indexOf("wheel") >= 0 && _addListener(target, "wheel", _onWheel, passive, capture);
          if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
            _addListener(target, _eventTypes[0], _onPress, passive, capture);
            _addListener(ownerDoc, _eventTypes[2], _onRelease);
            _addListener(ownerDoc, _eventTypes[3], _onRelease);
            allowClicks && _addListener(target, "click", clickCapture, true, true);
            onClick && _addListener(target, "click", _onClick);
            onGestureStart && _addListener(ownerDoc, "gesturestart", _onGestureStart);
            onGestureEnd && _addListener(ownerDoc, "gestureend", _onGestureEnd);
            onHover && _addListener(target, _pointerType + "enter", _onHover);
            onHoverEnd && _addListener(target, _pointerType + "leave", _onHoverEnd);
            onMove && _addListener(target, _pointerType + "move", _onMove);
          }
          self2.isEnabled = true;
          e && e.type && _onPress(e);
          onEnable && onEnable(self2);
        }
        return self2;
      };
      self2.disable = function() {
        if (self2.isEnabled) {
          _observers.filter(function(o) {
            return o !== self2 && _isViewport(o.target);
          }).length || _removeListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
          if (self2.isPressed) {
            self2._vx.reset();
            self2._vy.reset();
            _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
          }
          _removeListener(isViewport ? ownerDoc : target, "scroll", onScroll, capture);
          _removeListener(target, "wheel", _onWheel, capture);
          _removeListener(target, _eventTypes[0], _onPress, capture);
          _removeListener(ownerDoc, _eventTypes[2], _onRelease);
          _removeListener(ownerDoc, _eventTypes[3], _onRelease);
          _removeListener(target, "click", clickCapture, true);
          _removeListener(target, "click", _onClick);
          _removeListener(ownerDoc, "gesturestart", _onGestureStart);
          _removeListener(ownerDoc, "gestureend", _onGestureEnd);
          _removeListener(target, _pointerType + "enter", _onHover);
          _removeListener(target, _pointerType + "leave", _onHoverEnd);
          _removeListener(target, _pointerType + "move", _onMove);
          self2.isEnabled = self2.isPressed = self2.isDragging = false;
          onDisable && onDisable(self2);
        }
      };
      self2.kill = self2.revert = function() {
        self2.disable();
        var i = _observers.indexOf(self2);
        i >= 0 && _observers.splice(i, 1);
        _normalizer === self2 && (_normalizer = 0);
      };
      _observers.push(self2);
      isNormalizer && _isViewport(target) && (_normalizer = self2);
      self2.enable(event);
    };
    _createClass(Observer2, [{
      key: "velocityX",
      get: function get() {
        return this._vx.getVelocity();
      }
    }, {
      key: "velocityY",
      get: function get() {
        return this._vy.getVelocity();
      }
    }]);
    return Observer2;
  }();
  Observer.version = "3.12.5";
  Observer.create = function(vars) {
    return new Observer(vars);
  };
  Observer.register = _initCore3;
  Observer.getAll = function() {
    return _observers.slice();
  };
  Observer.getById = function(id2) {
    return _observers.filter(function(o) {
      return o.vars.id === id2;
    })[0];
  };
  _getGSAP() && gsap2.registerPlugin(Observer);

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/ScrollTrigger.js
  var gsap3;
  var _coreInitted3;
  var _win4;
  var _doc4;
  var _docEl2;
  var _body2;
  var _root2;
  var _resizeDelay;
  var _toArray;
  var _clamp4;
  var _time2;
  var _syncInterval;
  var _refreshing;
  var _pointerIsDown;
  var _transformProp2;
  var _i;
  var _prevWidth;
  var _prevHeight;
  var _autoRefresh;
  var _sort;
  var _suppressOverwrites2;
  var _ignoreResize;
  var _normalizer2;
  var _ignoreMobileResize;
  var _baseScreenHeight;
  var _baseScreenWidth;
  var _fixIOSBug;
  var _context3;
  var _scrollRestoration;
  var _div100vh;
  var _100vh;
  var _isReverted;
  var _clampingMax;
  var _limitCallbacks;
  var _startup2 = 1;
  var _getTime2 = Date.now;
  var _time1 = _getTime2();
  var _lastScrollTime = 0;
  var _enabled = 0;
  var _parseClamp = function _parseClamp2(value, type, self2) {
    var clamp3 = _isString3(value) && (value.substr(0, 6) === "clamp(" || value.indexOf("max") > -1);
    self2["_" + type + "Clamp"] = clamp3;
    return clamp3 ? value.substr(6, value.length - 7) : value;
  };
  var _keepClamp = function _keepClamp2(value, clamp3) {
    return clamp3 && (!_isString3(value) || value.substr(0, 6) !== "clamp(") ? "clamp(" + value + ")" : value;
  };
  var _rafBugFix = function _rafBugFix2() {
    return _enabled && requestAnimationFrame(_rafBugFix2);
  };
  var _pointerDownHandler = function _pointerDownHandler2() {
    return _pointerIsDown = 1;
  };
  var _pointerUpHandler = function _pointerUpHandler2() {
    return _pointerIsDown = 0;
  };
  var _passThrough3 = function _passThrough4(v) {
    return v;
  };
  var _round3 = function _round4(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _windowExists5 = function _windowExists6() {
    return typeof window !== "undefined";
  };
  var _getGSAP3 = function _getGSAP4() {
    return gsap3 || _windowExists5() && (gsap3 = window.gsap) && gsap3.registerPlugin && gsap3;
  };
  var _isViewport3 = function _isViewport4(e) {
    return !!~_root2.indexOf(e);
  };
  var _getViewportDimension = function _getViewportDimension2(dimensionProperty) {
    return (dimensionProperty === "Height" ? _100vh : _win4["inner" + dimensionProperty]) || _docEl2["client" + dimensionProperty] || _body2["client" + dimensionProperty];
  };
  var _getBoundsFunc = function _getBoundsFunc2(element2) {
    return _getProxyProp(element2, "getBoundingClientRect") || (_isViewport3(element2) ? function() {
      _winOffsets.width = _win4.innerWidth;
      _winOffsets.height = _100vh;
      return _winOffsets;
    } : function() {
      return _getBounds(element2);
    });
  };
  var _getSizeFunc = function _getSizeFunc2(scroller, isViewport, _ref) {
    var d = _ref.d, d2 = _ref.d2, a = _ref.a;
    return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function() {
      return a()[d];
    } : function() {
      return (isViewport ? _getViewportDimension(d2) : scroller["client" + d2]) || 0;
    };
  };
  var _getOffsetsFunc = function _getOffsetsFunc2(element2, isViewport) {
    return !isViewport || ~_proxies.indexOf(element2) ? _getBoundsFunc(element2) : function() {
      return _winOffsets;
    };
  };
  var _maxScroll = function _maxScroll2(element2, _ref2) {
    var s = _ref2.s, d2 = _ref2.d2, d = _ref2.d, a = _ref2.a;
    return Math.max(0, (s = "scroll" + d2) && (a = _getProxyProp(element2, s)) ? a() - _getBoundsFunc(element2)()[d] : _isViewport3(element2) ? (_docEl2[s] || _body2[s]) - _getViewportDimension(d2) : element2[s] - element2["offset" + d2]);
  };
  var _iterateAutoRefresh = function _iterateAutoRefresh2(func, events) {
    for (var i = 0; i < _autoRefresh.length; i += 3) {
      (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
    }
  };
  var _isString3 = function _isString4(value) {
    return typeof value === "string";
  };
  var _isFunction3 = function _isFunction4(value) {
    return typeof value === "function";
  };
  var _isNumber3 = function _isNumber4(value) {
    return typeof value === "number";
  };
  var _isObject3 = function _isObject4(value) {
    return typeof value === "object";
  };
  var _endAnimation = function _endAnimation2(animation, reversed, pause) {
    return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
  };
  var _callback3 = function _callback4(self2, func) {
    if (self2.enabled) {
      var result = self2._ctx ? self2._ctx.add(function() {
        return func(self2);
      }) : func(self2);
      result && result.totalTime && (self2.callbackAnimation = result);
    }
  };
  var _abs = Math.abs;
  var _left = "left";
  var _top = "top";
  var _right = "right";
  var _bottom = "bottom";
  var _width = "width";
  var _height = "height";
  var _Right = "Right";
  var _Left = "Left";
  var _Top = "Top";
  var _Bottom = "Bottom";
  var _padding = "padding";
  var _margin = "margin";
  var _Width = "Width";
  var _Height = "Height";
  var _px = "px";
  var _getComputedStyle = function _getComputedStyle2(element2) {
    return _win4.getComputedStyle(element2);
  };
  var _makePositionable = function _makePositionable2(element2) {
    var position = _getComputedStyle(element2).position;
    element2.style.position = position === "absolute" || position === "fixed" ? position : "relative";
  };
  var _setDefaults3 = function _setDefaults4(obj, defaults2) {
    for (var p in defaults2) {
      p in obj || (obj[p] = defaults2[p]);
    }
    return obj;
  };
  var _getBounds = function _getBounds2(element2, withoutTransforms) {
    var tween = withoutTransforms && _getComputedStyle(element2)[_transformProp2] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap3.to(element2, {
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0
    }).progress(1), bounds = element2.getBoundingClientRect();
    tween && tween.progress(0).kill();
    return bounds;
  };
  var _getSize = function _getSize2(element2, _ref3) {
    var d2 = _ref3.d2;
    return element2["offset" + d2] || element2["client" + d2] || 0;
  };
  var _getLabelRatioArray = function _getLabelRatioArray2(timeline2) {
    var a = [], labels = timeline2.labels, duration = timeline2.duration(), p;
    for (p in labels) {
      a.push(labels[p] / duration);
    }
    return a;
  };
  var _getClosestLabel = function _getClosestLabel2(animation) {
    return function(value) {
      return gsap3.utils.snap(_getLabelRatioArray(animation), value);
    };
  };
  var _snapDirectional = function _snapDirectional2(snapIncrementOrArray) {
    var snap3 = gsap3.utils.snap(snapIncrementOrArray), a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function(a2, b) {
      return a2 - b;
    });
    return a ? function(value, direction, threshold) {
      if (threshold === void 0) {
        threshold = 1e-3;
      }
      var i;
      if (!direction) {
        return snap3(value);
      }
      if (direction > 0) {
        value -= threshold;
        for (i = 0; i < a.length; i++) {
          if (a[i] >= value) {
            return a[i];
          }
        }
        return a[i - 1];
      } else {
        i = a.length;
        value += threshold;
        while (i--) {
          if (a[i] <= value) {
            return a[i];
          }
        }
      }
      return a[0];
    } : function(value, direction, threshold) {
      if (threshold === void 0) {
        threshold = 1e-3;
      }
      var snapped = snap3(value);
      return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap3(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
    };
  };
  var _getLabelAtDirection = function _getLabelAtDirection2(timeline2) {
    return function(value, st) {
      return _snapDirectional(_getLabelRatioArray(timeline2))(value, st.direction);
    };
  };
  var _multiListener = function _multiListener2(func, element2, types, callback) {
    return types.split(",").forEach(function(type) {
      return func(element2, type, callback);
    });
  };
  var _addListener3 = function _addListener4(element2, type, func, nonPassive, capture) {
    return element2.addEventListener(type, func, {
      passive: !nonPassive,
      capture: !!capture
    });
  };
  var _removeListener3 = function _removeListener4(element2, type, func, capture) {
    return element2.removeEventListener(type, func, !!capture);
  };
  var _wheelListener = function _wheelListener2(func, el, scrollFunc) {
    scrollFunc = scrollFunc && scrollFunc.wheelHandler;
    if (scrollFunc) {
      func(el, "wheel", scrollFunc);
      func(el, "touchmove", scrollFunc);
    }
  };
  var _markerDefaults = {
    startColor: "green",
    endColor: "red",
    indent: 0,
    fontSize: "16px",
    fontWeight: "normal"
  };
  var _defaults2 = {
    toggleActions: "play",
    anticipatePin: 0
  };
  var _keywords = {
    top: 0,
    left: 0,
    center: 0.5,
    bottom: 1,
    right: 1
  };
  var _offsetToPx = function _offsetToPx2(value, size) {
    if (_isString3(value)) {
      var eqIndex = value.indexOf("="), relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
      if (~eqIndex) {
        value.indexOf("%") > eqIndex && (relative *= size / 100);
        value = value.substr(0, eqIndex - 1);
      }
      value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
    }
    return value;
  };
  var _createMarker = function _createMarker2(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
    var startColor = _ref4.startColor, endColor = _ref4.endColor, fontSize = _ref4.fontSize, indent = _ref4.indent, fontWeight = _ref4.fontWeight;
    var e = _doc4.createElement("div"), useFixedPosition = _isViewport3(container) || _getProxyProp(container, "pinType") === "fixed", isScroller = type.indexOf("scroller") !== -1, parent = useFixedPosition ? _body2 : container, isStart = type.indexOf("start") !== -1, color = isStart ? startColor : endColor, css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
    (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
    matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
    e._isStart = isStart;
    e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
    e.style.cssText = css;
    e.innerText = name || name === 0 ? type + "-" + name : type;
    parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
    e._offset = e["offset" + direction.op.d2];
    _positionMarker(e, 0, direction, isStart);
    return e;
  };
  var _positionMarker = function _positionMarker2(marker, start, direction, flipped) {
    var vars = {
      display: "block"
    }, side = direction[flipped ? "os2" : "p2"], oppositeSide = direction[flipped ? "p2" : "os2"];
    marker._isFlipped = flipped;
    vars[direction.a + "Percent"] = flipped ? -100 : 0;
    vars[direction.a] = flipped ? "1px" : 0;
    vars["border" + side + _Width] = 1;
    vars["border" + oppositeSide + _Width] = 0;
    vars[direction.p] = start + "px";
    gsap3.set(marker, vars);
  };
  var _triggers = [];
  var _ids = {};
  var _rafID;
  var _sync = function _sync2() {
    return _getTime2() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
  };
  var _onScroll3 = function _onScroll4() {
    if (!_normalizer2 || !_normalizer2.isPressed || _normalizer2.startX > _body2.clientWidth) {
      _scrollers.cache++;
      if (_normalizer2) {
        _rafID || (_rafID = requestAnimationFrame(_updateAll));
      } else {
        _updateAll();
      }
      _lastScrollTime || _dispatch3("scrollStart");
      _lastScrollTime = _getTime2();
    }
  };
  var _setBaseDimensions = function _setBaseDimensions2() {
    _baseScreenWidth = _win4.innerWidth;
    _baseScreenHeight = _win4.innerHeight;
  };
  var _onResize = function _onResize2() {
    _scrollers.cache++;
    !_refreshing && !_ignoreResize && !_doc4.fullscreenElement && !_doc4.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win4.innerWidth || Math.abs(_win4.innerHeight - _baseScreenHeight) > _win4.innerHeight * 0.25) && _resizeDelay.restart(true);
  };
  var _listeners2 = {};
  var _emptyArray2 = [];
  var _softRefresh = function _softRefresh2() {
    return _removeListener3(ScrollTrigger2, "scrollEnd", _softRefresh2) || _refreshAll(true);
  };
  var _dispatch3 = function _dispatch4(type) {
    return _listeners2[type] && _listeners2[type].map(function(f) {
      return f();
    }) || _emptyArray2;
  };
  var _savedStyles = [];
  var _revertRecorded = function _revertRecorded2(media) {
    for (var i = 0; i < _savedStyles.length; i += 5) {
      if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
        _savedStyles[i].style.cssText = _savedStyles[i + 1];
        _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
        _savedStyles[i + 3].uncache = 1;
      }
    }
  };
  var _revertAll = function _revertAll2(kill, media) {
    var trigger;
    for (_i = 0; _i < _triggers.length; _i++) {
      trigger = _triggers[_i];
      if (trigger && (!media || trigger._ctx === media)) {
        if (kill) {
          trigger.kill(1);
        } else {
          trigger.revert(true, true);
        }
      }
    }
    _isReverted = true;
    media && _revertRecorded(media);
    media || _dispatch3("revert");
  };
  var _clearScrollMemory = function _clearScrollMemory2(scrollRestoration, force) {
    _scrollers.cache++;
    (force || !_refreshingAll) && _scrollers.forEach(function(obj) {
      return _isFunction3(obj) && obj.cacheID++ && (obj.rec = 0);
    });
    _isString3(scrollRestoration) && (_win4.history.scrollRestoration = _scrollRestoration = scrollRestoration);
  };
  var _refreshingAll;
  var _refreshID = 0;
  var _queueRefreshID;
  var _queueRefreshAll = function _queueRefreshAll2() {
    if (_queueRefreshID !== _refreshID) {
      var id2 = _queueRefreshID = _refreshID;
      requestAnimationFrame(function() {
        return id2 === _refreshID && _refreshAll(true);
      });
    }
  };
  var _refresh100vh = function _refresh100vh2() {
    _body2.appendChild(_div100vh);
    _100vh = !_normalizer2 && _div100vh.offsetHeight || _win4.innerHeight;
    _body2.removeChild(_div100vh);
  };
  var _hideAllMarkers = function _hideAllMarkers2(hide) {
    return _toArray(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(el) {
      return el.style.display = hide ? "none" : "block";
    });
  };
  var _refreshAll = function _refreshAll2(force, skipRevert) {
    if (_lastScrollTime && !force && !_isReverted) {
      _addListener3(ScrollTrigger2, "scrollEnd", _softRefresh);
      return;
    }
    _refresh100vh();
    _refreshingAll = ScrollTrigger2.isRefreshing = true;
    _scrollers.forEach(function(obj) {
      return _isFunction3(obj) && ++obj.cacheID && (obj.rec = obj());
    });
    var refreshInits = _dispatch3("refreshInit");
    _sort && ScrollTrigger2.sort();
    skipRevert || _revertAll();
    _scrollers.forEach(function(obj) {
      if (_isFunction3(obj)) {
        obj.smooth && (obj.target.style.scrollBehavior = "auto");
        obj(0);
      }
    });
    _triggers.slice(0).forEach(function(t) {
      return t.refresh();
    });
    _isReverted = false;
    _triggers.forEach(function(t) {
      if (t._subPinOffset && t.pin) {
        var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight", original = t.pin[prop];
        t.revert(true, 1);
        t.adjustPinSpacing(t.pin[prop] - original);
        t.refresh();
      }
    });
    _clampingMax = 1;
    _hideAllMarkers(true);
    _triggers.forEach(function(t) {
      var max = _maxScroll(t.scroller, t._dir), endClamp = t.vars.end === "max" || t._endClamp && t.end > max, startClamp = t._startClamp && t.start >= max;
      (endClamp || startClamp) && t.setPositions(startClamp ? max - 1 : t.start, endClamp ? Math.max(startClamp ? max : t.start + 1, max) : t.end, true);
    });
    _hideAllMarkers(false);
    _clampingMax = 0;
    refreshInits.forEach(function(result) {
      return result && result.render && result.render(-1);
    });
    _scrollers.forEach(function(obj) {
      if (_isFunction3(obj)) {
        obj.smooth && requestAnimationFrame(function() {
          return obj.target.style.scrollBehavior = "smooth";
        });
        obj.rec && obj(obj.rec);
      }
    });
    _clearScrollMemory(_scrollRestoration, 1);
    _resizeDelay.pause();
    _refreshID++;
    _refreshingAll = 2;
    _updateAll(2);
    _triggers.forEach(function(t) {
      return _isFunction3(t.vars.onRefresh) && t.vars.onRefresh(t);
    });
    _refreshingAll = ScrollTrigger2.isRefreshing = false;
    _dispatch3("refresh");
  };
  var _lastScroll = 0;
  var _direction = 1;
  var _primary;
  var _updateAll = function _updateAll2(force) {
    if (force === 2 || !_refreshingAll && !_isReverted) {
      ScrollTrigger2.isUpdating = true;
      _primary && _primary.update(0);
      var l = _triggers.length, time = _getTime2(), recordVelocity = time - _time1 >= 50, scroll = l && _triggers[0].scroll();
      _direction = _lastScroll > scroll ? -1 : 1;
      _refreshingAll || (_lastScroll = scroll);
      if (recordVelocity) {
        if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
          _lastScrollTime = 0;
          _dispatch3("scrollEnd");
        }
        _time2 = _time1;
        _time1 = time;
      }
      if (_direction < 0) {
        _i = l;
        while (_i-- > 0) {
          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
        }
        _direction = 1;
      } else {
        for (_i = 0; _i < l; _i++) {
          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
        }
      }
      ScrollTrigger2.isUpdating = false;
    }
    _rafID = 0;
  };
  var _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"];
  var _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]);
  var _swapPinOut = function _swapPinOut2(pin, spacer, state) {
    _setState(state);
    var cache2 = pin._gsap;
    if (cache2.spacerIsNative) {
      _setState(cache2.spacerState);
    } else if (pin._gsap.swappedIn) {
      var parent = spacer.parentNode;
      if (parent) {
        parent.insertBefore(pin, spacer);
        parent.removeChild(spacer);
      }
    }
    pin._gsap.swappedIn = false;
  };
  var _swapPinIn = function _swapPinIn2(pin, spacer, cs, spacerState) {
    if (!pin._gsap.swappedIn) {
      var i = _propNamesToCopy.length, spacerStyle = spacer.style, pinStyle = pin.style, p;
      while (i--) {
        p = _propNamesToCopy[i];
        spacerStyle[p] = cs[p];
      }
      spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
      cs.display === "inline" && (spacerStyle.display = "inline-block");
      pinStyle[_bottom] = pinStyle[_right] = "auto";
      spacerStyle.flexBasis = cs.flexBasis || "auto";
      spacerStyle.overflow = "visible";
      spacerStyle.boxSizing = "border-box";
      spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
      spacerStyle[_height] = _getSize(pin, _vertical) + _px;
      spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
      _setState(spacerState);
      pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
      pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
      pinStyle[_padding] = cs[_padding];
      if (pin.parentNode !== spacer) {
        pin.parentNode.insertBefore(spacer, pin);
        spacer.appendChild(pin);
      }
      pin._gsap.swappedIn = true;
    }
  };
  var _capsExp2 = /([A-Z])/g;
  var _setState = function _setState2(state) {
    if (state) {
      var style = state.t.style, l = state.length, i = 0, p, value;
      (state.t._gsap || gsap3.core.getCache(state.t)).uncache = 1;
      for (; i < l; i += 2) {
        value = state[i + 1];
        p = state[i];
        if (value) {
          style[p] = value;
        } else if (style[p]) {
          style.removeProperty(p.replace(_capsExp2, "-$1").toLowerCase());
        }
      }
    }
  };
  var _getState = function _getState2(element2) {
    var l = _stateProps.length, style = element2.style, state = [], i = 0;
    for (; i < l; i++) {
      state.push(_stateProps[i], style[_stateProps[i]]);
    }
    state.t = element2;
    return state;
  };
  var _copyState = function _copyState2(state, override, omitOffsets) {
    var result = [], l = state.length, i = omitOffsets ? 8 : 0, p;
    for (; i < l; i += 2) {
      p = state[i];
      result.push(p, p in override ? override[p] : state[i + 1]);
    }
    result.t = state.t;
    return result;
  };
  var _winOffsets = {
    left: 0,
    top: 0
  };
  var _parsePosition3 = function _parsePosition4(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self2, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation, clampZeroProp) {
    _isFunction3(value) && (value = value(self2));
    if (_isString3(value) && value.substr(0, 3) === "max") {
      value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
    }
    var time = containerAnimation ? containerAnimation.time() : 0, p1, p2, element2;
    containerAnimation && containerAnimation.seek(0);
    isNaN(value) || (value = +value);
    if (!_isNumber3(value)) {
      _isFunction3(trigger) && (trigger = trigger(self2));
      var offsets = (value || "0").split(" "), bounds, localOffset, globalOffset, display;
      element2 = _getTarget(trigger, self2) || _body2;
      bounds = _getBounds(element2) || {};
      if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element2).display === "none") {
        display = element2.style.display;
        element2.style.display = "block";
        bounds = _getBounds(element2);
        display ? element2.style.display = display : element2.style.removeProperty("display");
      }
      localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
      globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
      value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
      markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
      scrollerSize -= scrollerSize - globalOffset;
    } else {
      containerAnimation && (value = gsap3.utils.mapRange(containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, 0, scrollerMax, value));
      markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
    }
    if (clampZeroProp) {
      self2[clampZeroProp] = value || -1e-3;
      value < 0 && (value = 0);
    }
    if (marker) {
      var position = value + scrollerSize, isStart = marker._isStart;
      p1 = "scroll" + direction.d2;
      _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body2[p1], _docEl2[p1]) : marker.parentNode[p1]) <= position + 1);
      if (useFixedPosition) {
        scrollerBounds = _getBounds(markerScroller);
        useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
      }
    }
    if (containerAnimation && element2) {
      p1 = _getBounds(element2);
      containerAnimation.seek(scrollerMax);
      p2 = _getBounds(element2);
      containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
      value = value / containerAnimation._caScrollDist * scrollerMax;
    }
    containerAnimation && containerAnimation.seek(time);
    return containerAnimation ? value : Math.round(value);
  };
  var _prefixExp = /(webkit|moz|length|cssText|inset)/i;
  var _reparent = function _reparent2(element2, parent, top, left) {
    if (element2.parentNode !== parent) {
      var style = element2.style, p, cs;
      if (parent === _body2) {
        element2._stOrig = style.cssText;
        cs = _getComputedStyle(element2);
        for (p in cs) {
          if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
            style[p] = cs[p];
          }
        }
        style.top = top;
        style.left = left;
      } else {
        style.cssText = element2._stOrig;
      }
      gsap3.core.getCache(element2).uncache = 1;
      parent.appendChild(element2);
    }
  };
  var _interruptionTracker = function _interruptionTracker2(getValueFunc, initialValue, onInterrupt) {
    var last1 = initialValue, last2 = last1;
    return function(value) {
      var current = Math.round(getValueFunc());
      if (current !== last1 && current !== last2 && Math.abs(current - last1) > 3 && Math.abs(current - last2) > 3) {
        value = current;
        onInterrupt && onInterrupt();
      }
      last2 = last1;
      last1 = value;
      return value;
    };
  };
  var _shiftMarker = function _shiftMarker2(marker, direction, value) {
    var vars = {};
    vars[direction.p] = "+=" + value;
    gsap3.set(marker, vars);
  };
  var _getTweenCreator = function _getTweenCreator2(scroller, direction) {
    var getScroll = _getScrollFunc(scroller, direction), prop = "_scroll" + direction.p2, getTween = function getTween2(scrollTo, vars, initialValue, change1, change2) {
      var tween = getTween2.tween, onComplete = vars.onComplete, modifiers = {};
      initialValue = initialValue || getScroll();
      var checkForInterruption = _interruptionTracker(getScroll, initialValue, function() {
        tween.kill();
        getTween2.tween = 0;
      });
      change2 = change1 && change2 || 0;
      change1 = change1 || scrollTo - initialValue;
      tween && tween.kill();
      vars[prop] = scrollTo;
      vars.inherit = false;
      vars.modifiers = modifiers;
      modifiers[prop] = function() {
        return checkForInterruption(initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio);
      };
      vars.onUpdate = function() {
        _scrollers.cache++;
        getTween2.tween && _updateAll();
      };
      vars.onComplete = function() {
        getTween2.tween = 0;
        onComplete && onComplete.call(tween);
      };
      tween = getTween2.tween = gsap3.to(scroller, vars);
      return tween;
    };
    scroller[prop] = getScroll;
    getScroll.wheelHandler = function() {
      return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
    };
    _addListener3(scroller, "wheel", getScroll.wheelHandler);
    ScrollTrigger2.isTouch && _addListener3(scroller, "touchmove", getScroll.wheelHandler);
    return getTween;
  };
  var ScrollTrigger2 = /* @__PURE__ */ function() {
    function ScrollTrigger3(vars, animation) {
      _coreInitted3 || ScrollTrigger3.register(gsap3) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
      _context3(this);
      this.init(vars, animation);
    }
    var _proto = ScrollTrigger3.prototype;
    _proto.init = function init4(vars, animation) {
      this.progress = this.start = 0;
      this.vars && this.kill(true, true);
      if (!_enabled) {
        this.update = this.refresh = this.kill = _passThrough3;
        return;
      }
      vars = _setDefaults3(_isString3(vars) || _isNumber3(vars) || vars.nodeType ? {
        trigger: vars
      } : vars, _defaults2);
      var _vars = vars, onUpdate = _vars.onUpdate, toggleClass = _vars.toggleClass, id2 = _vars.id, onToggle = _vars.onToggle, onRefresh = _vars.onRefresh, scrub = _vars.scrub, trigger = _vars.trigger, pin = _vars.pin, pinSpacing = _vars.pinSpacing, invalidateOnRefresh = _vars.invalidateOnRefresh, anticipatePin = _vars.anticipatePin, onScrubComplete = _vars.onScrubComplete, onSnapComplete = _vars.onSnapComplete, once = _vars.once, snap3 = _vars.snap, pinReparent = _vars.pinReparent, pinSpacer = _vars.pinSpacer, containerAnimation = _vars.containerAnimation, fastScrollEnd = _vars.fastScrollEnd, preventOverlaps = _vars.preventOverlaps, direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical, isToggle = !scrub && scrub !== 0, scroller = _getTarget(vars.scroller || _win4), scrollerCache = gsap3.core.getCache(scroller), isViewport = _isViewport3(scroller), useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed", callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack], toggleActions = isToggle && vars.toggleActions.split(" "), markers = "markers" in vars ? vars.markers : _defaults2.markers, borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, self2 = this, onRefreshInit = vars.onRefreshInit && function() {
        return vars.onRefreshInit(self2);
      }, getScrollerSize = _getSizeFunc(scroller, isViewport, direction), getScrollerOffsets = _getOffsetsFunc(scroller, isViewport), lastSnap = 0, lastRefresh = 0, prevProgress = 0, scrollFunc = _getScrollFunc(scroller, direction), tweenTo, pinCache, snapFunc, scroll1, scroll2, start, end, markerStart, markerEnd, markerStartTrigger, markerEndTrigger, markerVars, executingOnRefresh, change, pinOriginalState, pinActiveState, pinState, spacer, offset, pinGetter, pinSetter, pinStart, pinChange, spacingStart, spacerState, markerStartSetter, pinMoves, markerEndSetter, cs, snap1, snap22, scrubTween, scrubSmooth, snapDurClamp, snapDelayedCall, prevScroll, prevAnimProgress, caMarkerSetter, customRevertReturn;
      self2._startClamp = self2._endClamp = false;
      self2._dir = direction;
      anticipatePin *= 45;
      self2.scroller = scroller;
      self2.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
      scroll1 = scrollFunc();
      self2.vars = vars;
      animation = animation || vars.animation;
      if ("refreshPriority" in vars) {
        _sort = 1;
        vars.refreshPriority === -9999 && (_primary = self2);
      }
      scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
        top: _getTweenCreator(scroller, _vertical),
        left: _getTweenCreator(scroller, _horizontal)
      };
      self2.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
      self2.scrubDuration = function(value) {
        scrubSmooth = _isNumber3(value) && value;
        if (!scrubSmooth) {
          scrubTween && scrubTween.progress(1).kill();
          scrubTween = 0;
        } else {
          scrubTween ? scrubTween.duration(value) : scrubTween = gsap3.to(animation, {
            ease: "expo",
            totalProgress: "+=0",
            inherit: false,
            duration: scrubSmooth,
            paused: true,
            onComplete: function onComplete() {
              return onScrubComplete && onScrubComplete(self2);
            }
          });
        }
      };
      if (animation) {
        animation.vars.lazy = false;
        animation._initted && !self2.isReverted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true);
        self2.animation = animation.pause();
        animation.scrollTrigger = self2;
        self2.scrubDuration(scrub);
        snap1 = 0;
        id2 || (id2 = animation.vars.id);
      }
      if (snap3) {
        if (!_isObject3(snap3) || snap3.push) {
          snap3 = {
            snapTo: snap3
          };
        }
        "scrollBehavior" in _body2.style && gsap3.set(isViewport ? [_body2, _docEl2] : scroller, {
          scrollBehavior: "auto"
        });
        _scrollers.forEach(function(o) {
          return _isFunction3(o) && o.target === (isViewport ? _doc4.scrollingElement || _docEl2 : scroller) && (o.smooth = false);
        });
        snapFunc = _isFunction3(snap3.snapTo) ? snap3.snapTo : snap3.snapTo === "labels" ? _getClosestLabel(animation) : snap3.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap3.directional !== false ? function(value, st) {
          return _snapDirectional(snap3.snapTo)(value, _getTime2() - lastRefresh < 500 ? 0 : st.direction);
        } : gsap3.utils.snap(snap3.snapTo);
        snapDurClamp = snap3.duration || {
          min: 0.1,
          max: 2
        };
        snapDurClamp = _isObject3(snapDurClamp) ? _clamp4(snapDurClamp.min, snapDurClamp.max) : _clamp4(snapDurClamp, snapDurClamp);
        snapDelayedCall = gsap3.delayedCall(snap3.delay || scrubSmooth / 2 || 0.1, function() {
          var scroll = scrollFunc(), refreshedRecently = _getTime2() - lastRefresh < 500, tween = tweenTo.tween;
          if ((refreshedRecently || Math.abs(self2.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
            var progress = (scroll - start) / change, totalProgress = animation && !isToggle ? animation.totalProgress() : progress, velocity = refreshedRecently ? 0 : (totalProgress - snap22) / (_getTime2() - _time2) * 1e3 || 0, change1 = gsap3.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185), naturalEnd = progress + (snap3.inertia === false ? 0 : change1), endValue, endScroll, _snap = snap3, onStart = _snap.onStart, _onInterrupt = _snap.onInterrupt, _onComplete = _snap.onComplete;
            endValue = snapFunc(naturalEnd, self2);
            _isNumber3(endValue) || (endValue = naturalEnd);
            endScroll = Math.round(start + endValue * change);
            if (scroll <= end && scroll >= start && endScroll !== scroll) {
              if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
                return;
              }
              if (snap3.inertia === false) {
                change1 = endValue - progress;
              }
              tweenTo(endScroll, {
                duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
                ease: snap3.ease || "power3",
                data: _abs(endScroll - scroll),
                // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
                onInterrupt: function onInterrupt() {
                  return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self2);
                },
                onComplete: function onComplete() {
                  self2.update();
                  lastSnap = scrollFunc();
                  if (animation) {
                    scrubTween ? scrubTween.resetTo("totalProgress", endValue, animation._tTime / animation._tDur) : animation.progress(endValue);
                  }
                  snap1 = snap22 = animation && !isToggle ? animation.totalProgress() : self2.progress;
                  onSnapComplete && onSnapComplete(self2);
                  _onComplete && _onComplete(self2);
                }
              }, scroll, change1 * change, endScroll - scroll - change1 * change);
              onStart && onStart(self2, tweenTo.tween);
            }
          } else if (self2.isActive && lastSnap !== scroll) {
            snapDelayedCall.restart(true);
          }
        }).pause();
      }
      id2 && (_ids[id2] = self2);
      trigger = self2.trigger = _getTarget(trigger || pin !== true && pin);
      customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
      customRevertReturn && (customRevertReturn = customRevertReturn(self2));
      pin = pin === true ? trigger : _getTarget(pin);
      _isString3(toggleClass) && (toggleClass = {
        targets: trigger,
        className: toggleClass
      });
      if (pin) {
        pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding);
        self2.pin = pin;
        pinCache = gsap3.core.getCache(pin);
        if (!pinCache.spacer) {
          if (pinSpacer) {
            pinSpacer = _getTarget(pinSpacer);
            pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
            pinCache.spacerIsNative = !!pinSpacer;
            pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
          }
          pinCache.spacer = spacer = pinSpacer || _doc4.createElement("div");
          spacer.classList.add("pin-spacer");
          id2 && spacer.classList.add("pin-spacer-" + id2);
          pinCache.pinState = pinOriginalState = _getState(pin);
        } else {
          pinOriginalState = pinCache.pinState;
        }
        vars.force3D !== false && gsap3.set(pin, {
          force3D: true
        });
        self2.spacer = spacer = pinCache.spacer;
        cs = _getComputedStyle(pin);
        spacingStart = cs[pinSpacing + direction.os2];
        pinGetter = gsap3.getProperty(pin);
        pinSetter = gsap3.quickSetter(pin, direction.a, _px);
        _swapPinIn(pin, spacer, cs);
        pinState = _getState(pin);
      }
      if (markers) {
        markerVars = _isObject3(markers) ? _setDefaults3(markers, _markerDefaults) : _markerDefaults;
        markerStartTrigger = _createMarker("scroller-start", id2, scroller, direction, markerVars, 0);
        markerEndTrigger = _createMarker("scroller-end", id2, scroller, direction, markerVars, 0, markerStartTrigger);
        offset = markerStartTrigger["offset" + direction.op.d2];
        var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
        markerStart = this.markerStart = _createMarker("start", id2, content, direction, markerVars, offset, 0, containerAnimation);
        markerEnd = this.markerEnd = _createMarker("end", id2, content, direction, markerVars, offset, 0, containerAnimation);
        containerAnimation && (caMarkerSetter = gsap3.quickSetter([markerStart, markerEnd], direction.a, _px));
        if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
          _makePositionable(isViewport ? _body2 : scroller);
          gsap3.set([markerStartTrigger, markerEndTrigger], {
            force3D: true
          });
          markerStartSetter = gsap3.quickSetter(markerStartTrigger, direction.a, _px);
          markerEndSetter = gsap3.quickSetter(markerEndTrigger, direction.a, _px);
        }
      }
      if (containerAnimation) {
        var oldOnUpdate = containerAnimation.vars.onUpdate, oldParams = containerAnimation.vars.onUpdateParams;
        containerAnimation.eventCallback("onUpdate", function() {
          self2.update(0, 0, 1);
          oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
        });
      }
      self2.previous = function() {
        return _triggers[_triggers.indexOf(self2) - 1];
      };
      self2.next = function() {
        return _triggers[_triggers.indexOf(self2) + 1];
      };
      self2.revert = function(revert, temp) {
        if (!temp) {
          return self2.kill(true);
        }
        var r = revert !== false || !self2.enabled, prevRefreshing = _refreshing;
        if (r !== self2.isReverted) {
          if (r) {
            prevScroll = Math.max(scrollFunc(), self2.scroll.rec || 0);
            prevProgress = self2.progress;
            prevAnimProgress = animation && animation.progress();
          }
          markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
            return m.style.display = r ? "none" : "block";
          });
          if (r) {
            _refreshing = self2;
            self2.update(r);
          }
          if (pin && (!pinReparent || !self2.isActive)) {
            if (r) {
              _swapPinOut(pin, spacer, pinOriginalState);
            } else {
              _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
            }
          }
          r || self2.update(r);
          _refreshing = prevRefreshing;
          self2.isReverted = r;
        }
      };
      self2.refresh = function(soft, force, position, pinOffset) {
        if ((_refreshing || !self2.enabled) && !force) {
          return;
        }
        if (pin && soft && _lastScrollTime) {
          _addListener3(ScrollTrigger3, "scrollEnd", _softRefresh);
          return;
        }
        !_refreshingAll && onRefreshInit && onRefreshInit(self2);
        _refreshing = self2;
        if (tweenTo.tween && !position) {
          tweenTo.tween.kill();
          tweenTo.tween = 0;
        }
        scrubTween && scrubTween.pause();
        invalidateOnRefresh && animation && animation.revert({
          kill: false
        }).invalidate();
        self2.isReverted || self2.revert(true, true);
        self2._subPinOffset = false;
        var size = getScrollerSize(), scrollerBounds = getScrollerOffsets(), max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction), isFirstRefresh = change <= 0.01, offset2 = 0, otherPinOffset = pinOffset || 0, parsedEnd = _isObject3(position) ? position.end : vars.end, parsedEndTrigger = vars.endTrigger || trigger, parsedStart = _isObject3(position) ? position.start : vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"), pinnedContainer = self2.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer, self2), triggerIndex = trigger && Math.max(0, _triggers.indexOf(self2)) || 0, i = triggerIndex, cs2, bounds, scroll, isVertical, override, curTrigger, curPin, oppositeScroll, initted, revertedPins, forcedOverflow, markerStartOffset, markerEndOffset;
        if (markers && _isObject3(position)) {
          markerStartOffset = gsap3.getProperty(markerStartTrigger, direction.p);
          markerEndOffset = gsap3.getProperty(markerEndTrigger, direction.p);
        }
        while (i--) {
          curTrigger = _triggers[i];
          curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self2);
          curPin = curTrigger.pin;
          if (curPin && (curPin === trigger || curPin === pin || curPin === pinnedContainer) && !curTrigger.isReverted) {
            revertedPins || (revertedPins = []);
            revertedPins.unshift(curTrigger);
            curTrigger.revert(true, true);
          }
          if (curTrigger !== _triggers[i]) {
            triggerIndex--;
            i--;
          }
        }
        _isFunction3(parsedStart) && (parsedStart = parsedStart(self2));
        parsedStart = _parseClamp(parsedStart, "start", self2);
        start = _parsePosition3(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self2, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self2._startClamp && "_startClamp") || (pin ? -1e-3 : 0);
        _isFunction3(parsedEnd) && (parsedEnd = parsedEnd(self2));
        if (_isString3(parsedEnd) && !parsedEnd.indexOf("+=")) {
          if (~parsedEnd.indexOf(" ")) {
            parsedEnd = (_isString3(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
          } else {
            offset2 = _offsetToPx(parsedEnd.substr(2), size);
            parsedEnd = _isString3(parsedStart) ? parsedStart : (containerAnimation ? gsap3.utils.mapRange(0, containerAnimation.duration(), containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, start) : start) + offset2;
            parsedEndTrigger = trigger;
          }
        }
        parsedEnd = _parseClamp(parsedEnd, "end", self2);
        end = Math.max(start, _parsePosition3(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset2, markerEnd, markerEndTrigger, self2, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self2._endClamp && "_endClamp")) || -1e-3;
        offset2 = 0;
        i = triggerIndex;
        while (i--) {
          curTrigger = _triggers[i];
          curPin = curTrigger.pin;
          if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
            cs2 = curTrigger.end - (self2._startClamp ? Math.max(0, curTrigger.start) : curTrigger.start);
            if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && isNaN(parsedStart)) {
              offset2 += cs2 * (1 - curTrigger.progress);
            }
            curPin === pin && (otherPinOffset += cs2);
          }
        }
        start += offset2;
        end += offset2;
        self2._startClamp && (self2._startClamp += offset2);
        if (self2._endClamp && !_refreshingAll) {
          self2._endClamp = end || -1e-3;
          end = Math.min(end, _maxScroll(scroller, direction));
        }
        change = end - start || (start -= 0.01) && 1e-3;
        if (isFirstRefresh) {
          prevProgress = gsap3.utils.clamp(0, 1, gsap3.utils.normalize(start, end, prevScroll));
        }
        self2._pinPush = otherPinOffset;
        if (markerStart && offset2) {
          cs2 = {};
          cs2[direction.a] = "+=" + offset2;
          pinnedContainer && (cs2[direction.p] = "-=" + scrollFunc());
          gsap3.set([markerStart, markerEnd], cs2);
        }
        if (pin && !(_clampingMax && self2.end >= _maxScroll(scroller, direction))) {
          cs2 = _getComputedStyle(pin);
          isVertical = direction === _vertical;
          scroll = scrollFunc();
          pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
          if (!max && end > 1) {
            forcedOverflow = (isViewport ? _doc4.scrollingElement || _docEl2 : scroller).style;
            forcedOverflow = {
              style: forcedOverflow,
              value: forcedOverflow["overflow" + direction.a.toUpperCase()]
            };
            if (isViewport && _getComputedStyle(_body2)["overflow" + direction.a.toUpperCase()] !== "scroll") {
              forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
            }
          }
          _swapPinIn(pin, spacer, cs2);
          pinState = _getState(pin);
          bounds = _getBounds(pin, true);
          oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
          if (pinSpacing) {
            spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
            spacerState.t = spacer;
            i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
            if (i) {
              spacerState.push(direction.d, i + _px);
              spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
            }
            _setState(spacerState);
            if (pinnedContainer) {
              _triggers.forEach(function(t) {
                if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
                  t._subPinOffset = true;
                }
              });
            }
            useFixedPosition && scrollFunc(prevScroll);
          } else {
            i = _getSize(pin, direction);
            i && spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
          }
          if (useFixedPosition) {
            override = {
              top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
              left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
              boxSizing: "border-box",
              position: "fixed"
            };
            override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
            override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
            override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
            override[_padding] = cs2[_padding];
            override[_padding + _Top] = cs2[_padding + _Top];
            override[_padding + _Right] = cs2[_padding + _Right];
            override[_padding + _Bottom] = cs2[_padding + _Bottom];
            override[_padding + _Left] = cs2[_padding + _Left];
            pinActiveState = _copyState(pinOriginalState, override, pinReparent);
            _refreshingAll && scrollFunc(0);
          }
          if (animation) {
            initted = animation._initted;
            _suppressOverwrites2(1);
            animation.render(animation.duration(), true, true);
            pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
            pinMoves = Math.abs(change - pinChange) > 1;
            useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2);
            animation.render(0, true, true);
            initted || animation.invalidate(true);
            animation.parent || animation.totalTime(animation.totalTime());
            _suppressOverwrites2(0);
          } else {
            pinChange = change;
          }
          forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
        } else if (trigger && scrollFunc() && !containerAnimation) {
          bounds = trigger.parentNode;
          while (bounds && bounds !== _body2) {
            if (bounds._pinOffset) {
              start -= bounds._pinOffset;
              end -= bounds._pinOffset;
            }
            bounds = bounds.parentNode;
          }
        }
        revertedPins && revertedPins.forEach(function(t) {
          return t.revert(false, true);
        });
        self2.start = start;
        self2.end = end;
        scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc();
        if (!containerAnimation && !_refreshingAll) {
          scroll1 < prevScroll && scrollFunc(prevScroll);
          self2.scroll.rec = 0;
        }
        self2.revert(false, true);
        lastRefresh = _getTime2();
        if (snapDelayedCall) {
          lastSnap = -1;
          snapDelayedCall.restart(true);
        }
        _refreshing = 0;
        animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress || 0, true).render(animation.time(), true, true);
        if (isFirstRefresh || prevProgress !== self2.progress || containerAnimation || invalidateOnRefresh) {
          animation && !isToggle && animation.totalProgress(containerAnimation && start < -1e-3 && !prevProgress ? gsap3.utils.normalize(start, end, 0) : prevProgress, true);
          self2.progress = isFirstRefresh || (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
        }
        pin && pinSpacing && (spacer._pinOffset = Math.round(self2.progress * pinChange));
        scrubTween && scrubTween.invalidate();
        if (!isNaN(markerStartOffset)) {
          markerStartOffset -= gsap3.getProperty(markerStartTrigger, direction.p);
          markerEndOffset -= gsap3.getProperty(markerEndTrigger, direction.p);
          _shiftMarker(markerStartTrigger, direction, markerStartOffset);
          _shiftMarker(markerStart, direction, markerStartOffset - (pinOffset || 0));
          _shiftMarker(markerEndTrigger, direction, markerEndOffset);
          _shiftMarker(markerEnd, direction, markerEndOffset - (pinOffset || 0));
        }
        isFirstRefresh && !_refreshingAll && self2.update();
        if (onRefresh && !_refreshingAll && !executingOnRefresh) {
          executingOnRefresh = true;
          onRefresh(self2);
          executingOnRefresh = false;
        }
      };
      self2.getVelocity = function() {
        return (scrollFunc() - scroll2) / (_getTime2() - _time2) * 1e3 || 0;
      };
      self2.endAnimation = function() {
        _endAnimation(self2.callbackAnimation);
        if (animation) {
          scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self2.direction < 0, 1);
        }
      };
      self2.labelToScroll = function(label) {
        return animation && animation.labels && (start || self2.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
      };
      self2.getTrailing = function(name) {
        var i = _triggers.indexOf(self2), a = self2.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);
        return (_isString3(name) ? a.filter(function(t) {
          return t.vars.preventOverlaps === name;
        }) : a).filter(function(t) {
          return self2.direction > 0 ? t.end <= start : t.start >= end;
        });
      };
      self2.update = function(reset, recordVelocity, forceFake) {
        if (containerAnimation && !forceFake && !reset) {
          return;
        }
        var scroll = _refreshingAll === true ? prevScroll : self2.scroll(), p = reset ? 0 : (scroll - start) / change, clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0, prevProgress2 = self2.progress, isActive, wasActive, toggleState, action, stateChanged, toggled, isAtMax, isTakingAction;
        if (recordVelocity) {
          scroll2 = scroll1;
          scroll1 = containerAnimation ? scrollFunc() : scroll;
          if (snap3) {
            snap22 = snap1;
            snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
          }
        }
        if (anticipatePin && pin && !_refreshing && !_startup2 && _lastScrollTime) {
          if (!clipped && start < scroll + (scroll - scroll2) / (_getTime2() - _time2) * anticipatePin) {
            clipped = 1e-4;
          } else if (clipped === 1 && end > scroll + (scroll - scroll2) / (_getTime2() - _time2) * anticipatePin) {
            clipped = 0.9999;
          }
        }
        if (clipped !== prevProgress2 && self2.enabled) {
          isActive = self2.isActive = !!clipped && clipped < 1;
          wasActive = !!prevProgress2 && prevProgress2 < 1;
          toggled = isActive !== wasActive;
          stateChanged = toggled || !!clipped !== !!prevProgress2;
          self2.direction = clipped > prevProgress2 ? 1 : -1;
          self2.progress = clipped;
          if (stateChanged && !_refreshing) {
            toggleState = clipped && !prevProgress2 ? 0 : clipped === 1 ? 1 : prevProgress2 === 1 ? 2 : 3;
            if (isToggle) {
              action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState];
              isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
            }
          }
          preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction3(preventOverlaps) ? preventOverlaps(self2) : self2.getTrailing(preventOverlaps).forEach(function(t) {
            return t.endAnimation();
          }));
          if (!isToggle) {
            if (scrubTween && !_refreshing && !_startup2) {
              scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start);
              if (scrubTween.resetTo) {
                scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
              } else {
                scrubTween.vars.totalProgress = clipped;
                scrubTween.invalidate().restart();
              }
            } else if (animation) {
              animation.totalProgress(clipped, !!(_refreshing && (lastRefresh || reset)));
            }
          }
          if (pin) {
            reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
            if (!useFixedPosition) {
              pinSetter(_round3(pinStart + pinChange * clipped));
            } else if (stateChanged) {
              isAtMax = !reset && clipped > prevProgress2 && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);
              if (pinReparent) {
                if (!reset && (isActive || isAtMax)) {
                  var bounds = _getBounds(pin, true), _offset = scroll - start;
                  _reparent(pin, _body2, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
                } else {
                  _reparent(pin, spacer);
                }
              }
              _setState(isActive || isAtMax ? pinActiveState : pinState);
              pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
            }
          }
          snap3 && !tweenTo.tween && !_refreshing && !_startup2 && snapDelayedCall.restart(true);
          toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function(el) {
            return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
          });
          onUpdate && !isToggle && !reset && onUpdate(self2);
          if (stateChanged && !_refreshing) {
            if (isToggle) {
              if (isTakingAction) {
                if (action === "complete") {
                  animation.pause().totalProgress(1);
                } else if (action === "reset") {
                  animation.restart(true).pause();
                } else if (action === "restart") {
                  animation.restart(true);
                } else {
                  animation[action]();
                }
              }
              onUpdate && onUpdate(self2);
            }
            if (toggled || !_limitCallbacks) {
              onToggle && toggled && _callback3(self2, onToggle);
              callbacks[toggleState] && _callback3(self2, callbacks[toggleState]);
              once && (clipped === 1 ? self2.kill(false, 1) : callbacks[toggleState] = 0);
              if (!toggled) {
                toggleState = clipped === 1 ? 1 : 3;
                callbacks[toggleState] && _callback3(self2, callbacks[toggleState]);
              }
            }
            if (fastScrollEnd && !isActive && Math.abs(self2.getVelocity()) > (_isNumber3(fastScrollEnd) ? fastScrollEnd : 2500)) {
              _endAnimation(self2.callbackAnimation);
              scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
            }
          } else if (isToggle && onUpdate && !_refreshing) {
            onUpdate(self2);
          }
        }
        if (markerEndSetter) {
          var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
          markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
          markerEndSetter(n);
        }
        caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
      };
      self2.enable = function(reset, refresh) {
        if (!self2.enabled) {
          self2.enabled = true;
          _addListener3(scroller, "resize", _onResize);
          isViewport || _addListener3(scroller, "scroll", _onScroll3);
          onRefreshInit && _addListener3(ScrollTrigger3, "refreshInit", onRefreshInit);
          if (reset !== false) {
            self2.progress = prevProgress = 0;
            scroll1 = scroll2 = lastSnap = scrollFunc();
          }
          refresh !== false && self2.refresh();
        }
      };
      self2.getTween = function(snap4) {
        return snap4 && tweenTo ? tweenTo.tween : scrubTween;
      };
      self2.setPositions = function(newStart, newEnd, keepClamp, pinOffset) {
        if (containerAnimation) {
          var st = containerAnimation.scrollTrigger, duration = containerAnimation.duration(), _change = st.end - st.start;
          newStart = st.start + _change * newStart / duration;
          newEnd = st.start + _change * newEnd / duration;
        }
        self2.refresh(false, false, {
          start: _keepClamp(newStart, keepClamp && !!self2._startClamp),
          end: _keepClamp(newEnd, keepClamp && !!self2._endClamp)
        }, pinOffset);
        self2.update();
      };
      self2.adjustPinSpacing = function(amount) {
        if (spacerState && amount) {
          var i = spacerState.indexOf(direction.d) + 1;
          spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
          spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
          _setState(spacerState);
        }
      };
      self2.disable = function(reset, allowAnimation) {
        if (self2.enabled) {
          reset !== false && self2.revert(true, true);
          self2.enabled = self2.isActive = false;
          allowAnimation || scrubTween && scrubTween.pause();
          prevScroll = 0;
          pinCache && (pinCache.uncache = 1);
          onRefreshInit && _removeListener3(ScrollTrigger3, "refreshInit", onRefreshInit);
          if (snapDelayedCall) {
            snapDelayedCall.pause();
            tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
          }
          if (!isViewport) {
            var i = _triggers.length;
            while (i--) {
              if (_triggers[i].scroller === scroller && _triggers[i] !== self2) {
                return;
              }
            }
            _removeListener3(scroller, "resize", _onResize);
            isViewport || _removeListener3(scroller, "scroll", _onScroll3);
          }
        }
      };
      self2.kill = function(revert, allowAnimation) {
        self2.disable(revert, allowAnimation);
        scrubTween && !allowAnimation && scrubTween.kill();
        id2 && delete _ids[id2];
        var i = _triggers.indexOf(self2);
        i >= 0 && _triggers.splice(i, 1);
        i === _i && _direction > 0 && _i--;
        i = 0;
        _triggers.forEach(function(t) {
          return t.scroller === self2.scroller && (i = 1);
        });
        i || _refreshingAll || (self2.scroll.rec = 0);
        if (animation) {
          animation.scrollTrigger = null;
          revert && animation.revert({
            kill: false
          });
          allowAnimation || animation.kill();
        }
        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
          return m.parentNode && m.parentNode.removeChild(m);
        });
        _primary === self2 && (_primary = 0);
        if (pin) {
          pinCache && (pinCache.uncache = 1);
          i = 0;
          _triggers.forEach(function(t) {
            return t.pin === pin && i++;
          });
          i || (pinCache.spacer = 0);
        }
        vars.onKill && vars.onKill(self2);
      };
      _triggers.push(self2);
      self2.enable(false, false);
      customRevertReturn && customRevertReturn(self2);
      if (animation && animation.add && !change) {
        var updateFunc = self2.update;
        self2.update = function() {
          self2.update = updateFunc;
          start || end || self2.refresh();
        };
        gsap3.delayedCall(0.01, self2.update);
        change = 0.01;
        start = end = 0;
      } else {
        self2.refresh();
      }
      pin && _queueRefreshAll();
    };
    ScrollTrigger3.register = function register(core) {
      if (!_coreInitted3) {
        gsap3 = core || _getGSAP3();
        _windowExists5() && window.document && ScrollTrigger3.enable();
        _coreInitted3 = _enabled;
      }
      return _coreInitted3;
    };
    ScrollTrigger3.defaults = function defaults2(config3) {
      if (config3) {
        for (var p in config3) {
          _defaults2[p] = config3[p];
        }
      }
      return _defaults2;
    };
    ScrollTrigger3.disable = function disable(reset, kill) {
      _enabled = 0;
      _triggers.forEach(function(trigger) {
        return trigger[kill ? "kill" : "disable"](reset);
      });
      _removeListener3(_win4, "wheel", _onScroll3);
      _removeListener3(_doc4, "scroll", _onScroll3);
      clearInterval(_syncInterval);
      _removeListener3(_doc4, "touchcancel", _passThrough3);
      _removeListener3(_body2, "touchstart", _passThrough3);
      _multiListener(_removeListener3, _doc4, "pointerdown,touchstart,mousedown", _pointerDownHandler);
      _multiListener(_removeListener3, _doc4, "pointerup,touchend,mouseup", _pointerUpHandler);
      _resizeDelay.kill();
      _iterateAutoRefresh(_removeListener3);
      for (var i = 0; i < _scrollers.length; i += 3) {
        _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 1]);
        _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 2]);
      }
    };
    ScrollTrigger3.enable = function enable() {
      _win4 = window;
      _doc4 = document;
      _docEl2 = _doc4.documentElement;
      _body2 = _doc4.body;
      if (gsap3) {
        _toArray = gsap3.utils.toArray;
        _clamp4 = gsap3.utils.clamp;
        _context3 = gsap3.core.context || _passThrough3;
        _suppressOverwrites2 = gsap3.core.suppressOverwrites || _passThrough3;
        _scrollRestoration = _win4.history.scrollRestoration || "auto";
        _lastScroll = _win4.pageYOffset;
        gsap3.core.globals("ScrollTrigger", ScrollTrigger3);
        if (_body2) {
          _enabled = 1;
          _div100vh = document.createElement("div");
          _div100vh.style.height = "100vh";
          _div100vh.style.position = "absolute";
          _refresh100vh();
          _rafBugFix();
          Observer.register(gsap3);
          ScrollTrigger3.isTouch = Observer.isTouch;
          _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
          _ignoreMobileResize = Observer.isTouch === 1;
          _addListener3(_win4, "wheel", _onScroll3);
          _root2 = [_win4, _doc4, _docEl2, _body2];
          if (gsap3.matchMedia) {
            ScrollTrigger3.matchMedia = function(vars) {
              var mm = gsap3.matchMedia(), p;
              for (p in vars) {
                mm.add(p, vars[p]);
              }
              return mm;
            };
            gsap3.addEventListener("matchMediaInit", function() {
              return _revertAll();
            });
            gsap3.addEventListener("matchMediaRevert", function() {
              return _revertRecorded();
            });
            gsap3.addEventListener("matchMedia", function() {
              _refreshAll(0, 1);
              _dispatch3("matchMedia");
            });
            gsap3.matchMedia("(orientation: portrait)", function() {
              _setBaseDimensions();
              return _setBaseDimensions;
            });
          } else {
            console.warn("Requires GSAP 3.11.0 or later");
          }
          _setBaseDimensions();
          _addListener3(_doc4, "scroll", _onScroll3);
          var bodyStyle = _body2.style, border = bodyStyle.borderTopStyle, AnimationProto = gsap3.core.Animation.prototype, bounds, i;
          AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
            value: function value() {
              return this.time(-0.01, true);
            }
          });
          bodyStyle.borderTopStyle = "solid";
          bounds = _getBounds(_body2);
          _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
          _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
          border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
          _syncInterval = setInterval(_sync, 250);
          gsap3.delayedCall(0.5, function() {
            return _startup2 = 0;
          });
          _addListener3(_doc4, "touchcancel", _passThrough3);
          _addListener3(_body2, "touchstart", _passThrough3);
          _multiListener(_addListener3, _doc4, "pointerdown,touchstart,mousedown", _pointerDownHandler);
          _multiListener(_addListener3, _doc4, "pointerup,touchend,mouseup", _pointerUpHandler);
          _transformProp2 = gsap3.utils.checkPrefix("transform");
          _stateProps.push(_transformProp2);
          _coreInitted3 = _getTime2();
          _resizeDelay = gsap3.delayedCall(0.2, _refreshAll).pause();
          _autoRefresh = [_doc4, "visibilitychange", function() {
            var w = _win4.innerWidth, h = _win4.innerHeight;
            if (_doc4.hidden) {
              _prevWidth = w;
              _prevHeight = h;
            } else if (_prevWidth !== w || _prevHeight !== h) {
              _onResize();
            }
          }, _doc4, "DOMContentLoaded", _refreshAll, _win4, "load", _refreshAll, _win4, "resize", _onResize];
          _iterateAutoRefresh(_addListener3);
          _triggers.forEach(function(trigger) {
            return trigger.enable(0, 1);
          });
          for (i = 0; i < _scrollers.length; i += 3) {
            _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 1]);
            _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 2]);
          }
        }
      }
    };
    ScrollTrigger3.config = function config3(vars) {
      "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
      var ms = vars.syncInterval;
      ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
      "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger3.isTouch === 1 && vars.ignoreMobileResize);
      if ("autoRefreshEvents" in vars) {
        _iterateAutoRefresh(_removeListener3) || _iterateAutoRefresh(_addListener3, vars.autoRefreshEvents || "none");
        _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
      }
    };
    ScrollTrigger3.scrollerProxy = function scrollerProxy(target, vars) {
      var t = _getTarget(target), i = _scrollers.indexOf(t), isViewport = _isViewport3(t);
      if (~i) {
        _scrollers.splice(i, isViewport ? 6 : 2);
      }
      if (vars) {
        isViewport ? _proxies.unshift(_win4, vars, _body2, vars, _docEl2, vars) : _proxies.unshift(t, vars);
      }
    };
    ScrollTrigger3.clearMatchMedia = function clearMatchMedia(query) {
      _triggers.forEach(function(t) {
        return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
      });
    };
    ScrollTrigger3.isInViewport = function isInViewport(element2, ratio, horizontal) {
      var bounds = (_isString3(element2) ? _getTarget(element2) : element2).getBoundingClientRect(), offset = bounds[horizontal ? _width : _height] * ratio || 0;
      return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win4.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win4.innerHeight;
    };
    ScrollTrigger3.positionInViewport = function positionInViewport(element2, referencePoint, horizontal) {
      _isString3(element2) && (element2 = _getTarget(element2));
      var bounds = element2.getBoundingClientRect(), size = bounds[horizontal ? _width : _height], offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
      return horizontal ? (bounds.left + offset) / _win4.innerWidth : (bounds.top + offset) / _win4.innerHeight;
    };
    ScrollTrigger3.killAll = function killAll(allowListeners) {
      _triggers.slice(0).forEach(function(t) {
        return t.vars.id !== "ScrollSmoother" && t.kill();
      });
      if (allowListeners !== true) {
        var listeners = _listeners2.killAll || [];
        _listeners2 = {};
        listeners.forEach(function(f) {
          return f();
        });
      }
    };
    return ScrollTrigger3;
  }();
  ScrollTrigger2.version = "3.12.5";
  ScrollTrigger2.saveStyles = function(targets) {
    return targets ? _toArray(targets).forEach(function(target) {
      if (target && target.style) {
        var i = _savedStyles.indexOf(target);
        i >= 0 && _savedStyles.splice(i, 5);
        _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap3.core.getCache(target), _context3());
      }
    }) : _savedStyles;
  };
  ScrollTrigger2.revert = function(soft, media) {
    return _revertAll(!soft, media);
  };
  ScrollTrigger2.create = function(vars, animation) {
    return new ScrollTrigger2(vars, animation);
  };
  ScrollTrigger2.refresh = function(safe) {
    return safe ? _onResize() : (_coreInitted3 || ScrollTrigger2.register()) && _refreshAll(true);
  };
  ScrollTrigger2.update = function(force) {
    return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
  };
  ScrollTrigger2.clearScrollMemory = _clearScrollMemory;
  ScrollTrigger2.maxScroll = function(element2, horizontal) {
    return _maxScroll(element2, horizontal ? _horizontal : _vertical);
  };
  ScrollTrigger2.getScrollFunc = function(element2, horizontal) {
    return _getScrollFunc(_getTarget(element2), horizontal ? _horizontal : _vertical);
  };
  ScrollTrigger2.getById = function(id2) {
    return _ids[id2];
  };
  ScrollTrigger2.getAll = function() {
    return _triggers.filter(function(t) {
      return t.vars.id !== "ScrollSmoother";
    });
  };
  ScrollTrigger2.isScrolling = function() {
    return !!_lastScrollTime;
  };
  ScrollTrigger2.snapDirectional = _snapDirectional;
  ScrollTrigger2.addEventListener = function(type, callback) {
    var a = _listeners2[type] || (_listeners2[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  };
  ScrollTrigger2.removeEventListener = function(type, callback) {
    var a = _listeners2[type], i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  };
  ScrollTrigger2.batch = function(targets, vars) {
    var result = [], varsCopy = {}, interval = vars.interval || 0.016, batchMax = vars.batchMax || 1e9, proxyCallback = function proxyCallback2(type, callback) {
      var elements = [], triggers = [], delay = gsap3.delayedCall(interval, function() {
        callback(elements, triggers);
        elements = [];
        triggers = [];
      }).pause();
      return function(self2) {
        elements.length || delay.restart(true);
        elements.push(self2.trigger);
        triggers.push(self2);
        batchMax <= elements.length && delay.progress(1);
      };
    }, p;
    for (p in vars) {
      varsCopy[p] = p.substr(0, 2) === "on" && _isFunction3(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
    }
    if (_isFunction3(batchMax)) {
      batchMax = batchMax();
      _addListener3(ScrollTrigger2, "refresh", function() {
        return batchMax = vars.batchMax();
      });
    }
    _toArray(targets).forEach(function(target) {
      var config3 = {};
      for (p in varsCopy) {
        config3[p] = varsCopy[p];
      }
      config3.trigger = target;
      result.push(ScrollTrigger2.create(config3));
    });
    return result;
  };
  var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier2(scrollFunc, current, end, max) {
    current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
    return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
  };
  var _allowNativePanning = function _allowNativePanning2(target, direction) {
    if (direction === true) {
      target.style.removeProperty("touch-action");
    } else {
      target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none";
    }
    target === _docEl2 && _allowNativePanning2(_body2, direction);
  };
  var _overflow = {
    auto: 1,
    scroll: 1
  };
  var _nestedScroll = function _nestedScroll2(_ref5) {
    var event = _ref5.event, target = _ref5.target, axis = _ref5.axis;
    var node = (event.changedTouches ? event.changedTouches[0] : event).target, cache2 = node._gsap || gsap3.core.getCache(node), time = _getTime2(), cs;
    if (!cache2._isScrollT || time - cache2._isScrollT > 2e3) {
      while (node && node !== _body2 && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) {
        node = node.parentNode;
      }
      cache2._isScroll = node && node !== target && !_isViewport3(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
      cache2._isScrollT = time;
    }
    if (cache2._isScroll || axis === "x") {
      event.stopPropagation();
      event._gsapAllow = true;
    }
  };
  var _inputObserver = function _inputObserver2(target, type, inputs, nested) {
    return Observer.create({
      target,
      capture: true,
      debounce: false,
      lockAxis: true,
      type,
      onWheel: nested = nested && _nestedScroll,
      onPress: nested,
      onDrag: nested,
      onScroll: nested,
      onEnable: function onEnable() {
        return inputs && _addListener3(_doc4, Observer.eventTypes[0], _captureInputs, false, true);
      },
      onDisable: function onDisable() {
        return _removeListener3(_doc4, Observer.eventTypes[0], _captureInputs, true);
      }
    });
  };
  var _inputExp = /(input|label|select|textarea)/i;
  var _inputIsFocused;
  var _captureInputs = function _captureInputs2(e) {
    var isInput = _inputExp.test(e.target.tagName);
    if (isInput || _inputIsFocused) {
      e._gsapAllow = true;
      _inputIsFocused = isInput;
    }
  };
  var _getScrollNormalizer = function _getScrollNormalizer2(vars) {
    _isObject3(vars) || (vars = {});
    vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
    vars.type || (vars.type = "wheel,touch");
    vars.debounce = !!vars.debounce;
    vars.id = vars.id || "normalizer";
    var _vars2 = vars, normalizeScrollX = _vars2.normalizeScrollX, momentum = _vars2.momentum, allowNestedScroll = _vars2.allowNestedScroll, onRelease = _vars2.onRelease, self2, maxY, target = _getTarget(vars.target) || _docEl2, smoother = gsap3.core.globals().ScrollSmoother, smootherInstance = smoother && smoother.get(), content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()), scrollFuncY = _getScrollFunc(target, _vertical), scrollFuncX = _getScrollFunc(target, _horizontal), scale = 1, initialScale = (Observer.isTouch && _win4.visualViewport ? _win4.visualViewport.scale * _win4.visualViewport.width : _win4.outerWidth) / _win4.innerWidth, wheelRefresh = 0, resolveMomentumDuration = _isFunction3(momentum) ? function() {
      return momentum(self2);
    } : function() {
      return momentum || 2.8;
    }, lastRefreshID, skipTouchMove, inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll), resumeTouchMove = function resumeTouchMove2() {
      return skipTouchMove = false;
    }, scrollClampX = _passThrough3, scrollClampY = _passThrough3, updateClamps = function updateClamps2() {
      maxY = _maxScroll(target, _vertical);
      scrollClampY = _clamp4(_fixIOSBug ? 1 : 0, maxY);
      normalizeScrollX && (scrollClampX = _clamp4(0, _maxScroll(target, _horizontal)));
      lastRefreshID = _refreshID;
    }, removeContentOffset = function removeContentOffset2() {
      content._gsap.y = _round3(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
      content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
      scrollFuncY.offset = scrollFuncY.cacheID = 0;
    }, ignoreDrag = function ignoreDrag2() {
      if (skipTouchMove) {
        requestAnimationFrame(resumeTouchMove);
        var offset = _round3(self2.deltaY / 2), scroll = scrollClampY(scrollFuncY.v - offset);
        if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
          scrollFuncY.offset = scroll - scrollFuncY.v;
          var y = _round3((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
          content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
          content._gsap.y = y + "px";
          scrollFuncY.cacheID = _scrollers.cache;
          _updateAll();
        }
        return true;
      }
      scrollFuncY.offset && removeContentOffset();
      skipTouchMove = true;
    }, tween, startScrollX, startScrollY, onStopDelayedCall, onResize = function onResize2() {
      updateClamps();
      if (tween.isActive() && tween.vars.scrollY > maxY) {
        scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
      }
    };
    content && gsap3.set(content, {
      y: "+=0"
    });
    vars.ignoreCheck = function(e) {
      return _fixIOSBug && e.type === "touchmove" && ignoreDrag(e) || scale > 1.05 && e.type !== "touchstart" || self2.isGesturing || e.touches && e.touches.length > 1;
    };
    vars.onPress = function() {
      skipTouchMove = false;
      var prevScale = scale;
      scale = _round3((_win4.visualViewport && _win4.visualViewport.scale || 1) / initialScale);
      tween.pause();
      prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
      startScrollX = scrollFuncX();
      startScrollY = scrollFuncY();
      updateClamps();
      lastRefreshID = _refreshID;
    };
    vars.onRelease = vars.onGestureStart = function(self3, wasDragging) {
      scrollFuncY.offset && removeContentOffset();
      if (!wasDragging) {
        onStopDelayedCall.restart(true);
      } else {
        _scrollers.cache++;
        var dur = resolveMomentumDuration(), currentScroll, endScroll;
        if (normalizeScrollX) {
          currentScroll = scrollFuncX();
          endScroll = currentScroll + dur * 0.05 * -self3.velocityX / 0.227;
          dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
          tween.vars.scrollX = scrollClampX(endScroll);
        }
        currentScroll = scrollFuncY();
        endScroll = currentScroll + dur * 0.05 * -self3.velocityY / 0.227;
        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
        tween.vars.scrollY = scrollClampY(endScroll);
        tween.invalidate().duration(dur).play(0.01);
        if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
          gsap3.to({}, {
            onUpdate: onResize,
            duration: dur
          });
        }
      }
      onRelease && onRelease(self3);
    };
    vars.onWheel = function() {
      tween._ts && tween.pause();
      if (_getTime2() - wheelRefresh > 1e3) {
        lastRefreshID = 0;
        wheelRefresh = _getTime2();
      }
    };
    vars.onChange = function(self3, dx, dy, xArray, yArray) {
      _refreshID !== lastRefreshID && updateClamps();
      dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self3.startX - self3.x) : scrollFuncX() + dx - xArray[1]));
      if (dy) {
        scrollFuncY.offset && removeContentOffset();
        var isTouch = yArray[2] === dy, y = isTouch ? startScrollY + self3.startY - self3.y : scrollFuncY() + dy - yArray[1], yClamped = scrollClampY(y);
        isTouch && y !== yClamped && (startScrollY += yClamped - y);
        scrollFuncY(yClamped);
      }
      (dy || dx) && _updateAll();
    };
    vars.onEnable = function() {
      _allowNativePanning(target, normalizeScrollX ? false : "x");
      ScrollTrigger2.addEventListener("refresh", onResize);
      _addListener3(_win4, "resize", onResize);
      if (scrollFuncY.smooth) {
        scrollFuncY.target.style.scrollBehavior = "auto";
        scrollFuncY.smooth = scrollFuncX.smooth = false;
      }
      inputObserver.enable();
    };
    vars.onDisable = function() {
      _allowNativePanning(target, true);
      _removeListener3(_win4, "resize", onResize);
      ScrollTrigger2.removeEventListener("refresh", onResize);
      inputObserver.kill();
    };
    vars.lockAxis = vars.lockAxis !== false;
    self2 = new Observer(vars);
    self2.iOS = _fixIOSBug;
    _fixIOSBug && !scrollFuncY() && scrollFuncY(1);
    _fixIOSBug && gsap3.ticker.add(_passThrough3);
    onStopDelayedCall = self2._dc;
    tween = gsap3.to(self2, {
      ease: "power4",
      paused: true,
      inherit: false,
      scrollX: normalizeScrollX ? "+=0.1" : "+=0",
      scrollY: "+=0.1",
      modifiers: {
        scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function() {
          return tween.pause();
        })
      },
      onUpdate: _updateAll,
      onComplete: onStopDelayedCall.vars.onComplete
    });
    return self2;
  };
  ScrollTrigger2.sort = function(func) {
    return _triggers.sort(func || function(a, b) {
      return (a.vars.refreshPriority || 0) * -1e6 + a.start - (b.start + (b.vars.refreshPriority || 0) * -1e6);
    });
  };
  ScrollTrigger2.observe = function(vars) {
    return new Observer(vars);
  };
  ScrollTrigger2.normalizeScroll = function(vars) {
    if (typeof vars === "undefined") {
      return _normalizer2;
    }
    if (vars === true && _normalizer2) {
      return _normalizer2.enable();
    }
    if (vars === false) {
      _normalizer2 && _normalizer2.kill();
      _normalizer2 = vars;
      return;
    }
    var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
    _normalizer2 && _normalizer2.target === normalizer.target && _normalizer2.kill();
    _isViewport3(normalizer.target) && (_normalizer2 = normalizer);
    return normalizer;
  };
  ScrollTrigger2.core = {
    // smaller file size way to leverage in ScrollSmoother and Observer
    _getVelocityProp,
    _inputObserver,
    _scrollers,
    _proxies,
    bridge: {
      // when normalizeScroll sets the scroll position (ss = setScroll)
      ss: function ss() {
        _lastScrollTime || _dispatch3("scrollStart");
        _lastScrollTime = _getTime2();
      },
      // a way to get the _refreshing value in Observer
      ref: function ref() {
        return _refreshing;
      }
    }
  };
  _getGSAP3() && gsap3.registerPlugin(ScrollTrigger2);

  // src/other-pages/proposal-animation.ts
  gsapWithCSS.registerPlugin(ScrollTrigger2);
  var proposalAnimations = () => {
    const tl = gsapWithCSS.timeline({
      scrollTrigger: {
        start: "top 80%",
        end: "bottom 20%"
      }
    });
    tl.fromTo(
      ".wrap",
      { y: 500, alpha: 0 },
      { y: 0, duration: 1, ease: "power4.out", stagger: 0.2, alpha: 1 }
    );
  };

  // src/other-pages/index.ts
  proposalAnimations();
  global();
  Dragdrop();
})();
/*! Bundled license information:

muuri/dist/muuri.module.js:
  (**
  * Muuri v0.9.5
  * https://muuri.dev/
  * Copyright (c) 2015-present, Haltu Oy
  * Released under the MIT license
  * https://github.com/haltu/muuri/blob/master/LICENSE.md
  * @license MIT
  *
  * Muuri Packer
  * Copyright (c) 2016-present, Niklas Rämö <inramo@gmail.com>
  * @license MIT
  *
  * Muuri Ticker / Muuri Emitter / Muuri Dragger
  * Copyright (c) 2018-present, Niklas Rämö <inramo@gmail.com>
  * @license MIT
  *
  * Muuri AutoScroller
  * Copyright (c) 2019-present, Niklas Rämö <inramo@gmail.com>
  * @license MIT
  *)

gsap/gsap-core.js:
  (*!
   * GSAP 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.12.5
   * https://gsap.com
   *
   * Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
//# sourceMappingURL=index.js.map
