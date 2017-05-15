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
      portal.removeAttribute('tabindex');
      portal.setAttribute('aria-hidden', 'true');

      bar && bar.destroy();
      dialog && dialog.destroy();
      dialog = null;
      bar = null;
    }, transitionSpeed);
  };

  var handleSelection = function handleSelection(keyup) {
    currentRange = getSelection();

    if (!currentRange) return;

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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, via, hashtags) {
  return 'https://twitter.com/share?url=' + window.location.href + '&text=' + encodeURIComponent(text) + (via ? '&via=' + via : '') + (hashtags ? '&hashtags=' + encodeURIComponent(hashtags) : '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpY29ucy5qcyIsImluZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L2luZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvZW1haWwuanMiLCIuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy9mYWNlYm9vay5qcyIsIi4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL3R3aXR0ZXIuanMiLCIuLi9wYWNrYWdlL25vZGVfbW9kdWxlcy90YWNranMvZGlzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSw2MEJBQU47O0FBRUEsSUFBTSwrakJBQU47O0FBRUEsSUFBTSxtZUFBTjs7Ozs7QUNKUDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBTUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsYUFBSztBQUNqRCxNQUFNLElBQUkscUJBQU87QUFDZixhQUFTLGNBRE07QUFFZixxQkFBaUI7QUFGRixHQUFQLEVBR1AsQ0FDRDtBQUFBLHlCQUFtQix1QkFBUSxHQUFSLENBQW5CO0FBQUEsR0FEQyxFQUVEO0FBQUEseUJBQW1CLHdCQUFTLEdBQVQsQ0FBbkI7QUFBQSxHQUZDLEVBR0Q7QUFBQSx5QkFBbUIscUJBQU0sR0FBTixDQUFuQjtBQUFBLEdBSEMsQ0FITyxDQUFWO0FBUUQsQ0FURDs7O0FDWEE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLE1BQVIsR0FBaUIsU0FBakI7O0FBRUEsSUFBSSxVQUFVLFFBQVEsUUFBUixDQUFkOztBQUVBOzs7Ozs7OztBQVFBLElBQUksYUFBYSxTQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUIsTUFBdkIsRUFBK0I7QUFDOUMsU0FBTyxFQUFFLE1BQUYsS0FBYSxNQUFiLElBQXVCLENBQUMs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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgdHdpdHRlciA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMS40MTRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIGQ9XCJNMTYgMy4wMzhjLS41OS4yNi0xLjIyLjQzNy0xLjg4NS41MTcuNjc3LS40MDcgMS4xOTgtMS4wNSAxLjQ0My0xLjgxNi0uNjM0LjM3LTEuMzM3LjY0LTIuMDg1Ljc5LS41OTgtLjY0LTEuNDUtMS4wNC0yLjM5Ni0xLjA0LTEuODEyIDAtMy4yODIgMS40Ny0zLjI4MiAzLjI4IDAgLjI2LjAzLjUxLjA4NS43NS0yLjcyOC0uMTMtNS4xNDctMS40NC02Ljc2Ni0zLjQyQy44MyAyLjU4LjY3IDMuMTQuNjcgMy43NWMwIDEuMTQuNTggMi4xNDMgMS40NiAyLjczMi0uNTM4LS4wMTctMS4wNDUtLjE2NS0xLjQ4Ny0uNDF2LjA0YzAgMS41OSAxLjEzIDIuOTE4IDIuNjMzIDMuMjItLjI3Ni4wNzQtLjU2Ni4xMTQtLjg2NS4xMTQtLjIxIDAtLjQxLS4wMi0uNjEtLjA1OC40MiAxLjMwNCAxLjYzIDIuMjUzIDMuMDcgMi4yOC0xLjEyLjg4LTIuNTQgMS40MDQtNC4wNyAxLjQwNC0uMjYgMC0uNTItLjAxNS0uNzgtLjA0NSAxLjQ2LjkzIDMuMTggMS40NzQgNS4wNCAxLjQ3NCA2LjA0IDAgOS4zNC01IDkuMzQtOS4zMyAwLS4xNCAwLS4yOC0uMDEtLjQyLjY0LS40NiAxLjItMS4wNCAxLjY0LTEuN3ogXCI+PC9wYXRoPjwvc3ZnPmBcblxuZXhwb3J0IGNvbnN0IGZhY2Vib29rID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxLjQxNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgZD1cIk0xNS4xMTcgMEguODgzQy4zOTUgMCAwIC4zOTUgMCAuODgzdjE0LjIzNGMwIC40ODguMzk1Ljg4My44ODMuODgzaDcuNjYzVjkuODA0SDYuNDZWNy4zOWgyLjA4NlY1LjYwN2MwLTIuMDY2IDEuMjYyLTMuMTkgMy4xMDYtMy4xOS44ODMgMCAxLjY0Mi4wNjQgMS44NjMuMDk0djIuMTZoLTEuMjhjLTEgMC0xLjE5NS40OC0xLjE5NSAxLjE4djEuNTRoMi4zOWwtLjMxIDIuNDJoLTIuMDhWMTZoNC4wNzdjLjQ4OCAwIC44ODMtLjM5NS44ODMtLjg4M1YuODgzQzE2IC4zOTUgMTUuNjA1IDAgMTUuMTE3IDAgXCI+PC9wYXRoPjwvc3ZnPmBcblxuZXhwb3J0IGNvbnN0IGdtYWlsID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxLjQxNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgZD1cIk0xNiAzdjEwYzAgLjU2Ny0uNDMzIDEtMSAxaC0xVjQuOTI1TDggOS4yMzMgMiA0LjkyNVYxNEgxYy0uNTY3IDAtMS0uNDMzLTEtMVYzYzAtLjI4My4xMDgtLjUzMy4yODctLjcxMkMuNDY3IDIuMTA3LjcxOCAyIDEgMmguMzMzTDggNi44MzMgMTQuNjY3IDJIMTVjLjI4MyAwIC41MzMuMTA4LjcxMy4yODguMTc5LjE3OS4yODcuNDI5LjI4Ny43MTJ6IFwiPjwvcGF0aD48L3N2Zz5gXG4iLCJpbXBvcnQgc3NoYXJlIGZyb20gJy4uL3BhY2thZ2UvZGlzdC9pbmRleC5qcydcbmltcG9ydCB0d2l0dGVyIGZyb20gJy4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL3R3aXR0ZXIuanMnXG5pbXBvcnQgZmFjZWJvb2sgZnJvbSAnLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvZmFjZWJvb2suanMnXG5pbXBvcnQgZW1haWwgZnJvbSAnLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvZW1haWwuanMnXG5cbmltcG9ydCB7XG4gIHR3aXR0ZXIgYXMgdHcsXG4gIGZhY2Vib29rIGFzIGZiLFxuICBnbWFpbFxufSBmcm9tICcuL2ljb25zLmpzJ1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZSA9PiB7XG4gIGNvbnN0IHMgPSBzc2hhcmUoe1xuICAgIGNvbnRleHQ6ICcuanMtc2hhcmFibGUnLFxuICAgIHRyYW5zaXRpb25TcGVlZDogMjAwXG4gIH0sIFtcbiAgICB1cmwgPT4gYDxhIGhyZWY9XCIke3R3aXR0ZXIodXJsKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke3R3fTwvYT5gLFxuICAgIHVybCA9PiBgPGEgaHJlZj1cIiR7ZmFjZWJvb2sodXJsKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke2ZifTwvYT5gLFxuICAgIHVybCA9PiBgPGEgaHJlZj1cIiR7ZW1haWwodXJsKX1cIj4ke2dtYWlsfTwvYT5gLFxuICBdKVxufSlcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuc3NoYXJlID0gdW5kZWZpbmVkO1xuXG52YXIgX3RhY2tqcyA9IHJlcXVpcmUoJ3RhY2tqcycpO1xuXG4vKipcbiAqIENoZWNrIGlmIGNsaWNrIGhhcHBlbmVkXG4gKiB3aXRoaW4gdGhlIGRpYWxvZ1xuICpcbiAqIEBwYXJhbSB7ZXZlbnR9IGUgVGhlIGNsaWNrIGV2ZW50XG4gKiBAcGFyYW0ge29iamVjdH0gZGlhbG9nIFRoZSBzaGFyZSBkaWFsb2dcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbnZhciB2YWxpZENsaWNrID0gZnVuY3Rpb24gdmFsaWRDbGljayhlLCBkaWFsb2cpIHtcbiAgcmV0dXJuIGUudGFyZ2V0ICE9PSBkaWFsb2cgfHwgIWRpYWxvZy5jb250YWlucyhlLnRhcmdldCk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGV2ZW50IGlzIHdpdGhpblxuICogdGhlIHVzZXItc3BlY2lmaWVkIHNjb3BlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGVsIFRoZSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBldmVudFxuICogQHBhcmFtIHthcnJheX0gY29udGV4dCBBcnJheSBvZiBlbGVtZW50cyB0byBzY29wZSB0b1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xudmFyIGlzSW5Db250ZXh0ID0gZnVuY3Rpb24gaXNJbkNvbnRleHQoZWwsIGNvbnRleHQpIHtcbiAgcmV0dXJuICFjb250ZXh0IHx8IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb250ZXh0KSkuZmlsdGVyKGZ1bmN0aW9uIChjdHgpIHtcbiAgICByZXR1cm4gZWwgPT09IGN0eCB8fCBjdHguY29udGFpbnMoZWwpO1xuICB9KS5sZW5ndGggPiAwO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgdGhlIG1haW4gcG9ydGFsXG4gKiB0aGF0IHRoZSBsaW5rcyBhcmVcbiAqIHJlbmRlcmVkIGludG8uIFNldFxuICogYWNjZXNzaWJsaXR5IGF0dHJzLlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gYSBET00gZWxlbWVudFxuICovXG52YXIgY3JlYXRlUG9ydGFsID0gZnVuY3Rpb24gY3JlYXRlUG9ydGFsKCkge1xuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5jbGFzc05hbWUgPSAnc3NoYXJlJztcbiAgZGl2LnJvbGUgPSAnZGlhbG9nJztcbiAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdTaGFyZSBEaWFsb2cnKTtcbiAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gIHJldHVybiBkaXY7XG59O1xuXG4vKipcbiAqIFJlbmRlciBzaGFyZSBsaW5rcyxcbiAqIHJldHVybiBub2RlIGFuZCBkZXN0cm95IG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRoZSBoaWdobGlnaHRlZCB0ZXh0XG4gKiBAcGFyYW0ge2FycmF5fSBzaGFyZXJzIEFycmF5IG9mIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBlbGVtZW50cyBvciBzdHJpbmdzXG4gKiBAcGFyYW0ge29iamVjdH0gcG9ydGFsIFRoZSBwb3J0YWwgcmV0dXJuZWQgZnJvbSBjcmVhdGVQb3J0YWwoKVxuICovXG52YXIgcmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRleHQsIHNoYXJlcnMsIHBvcnRhbCkge1xuICBwb3J0YWwuaW5uZXJIVE1MID0gJ1xcbiAgICA8ZGl2IGNsYXNzPVwic3NoYXJlX19pbm5lclwiPicgKyBzaGFyZXJzLm1hcChmdW5jdGlvbiAocykge1xuICAgIHZhciBlbCA9IHModGV4dCk7XG4gICAgcmV0dXJuIHR5cGVvZiBlbCA9PT0gJ3N0cmluZycgPyBlbCA6IGVsLm91dGVySFRNTDtcbiAgfSkuam9pbignJykgKyAnPC9kaXY+XFxuICAnO1xuXG4gIHBvcnRhbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgcG9ydGFsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICB2YXIgbm9kZSA9IHBvcnRhbC5jaGlsZHJlblswXTtcblxuICByZXR1cm4ge1xuICAgIG5vZGU6IG5vZGUsXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHBvcnRhbC5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIEdldCByYW5nZSBvYmplY3QgZm9yIGhpZ2hsaWdodGVkIHRleHRcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IHJhbmdlXG4gKi9cbnZhciBnZXRTZWxlY3Rpb24gPSBmdW5jdGlvbiBnZXRTZWxlY3Rpb24oKSB7XG4gIHZhciByYW5nZSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICBpZiAocmFuZ2UuY29sbGFwc2VkKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gcmFuZ2UucmFuZ2VDb3VudCA8IDEgPyBudWxsIDogcmFuZ2UuZ2V0UmFuZ2VBdCgwKTtcbn07XG5cbi8qKlxuICogSW5pdFxuICovXG52YXIgc3NoYXJlID0gZnVuY3Rpb24gc3NoYXJlKF9yZWYpIHtcbiAgdmFyIF9yZWYkY29udGV4dCA9IF9yZWYuY29udGV4dCxcbiAgICAgIGNvbnRleHQgPSBfcmVmJGNvbnRleHQgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBfcmVmJGNvbnRleHQsXG4gICAgICBfcmVmJHRyYW5zaXRpb25TcGVlZCA9IF9yZWYudHJhbnNpdGlvblNwZWVkLFxuICAgICAgdHJhbnNpdGlvblNwZWVkID0gX3JlZiR0cmFuc2l0aW9uU3BlZWQgPT09IHVuZGVmaW5lZCA/IDIwMCA6IF9yZWYkdHJhbnNpdGlvblNwZWVkO1xuICB2YXIgc2hhcmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogW107XG5cbiAgdmFyIHBvcnRhbCA9IGNyZWF0ZVBvcnRhbCgpO1xuXG4gIHZhciBiYXIgPSBudWxsO1xuICB2YXIgZGlhbG9nID0gbnVsbDtcbiAgdmFyIHRpbWVvdXQgPSAwO1xuXG4gIC8qKlxuICAgKiBTZWxlY3Rpb25zXG4gICAqL1xuICB2YXIgcHJldmlvdXNSYW5nZSA9IG51bGw7XG4gIHZhciBjdXJyZW50UmFuZ2UgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgZGlhbG9nLCB0YWNranMgaW5zdGFuY2VcbiAgICogcmVtb3ZlcyBsaXN0ZW5lcnMsIGFuZCBzZXRzXG4gICAqIGFjY2Vzc2libGl0eSBhdHRycyBiYWNrIHRvIGRlZmF1bHRzXG4gICAqL1xuICB2YXIgaGlkZSA9IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgaWYgKCFkaWFsb2cgfHwgIWJhcikgcmV0dXJuO1xuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhpZGUpO1xuICAgIHBvcnRhbC5jbGFzc0xpc3QuYWRkKCdpcy1oaWRpbmcnKTtcblxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHBvcnRhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRpbmcnKTtcbiAgICAgIHBvcnRhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgIHBvcnRhbC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICBwb3J0YWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgIGJhciAmJiBiYXIuZGVzdHJveSgpO1xuICAgICAgZGlhbG9nICYmIGRpYWxvZy5kZXN0cm95KCk7XG4gICAgICBkaWFsb2cgPSBudWxsO1xuICAgICAgYmFyID0gbnVsbDtcbiAgICB9LCB0cmFuc2l0aW9uU3BlZWQpO1xuICB9O1xuXG4gIHZhciBoYW5kbGVTZWxlY3Rpb24gPSBmdW5jdGlvbiBoYW5kbGVTZWxlY3Rpb24oa2V5dXApIHtcbiAgICBjdXJyZW50UmFuZ2UgPSBnZXRTZWxlY3Rpb24oKTtcblxuICAgIGlmICghY3VycmVudFJhbmdlKSByZXR1cm47XG5cbiAgICB2YXIgdGV4dCA9IGN1cnJlbnRSYW5nZS50b1N0cmluZygpO1xuICAgIHZhciBwcmV2aW91c1RleHQgPSBwcmV2aW91c1JhbmdlID8gcHJldmlvdXNSYW5nZS50b1N0cmluZygpIDogJyc7XG5cbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICAvKipcbiAgICAgKiBJZiBubyB0ZXh0LCBvciB0aGUgdGV4dCBpcyB0aGUgc2FtZVxuICAgICAqIGFmdGVyIGEgY2xpY2sgZXZlbnQsIGhpZGUuXG4gICAgICpcbiAgICAgKiBPdGhlcndpc2UsIGlmIGl0J3MgbmV3IHRleHRcbiAgICAgKiByZW5kZXIgYSBuZXcgZGlhbG9nLlxuICAgICAqL1xuICAgIGlmICghdGV4dCB8fCB0ZXh0Lmxlbmd0aCA8PSAwIHx8IHByZXZpb3VzVGV4dCA9PT0gdGV4dCAmJiAha2V5dXApIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9IGVsc2UgaWYgKCFwcmV2aW91c1JhbmdlIHx8IHByZXZpb3VzVGV4dCAhPT0gdGV4dCkge1xuICAgICAgZGlhbG9nID0gcmVuZGVyKHRleHQsIHNoYXJlcnMsIHBvcnRhbCk7XG5cbiAgICAgIHByZXZpb3VzUmFuZ2UgPSBjdXJyZW50UmFuZ2U7XG5cbiAgICAgIGJhciA9ICgwLCBfdGFja2pzLnRhY2spKHBvcnRhbCwgY3VycmVudFJhbmdlLCAndG9wJyk7XG5cbiAgICAgIC8qKlxuICAgICAgICogRW5zdXJlcyB5b3UgZG9uJ3Qgc2VlIHRoZVxuICAgICAgICogZGlhbG9nIGZseSBpbnRvIHBsYWNlXG4gICAgICAgKi9cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3J0YWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkaW5nJyk7XG4gICAgICAgIHBvcnRhbC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICAgIH0sIHRyYW5zaXRpb25TcGVlZCk7XG5cbiAgICAgIC8qKlxuICAgICAgICogQWRkIGxpc3RlbmVyLCB3aGljaCBpcyByZW1vdmVkXG4gICAgICAgKiBpbW1lZGlhdGVseSBpZiBpdCdzIHRyaWdnZXJlZFxuICAgICAgICovXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGlkZSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBtb3VzZXVwID0gZnVuY3Rpb24gbW91c2V1cChlKSB7XG4gICAgdmFsaWRDbGljayhlLCBwb3J0YWwpICYmIGlzSW5Db250ZXh0KGUudGFyZ2V0LCBjb250ZXh0KSA/IGhhbmRsZVNlbGVjdGlvbigpIDogaGlkZSgpO1xuICB9O1xuICB2YXIga2V5dXAgPSBmdW5jdGlvbiBrZXl1cChlKSB7XG4gICAgaWYgKCFjdXJyZW50UmFuZ2UpIHJldHVybjtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAyNykgcmV0dXJuIGhpZGUoKTtcbiAgICBpZiAoaXNJbkNvbnRleHQoY3VycmVudFJhbmdlLnN0YXJ0Q29udGFpbmVyLnBhcmVudE5vZGUsIGNvbnRleHQpKSBoYW5kbGVTZWxlY3Rpb24odHJ1ZSk7XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5dXApO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGhpZGUpO1xuXG4gIHJldHVybiB7XG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXl1cCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIGhpZGUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhpZGUpO1xuICAgICAgYmFyICYmIGJhci5kZXN0cm95KCk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHBvcnRhbCkgJiYgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwb3J0YWwpO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuc3NoYXJlID0gc3NoYXJlO1xuZXhwb3J0cy5kZWZhdWx0ID0gc3NoYXJlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAocykge1xuICByZXR1cm4gXCJtYWlsdG86P2JvZHk9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocykgKyBcIiUwYSUwYVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzKSB7XG4gIHJldHVybiBcImh0dHA6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci5waHA/dT1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uaHJlZikgKyBcIiZxdW90ZT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChzKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAodGV4dCwgdmlhLCBoYXNodGFncykge1xuICByZXR1cm4gJ2h0dHBzOi8vdHdpdHRlci5jb20vc2hhcmU/dXJsPScgKyB3aW5kb3cubG9jYXRpb24uaHJlZiArICcmdGV4dD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpICsgKHZpYSA/ICcmdmlhPScgKyB2aWEgOiAnJykgKyAoaGFzaHRhZ3MgPyAnJmhhc2h0YWdzPScgKyBlbmNvZGVVUklDb21wb25lbnQoaGFzaHRhZ3MpIDogJycpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgZ2V0Q29vcmRzID0gZXhwb3J0cy5nZXRDb29yZHMgPSBmdW5jdGlvbiBnZXRDb29yZHMoZWxlbWVudCkge1xuICB2YXIgX2VsZW1lbnQkZ2V0Qm91bmRpbmdDID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGwgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MubGVmdCxcbiAgICAgIHIgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MucmlnaHQsXG4gICAgICB0ID0gX2VsZW1lbnQkZ2V0Qm91bmRpbmdDLnRvcCxcbiAgICAgIGIgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MuYm90dG9tO1xuXG4gIHZhciBfd2luZG93ID0gd2luZG93LFxuICAgICAgeSA9IF93aW5kb3cucGFnZVlPZmZzZXQ7XG5cblxuICByZXR1cm4ge1xuICAgIGhlaWdodDogYiAtIHQsXG4gICAgd2lkdGg6IHIgLSBsLFxuICAgIHRvcDoge1xuICAgICAgeTogeSArIHQsXG4gICAgICB4OiBsICsgKHIgLSBsKSAvIDJcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiBsICsgKHIgLSBsKSAvIDJcbiAgICB9LFxuICAgIGxlZnQ6IHtcbiAgICAgIHk6IHQgKyAoYiAtIHQpIC8gMixcbiAgICAgIHg6IGxcbiAgICB9LFxuICAgIHJpZ2h0OiB7XG4gICAgICB5OiB0ICsgKGIgLSB0KSAvIDIsXG4gICAgICB4OiByXG4gICAgfSxcbiAgICB0b3BMZWZ0OiB7XG4gICAgICB5OiB5ICsgdCxcbiAgICAgIHg6IGxcbiAgICB9LFxuICAgIGJvdHRvbUxlZnQ6IHtcbiAgICAgIHk6IHkgKyBiLFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgdG9wUmlnaHQ6IHtcbiAgICAgIHk6IHkgKyB0LFxuICAgICAgeDogclxuICAgIH0sXG4gICAgYm90dG9tUmlnaHQ6IHtcbiAgICAgIHk6IHkgKyBiLFxuICAgICAgeDogclxuICAgIH1cbiAgfTtcbn07XG5cbnZhciBwb3NpdGlvbiA9IGV4cG9ydHMucG9zaXRpb24gPSBmdW5jdGlvbiBwb3NpdGlvbih0YXJnZXQsIHNjb3BlLCBwbGFjZW1lbnQpIHtcbiAgdmFyIGMgPSBnZXRDb29yZHMoc2NvcGUpW3BsYWNlbWVudF07XG4gIHZhciBlID0gZ2V0Q29vcmRzKHRhcmdldCk7XG4gIHZhciBfd2luZG93MiA9IHdpbmRvdyxcbiAgICAgIHkgPSBfd2luZG93Mi5wYWdlWU9mZnNldDtcblxuXG4gIHZhciB2cCA9IHtcbiAgICB0b3A6IHksXG4gICAgYm90dG9tOiB5ICsgd2luZG93LmlubmVySGVpZ2h0LFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IHdpbmRvdy5pbm5lcldpZHRoXG4gIH07XG5cbiAgdmFyIG9mZnNldHMgPSB7XG4gICAgdG9wOiB7XG4gICAgICB4OiBlLndpZHRoIC8gMixcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgIHg6IGUud2lkdGggLyAyLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgeDogZS53aWR0aCxcbiAgICAgIHk6IGUuaGVpZ2h0IC8gMlxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiBlLmhlaWdodCAvIDJcbiAgICB9LFxuICAgIHRvcExlZnQ6IHtcbiAgICAgIHg6IGUud2lkdGgsXG4gICAgICB5OiBlLmhlaWdodFxuICAgIH0sXG4gICAgdG9wUmlnaHQ6IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiBlLmhlaWdodFxuICAgIH0sXG4gICAgYm90dG9tTGVmdDoge1xuICAgICAgeDogZS53aWR0aCxcbiAgICAgIHk6IDBcbiAgICB9LFxuICAgIGJvdHRvbVJpZ2h0OiB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH1cbiAgfTtcblxuICB2YXIgcG9zeCA9IGMueCAtIG9mZnNldHNbcGxhY2VtZW50XS54O1xuICB2YXIgcG9zeSA9IGMueSAtIG9mZnNldHNbcGxhY2VtZW50XS55O1xuXG4gIGlmIChwb3N4IDwgdnAubGVmdCkge1xuICAgIHBvc3ggPSB2cC5sZWZ0O1xuICB9IGVsc2UgaWYgKHBvc3ggKyBlLndpZHRoID4gdnAucmlnaHQpIHtcbiAgICBwb3N4ID0gdnAucmlnaHQgLSBlLndpZHRoO1xuICB9XG5cbiAgaWYgKHBvc3kgPCB2cC50b3ApIHtcbiAgICBwb3N5ID0gdnAudG9wO1xuICB9IGVsc2UgaWYgKHBvc3kgKyBlLmhlaWdodCA+IHZwLmJvdHRvbSkge1xuICAgIHBvc3kgPSB2cC5ib3R0b20gLSBlLmhlaWdodDtcbiAgfVxuXG4gIHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgcG9zeCArICdweCkgdHJhbnNsYXRlWSgnICsgcG9zeSArICdweCknO1xufTtcblxudmFyIHRhY2sgPSBleHBvcnRzLnRhY2sgPSBmdW5jdGlvbiB0YWNrKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCkge1xuICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtdGFja2VkJyk7XG4gIHBvc2l0aW9uKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCk7XG5cbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHBvc2l0aW9uKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCk7XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9ICcnO1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXRhY2tlZCcpO1xuICAgIH1cbiAgfTtcbn07Il19
