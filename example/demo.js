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
  var s = (0, _index2.default)({
    context: '.js-sharable',
    transitionSpeed: 200
  }, [function (url) {
    return '<a href="' + (0, _twitter2.default)(url) + '" target="_blank">' + _icons.twitter + '</a>';
  }, function (url) {
    return '<a href="' + (0, _facebook2.default)(url) + '" target="_blank">' + _icons.facebook + '</a>';
  }, function (url) {
    return '<a href="' + (0, _email2.default)(url) + '">' + _icons.gmail + '</a>';
  }]);

  setTimeout(function () {
    return s.destroy();
  }, 10000);
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
  var sharers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

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

  var mouseup = function mouseup(e) {
    validClick(e, portal) && isInContext(e.target, context) ? handleSelection() : hide();
  };
  var keyup = function keyup(e) {
    if (!currentRange) return;
    if (e.keyCode === 27) return hide();
    if (isInContext(currentRange.startContainer.parentNode, context)) handleSelection(true);
  };

  window.addEventListener('mouseup', mouseup);
  window.addEventListener('keyup', keyup);
  window.addEventListener('blur', hide);

  return {
    destroy: function destroy() {
      window.removeEventListener('mouseup', mouseup);
      window.removeEventListener('keyup', keyup);
      window.removeEventListener('blur', hide);
      window.removeEventListener('resize', hide);
      bar && bar.destroy();
      document.body.contains(portal) && document.body.removeChild(portal);
      focusNode && focusNode.focus();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpY29ucy5qcyIsImluZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L2luZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvZW1haWwuanMiLCIuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy9mYWNlYm9vay5qcyIsIi4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL3R3aXR0ZXIuanMiLCIuLi9wYWNrYWdlL25vZGVfbW9kdWxlcy90YWNranMvZGlzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSw2MEJBQU47O0FBRUEsSUFBTSwrakJBQU47O0FBRUEsSUFBTSxtZUFBTjs7Ozs7QUNKUDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBTUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsYUFBSztBQUNqRCxNQUFNLElBQUkscUJBQU87QUFDZixhQUFTLGNBRE07QUFFZixxQkFBaUI7QUFGRixHQUFQLEVBR1AsQ0FDRDtBQUFBLHlCQUFtQix1QkFBUSxHQUFSLENBQW5CO0FBQUEsR0FEQyxFQUVEO0FBQUEseUJBQW1CLHdCQUFTLEdBQVQsQ0FBbkI7QUFBQSxHQUZDLEVBR0Q7QUFBQSx5QkFBbUIscUJBQU0sR0FBTixDQUFuQjtBQUFBLEdBSEMsQ0FITyxDQUFWOztBQVNBLGFBQVc7QUFBQSxXQUFNLEVBQUUsT0FBRixFQUFOO0FBQUEsR0FBWCxFQUE4QixLQUE5QjtBQUNELENBWEQ7OztBQ1hBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsUUFBUSxNQUFSLEdBQWlCLFNBQWpCOztBQUVBLElBQUksVUFBVSxRQUFRLFFBQVIsQ0FBZDs7QUFFQTs7Ozs7Ozs7QUFRQSxJQUFJLGFBQWEsU0FBUyxVQUFULENBQW9CLENBQXBCLEVBQXVCLE1BQXZCLEVBQStCO0FBQzlDLFNBQU8sRUFBRSxNQUFGLEtBQWEsTUFBYixJQUF1QixDQUFDLE9BQU8sUUFBUCxDQUFnQixFQUFFLE1BQWxCLENBQS9CO0FBQ0QsQ0FGRDs7QUFJQTs7Ozs7Ozs7QUFRQSxJQUFJLGNBQWMsU0FBUyxXQUFULENBQXFCLEVBQXJCLEVBQXlCLE9BQXpCLEVBQWtDO0FBQ2xELFNBQU8sQ0FBQyxPQUFELElBQVksR0FBRyxLQUFILENBQVMsSUFBVCxDQUFjLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FBZCxFQUFrRCxNQUFsRCxDQUF5RCxVQUFVLEdBQVYsRUFBZTtBQUN6RixXQUFPLE9BQU8sR0FBUCxJQUFjLElBQUksUUFBSixDQUFhLEVBQWIsQ0FBckI7QUFDRCxHQUZrQixFQUVoQixNQUZnQixHQUVQLENBRlo7QUFHRCxDQUpEOztBQU1BOzs7Ozs7OztBQVFBLElBQUksZUFBZSxTQUFTLFlBQVQsR0FBd0I7QUFDekMsTUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0EsTUFBSSxTQUFKLEdBQWdCLFFBQWhCO0FBQ0EsTUFBSSxJQUFKLEdBQVcsUUFBWDtBQUNBLE1BQUksWUFBSixDQUFpQixZQUFqQixFQUErQixjQUEvQjtBQUNBLE1BQUksWUFBSixDQUFpQixhQUFqQixFQUFnQyxNQUFoQztBQUNBLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsR0FBMUI7QUFDQSxTQUFPLEdBQVA7QUFDRCxDQVJEOztBQVVBOzs7Ozs7OztBQVFBLElBQUksU0FBUyxTQUFTLE1BQVQsQ0FBZ0IsSUFBaEIsRUFBc0IsT0FBdEIsRUFBK0IsTUFBL0IsRUFBdUM7QUFDbEQsU0FBTyxTQUFQLEdBQW1CLHNDQUFzQyxRQUFRLEdBQVIsQ0FBWSxVQUFVLENBQVYsRUFBYTtBQUNoRixRQUFJLEtBQUssRUFBRSxJQUFGLENBQVQ7QUFDQSxXQUFPLE9BQU8sRUFBUCxLQUFjLFFBQWQsR0FBeUIsRUFBekIsR0FBOEIsR0FBRyxTQUF4QztBQUNELEdBSHdELEVBR3RELElBSHNELENBR2pELEVBSGlELENBQXRDLEdBR0wsWUFIZDs7QUFLQSxTQUFPLFlBQVAsQ0FBb0IsVUFBcEIsRUFBZ0MsR0FBaEM7QUFDQSxTQUFPLFlBQVAsQ0FBb0IsYUFBcEIsRUFBbUMsT0FBbkM7O0FBRUEsTUFBSSxPQUFPLE9BQU8sUUFBUCxDQUFnQixDQUFoQixDQUFYOztBQUVBLFNBQU87QUFDTCxVQUFNLElBREQ7QUFFTCxhQUFTLFNBQVMsT0FBVCxHQUFtQjtBQUMxQixhQUFPLFdBQVAsQ0FBbUIsSUFBbkI7QUFDRDtBQUpJLEdBQVA7QUFNRCxDQWpCRDs7QUFtQkE7Ozs7O0FBS0EsSUFBSSxlQUFlLFNBQVMsWUFBVCxHQUF3QjtBQUN6QyxNQUFJLFFBQVEsT0FBTyxZQUFQLEVBQVo7O0FBRUEsTUFBSSxNQUFNLFNBQVYsRUFBcUIsT0FBTyxJQUFQOztBQUVyQixTQUFPLE1BQU0sVUFBTixHQUFtQixDQUFuQixHQUF1QixJQUF2QixHQUE4QixNQUFNLFVBQU4sQ0FBaUIsQ0FBakIsQ0FBckM7QUFDRCxDQU5EOztBQVFBOzs7QUFHQSxJQUFJLFNBQVMsU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCO0FBQ2pDLE1BQUksZUFBZSxLQUFLLE9BQXhCO0FBQUEsTUFDSSxVQUFVLGlCQUFpQixTQUFqQixHQUE2QixJQUE3QixHQUFvQyxZQURsRDtBQUFBLE1BRUksdUJBQXVCLEtBQUssZUFGaEM7QUFBQSxNQUdJLGtCQUFrQix5QkFBeUIsU0FBekIsR0FBcUMsR0FBckMsR0FBMkMsb0JBSGpFO0FBSUEsTUFBSSxVQUFVLFVBQVUsTUFBVixHQUFtQixDQUFuQixJQUF3QixVQUFVLENBQVYsTUFBaUIsU0FBekMsR0FBcUQsVUFBVSxDQUFWLENBQXJELEdBQW9FLEVBQWxGOztBQUVBLE1BQUksU0FBUyxjQUFiOztBQUVBLE1BQUksTUFBTSxJQUFWO0FBQ0EsTUFBSSxTQUFTLElBQWI7QUFDQSxNQUFJLFVBQVUsQ0FBZDtBQUNBLE1BQUksWUFBWSxJQUFoQjs7QUFFQTs7O0FBR0EsTUFBSSxnQkFBZ0IsSUFBcEI7QUFDQSxNQUFJLGVBQWUsSUFBbkI7O0FBRUE7Ozs7O0FBS0EsTUFBSSxPQUFPLFNBQVMsSUFBVCxHQUFnQjtBQUN6QixRQUFJLENBQUMsTUFBRCxJQUFXLENBQUMsR0FBaEIsRUFBcUI7O0FBRXJCLFdBQU8sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsSUFBckM7QUFDQSxXQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckI7O0FBRUEsY0FBVSxXQUFXLFlBQVk7QUFDL0IsYUFBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLFdBQXhCO0FBQ0EsYUFBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLFdBQXhCO0FBQ0EsVUFBSSxPQUFKO0FBQ0EsYUFBTyxPQUFQO0FBQ0EsZUFBUyxJQUFUO0FBQ0EsWUFBTSxJQUFOO0FBQ0EsYUFBTyxlQUFQLENBQXVCLFVBQXZCO0FBQ0EsVUFBSSxZQUFKLENBQWlCLGFBQWpCLEVBQWdDLE1BQWhDO0FBQ0EsZ0JBQVUsS0FBVjtBQUNELEtBVlMsRUFVUCxlQVZPLENBQVY7QUFXRCxHQWpCRDs7QUFtQkEsTUFBSSxrQkFBa0IsU0FBUyxlQUFULENBQXlCLEtBQXpCLEVBQWdDO0FBQ3BELG1CQUFlLGNBQWY7O0FBRUEsUUFBSSxDQUFDLFlBQUwsRUFBbUI7O0FBRW5COzs7QUFHQSxnQkFBWSxTQUFTLGFBQXJCOztBQUVBLFFBQUksT0FBTyxhQUFhLFFBQWIsRUFBWDtBQUNBLFFBQUksZUFBZSxnQkFBZ0IsY0FBYyxRQUFkLEVBQWhCLEdBQTJDLEVBQTlEOztBQUVBLGlCQUFhLE9BQWI7O0FBRUE7Ozs7Ozs7QUFPQSxRQUFJLENBQUMsSUFBRCxJQUFTLEtBQUssTUFBTCxJQUFlLENBQXhCLElBQTZCLGlCQUFpQixJQUFqQixJQUF5QixDQUFDLEtBQTNELEVBQWtFO0FBQ2hFO0FBQ0QsS0FGRCxNQUVPLElBQUksQ0FBQyxhQUFELElBQWtCLGlCQUFpQixJQUF2QyxFQUE2QztBQUNsRCxlQUFTLE9BQU8sSUFBUCxFQUFhLE9BQWIsRUFBc0IsTUFBdEIsQ0FBVDs7QUFFQSxzQkFBZ0IsWUFBaEI7O0FBRUEsWUFBTSxDQUFDLEdBQUcsUUFBUSxJQUFaLEVBQWtCLE1BQWxCLEVBQTBCLFlBQTFCLEVBQXdDLEtBQXhDLENBQU47O0FBRUE7Ozs7QUFJQSxpQkFBVyxZQUFZO0FBQ3JCLGVBQU8sS0FBUDtBQUNBLGVBQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3QixXQUF4QjtBQUNBLGVBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixXQUFyQjtBQUNELE9BSkQsRUFJRyxlQUpIOztBQU1BOzs7O0FBSUEsYUFBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxJQUFsQztBQUNEO0FBQ0YsR0EvQ0Q7O0FBaURBLE1BQUksVUFBVSxTQUFTLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0I7QUFDaEMsZUFBVyxDQUFYLEVBQWMsTUFBZCxLQUF5QixZQUFZLEVBQUUsTUFBZCxFQUFzQixPQUF0QixDQUF6QixHQUEwRCxpQkFBMUQsR0FBOEUsTUFBOUU7QUFDRCxHQUZEO0FBR0EsTUFBSSxRQUFRLFNBQVMsS0FBVCxDQUFlLENBQWYsRUFBa0I7QUFDNUIsUUFBSSxDQUFDLFlBQUwsRUFBbUI7QUFDbkIsUUFBSSxFQUFFLE9BQUYsS0FBYyxFQUFsQixFQUFzQixPQUFPLE1BQVA7QUFDdEIsUUFBSSxZQUFZLGFBQWEsY0FBYixDQUE0QixVQUF4QyxFQUFvRCxPQUFwRCxDQUFKLEVBQWtFLGdCQUFnQixJQUFoQjtBQUNuRSxHQUpEOztBQU1BLFNBQU8sZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsT0FBbkM7QUFDQSxTQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLEtBQWpDO0FBQ0EsU0FBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxJQUFoQzs7QUFFQSxTQUFPO0FBQ0wsYUFBUyxTQUFTLE9BQVQsR0FBbUI7QUFDMUIsYUFBTyxtQkFBUCxDQUEyQixTQUEzQixFQUFzQyxPQUF0QztBQUNBLGFBQU8sbUJBQVAsQ0FBMkIsT0FBM0IsRUFBb0MsS0FBcEM7QUFDQSxhQUFPLG1CQUFQLENBQTJCLE1BQTNCLEVBQW1DLElBQW5DO0FBQ0EsYUFBTyxtQkFBUCxDQUEyQixRQUEzQixFQUFxQyxJQUFyQztBQUNBLGFBQU8sSUFBSSxPQUFKLEVBQVA7QUFDQSxlQUFTLElBQVQsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLEtBQWtDLFNBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsTUFBMUIsQ0FBbEM7QUFDQSxtQkFBYSxVQUFVLEtBQVYsRUFBYjtBQUNEO0FBVEksR0FBUDtBQVdELENBckhEOztBQXVIQSxRQUFRLE1BQVIsR0FBaUIsTUFBakI7QUFDQSxRQUFRLE9BQVIsR0FBa0IsTUFBbEI7OztBQ3hOQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3Qzs7QUFJQSxRQUFRLE9BQVIsR0FBa0IsVUFBVSxDQUFWLEVBQWE7QUFDN0IsU0FBTyxrQkFBa0IsbUJBQW1CLENBQW5CLENBQWxCLEdBQTBDLFFBQTFDLEdBQXFELG1CQUFtQixPQUFPLFFBQVAsQ0FBZ0IsSUFBbkMsQ0FBNUQ7QUFDRCxDQUZEOzs7QUNOQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3Qzs7QUFJQSxRQUFRLE9BQVIsR0FBa0IsVUFBVSxDQUFWLEVBQWE7QUFDN0IsU0FBTywwQ0FBMEMsbUJBQW1CLE9BQU8sUUFBUCxDQUFnQixJQUFuQyxDQUExQyxHQUFxRixTQUFyRixHQUFpRyxtQkFBbUIsQ0FBbkIsQ0FBeEc7QUFDRCxDQUZEOzs7QUNOQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3Qzs7QUFJQSxRQUFRLE9BQVIsR0FBa0IsVUFBVSxDQUFWLEVBQWE7QUFDN0IsU0FBTyxtQ0FBbUMsbUJBQW1CLE9BQU8sUUFBUCxDQUFnQixJQUFuQyxDQUFuQyxHQUE4RSxRQUE5RSxHQUF5RixtQkFBbUIsQ0FBbkIsQ0FBaEc7QUFDRCxDQUZEOzs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNvbnN0IHR3aXR0ZXIgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEuNDE0XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBkPVwiTTE2IDMuMDM4Yy0uNTkuMjYtMS4yMi40MzctMS44ODUuNTE3LjY3Ny0uNDA3IDEuMTk4LTEuMDUgMS40NDMtMS44MTYtLjYzNC4zNy0xLjMzNy42NC0yLjA4NS43OS0uNTk4LS42NC0xLjQ1LTEuMDQtMi4zOTYtMS4wNC0xLjgxMiAwLTMuMjgyIDEuNDctMy4yODIgMy4yOCAwIC4yNi4wMy41MS4wODUuNzUtMi43MjgtLjEzLTUuMTQ3LTEuNDQtNi43NjYtMy40MkMuODMgMi41OC42NyAzLjE0LjY3IDMuNzVjMCAxLjE0LjU4IDIuMTQzIDEuNDYgMi43MzItLjUzOC0uMDE3LTEuMDQ1LS4xNjUtMS40ODctLjQxdi4wNGMwIDEuNTkgMS4xMyAyLjkxOCAyLjYzMyAzLjIyLS4yNzYuMDc0LS41NjYuMTE0LS44NjUuMTE0LS4yMSAwLS40MS0uMDItLjYxLS4wNTguNDIgMS4zMDQgMS42MyAyLjI1MyAzLjA3IDIuMjgtMS4xMi44OC0yLjU0IDEuNDA0LTQuMDcgMS40MDQtLjI2IDAtLjUyLS4wMTUtLjc4LS4wNDUgMS40Ni45MyAzLjE4IDEuNDc0IDUuMDQgMS40NzQgNi4wNCAwIDkuMzQtNSA5LjM0LTkuMzMgMC0uMTQgMC0uMjgtLjAxLS40Mi42NC0uNDYgMS4yLTEuMDQgMS42NC0xLjd6IFwiPjwvcGF0aD48L3N2Zz5gXG5cbmV4cG9ydCBjb25zdCBmYWNlYm9vayA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMS40MTRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIGQ9XCJNMTUuMTE3IDBILjg4M0MuMzk1IDAgMCAuMzk1IDAgLjg4M3YxNC4yMzRjMCAuNDg4LjM5NS44ODMuODgzLjg4M2g3LjY2M1Y5LjgwNEg2LjQ2VjcuMzloMi4wODZWNS42MDdjMC0yLjA2NiAxLjI2Mi0zLjE5IDMuMTA2LTMuMTkuODgzIDAgMS42NDIuMDY0IDEuODYzLjA5NHYyLjE2aC0xLjI4Yy0xIDAtMS4xOTUuNDgtMS4xOTUgMS4xOHYxLjU0aDIuMzlsLS4zMSAyLjQyaC0yLjA4VjE2aDQuMDc3Yy40ODggMCAuODgzLS4zOTUuODgzLS44ODNWLjg4M0MxNiAuMzk1IDE1LjYwNSAwIDE1LjExNyAwIFwiPjwvcGF0aD48L3N2Zz5gXG5cbmV4cG9ydCBjb25zdCBnbWFpbCA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMS40MTRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIGQ9XCJNMTYgM3YxMGMwIC41NjctLjQzMyAxLTEgMWgtMVY0LjkyNUw4IDkuMjMzIDIgNC45MjVWMTRIMWMtLjU2NyAwLTEtLjQzMy0xLTFWM2MwLS4yODMuMTA4LS41MzMuMjg3LS43MTJDLjQ2NyAyLjEwNy43MTggMiAxIDJoLjMzM0w4IDYuODMzIDE0LjY2NyAySDE1Yy4yODMgMCAuNTMzLjEwOC43MTMuMjg4LjE3OS4xNzkuMjg3LjQyOS4yODcuNzEyeiBcIj48L3BhdGg+PC9zdmc+YFxuIiwiaW1wb3J0IHNzaGFyZSBmcm9tICcuLi9wYWNrYWdlL2Rpc3QvaW5kZXguanMnXG5pbXBvcnQgdHdpdHRlciBmcm9tICcuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy90d2l0dGVyLmpzJ1xuaW1wb3J0IGZhY2Vib29rIGZyb20gJy4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL2ZhY2Vib29rLmpzJ1xuaW1wb3J0IGVtYWlsIGZyb20gJy4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL2VtYWlsLmpzJ1xuXG5pbXBvcnQge1xuICB0d2l0dGVyIGFzIHR3LFxuICBmYWNlYm9vayBhcyBmYixcbiAgZ21haWxcbn0gZnJvbSAnLi9pY29ucy5qcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGUgPT4ge1xuICBjb25zdCBzID0gc3NoYXJlKHtcbiAgICBjb250ZXh0OiAnLmpzLXNoYXJhYmxlJyxcbiAgICB0cmFuc2l0aW9uU3BlZWQ6IDIwMFxuICB9LCBbXG4gICAgdXJsID0+IGA8YSBocmVmPVwiJHt0d2l0dGVyKHVybCl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHt0d308L2E+YCxcbiAgICB1cmwgPT4gYDxhIGhyZWY9XCIke2ZhY2Vib29rKHVybCl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtmYn08L2E+YCxcbiAgICB1cmwgPT4gYDxhIGhyZWY9XCIke2VtYWlsKHVybCl9XCI+JHtnbWFpbH08L2E+YCxcbiAgXSlcblxuICBzZXRUaW1lb3V0KCgpID0+IHMuZGVzdHJveSgpLCAxMDAwMClcbn0pXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnNzaGFyZSA9IHVuZGVmaW5lZDtcblxudmFyIF90YWNranMgPSByZXF1aXJlKCd0YWNranMnKTtcblxuLyoqXG4gKiBDaGVjayBpZiBjbGljayBoYXBwZW5lZFxuICogd2l0aGluIHRoZSBkaWFsb2dcbiAqXG4gKiBAcGFyYW0ge2V2ZW50fSBlIFRoZSBjbGljayBldmVudFxuICogQHBhcmFtIHtvYmplY3R9IGRpYWxvZyBUaGUgc2hhcmUgZGlhbG9nXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG52YXIgdmFsaWRDbGljayA9IGZ1bmN0aW9uIHZhbGlkQ2xpY2soZSwgZGlhbG9nKSB7XG4gIHJldHVybiBlLnRhcmdldCAhPT0gZGlhbG9nIHx8ICFkaWFsb2cuY29udGFpbnMoZS50YXJnZXQpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBldmVudCBpcyB3aXRoaW5cbiAqIHRoZSB1c2VyLXNwZWNpZmllZCBzY29wZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCBUaGUgZWxlbWVudCB0aGF0IHRyaWdnZXJlZCB0aGUgZXZlbnRcbiAqIEBwYXJhbSB7YXJyYXl9IGNvbnRleHQgQXJyYXkgb2YgZWxlbWVudHMgdG8gc2NvcGUgdG9cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbnZhciBpc0luQ29udGV4dCA9IGZ1bmN0aW9uIGlzSW5Db250ZXh0KGVsLCBjb250ZXh0KSB7XG4gIHJldHVybiAhY29udGV4dCB8fCBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGV4dCkpLmZpbHRlcihmdW5jdGlvbiAoY3R4KSB7XG4gICAgcmV0dXJuIGVsID09PSBjdHggfHwgY3R4LmNvbnRhaW5zKGVsKTtcbiAgfSkubGVuZ3RoID4gMDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBtYWluIHBvcnRhbFxuICogdGhhdCB0aGUgbGlua3MgYXJlXG4gKiByZW5kZXJlZCBpbnRvLiBTZXRcbiAqIGFjY2Vzc2libGl0eSBhdHRycy5cbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IGEgRE9NIGVsZW1lbnRcbiAqL1xudmFyIGNyZWF0ZVBvcnRhbCA9IGZ1bmN0aW9uIGNyZWF0ZVBvcnRhbCgpIHtcbiAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuY2xhc3NOYW1lID0gJ3NzaGFyZSc7XG4gIGRpdi5yb2xlID0gJ2RpYWxvZyc7XG4gIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnU2hhcmUgRGlhbG9nJyk7XG4gIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICByZXR1cm4gZGl2O1xufTtcblxuLyoqXG4gKiBSZW5kZXIgc2hhcmUgbGlua3MsXG4gKiByZXR1cm4gbm9kZSBhbmQgZGVzdHJveSBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUaGUgaGlnaGxpZ2h0ZWQgdGV4dFxuICogQHBhcmFtIHthcnJheX0gc2hhcmVycyBBcnJheSBvZiBmdW5jdGlvbnMgdGhhdCByZXR1cm4gZWxlbWVudHMgb3Igc3RyaW5nc1xuICogQHBhcmFtIHtvYmplY3R9IHBvcnRhbCBUaGUgcG9ydGFsIHJldHVybmVkIGZyb20gY3JlYXRlUG9ydGFsKClcbiAqL1xudmFyIHJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZXh0LCBzaGFyZXJzLCBwb3J0YWwpIHtcbiAgcG9ydGFsLmlubmVySFRNTCA9ICdcXG4gICAgPGRpdiBjbGFzcz1cInNzaGFyZV9faW5uZXJcIj4nICsgc2hhcmVycy5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICB2YXIgZWwgPSBzKHRleHQpO1xuICAgIHJldHVybiB0eXBlb2YgZWwgPT09ICdzdHJpbmcnID8gZWwgOiBlbC5vdXRlckhUTUw7XG4gIH0pLmpvaW4oJycpICsgJzwvZGl2PlxcbiAgJztcblxuICBwb3J0YWwuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gIHBvcnRhbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgdmFyIG5vZGUgPSBwb3J0YWwuY2hpbGRyZW5bMF07XG5cbiAgcmV0dXJuIHtcbiAgICBub2RlOiBub2RlLFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICBwb3J0YWwucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBHZXQgcmFuZ2Ugb2JqZWN0IGZvciBoaWdobGlnaHRlZCB0ZXh0XG4gKlxuICogQHJldHVybiB7b2JqZWN0fSByYW5nZVxuICovXG52YXIgZ2V0U2VsZWN0aW9uID0gZnVuY3Rpb24gZ2V0U2VsZWN0aW9uKCkge1xuICB2YXIgcmFuZ2UgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgaWYgKHJhbmdlLmNvbGxhcHNlZCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIHJhbmdlLnJhbmdlQ291bnQgPCAxID8gbnVsbCA6IHJhbmdlLmdldFJhbmdlQXQoMCk7XG59O1xuXG4vKipcbiAqIEluaXRcbiAqL1xudmFyIHNzaGFyZSA9IGZ1bmN0aW9uIHNzaGFyZShfcmVmKSB7XG4gIHZhciBfcmVmJGNvbnRleHQgPSBfcmVmLmNvbnRleHQsXG4gICAgICBjb250ZXh0ID0gX3JlZiRjb250ZXh0ID09PSB1bmRlZmluZWQgPyBudWxsIDogX3JlZiRjb250ZXh0LFxuICAgICAgX3JlZiR0cmFuc2l0aW9uU3BlZWQgPSBfcmVmLnRyYW5zaXRpb25TcGVlZCxcbiAgICAgIHRyYW5zaXRpb25TcGVlZCA9IF9yZWYkdHJhbnNpdGlvblNwZWVkID09PSB1bmRlZmluZWQgPyAyMDAgOiBfcmVmJHRyYW5zaXRpb25TcGVlZDtcbiAgdmFyIHNoYXJlcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IFtdO1xuXG4gIHZhciBwb3J0YWwgPSBjcmVhdGVQb3J0YWwoKTtcblxuICB2YXIgYmFyID0gbnVsbDtcbiAgdmFyIGRpYWxvZyA9IG51bGw7XG4gIHZhciB0aW1lb3V0ID0gMDtcbiAgdmFyIGZvY3VzTm9kZSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFNlbGVjdGlvbnNcbiAgICovXG4gIHZhciBwcmV2aW91c1JhbmdlID0gbnVsbDtcbiAgdmFyIGN1cnJlbnRSYW5nZSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBkaWFsb2csIHRhY2tqcyBpbnN0YW5jZVxuICAgKiByZW1vdmVzIGxpc3RlbmVycywgYW5kIHNldHNcbiAgICogYWNjZXNzaWJsaXR5IGF0dHJzIGJhY2sgdG8gZGVmYXVsdHNcbiAgICovXG4gIHZhciBoaWRlID0gZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBpZiAoIWRpYWxvZyB8fCAhYmFyKSByZXR1cm47XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGlkZSk7XG4gICAgcG9ydGFsLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGluZycpO1xuXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcG9ydGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGluZycpO1xuICAgICAgcG9ydGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgICAgYmFyLmRlc3Ryb3koKTtcbiAgICAgIGRpYWxvZy5kZXN0cm95KCk7XG4gICAgICBkaWFsb2cgPSBudWxsO1xuICAgICAgYmFyID0gbnVsbDtcbiAgICAgIHBvcnRhbC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICBmb2N1c05vZGUuZm9jdXMoKTtcbiAgICB9LCB0cmFuc2l0aW9uU3BlZWQpO1xuICB9O1xuXG4gIHZhciBoYW5kbGVTZWxlY3Rpb24gPSBmdW5jdGlvbiBoYW5kbGVTZWxlY3Rpb24oa2V5dXApIHtcbiAgICBjdXJyZW50UmFuZ2UgPSBnZXRTZWxlY3Rpb24oKTtcblxuICAgIGlmICghY3VycmVudFJhbmdlKSByZXR1cm47XG5cbiAgICAvKipcbiAgICAgKiBTYXZlIGxhc3QgZm9jdXNlZCBub2RlXG4gICAgICovXG4gICAgZm9jdXNOb2RlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgIHZhciB0ZXh0ID0gY3VycmVudFJhbmdlLnRvU3RyaW5nKCk7XG4gICAgdmFyIHByZXZpb3VzVGV4dCA9IHByZXZpb3VzUmFuZ2UgPyBwcmV2aW91c1JhbmdlLnRvU3RyaW5nKCkgOiAnJztcblxuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgIC8qKlxuICAgICAqIElmIG5vIHRleHQsIG9yIHRoZSB0ZXh0IGlzIHRoZSBzYW1lXG4gICAgICogYWZ0ZXIgYSBjbGljayBldmVudCwgaGlkZS5cbiAgICAgKlxuICAgICAqIE90aGVyd2lzZSwgaWYgaXQncyBuZXcgdGV4dFxuICAgICAqIHJlbmRlciBhIG5ldyBkaWFsb2cuXG4gICAgICovXG4gICAgaWYgKCF0ZXh0IHx8IHRleHQubGVuZ3RoIDw9IDAgfHwgcHJldmlvdXNUZXh0ID09PSB0ZXh0ICYmICFrZXl1cCkge1xuICAgICAgaGlkZSgpO1xuICAgIH0gZWxzZSBpZiAoIXByZXZpb3VzUmFuZ2UgfHwgcHJldmlvdXNUZXh0ICE9PSB0ZXh0KSB7XG4gICAgICBkaWFsb2cgPSByZW5kZXIodGV4dCwgc2hhcmVycywgcG9ydGFsKTtcblxuICAgICAgcHJldmlvdXNSYW5nZSA9IGN1cnJlbnRSYW5nZTtcblxuICAgICAgYmFyID0gKDAsIF90YWNranMudGFjaykocG9ydGFsLCBjdXJyZW50UmFuZ2UsICd0b3AnKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBFbnN1cmVzIHlvdSBkb24ndCBzZWUgdGhlXG4gICAgICAgKiBkaWFsb2cgZmx5IGludG8gcGxhY2VcbiAgICAgICAqL1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBvcnRhbC5mb2N1cygpO1xuICAgICAgICBwb3J0YWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkaW5nJyk7XG4gICAgICAgIHBvcnRhbC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICAgIH0sIHRyYW5zaXRpb25TcGVlZCk7XG5cbiAgICAgIC8qKlxuICAgICAgICogQWRkIGxpc3RlbmVyLCB3aGljaCBpcyByZW1vdmVkXG4gICAgICAgKiBpbW1lZGlhdGVseSBpZiBpdCdzIHRyaWdnZXJlZFxuICAgICAgICovXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGlkZSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBtb3VzZXVwID0gZnVuY3Rpb24gbW91c2V1cChlKSB7XG4gICAgdmFsaWRDbGljayhlLCBwb3J0YWwpICYmIGlzSW5Db250ZXh0KGUudGFyZ2V0LCBjb250ZXh0KSA/IGhhbmRsZVNlbGVjdGlvbigpIDogaGlkZSgpO1xuICB9O1xuICB2YXIga2V5dXAgPSBmdW5jdGlvbiBrZXl1cChlKSB7XG4gICAgaWYgKCFjdXJyZW50UmFuZ2UpIHJldHVybjtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAyNykgcmV0dXJuIGhpZGUoKTtcbiAgICBpZiAoaXNJbkNvbnRleHQoY3VycmVudFJhbmdlLnN0YXJ0Q29udGFpbmVyLnBhcmVudE5vZGUsIGNvbnRleHQpKSBoYW5kbGVTZWxlY3Rpb24odHJ1ZSk7XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5dXApO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGhpZGUpO1xuXG4gIHJldHVybiB7XG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXl1cCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIGhpZGUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhpZGUpO1xuICAgICAgYmFyICYmIGJhci5kZXN0cm95KCk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHBvcnRhbCkgJiYgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwb3J0YWwpO1xuICAgICAgZm9jdXNOb2RlICYmIGZvY3VzTm9kZS5mb2N1cygpO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuc3NoYXJlID0gc3NoYXJlO1xuZXhwb3J0cy5kZWZhdWx0ID0gc3NoYXJlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAocykge1xuICByZXR1cm4gXCJtYWlsdG86P2JvZHk9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocykgKyBcIiUwYSUwYVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzKSB7XG4gIHJldHVybiBcImh0dHA6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci5waHA/dT1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uaHJlZikgKyBcIiZxdW90ZT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChzKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzKSB7XG4gIHJldHVybiBcImh0dHBzOi8vdHdpdHRlci5jb20vc2hhcmU/dXJsPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5ocmVmKSArIFwiJnRleHQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocyk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBnZXRDb29yZHMgPSBleHBvcnRzLmdldENvb3JkcyA9IGZ1bmN0aW9uIGdldENvb3JkcyhlbGVtZW50KSB7XG4gIHZhciBfZWxlbWVudCRnZXRCb3VuZGluZ0MgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgbCA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5sZWZ0LFxuICAgICAgciA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5yaWdodCxcbiAgICAgIHQgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MudG9wLFxuICAgICAgYiA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5ib3R0b207XG5cbiAgdmFyIF93aW5kb3cgPSB3aW5kb3csXG4gICAgICB5ID0gX3dpbmRvdy5wYWdlWU9mZnNldDtcblxuXG4gIHJldHVybiB7XG4gICAgaGVpZ2h0OiBiIC0gdCxcbiAgICB3aWR0aDogciAtIGwsXG4gICAgdG9wOiB7XG4gICAgICB5OiB5ICsgdCxcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICB5OiB5ICsgYixcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgeTogdCArIChiIC0gdCkgLyAyLFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIHk6IHQgKyAoYiAtIHQpIC8gMixcbiAgICAgIHg6IHJcbiAgICB9LFxuICAgIHRvcExlZnQ6IHtcbiAgICAgIHk6IHkgKyB0LFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgYm90dG9tTGVmdDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiBsXG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeTogeSArIHQsXG4gICAgICB4OiByXG4gICAgfSxcbiAgICBib3R0b21SaWdodDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiByXG4gICAgfVxuICB9O1xufTtcblxudmFyIHBvc2l0aW9uID0gZXhwb3J0cy5wb3NpdGlvbiA9IGZ1bmN0aW9uIHBvc2l0aW9uKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCkge1xuICB2YXIgYyA9IGdldENvb3JkcyhzY29wZSlbcGxhY2VtZW50XTtcbiAgdmFyIGUgPSBnZXRDb29yZHModGFyZ2V0KTtcbiAgdmFyIF93aW5kb3cyID0gd2luZG93LFxuICAgICAgeSA9IF93aW5kb3cyLnBhZ2VZT2Zmc2V0O1xuXG5cbiAgdmFyIHZwID0ge1xuICAgIHRvcDogeSxcbiAgICBib3R0b206IHkgKyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogd2luZG93LmlubmVyV2lkdGhcbiAgfTtcblxuICB2YXIgb2Zmc2V0cyA9IHtcbiAgICB0b3A6IHtcbiAgICAgIHg6IGUud2lkdGggLyAyLFxuICAgICAgeTogZS5oZWlnaHRcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgeDogZS53aWR0aCAvIDIsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogZS5oZWlnaHQgLyAyXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0IC8gMlxuICAgIH0sXG4gICAgdG9wTGVmdDoge1xuICAgICAgeDogZS53aWR0aCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b21MZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAgYm90dG9tUmlnaHQ6IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICB9O1xuXG4gIHZhciBwb3N4ID0gYy54IC0gb2Zmc2V0c1twbGFjZW1lbnRdLng7XG4gIHZhciBwb3N5ID0gYy55IC0gb2Zmc2V0c1twbGFjZW1lbnRdLnk7XG5cbiAgaWYgKHBvc3ggPCB2cC5sZWZ0KSB7XG4gICAgcG9zeCA9IHZwLmxlZnQ7XG4gIH0gZWxzZSBpZiAocG9zeCArIGUud2lkdGggPiB2cC5yaWdodCkge1xuICAgIHBvc3ggPSB2cC5yaWdodCAtIGUud2lkdGg7XG4gIH1cblxuICBpZiAocG9zeSA8IHZwLnRvcCkge1xuICAgIHBvc3kgPSB2cC50b3A7XG4gIH0gZWxzZSBpZiAocG9zeSArIGUuaGVpZ2h0ID4gdnAuYm90dG9tKSB7XG4gICAgcG9zeSA9IHZwLmJvdHRvbSAtIGUuaGVpZ2h0O1xuICB9XG5cbiAgdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBwb3N4ICsgJ3B4KSB0cmFuc2xhdGVZKCcgKyBwb3N5ICsgJ3B4KSc7XG59O1xuXG52YXIgdGFjayA9IGV4cG9ydHMudGFjayA9IGZ1bmN0aW9uIHRhY2sodGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KSB7XG4gIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy10YWNrZWQnKTtcbiAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcblxuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdGFja2VkJyk7XG4gICAgfVxuICB9O1xufTsiXX0=
