(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var twitter = exports.twitter = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.414\"><path fill=\"currentColor\" fill-rule=\"nonzero\" d=\"M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.37-1.337.64-2.085.79-.598-.64-1.45-1.04-2.396-1.04-1.812 0-3.282 1.47-3.282 3.28 0 .26.03.51.085.75-2.728-.13-5.147-1.44-6.766-3.42C.83 2.58.67 3.14.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.41-.02-.61-.058.42 1.304 1.63 2.253 3.07 2.28-1.12.88-2.54 1.404-4.07 1.404-.26 0-.52-.015-.78-.045 1.46.93 3.18 1.474 5.04 1.474 6.04 0 9.34-5 9.34-9.33 0-.14 0-.28-.01-.42.64-.46 1.2-1.04 1.64-1.7z \"></path></svg>";

var facebook = exports.facebook = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.414\"><path fill=\"currentColor\" fill-rule=\"nonzero\" d=\"M15.117 0H.883C.395 0 0 .395 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.46V7.39h2.086V5.607c0-2.066 1.262-3.19 3.106-3.19.883 0 1.642.064 1.863.094v2.16h-1.28c-1 0-1.195.48-1.195 1.18v1.54h2.39l-.31 2.42h-2.08V16h4.077c.488 0 .883-.395.883-.883V.883C16 .395 15.605 0 15.117 0 \"></path></svg>";

var gmail = exports.gmail = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.414\"><path fill=\"currentColor\" fill-rule=\"nonzero\" d=\"M16 3v10c0 .567-.433 1-1 1h-1V4.925L8 9.233 2 4.925V14H1c-.567 0-1-.433-1-1V3c0-.283.108-.533.287-.712C.467 2.107.718 2 1 2h.333L8 6.833 14.667 2H15c.283 0 .533.108.713.288.179.179.287.429.287.712z \"></path></svg>";

},{}],2:[function(require,module,exports){
'use strict';

var _index = require('../package/dist/index.js');

var _index2 = _interopRequireDefault(_index);

var _twitter = require('../package/dist/sharers/twitter.js');

var _twitter2 = _interopRequireDefault(_twitter);

var _facebook = require('../package/dist/sharers/facebook.js');

var _facebook2 = _interopRequireDefault(_facebook);

var _email = require('../package/dist/sharers/email.js');

var _email2 = _interopRequireDefault(_email);

var _icons = require('./icons.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function (e) {
  (0, _index2.default)({
    context: '.js-sharable',
    transitionSpeed: 200
  })([function (url) {
    return '<a href="' + (0, _twitter2.default)(url) + '" target="_blank">' + _icons.twitter + '</a>';
  }, function (url) {
    return '<a href="' + (0, _facebook2.default)(url) + '" target="_blank">' + _icons.facebook + '</a>';
  }, function (url) {
    return '<a href="' + (0, _email2.default)(url) + '">' + _icons.gmail + '</a>';
  }]);
});

},{"../package/dist/index.js":3,"../package/dist/sharers/email.js":4,"../package/dist/sharers/facebook.js":5,"../package/dist/sharers/twitter.js":6,"./icons.js":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sshare = undefined;

var _tackjs = require('tackjs');

/**
 * Check if click happened
 * within the dialog
 *
 * @param {event} e The click event
 * @param {object} dialog The share dialog
 * @return {boolean}
 */
var validClick = function validClick(e, dialog) {
  return e.target !== dialog || !dialog.contains(e.target);
};

/**
 * Check if event is within
 * the user-specified scope
 *
 * @param {object} el The element that triggered the event
 * @param {array} context Array of elements to scope to
 * @return {boolean}
 */
var isInContext = function isInContext(el, context) {
  return !context || [].slice.call(document.querySelectorAll(context)).filter(function (ctx) {
    return el === ctx || ctx.contains(el);
  }).length > 0;
};

/**
 * Create the main portal
 * that the links are
 * rendered into. Set
 * accessiblity attrs.
 *
 * @return {object} a DOM element
 */
var createPortal = function createPortal() {
  var div = document.createElement('div');
  div.className = 'sshare';
  div.role = 'dialog';
  div.setAttribute('aria-label', 'Share Dialog');
  div.setAttribute('aria-hidden', 'true');
  document.body.appendChild(div);
  return div;
};

/**
 * Render share links,
 * return node and destroy method
 *
 * @param {string} text The highlighted text
 * @param {array} sharers Array of functions that return elements or strings
 * @param {object} portal The portal returned from createPortal()
 */
var render = function render(text, sharers, portal) {
  portal.innerHTML = '\n    <div class="sshare__inner">' + sharers.map(function (s) {
    var el = s(text);
    return typeof el === 'string' ? el : el.outerHTML;
  }).join('') + '</div>\n  ';

  portal.setAttribute('tabindex', '0');
  portal.setAttribute('aria-hidden', 'false');

  var node = portal.children[0];

  return {
    node: node,
    destroy: function destroy() {
      portal.removeChild(node);
    }
  };
};

/**
 * Get range object for highlighted text
 *
 * @return {object} range
 */
var getSelection = function getSelection() {
  var range = window.getSelection();

  if (range.collapsed) return null;

  return range.rangeCount < 1 ? null : range.getRangeAt(0);
};

/**
 * Init
 */
var sshare = function sshare(_ref) {
  var _ref$context = _ref.context,
      context = _ref$context === undefined ? null : _ref$context,
      _ref$transitionSpeed = _ref.transitionSpeed,
      transitionSpeed = _ref$transitionSpeed === undefined ? 200 : _ref$transitionSpeed;
  return function () {
    var sharers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var portal = createPortal();

    var bar = null;
    var dialog = null;
    var timeout = 0;
    var focusNode = null;

    /**
     * Selections
     */
    var previousRange = null;
    var currentRange = null;

    /**
     * Destroys the dialog, tackjs instance
     * removes listeners, and sets
     * accessiblity attrs back to defaults
     */
    var hide = function hide() {
      if (!dialog || !bar) return;

      window.removeEventListener('resize', hide);
      portal.classList.add('is-hiding');

      timeout = setTimeout(function () {
        portal.classList.remove('is-hiding');
        portal.classList.remove('is-active');
        bar.destroy();
        dialog.destroy();
        dialog = null;
        bar = null;
        portal.removeAttribute('tabindex');
        div.setAttribute('aria-hidden', 'true');
        focusNode.focus();
      }, transitionSpeed);
    };

    var handleSelection = function handleSelection(keyup) {
      currentRange = getSelection();

      if (!currentRange) return;

      /**
       * Save last focused node
       */
      focusNode = document.activeElement;

      var text = currentRange.toString();
      var previousText = previousRange ? previousRange.toString() : '';

      clearTimeout(timeout);

      /**
       * If no text, or the text is the same
       * after a click event, hide.
       *
       * Otherwise, if it's new text
       * render a new dialog.
       */
      if (!text || text.length <= 0 || previousText === text && !keyup) {
        hide();
      } else if (!previousRange || previousText !== text) {
        dialog = render(text, sharers, portal);

        previousRange = currentRange;

        bar = (0, _tackjs.tack)(portal, currentRange, 'top');

        /**
         * Ensures you don't see the
         * dialog fly into place
         */
        setTimeout(function () {
          portal.focus();
          portal.classList.remove('is-hiding');
          portal.classList.add('is-active');
        }, transitionSpeed);

        /**
         * Add listener, which is removed
         * immediately if it's triggered
         */
        window.addEventListener('resize', hide);
      }
    };

    window.addEventListener('mouseup', function (e) {
      validClick(e, portal) && isInContext(e.target, context) ? handleSelection() : hide();
    });
    window.addEventListener('keyup', function (e) {
      if (!currentRange) return;
      if (e.keyCode === 27) return hide();
      if (isInContext(currentRange.startContainer.parentNode, context)) handleSelection(true);
    });
    window.addEventListener('blur', hide);
  };
};

exports.sshare = sshare;
exports.default = sshare;

},{"tackjs":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (s) {
  return "mailto:?body=" + encodeURIComponent(s) + "%0a%0a" + encodeURIComponent(window.location.href);
};

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (s) {
  return "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(window.location.href) + "&quote=" + encodeURIComponent(s);
};

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (s) {
  return "https://twitter.com/share?url=" + encodeURIComponent(window.location.href) + "&text=" + encodeURIComponent(s);
};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getCoords = exports.getCoords = function getCoords(element) {
  var _element$getBoundingC = element.getBoundingClientRect(),
      l = _element$getBoundingC.left,
      r = _element$getBoundingC.right,
      t = _element$getBoundingC.top,
      b = _element$getBoundingC.bottom;

  var _window = window,
      y = _window.pageYOffset;


  return {
    height: b - t,
    width: r - l,
    top: {
      y: y + t,
      x: l + (r - l) / 2
    },
    bottom: {
      y: y + b,
      x: l + (r - l) / 2
    },
    left: {
      y: t + (b - t) / 2,
      x: l
    },
    right: {
      y: t + (b - t) / 2,
      x: r
    },
    topLeft: {
      y: y + t,
      x: l
    },
    bottomLeft: {
      y: y + b,
      x: l
    },
    topRight: {
      y: y + t,
      x: r
    },
    bottomRight: {
      y: y + b,
      x: r
    }
  };
};

var position = exports.position = function position(target, scope, placement) {
  var c = getCoords(scope)[placement];
  var e = getCoords(target);
  var _window2 = window,
      y = _window2.pageYOffset;


  var vp = {
    top: y,
    bottom: y + window.innerHeight,
    left: 0,
    right: window.innerWidth
  };

  var offsets = {
    top: {
      x: e.width / 2,
      y: e.height
    },
    bottom: {
      x: e.width / 2,
      y: 0
    },
    left: {
      x: e.width,
      y: e.height / 2
    },
    right: {
      x: 0,
      y: e.height / 2
    },
    topLeft: {
      x: e.width,
      y: e.height
    },
    topRight: {
      x: 0,
      y: e.height
    },
    bottomLeft: {
      x: e.width,
      y: 0
    },
    bottomRight: {
      x: 0,
      y: 0
    }
  };

  var posx = c.x - offsets[placement].x;
  var posy = c.y - offsets[placement].y;

  if (posx < vp.left) {
    posx = vp.left;
  } else if (posx + e.width > vp.right) {
    posx = vp.right - e.width;
  }

  if (posy < vp.top) {
    posy = vp.top;
  } else if (posy + e.height > vp.bottom) {
    posy = vp.bottom - e.height;
  }

  target.style.transform = 'translateX(' + posx + 'px) translateY(' + posy + 'px)';
};

var tack = exports.tack = function tack(target, scope, placement) {
  target.classList.add('is-tacked');
  position(target, scope, placement);

  return {
    update: function update() {
      position(target, scope, placement);
    },
    destroy: function destroy() {
      target.style.transform = '';
      target.classList.remove('is-tacked');
    }
  };
};
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpY29ucy5qcyIsImluZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L2luZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvZW1haWwuanMiLCIuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy9mYWNlYm9vay5qcyIsIi4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL3R3aXR0ZXIuanMiLCIuLi9wYWNrYWdlL25vZGVfbW9kdWxlcy90YWNranMvZGlzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSw2MEJBQU47O0FBRUEsSUFBTSwrakJBQU47O0FBRUEsSUFBTSxtZUFBTjs7Ozs7QUNKUDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBTUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsYUFBSztBQUNqRCx1QkFBTztBQUNMLGFBQVMsY0FESjtBQUVMLHFCQUFpQjtBQUZaLEdBQVAsRUFHRyxDQUNEO0FBQUEseUJBQW1CLHVCQUFRLEdBQVIsQ0FBbkI7QUFBQSxHQURDLEVBRUQ7QUFBQSx5QkFBbUIsd0JBQVMsR0FBVCxDQUFuQjtBQUFBLEdBRkMsRUFHRDtBQUFBLHlCQUFtQixxQkFBTSxHQUFOLENBQW5CO0FBQUEsR0FIQyxDQUhIO0FBUUQsQ0FURDs7O0FDWEE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLE1BQVIsR0FBaUIsU0FBakI7O0FBRUEsSUFBSSxVQUFVLFFBQVEsUUFBUixDQUFkOztBQUVBOzs7Ozs7OztBQVFBLElBQUksYUFBYSxTQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUIsTUFBdkIsRUFBK0I7QUFDOUMsU0FBTyxFQUFFLE1BQUYsS0FBYSxNQUFiLElBQXVCLENBQUMsT0FBTyxRQUFQLENBQWdCLEVBQUUsTUFBbEIsQ0FBL0I7QUFDRCxDQUZEOztBQUlBOzs7Ozs7OztBQVFBLElBQUksY0FBYyxTQUFTLFdBQVQsQ0FBcUIsRUFBckIsRUFBeUIsT0FBekIsRUFBa0M7QUFDbEQsU0FBTyxDQUFDLE9BQUQsSUFBWSxHQUFHLEtBQUgsQ0FBUyxJQUFULENBQWMsU0FBUyxnQkFBVCxDQUEwQixPQUExQixDQUFkLEVBQWtELE1BQWxELENBQXlELFVBQVUsR0FBVixFQUFlO0FBQ3pGLFdBQU8sT0FBTyxHQUFQLElBQWMsSUFBSSxRQUFKLENBQWEsRUFBYixDQUFyQjtBQUNELEdBRmtCLEVBRWhCLE1BRmdCLEdBRVAsQ0FGWjtBQUdELENBSkQ7O0FBTUE7Ozs7Ozs7O0FBUUEsSUFBSSxlQUFlLFNBQVMsWUFBVCxHQUF3QjtBQUN6QyxNQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQSxNQUFJLFNBQUosR0FBZ0IsUUFBaEI7QUFDQSxNQUFJLElBQUosR0FBVyxRQUFYO0FBQ0EsTUFBSSxZQUFKLENBQWlCLFlBQWpCLEVBQStCLGNBQS9CO0FBQ0EsTUFBSSxZQUFKLENBQWlCLGFBQWpCLEVBQWdDLE1BQWhDO0FBQ0EsV0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixHQUExQjtBQUNBLFNBQU8sR0FBUDtBQUNELENBUkQ7O0FBVUE7Ozs7Ozs7O0FBUUEsSUFBSSxTQUFTLFNBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQixPQUF0QixFQUErQixNQUEvQixFQUF1QztBQUNsRCxTQUFPLFNBQVAsR0FBbUIsc0NBQXNDLFFBQVEsR0FBUixDQUFZLFVBQVUsQ0FBVixFQUFhO0FBQ2hGLFFBQUksS0FBSyxFQUFFLElBQUYsQ0FBVDtBQUNBLFdBQU8sT0FBTyxFQUFQLEtBQWMsUUFBZCxHQUF5QixFQUF6QixHQUE4QixHQUFHLFNBQXhDO0FBQ0QsR0FId0QsRUFHdEQsSUFIc0QsQ0FHakQsRUFIaUQsQ0FBdEMsR0FHTCxZQUhkOztBQUtBLFNBQU8sWUFBUCxDQUFvQixVQUFwQixFQUFnQyxHQUFoQztBQUNBLFNBQU8sWUFBUCxDQUFvQixhQUFwQixFQUFtQyxPQUFuQzs7QUFFQSxNQUFJLE9BQU8sT0FBTyxRQUFQLENBQWdCLENBQWhCLENBQVg7O0FBRUEsU0FBTztBQUNMLFVBQU0sSUFERDtBQUVMLGFBQVMsU0FBUyxPQUFULEdBQW1CO0FBQzFCLGFBQU8sV0FBUCxDQUFtQixJQUFuQjtBQUNEO0FBSkksR0FBUDtBQU1ELENBakJEOztBQW1CQTs7Ozs7QUFLQSxJQUFJLGVBQWUsU0FBUyxZQUFULEdBQXdCO0FBQ3pDLE1BQUksUUFBUSxPQUFPLFlBQVAsRUFBWjs7QUFFQSxNQUFJLE1BQU0sU0FBVixFQUFxQixPQUFPLElBQVA7O0FBRXJCLFNBQU8sTUFBTSxVQUFOLEdBQW1CLENBQW5CLEdBQXVCLElBQXZCLEdBQThCLE1BQU0sVUFBTixDQUFpQixDQUFqQixDQUFyQztBQUNELENBTkQ7O0FBUUE7OztBQUdBLElBQUksU0FBUyxTQUFTLE1BQVQsQ0FBZ0IsSUFBaEIsRUFBc0I7QUFDakMsTUFBSSxlQUFlLEtBQUssT0FBeEI7QUFBQSxNQUNJLFVBQVUsaUJBQWlCLFNBQWpCLEdBQTZCLElBQTdCLEdBQW9DLFlBRGxEO0FBQUEsTUFFSSx1QkFBdUIsS0FBSyxlQUZoQztBQUFBLE1BR0ksa0JBQWtCLHlCQUF5QixTQUF6QixHQUFxQyxHQUFyQyxHQUEyQyxvQkFIakU7QUFJQSxTQUFPLFlBQVk7QUFDakIsUUFBSSxVQUFVLFVBQVUsTUFBVixHQUFtQixDQUFuQixJQUF3QixVQUFVLENBQVYsTUFBaUIsU0FBekMsR0FBcUQsVUFBVSxDQUFWLENBQXJELEdBQW9FLEVBQWxGOztBQUVBLFFBQUksU0FBUyxjQUFiOztBQUVBLFFBQUksTUFBTSxJQUFWO0FBQ0EsUUFBSSxTQUFTLElBQWI7QUFDQSxRQUFJLFVBQVUsQ0FBZDtBQUNBLFFBQUksWUFBWSxJQUFoQjs7QUFFQTs7O0FBR0EsUUFBSSxnQkFBZ0IsSUFBcEI7QUFDQSxRQUFJLGVBQWUsSUFBbkI7O0FBRUE7Ozs7O0FBS0EsUUFBSSxPQUFPLFNBQVMsSUFBVCxHQUFnQjtBQUN6QixVQUFJLENBQUMsTUFBRCxJQUFXLENBQUMsR0FBaEIsRUFBcUI7O0FBRXJCLGFBQU8sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsSUFBckM7QUFDQSxhQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckI7O0FBRUEsZ0JBQVUsV0FBVyxZQUFZO0FBQy9CLGVBQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3QixXQUF4QjtBQUNBLGVBQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3QixXQUF4QjtBQUNBLFlBQUksT0FBSjtBQUNBLGVBQU8sT0FBUDtBQUNBLGlCQUFTLElBQVQ7QUFDQSxjQUFNLElBQU47QUFDQSxlQUFPLGVBQVAsQ0FBdUIsVUFBdkI7QUFDQSxZQUFJLFlBQUosQ0FBaUIsYUFBakIsRUFBZ0MsTUFBaEM7QUFDQSxrQkFBVSxLQUFWO0FBQ0QsT0FWUyxFQVVQLGVBVk8sQ0FBVjtBQVdELEtBakJEOztBQW1CQSxRQUFJLGtCQUFrQixTQUFTLGVBQVQsQ0FBeUIsS0FBekIsRUFBZ0M7QUFDcEQscUJBQWUsY0FBZjs7QUFFQSxVQUFJLENBQUMsWUFBTCxFQUFtQjs7QUFFbkI7OztBQUdBLGtCQUFZLFNBQVMsYUFBckI7O0FBRUEsVUFBSSxPQUFPLGFBQWEsUUFBYixFQUFYO0FBQ0EsVUFBSSxlQUFlLGdCQUFnQixjQUFjLFFBQWQsRUFBaEIsR0FBMkMsRUFBOUQ7O0FBRUEsbUJBQWEsT0FBYjs7QUFFQTs7Ozs7OztBQU9BLFVBQUksQ0FBQyxJQUFELElBQVMsS0FBSyxNQUFMLElBQWUsQ0FBeEIsSUFBNkIsaUJBQWlCLElBQWpCLElBQXlCLENBQUMsS0FBM0QsRUFBa0U7QUFDaEU7QUFDRCxPQUZELE1BRU8sSUFBSSxDQUFDLGFBQUQsSUFBa0IsaUJBQWlCLElBQXZDLEVBQTZDO0FBQ2xELGlCQUFTLE9BQU8sSUFBUCxFQUFhLE9BQWIsRUFBc0IsTUFBdEIsQ0FBVDs7QUFFQSx3QkFBZ0IsWUFBaEI7O0FBRUEsY0FBTSxDQUFDLEdBQUcsUUFBUSxJQUFaLEVBQWtCLE1BQWxCLEVBQTBCLFlBQTFCLEVBQXdDLEtBQXhDLENBQU47O0FBRUE7Ozs7QUFJQSxtQkFBVyxZQUFZO0FBQ3JCLGlCQUFPLEtBQVA7QUFDQSxpQkFBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLFdBQXhCO0FBQ0EsaUJBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixXQUFyQjtBQUNELFNBSkQsRUFJRyxlQUpIOztBQU1BOzs7O0FBSUEsZUFBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxJQUFsQztBQUNEO0FBQ0YsS0EvQ0Q7O0FBaURBLFdBQU8sZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsVUFBVSxDQUFWLEVBQWE7QUFDOUMsaUJBQVcsQ0FBWCxFQUFjLE1BQWQsS0FBeUIsWUFBWSxFQUFFLE1BQWQsRUFBc0IsT0FBdEIsQ0FBekIsR0FBMEQsaUJBQTFELEdBQThFLE1BQTlFO0FBQ0QsS0FGRDtBQUdBLFdBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBVSxDQUFWLEVBQWE7QUFDNUMsVUFBSSxDQUFDLFlBQUwsRUFBbUI7QUFDbkIsVUFBSSxFQUFFLE9BQUYsS0FBYyxFQUFsQixFQUFzQixPQUFPLE1BQVA7QUFDdEIsVUFBSSxZQUFZLGFBQWEsY0FBYixDQUE0QixVQUF4QyxFQUFvRCxPQUFwRCxDQUFKLEVBQWtFLGdCQUFnQixJQUFoQjtBQUNuRSxLQUpEO0FBS0EsV0FBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxJQUFoQztBQUNELEdBbEdEO0FBbUdELENBeEdEOztBQTBHQSxRQUFRLE1BQVIsR0FBaUIsTUFBakI7QUFDQSxRQUFRLE9BQVIsR0FBa0IsTUFBbEI7OztBQzNNQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3Qzs7QUFJQSxRQUFRLE9BQVIsR0FBa0IsVUFBVSxDQUFWLEVBQWE7QUFDN0IsU0FBTyxrQkFBa0IsbUJBQW1CLENBQW5CLENBQWxCLEdBQTBDLFFBQTFDLEdBQXFELG1CQUFtQixPQUFPLFFBQVAsQ0FBZ0IsSUFBbkMsQ0FBNUQ7QUFDRCxDQUZEOzs7QUNOQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3Qzs7QUFJQSxRQUFRLE9BQVIsR0FBa0IsVUFBVSxDQUFWLEVBQWE7QUFDN0IsU0FBTywwQ0FBMEMsbUJBQW1CLE9BQU8sUUFBUCxDQUFnQixJQUFuQyxDQUExQyxHQUFxRixTQUFyRixHQUFpRyxtQkFBbUIsQ0FBbkIsQ0FBeEc7QUFDRCxDQUZEOzs7QUNOQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3Qzs7QUFJQSxRQUFRLE9BQVIsR0FBa0IsVUFBVSxDQUFWLEVBQWE7QUFDN0IsU0FBTyxtQ0FBbUMsbUJBQW1CLE9BQU8sUUFBUCxDQUFnQixJQUFuQyxDQUFuQyxHQUE4RSxRQUE5RSxHQUF5RixtQkFBbUIsQ0FBbkIsQ0FBaEc7QUFDRCxDQUZEOzs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNvbnN0IHR3aXR0ZXIgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEuNDE0XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBkPVwiTTE2IDMuMDM4Yy0uNTkuMjYtMS4yMi40MzctMS44ODUuNTE3LjY3Ny0uNDA3IDEuMTk4LTEuMDUgMS40NDMtMS44MTYtLjYzNC4zNy0xLjMzNy42NC0yLjA4NS43OS0uNTk4LS42NC0xLjQ1LTEuMDQtMi4zOTYtMS4wNC0xLjgxMiAwLTMuMjgyIDEuNDctMy4yODIgMy4yOCAwIC4yNi4wMy41MS4wODUuNzUtMi43MjgtLjEzLTUuMTQ3LTEuNDQtNi43NjYtMy40MkMuODMgMi41OC42NyAzLjE0LjY3IDMuNzVjMCAxLjE0LjU4IDIuMTQzIDEuNDYgMi43MzItLjUzOC0uMDE3LTEuMDQ1LS4xNjUtMS40ODctLjQxdi4wNGMwIDEuNTkgMS4xMyAyLjkxOCAyLjYzMyAzLjIyLS4yNzYuMDc0LS41NjYuMTE0LS44NjUuMTE0LS4yMSAwLS40MS0uMDItLjYxLS4wNTguNDIgMS4zMDQgMS42MyAyLjI1MyAzLjA3IDIuMjgtMS4xMi44OC0yLjU0IDEuNDA0LTQuMDcgMS40MDQtLjI2IDAtLjUyLS4wMTUtLjc4LS4wNDUgMS40Ni45MyAzLjE4IDEuNDc0IDUuMDQgMS40NzQgNi4wNCAwIDkuMzQtNSA5LjM0LTkuMzMgMC0uMTQgMC0uMjgtLjAxLS40Mi42NC0uNDYgMS4yLTEuMDQgMS42NC0xLjd6IFwiPjwvcGF0aD48L3N2Zz5gXG5cbmV4cG9ydCBjb25zdCBmYWNlYm9vayA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMS40MTRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIGQ9XCJNMTUuMTE3IDBILjg4M0MuMzk1IDAgMCAuMzk1IDAgLjg4M3YxNC4yMzRjMCAuNDg4LjM5NS44ODMuODgzLjg4M2g3LjY2M1Y5LjgwNEg2LjQ2VjcuMzloMi4wODZWNS42MDdjMC0yLjA2NiAxLjI2Mi0zLjE5IDMuMTA2LTMuMTkuODgzIDAgMS42NDIuMDY0IDEuODYzLjA5NHYyLjE2aC0xLjI4Yy0xIDAtMS4xOTUuNDgtMS4xOTUgMS4xOHYxLjU0aDIuMzlsLS4zMSAyLjQyaC0yLjA4VjE2aDQuMDc3Yy40ODggMCAuODgzLS4zOTUuODgzLS44ODNWLjg4M0MxNiAuMzk1IDE1LjYwNSAwIDE1LjExNyAwIFwiPjwvcGF0aD48L3N2Zz5gXG5cbmV4cG9ydCBjb25zdCBnbWFpbCA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMS40MTRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIGQ9XCJNMTYgM3YxMGMwIC41NjctLjQzMyAxLTEgMWgtMVY0LjkyNUw4IDkuMjMzIDIgNC45MjVWMTRIMWMtLjU2NyAwLTEtLjQzMy0xLTFWM2MwLS4yODMuMTA4LS41MzMuMjg3LS43MTJDLjQ2NyAyLjEwNy43MTggMiAxIDJoLjMzM0w4IDYuODMzIDE0LjY2NyAySDE1Yy4yODMgMCAuNTMzLjEwOC43MTMuMjg4LjE3OS4xNzkuMjg3LjQyOS4yODcuNzEyeiBcIj48L3BhdGg+PC9zdmc+YFxuIiwiaW1wb3J0IHNzaGFyZSBmcm9tICcuLi9wYWNrYWdlL2Rpc3QvaW5kZXguanMnXG5pbXBvcnQgdHdpdHRlciBmcm9tICcuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy90d2l0dGVyLmpzJ1xuaW1wb3J0IGZhY2Vib29rIGZyb20gJy4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL2ZhY2Vib29rLmpzJ1xuaW1wb3J0IGVtYWlsIGZyb20gJy4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL2VtYWlsLmpzJ1xuXG5pbXBvcnQge1xuICB0d2l0dGVyIGFzIHR3LFxuICBmYWNlYm9vayBhcyBmYixcbiAgZ21haWxcbn0gZnJvbSAnLi9pY29ucy5qcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGUgPT4ge1xuICBzc2hhcmUoe1xuICAgIGNvbnRleHQ6ICcuanMtc2hhcmFibGUnLFxuICAgIHRyYW5zaXRpb25TcGVlZDogMjAwXG4gIH0pKFtcbiAgICB1cmwgPT4gYDxhIGhyZWY9XCIke3R3aXR0ZXIodXJsKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke3R3fTwvYT5gLFxuICAgIHVybCA9PiBgPGEgaHJlZj1cIiR7ZmFjZWJvb2sodXJsKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke2ZifTwvYT5gLFxuICAgIHVybCA9PiBgPGEgaHJlZj1cIiR7ZW1haWwodXJsKX1cIj4ke2dtYWlsfTwvYT5gLFxuICBdKVxufSlcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuc3NoYXJlID0gdW5kZWZpbmVkO1xuXG52YXIgX3RhY2tqcyA9IHJlcXVpcmUoJ3RhY2tqcycpO1xuXG4vKipcbiAqIENoZWNrIGlmIGNsaWNrIGhhcHBlbmVkXG4gKiB3aXRoaW4gdGhlIGRpYWxvZ1xuICpcbiAqIEBwYXJhbSB7ZXZlbnR9IGUgVGhlIGNsaWNrIGV2ZW50XG4gKiBAcGFyYW0ge29iamVjdH0gZGlhbG9nIFRoZSBzaGFyZSBkaWFsb2dcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbnZhciB2YWxpZENsaWNrID0gZnVuY3Rpb24gdmFsaWRDbGljayhlLCBkaWFsb2cpIHtcbiAgcmV0dXJuIGUudGFyZ2V0ICE9PSBkaWFsb2cgfHwgIWRpYWxvZy5jb250YWlucyhlLnRhcmdldCk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGV2ZW50IGlzIHdpdGhpblxuICogdGhlIHVzZXItc3BlY2lmaWVkIHNjb3BlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGVsIFRoZSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBldmVudFxuICogQHBhcmFtIHthcnJheX0gY29udGV4dCBBcnJheSBvZiBlbGVtZW50cyB0byBzY29wZSB0b1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xudmFyIGlzSW5Db250ZXh0ID0gZnVuY3Rpb24gaXNJbkNvbnRleHQoZWwsIGNvbnRleHQpIHtcbiAgcmV0dXJuICFjb250ZXh0IHx8IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb250ZXh0KSkuZmlsdGVyKGZ1bmN0aW9uIChjdHgpIHtcbiAgICByZXR1cm4gZWwgPT09IGN0eCB8fCBjdHguY29udGFpbnMoZWwpO1xuICB9KS5sZW5ndGggPiAwO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgdGhlIG1haW4gcG9ydGFsXG4gKiB0aGF0IHRoZSBsaW5rcyBhcmVcbiAqIHJlbmRlcmVkIGludG8uIFNldFxuICogYWNjZXNzaWJsaXR5IGF0dHJzLlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gYSBET00gZWxlbWVudFxuICovXG52YXIgY3JlYXRlUG9ydGFsID0gZnVuY3Rpb24gY3JlYXRlUG9ydGFsKCkge1xuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5jbGFzc05hbWUgPSAnc3NoYXJlJztcbiAgZGl2LnJvbGUgPSAnZGlhbG9nJztcbiAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdTaGFyZSBEaWFsb2cnKTtcbiAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gIHJldHVybiBkaXY7XG59O1xuXG4vKipcbiAqIFJlbmRlciBzaGFyZSBsaW5rcyxcbiAqIHJldHVybiBub2RlIGFuZCBkZXN0cm95IG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRoZSBoaWdobGlnaHRlZCB0ZXh0XG4gKiBAcGFyYW0ge2FycmF5fSBzaGFyZXJzIEFycmF5IG9mIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBlbGVtZW50cyBvciBzdHJpbmdzXG4gKiBAcGFyYW0ge29iamVjdH0gcG9ydGFsIFRoZSBwb3J0YWwgcmV0dXJuZWQgZnJvbSBjcmVhdGVQb3J0YWwoKVxuICovXG52YXIgcmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRleHQsIHNoYXJlcnMsIHBvcnRhbCkge1xuICBwb3J0YWwuaW5uZXJIVE1MID0gJ1xcbiAgICA8ZGl2IGNsYXNzPVwic3NoYXJlX19pbm5lclwiPicgKyBzaGFyZXJzLm1hcChmdW5jdGlvbiAocykge1xuICAgIHZhciBlbCA9IHModGV4dCk7XG4gICAgcmV0dXJuIHR5cGVvZiBlbCA9PT0gJ3N0cmluZycgPyBlbCA6IGVsLm91dGVySFRNTDtcbiAgfSkuam9pbignJykgKyAnPC9kaXY+XFxuICAnO1xuXG4gIHBvcnRhbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgcG9ydGFsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICB2YXIgbm9kZSA9IHBvcnRhbC5jaGlsZHJlblswXTtcblxuICByZXR1cm4ge1xuICAgIG5vZGU6IG5vZGUsXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHBvcnRhbC5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIEdldCByYW5nZSBvYmplY3QgZm9yIGhpZ2hsaWdodGVkIHRleHRcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IHJhbmdlXG4gKi9cbnZhciBnZXRTZWxlY3Rpb24gPSBmdW5jdGlvbiBnZXRTZWxlY3Rpb24oKSB7XG4gIHZhciByYW5nZSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICBpZiAocmFuZ2UuY29sbGFwc2VkKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gcmFuZ2UucmFuZ2VDb3VudCA8IDEgPyBudWxsIDogcmFuZ2UuZ2V0UmFuZ2VBdCgwKTtcbn07XG5cbi8qKlxuICogSW5pdFxuICovXG52YXIgc3NoYXJlID0gZnVuY3Rpb24gc3NoYXJlKF9yZWYpIHtcbiAgdmFyIF9yZWYkY29udGV4dCA9IF9yZWYuY29udGV4dCxcbiAgICAgIGNvbnRleHQgPSBfcmVmJGNvbnRleHQgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBfcmVmJGNvbnRleHQsXG4gICAgICBfcmVmJHRyYW5zaXRpb25TcGVlZCA9IF9yZWYudHJhbnNpdGlvblNwZWVkLFxuICAgICAgdHJhbnNpdGlvblNwZWVkID0gX3JlZiR0cmFuc2l0aW9uU3BlZWQgPT09IHVuZGVmaW5lZCA/IDIwMCA6IF9yZWYkdHJhbnNpdGlvblNwZWVkO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzaGFyZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcblxuICAgIHZhciBwb3J0YWwgPSBjcmVhdGVQb3J0YWwoKTtcblxuICAgIHZhciBiYXIgPSBudWxsO1xuICAgIHZhciBkaWFsb2cgPSBudWxsO1xuICAgIHZhciB0aW1lb3V0ID0gMDtcbiAgICB2YXIgZm9jdXNOb2RlID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFNlbGVjdGlvbnNcbiAgICAgKi9cbiAgICB2YXIgcHJldmlvdXNSYW5nZSA9IG51bGw7XG4gICAgdmFyIGN1cnJlbnRSYW5nZSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95cyB0aGUgZGlhbG9nLCB0YWNranMgaW5zdGFuY2VcbiAgICAgKiByZW1vdmVzIGxpc3RlbmVycywgYW5kIHNldHNcbiAgICAgKiBhY2Nlc3NpYmxpdHkgYXR0cnMgYmFjayB0byBkZWZhdWx0c1xuICAgICAqL1xuICAgIHZhciBoaWRlID0gZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgIGlmICghZGlhbG9nIHx8ICFiYXIpIHJldHVybjtcblxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhpZGUpO1xuICAgICAgcG9ydGFsLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGluZycpO1xuXG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBvcnRhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRpbmcnKTtcbiAgICAgICAgcG9ydGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBiYXIuZGVzdHJveSgpO1xuICAgICAgICBkaWFsb2cuZGVzdHJveSgpO1xuICAgICAgICBkaWFsb2cgPSBudWxsO1xuICAgICAgICBiYXIgPSBudWxsO1xuICAgICAgICBwb3J0YWwucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIGZvY3VzTm9kZS5mb2N1cygpO1xuICAgICAgfSwgdHJhbnNpdGlvblNwZWVkKTtcbiAgICB9O1xuXG4gICAgdmFyIGhhbmRsZVNlbGVjdGlvbiA9IGZ1bmN0aW9uIGhhbmRsZVNlbGVjdGlvbihrZXl1cCkge1xuICAgICAgY3VycmVudFJhbmdlID0gZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgIGlmICghY3VycmVudFJhbmdlKSByZXR1cm47XG5cbiAgICAgIC8qKlxuICAgICAgICogU2F2ZSBsYXN0IGZvY3VzZWQgbm9kZVxuICAgICAgICovXG4gICAgICBmb2N1c05vZGUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICB2YXIgdGV4dCA9IGN1cnJlbnRSYW5nZS50b1N0cmluZygpO1xuICAgICAgdmFyIHByZXZpb3VzVGV4dCA9IHByZXZpb3VzUmFuZ2UgPyBwcmV2aW91c1JhbmdlLnRvU3RyaW5nKCkgOiAnJztcblxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICAvKipcbiAgICAgICAqIElmIG5vIHRleHQsIG9yIHRoZSB0ZXh0IGlzIHRoZSBzYW1lXG4gICAgICAgKiBhZnRlciBhIGNsaWNrIGV2ZW50LCBoaWRlLlxuICAgICAgICpcbiAgICAgICAqIE90aGVyd2lzZSwgaWYgaXQncyBuZXcgdGV4dFxuICAgICAgICogcmVuZGVyIGEgbmV3IGRpYWxvZy5cbiAgICAgICAqL1xuICAgICAgaWYgKCF0ZXh0IHx8IHRleHQubGVuZ3RoIDw9IDAgfHwgcHJldmlvdXNUZXh0ID09PSB0ZXh0ICYmICFrZXl1cCkge1xuICAgICAgICBoaWRlKCk7XG4gICAgICB9IGVsc2UgaWYgKCFwcmV2aW91c1JhbmdlIHx8IHByZXZpb3VzVGV4dCAhPT0gdGV4dCkge1xuICAgICAgICBkaWFsb2cgPSByZW5kZXIodGV4dCwgc2hhcmVycywgcG9ydGFsKTtcblxuICAgICAgICBwcmV2aW91c1JhbmdlID0gY3VycmVudFJhbmdlO1xuXG4gICAgICAgIGJhciA9ICgwLCBfdGFja2pzLnRhY2spKHBvcnRhbCwgY3VycmVudFJhbmdlLCAndG9wJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuc3VyZXMgeW91IGRvbid0IHNlZSB0aGVcbiAgICAgICAgICogZGlhbG9nIGZseSBpbnRvIHBsYWNlXG4gICAgICAgICAqL1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwb3J0YWwuZm9jdXMoKTtcbiAgICAgICAgICBwb3J0YWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkaW5nJyk7XG4gICAgICAgICAgcG9ydGFsLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9LCB0cmFuc2l0aW9uU3BlZWQpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgbGlzdGVuZXIsIHdoaWNoIGlzIHJlbW92ZWRcbiAgICAgICAgICogaW1tZWRpYXRlbHkgaWYgaXQncyB0cmlnZ2VyZWRcbiAgICAgICAgICovXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoaWRlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFsaWRDbGljayhlLCBwb3J0YWwpICYmIGlzSW5Db250ZXh0KGUudGFyZ2V0LCBjb250ZXh0KSA/IGhhbmRsZVNlbGVjdGlvbigpIDogaGlkZSgpO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoIWN1cnJlbnRSYW5nZSkgcmV0dXJuO1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHJldHVybiBoaWRlKCk7XG4gICAgICBpZiAoaXNJbkNvbnRleHQoY3VycmVudFJhbmdlLnN0YXJ0Q29udGFpbmVyLnBhcmVudE5vZGUsIGNvbnRleHQpKSBoYW5kbGVTZWxlY3Rpb24odHJ1ZSk7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBoaWRlKTtcbiAgfTtcbn07XG5cbmV4cG9ydHMuc3NoYXJlID0gc3NoYXJlO1xuZXhwb3J0cy5kZWZhdWx0ID0gc3NoYXJlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAocykge1xuICByZXR1cm4gXCJtYWlsdG86P2JvZHk9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocykgKyBcIiUwYSUwYVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzKSB7XG4gIHJldHVybiBcImh0dHA6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci5waHA/dT1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uaHJlZikgKyBcIiZxdW90ZT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChzKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzKSB7XG4gIHJldHVybiBcImh0dHBzOi8vdHdpdHRlci5jb20vc2hhcmU/dXJsPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5ocmVmKSArIFwiJnRleHQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocyk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBnZXRDb29yZHMgPSBleHBvcnRzLmdldENvb3JkcyA9IGZ1bmN0aW9uIGdldENvb3JkcyhlbGVtZW50KSB7XG4gIHZhciBfZWxlbWVudCRnZXRCb3VuZGluZ0MgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgbCA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5sZWZ0LFxuICAgICAgciA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5yaWdodCxcbiAgICAgIHQgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MudG9wLFxuICAgICAgYiA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5ib3R0b207XG5cbiAgdmFyIF93aW5kb3cgPSB3aW5kb3csXG4gICAgICB5ID0gX3dpbmRvdy5wYWdlWU9mZnNldDtcblxuXG4gIHJldHVybiB7XG4gICAgaGVpZ2h0OiBiIC0gdCxcbiAgICB3aWR0aDogciAtIGwsXG4gICAgdG9wOiB7XG4gICAgICB5OiB5ICsgdCxcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICB5OiB5ICsgYixcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgeTogdCArIChiIC0gdCkgLyAyLFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIHk6IHQgKyAoYiAtIHQpIC8gMixcbiAgICAgIHg6IHJcbiAgICB9LFxuICAgIHRvcExlZnQ6IHtcbiAgICAgIHk6IHkgKyB0LFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgYm90dG9tTGVmdDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiBsXG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeTogeSArIHQsXG4gICAgICB4OiByXG4gICAgfSxcbiAgICBib3R0b21SaWdodDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiByXG4gICAgfVxuICB9O1xufTtcblxudmFyIHBvc2l0aW9uID0gZXhwb3J0cy5wb3NpdGlvbiA9IGZ1bmN0aW9uIHBvc2l0aW9uKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCkge1xuICB2YXIgYyA9IGdldENvb3JkcyhzY29wZSlbcGxhY2VtZW50XTtcbiAgdmFyIGUgPSBnZXRDb29yZHModGFyZ2V0KTtcbiAgdmFyIF93aW5kb3cyID0gd2luZG93LFxuICAgICAgeSA9IF93aW5kb3cyLnBhZ2VZT2Zmc2V0O1xuXG5cbiAgdmFyIHZwID0ge1xuICAgIHRvcDogeSxcbiAgICBib3R0b206IHkgKyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogd2luZG93LmlubmVyV2lkdGhcbiAgfTtcblxuICB2YXIgb2Zmc2V0cyA9IHtcbiAgICB0b3A6IHtcbiAgICAgIHg6IGUud2lkdGggLyAyLFxuICAgICAgeTogZS5oZWlnaHRcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgeDogZS53aWR0aCAvIDIsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogZS5oZWlnaHQgLyAyXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0IC8gMlxuICAgIH0sXG4gICAgdG9wTGVmdDoge1xuICAgICAgeDogZS53aWR0aCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b21MZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAgYm90dG9tUmlnaHQ6IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICB9O1xuXG4gIHZhciBwb3N4ID0gYy54IC0gb2Zmc2V0c1twbGFjZW1lbnRdLng7XG4gIHZhciBwb3N5ID0gYy55IC0gb2Zmc2V0c1twbGFjZW1lbnRdLnk7XG5cbiAgaWYgKHBvc3ggPCB2cC5sZWZ0KSB7XG4gICAgcG9zeCA9IHZwLmxlZnQ7XG4gIH0gZWxzZSBpZiAocG9zeCArIGUud2lkdGggPiB2cC5yaWdodCkge1xuICAgIHBvc3ggPSB2cC5yaWdodCAtIGUud2lkdGg7XG4gIH1cblxuICBpZiAocG9zeSA8IHZwLnRvcCkge1xuICAgIHBvc3kgPSB2cC50b3A7XG4gIH0gZWxzZSBpZiAocG9zeSArIGUuaGVpZ2h0ID4gdnAuYm90dG9tKSB7XG4gICAgcG9zeSA9IHZwLmJvdHRvbSAtIGUuaGVpZ2h0O1xuICB9XG5cbiAgdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBwb3N4ICsgJ3B4KSB0cmFuc2xhdGVZKCcgKyBwb3N5ICsgJ3B4KSc7XG59O1xuXG52YXIgdGFjayA9IGV4cG9ydHMudGFjayA9IGZ1bmN0aW9uIHRhY2sodGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KSB7XG4gIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy10YWNrZWQnKTtcbiAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcblxuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdGFja2VkJyk7XG4gICAgfVxuICB9O1xufTsiXX0=
