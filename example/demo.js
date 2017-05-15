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
      portal.setAttribute('aria-hidden', 'true');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpY29ucy5qcyIsImluZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L2luZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvZW1haWwuanMiLCIuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy9mYWNlYm9vay5qcyIsIi4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL3R3aXR0ZXIuanMiLCIuLi9wYWNrYWdlL25vZGVfbW9kdWxlcy90YWNranMvZGlzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSw2MEJBQU47O0FBRUEsSUFBTSwrakJBQU47O0FBRUEsSUFBTSxtZUFBTjs7Ozs7QUNKUDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBTUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsYUFBSztBQUNqRCxNQUFNLElBQUkscUJBQU87QUFDZixhQUFTLGNBRE07QUFFZixxQkFBaUI7QUFGRixHQUFQLEVBR1AsQ0FDRDtBQUFBLHlCQUFtQix1QkFBUSxHQUFSLENBQW5CO0FBQUEsR0FEQyxFQUVEO0FBQUEseUJBQW1CLHdCQUFTLEdBQVQsQ0FBbkI7QUFBQSxHQUZDLEVBR0Q7QUFBQSx5QkFBbUIscUJBQU0sR0FBTixDQUFuQjtBQUFBLEdBSEMsQ0FITyxDQUFWOztBQVNBLGFBQVc7QUFBQSxXQUFNLEVBQUUsT0FBRixFQUFOO0FBQUEsR0FBWCxFQUE4QixLQUE5QjtBQUNELENBWEQ7OztBQ1hBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsUUFBUSxNQUFSLEdBQWlCLFNBQWpCOztBQUVBLElBQUksVUFBVSxRQUFRLFFBQVIsQ0FBZDs7QUFFQTs7Ozs7Ozs7QUFRQSxJQUFJLGFBQWEsU0FBUyxVQUFULENBQW9CLENBQXBCLEVB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QkFBbUIsSUFBbkIsQ0FBckUsSUFBaUcsTUFBTSxVQUFVLEdBQWhCLEdBQXNCLEVBQXZILEtBQThILFdBQVcsZUFBZSxtQkFBbUIsUUFBbkIsQ0FBMUIsR0FBeUQsRUFBdkwsQ0FBUDtBQUNELENBRkQ7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgdHdpdHRlciA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMS40MTRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIGQ9XCJNMTYgMy4wMzhjLS41OS4yNi0xLjIyLjQzNy0xLjg4NS41MTcuNjc3LS40MDcgMS4xOTgtMS4wNSAxLjQ0My0xLjgxNi0uNjM0LjM3LTEuMzM3LjY0LTIuMDg1Ljc5LS41OTgtLjY0LTEuNDUtMS4wNC0yLjM5Ni0xLjA0LTEuODEyIDAtMy4yODIgMS40Ny0zLjI4MiAzLjI4IDAgLjI2LjAzLjUxLjA4NS43NS0yLjcyOC0uMTMtNS4xNDctMS40NC02Ljc2Ni0zLjQyQy44MyAyLjU4LjY3IDMuMTQuNjcgMy43NWMwIDEuMTQuNTggMi4xNDMgMS40NiAyLjczMi0uNTM4LS4wMTctMS4wNDUtLjE2NS0xLjQ4Ny0uNDF2LjA0YzAgMS41OSAxLjEzIDIuOTE4IDIuNjMzIDMuMjItLjI3Ni4wNzQtLjU2Ni4xMTQtLjg2NS4xMTQtLjIxIDAtLjQxLS4wMi0uNjEtLjA1OC40MiAxLjMwNCAxLjYzIDIuMjUzIDMuMDcgMi4yOC0xLjEyLjg4LTIuNTQgMS40MDQtNC4wNyAxLjQwNC0uMjYgMC0uNTItLjAxNS0uNzgtLjA0NSAxLjQ2LjkzIDMuMTggMS40NzQgNS4wNCAxLjQ3NCA2LjA0IDAgOS4zNC01IDkuMzQtOS4zMyAwLS4xNCAwLS4yOC0uMDEtLjQyLjY0LS40NiAxLjItMS4wNCAxLjY0LTEuN3ogXCI+PC9wYXRoPjwvc3ZnPmBcblxuZXhwb3J0IGNvbnN0IGZhY2Vib29rID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxLjQxNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgZD1cIk0xNS4xMTcgMEguODgzQy4zOTUgMCAwIC4zOTUgMCAuODgzdjE0LjIzNGMwIC40ODguMzk1Ljg4My44ODMuODgzaDcuNjYzVjkuODA0SDYuNDZWNy4zOWgyLjA4NlY1LjYwN2MwLTIuMDY2IDEuMjYyLTMuMTkgMy4xMDYtMy4xOS44ODMgMCAxLjY0Mi4wNjQgMS44NjMuMDk0djIuMTZoLTEuMjhjLTEgMC0xLjE5NS40OC0xLjE5NSAxLjE4djEuNTRoMi4zOWwtLjMxIDIuNDJoLTIuMDhWMTZoNC4wNzdjLjQ4OCAwIC44ODMtLjM5NS44ODMtLjg4M1YuODgzQzE2IC4zOTUgMTUuNjA1IDAgMTUuMTE3IDAgXCI+PC9wYXRoPjwvc3ZnPmBcblxuZXhwb3J0IGNvbnN0IGdtYWlsID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxLjQxNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgZD1cIk0xNiAzdjEwYzAgLjU2Ny0uNDMzIDEtMSAxaC0xVjQuOTI1TDggOS4yMzMgMiA0LjkyNVYxNEgxYy0uNTY3IDAtMS0uNDMzLTEtMVYzYzAtLjI4My4xMDgtLjUzMy4yODctLjcxMkMuNDY3IDIuMTA3LjcxOCAyIDEgMmguMzMzTDggNi44MzMgMTQuNjY3IDJIMTVjLjI4MyAwIC41MzMuMTA4LjcxMy4yODguMTc5LjE3OS4yODcuNDI5LjI4Ny43MTJ6IFwiPjwvcGF0aD48L3N2Zz5gXG4iLCJpbXBvcnQgc3NoYXJlIGZyb20gJy4uL3BhY2thZ2UvZGlzdC9pbmRleC5qcydcbmltcG9ydCB0d2l0dGVyIGZyb20gJy4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL3R3aXR0ZXIuanMnXG5pbXBvcnQgZmFjZWJvb2sgZnJvbSAnLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvZmFjZWJvb2suanMnXG5pbXBvcnQgZW1haWwgZnJvbSAnLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvZW1haWwuanMnXG5cbmltcG9ydCB7XG4gIHR3aXR0ZXIgYXMgdHcsXG4gIGZhY2Vib29rIGFzIGZiLFxuICBnbWFpbFxufSBmcm9tICcuL2ljb25zLmpzJ1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZSA9PiB7XG4gIGNvbnN0IHMgPSBzc2hhcmUoe1xuICAgIGNvbnRleHQ6ICcuanMtc2hhcmFibGUnLFxuICAgIHRyYW5zaXRpb25TcGVlZDogMjAwXG4gIH0sIFtcbiAgICB1cmwgPT4gYDxhIGhyZWY9XCIke3R3aXR0ZXIodXJsKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke3R3fTwvYT5gLFxuICAgIHVybCA9PiBgPGEgaHJlZj1cIiR7ZmFjZWJvb2sodXJsKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke2ZifTwvYT5gLFxuICAgIHVybCA9PiBgPGEgaHJlZj1cIiR7ZW1haWwodXJsKX1cIj4ke2dtYWlsfTwvYT5gLFxuICBdKVxuXG4gIHNldFRpbWVvdXQoKCkgPT4gcy5kZXN0cm95KCksIDEwMDAwKVxufSlcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuc3NoYXJlID0gdW5kZWZpbmVkO1xuXG52YXIgX3RhY2tqcyA9IHJlcXVpcmUoJ3RhY2tqcycpO1xuXG4vKipcbiAqIENoZWNrIGlmIGNsaWNrIGhhcHBlbmVkXG4gKiB3aXRoaW4gdGhlIGRpYWxvZ1xuICpcbiAqIEBwYXJhbSB7ZXZlbnR9IGUgVGhlIGNsaWNrIGV2ZW50XG4gKiBAcGFyYW0ge29iamVjdH0gZGlhbG9nIFRoZSBzaGFyZSBkaWFsb2dcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbnZhciB2YWxpZENsaWNrID0gZnVuY3Rpb24gdmFsaWRDbGljayhlLCBkaWFsb2cpIHtcbiAgcmV0dXJuIGUudGFyZ2V0ICE9PSBkaWFsb2cgfHwgIWRpYWxvZy5jb250YWlucyhlLnRhcmdldCk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGV2ZW50IGlzIHdpdGhpblxuICogdGhlIHVzZXItc3BlY2lmaWVkIHNjb3BlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGVsIFRoZSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBldmVudFxuICogQHBhcmFtIHthcnJheX0gY29udGV4dCBBcnJheSBvZiBlbGVtZW50cyB0byBzY29wZSB0b1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xudmFyIGlzSW5Db250ZXh0ID0gZnVuY3Rpb24gaXNJbkNvbnRleHQoZWwsIGNvbnRleHQpIHtcbiAgcmV0dXJuICFjb250ZXh0IHx8IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb250ZXh0KSkuZmlsdGVyKGZ1bmN0aW9uIChjdHgpIHtcbiAgICByZXR1cm4gZWwgPT09IGN0eCB8fCBjdHguY29udGFpbnMoZWwpO1xuICB9KS5sZW5ndGggPiAwO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgdGhlIG1haW4gcG9ydGFsXG4gKiB0aGF0IHRoZSBsaW5rcyBhcmVcbiAqIHJlbmRlcmVkIGludG8uIFNldFxuICogYWNjZXNzaWJsaXR5IGF0dHJzLlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gYSBET00gZWxlbWVudFxuICovXG52YXIgY3JlYXRlUG9ydGFsID0gZnVuY3Rpb24gY3JlYXRlUG9ydGFsKCkge1xuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5jbGFzc05hbWUgPSAnc3NoYXJlJztcbiAgZGl2LnJvbGUgPSAnZGlhbG9nJztcbiAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdTaGFyZSBEaWFsb2cnKTtcbiAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gIHJldHVybiBkaXY7XG59O1xuXG4vKipcbiAqIFJlbmRlciBzaGFyZSBsaW5rcyxcbiAqIHJldHVybiBub2RlIGFuZCBkZXN0cm95IG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRoZSBoaWdobGlnaHRlZCB0ZXh0XG4gKiBAcGFyYW0ge2FycmF5fSBzaGFyZXJzIEFycmF5IG9mIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBlbGVtZW50cyBvciBzdHJpbmdzXG4gKiBAcGFyYW0ge29iamVjdH0gcG9ydGFsIFRoZSBwb3J0YWwgcmV0dXJuZWQgZnJvbSBjcmVhdGVQb3J0YWwoKVxuICovXG52YXIgcmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRleHQsIHNoYXJlcnMsIHBvcnRhbCkge1xuICBwb3J0YWwuaW5uZXJIVE1MID0gJ1xcbiAgICA8ZGl2IGNsYXNzPVwic3NoYXJlX19pbm5lclwiPicgKyBzaGFyZXJzLm1hcChmdW5jdGlvbiAocykge1xuICAgIHZhciBlbCA9IHModGV4dCk7XG4gICAgcmV0dXJuIHR5cGVvZiBlbCA9PT0gJ3N0cmluZycgPyBlbCA6IGVsLm91dGVySFRNTDtcbiAgfSkuam9pbignJykgKyAnPC9kaXY+XFxuICAnO1xuXG4gIHBvcnRhbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgcG9ydGFsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICB2YXIgbm9kZSA9IHBvcnRhbC5jaGlsZHJlblswXTtcblxuICByZXR1cm4ge1xuICAgIG5vZGU6IG5vZGUsXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHBvcnRhbC5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIEdldCByYW5nZSBvYmplY3QgZm9yIGhpZ2hsaWdodGVkIHRleHRcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IHJhbmdlXG4gKi9cbnZhciBnZXRTZWxlY3Rpb24gPSBmdW5jdGlvbiBnZXRTZWxlY3Rpb24oKSB7XG4gIHZhciByYW5nZSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICBpZiAocmFuZ2UuY29sbGFwc2VkKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gcmFuZ2UucmFuZ2VDb3VudCA8IDEgPyBudWxsIDogcmFuZ2UuZ2V0UmFuZ2VBdCgwKTtcbn07XG5cbi8qKlxuICogSW5pdFxuICovXG52YXIgc3NoYXJlID0gZnVuY3Rpb24gc3NoYXJlKF9yZWYpIHtcbiAgdmFyIF9yZWYkY29udGV4dCA9IF9yZWYuY29udGV4dCxcbiAgICAgIGNvbnRleHQgPSBfcmVmJGNvbnRleHQgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBfcmVmJGNvbnRleHQsXG4gICAgICBfcmVmJHRyYW5zaXRpb25TcGVlZCA9IF9yZWYudHJhbnNpdGlvblNwZWVkLFxuICAgICAgdHJhbnNpdGlvblNwZWVkID0gX3JlZiR0cmFuc2l0aW9uU3BlZWQgPT09IHVuZGVmaW5lZCA/IDIwMCA6IF9yZWYkdHJhbnNpdGlvblNwZWVkO1xuICB2YXIgc2hhcmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogW107XG5cbiAgdmFyIHBvcnRhbCA9IGNyZWF0ZVBvcnRhbCgpO1xuXG4gIHZhciBiYXIgPSBudWxsO1xuICB2YXIgZGlhbG9nID0gbnVsbDtcbiAgdmFyIHRpbWVvdXQgPSAwO1xuICB2YXIgZm9jdXNOb2RlID0gbnVsbDtcblxuICAvKipcbiAgICogU2VsZWN0aW9uc1xuICAgKi9cbiAgdmFyIHByZXZpb3VzUmFuZ2UgPSBudWxsO1xuICB2YXIgY3VycmVudFJhbmdlID0gbnVsbDtcblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGRpYWxvZywgdGFja2pzIGluc3RhbmNlXG4gICAqIHJlbW92ZXMgbGlzdGVuZXJzLCBhbmQgc2V0c1xuICAgKiBhY2Nlc3NpYmxpdHkgYXR0cnMgYmFjayB0byBkZWZhdWx0c1xuICAgKi9cbiAgdmFyIGhpZGUgPSBmdW5jdGlvbiBoaWRlKCkge1xuICAgIGlmICghZGlhbG9nIHx8ICFiYXIpIHJldHVybjtcblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoaWRlKTtcbiAgICBwb3J0YWwuY2xhc3NMaXN0LmFkZCgnaXMtaGlkaW5nJyk7XG5cbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBwb3J0YWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkaW5nJyk7XG4gICAgICBwb3J0YWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICBiYXIuZGVzdHJveSgpO1xuICAgICAgZGlhbG9nLmRlc3Ryb3koKTtcbiAgICAgIGRpYWxvZyA9IG51bGw7XG4gICAgICBiYXIgPSBudWxsO1xuICAgICAgcG9ydGFsLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICAgIHBvcnRhbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgIGZvY3VzTm9kZS5mb2N1cygpO1xuICAgIH0sIHRyYW5zaXRpb25TcGVlZCk7XG4gIH07XG5cbiAgdmFyIGhhbmRsZVNlbGVjdGlvbiA9IGZ1bmN0aW9uIGhhbmRsZVNlbGVjdGlvbihrZXl1cCkge1xuICAgIGN1cnJlbnRSYW5nZSA9IGdldFNlbGVjdGlvbigpO1xuXG4gICAgaWYgKCFjdXJyZW50UmFuZ2UpIHJldHVybjtcblxuICAgIC8qKlxuICAgICAqIFNhdmUgbGFzdCBmb2N1c2VkIG5vZGVcbiAgICAgKi9cbiAgICBmb2N1c05vZGUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgdmFyIHRleHQgPSBjdXJyZW50UmFuZ2UudG9TdHJpbmcoKTtcbiAgICB2YXIgcHJldmlvdXNUZXh0ID0gcHJldmlvdXNSYW5nZSA/IHByZXZpb3VzUmFuZ2UudG9TdHJpbmcoKSA6ICcnO1xuXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgLyoqXG4gICAgICogSWYgbm8gdGV4dCwgb3IgdGhlIHRleHQgaXMgdGhlIHNhbWVcbiAgICAgKiBhZnRlciBhIGNsaWNrIGV2ZW50LCBoaWRlLlxuICAgICAqXG4gICAgICogT3RoZXJ3aXNlLCBpZiBpdCdzIG5ldyB0ZXh0XG4gICAgICogcmVuZGVyIGEgbmV3IGRpYWxvZy5cbiAgICAgKi9cbiAgICBpZiAoIXRleHQgfHwgdGV4dC5sZW5ndGggPD0gMCB8fCBwcmV2aW91c1RleHQgPT09IHRleHQgJiYgIWtleXVwKSB7XG4gICAgICBoaWRlKCk7XG4gICAgfSBlbHNlIGlmICghcHJldmlvdXNSYW5nZSB8fCBwcmV2aW91c1RleHQgIT09IHRleHQpIHtcbiAgICAgIGRpYWxvZyA9IHJlbmRlcih0ZXh0LCBzaGFyZXJzLCBwb3J0YWwpO1xuXG4gICAgICBwcmV2aW91c1JhbmdlID0gY3VycmVudFJhbmdlO1xuXG4gICAgICBiYXIgPSAoMCwgX3RhY2tqcy50YWNrKShwb3J0YWwsIGN1cnJlbnRSYW5nZSwgJ3RvcCcpO1xuXG4gICAgICAvKipcbiAgICAgICAqIEVuc3VyZXMgeW91IGRvbid0IHNlZSB0aGVcbiAgICAgICAqIGRpYWxvZyBmbHkgaW50byBwbGFjZVxuICAgICAgICovXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcG9ydGFsLmZvY3VzKCk7XG4gICAgICAgIHBvcnRhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRpbmcnKTtcbiAgICAgICAgcG9ydGFsLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgICAgfSwgdHJhbnNpdGlvblNwZWVkKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBBZGQgbGlzdGVuZXIsIHdoaWNoIGlzIHJlbW92ZWRcbiAgICAgICAqIGltbWVkaWF0ZWx5IGlmIGl0J3MgdHJpZ2dlcmVkXG4gICAgICAgKi9cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoaWRlKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIG1vdXNldXAgPSBmdW5jdGlvbiBtb3VzZXVwKGUpIHtcbiAgICB2YWxpZENsaWNrKGUsIHBvcnRhbCkgJiYgaXNJbkNvbnRleHQoZS50YXJnZXQsIGNvbnRleHQpID8gaGFuZGxlU2VsZWN0aW9uKCkgOiBoaWRlKCk7XG4gIH07XG4gIHZhciBrZXl1cCA9IGZ1bmN0aW9uIGtleXVwKGUpIHtcbiAgICBpZiAoIWN1cnJlbnRSYW5nZSkgcmV0dXJuO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSByZXR1cm4gaGlkZSgpO1xuICAgIGlmIChpc0luQ29udGV4dChjdXJyZW50UmFuZ2Uuc3RhcnRDb250YWluZXIucGFyZW50Tm9kZSwgY29udGV4dCkpIGhhbmRsZVNlbGVjdGlvbih0cnVlKTtcbiAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXl1cCk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgaGlkZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGtleXVwKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgaGlkZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGlkZSk7XG4gICAgICBiYXIgJiYgYmFyLmRlc3Ryb3koKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY29udGFpbnMocG9ydGFsKSAmJiBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBvcnRhbCk7XG4gICAgICBmb2N1c05vZGUgJiYgZm9jdXNOb2RlLmZvY3VzKCk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0cy5zc2hhcmUgPSBzc2hhcmU7XG5leHBvcnRzLmRlZmF1bHQgPSBzc2hhcmU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzKSB7XG4gIHJldHVybiBcIm1haWx0bzo/Ym9keT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChzKSArIFwiJTBhJTBhXCIgKyBlbmNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLmhyZWYpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHMpIHtcbiAgcmV0dXJuIFwiaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyLnBocD91PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5ocmVmKSArIFwiJnF1b3RlPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICh0ZXh0LCB2aWEsIGhhc2h0YWdzKSB7XG4gIHJldHVybiAnaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZT91cmw9JyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJyZ0ZXh0PScgKyBlbmNvZGVVUklDb21wb25lbnQodGV4dCkgKyAodmlhID8gJyZ2aWE9JyArIHZpYSA6ICcnKSArIChoYXNodGFncyA/ICcmaGFzaHRhZ3M9JyArIGVuY29kZVVSSUNvbXBvbmVudChoYXNodGFncykgOiAnJyk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBnZXRDb29yZHMgPSBleHBvcnRzLmdldENvb3JkcyA9IGZ1bmN0aW9uIGdldENvb3JkcyhlbGVtZW50KSB7XG4gIHZhciBfZWxlbWVudCRnZXRCb3VuZGluZ0MgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgbCA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5sZWZ0LFxuICAgICAgciA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5yaWdodCxcbiAgICAgIHQgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MudG9wLFxuICAgICAgYiA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5ib3R0b207XG5cbiAgdmFyIF93aW5kb3cgPSB3aW5kb3csXG4gICAgICB5ID0gX3dpbmRvdy5wYWdlWU9mZnNldDtcblxuXG4gIHJldHVybiB7XG4gICAgaGVpZ2h0OiBiIC0gdCxcbiAgICB3aWR0aDogciAtIGwsXG4gICAgdG9wOiB7XG4gICAgICB5OiB5ICsgdCxcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICB5OiB5ICsgYixcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgeTogdCArIChiIC0gdCkgLyAyLFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIHk6IHQgKyAoYiAtIHQpIC8gMixcbiAgICAgIHg6IHJcbiAgICB9LFxuICAgIHRvcExlZnQ6IHtcbiAgICAgIHk6IHkgKyB0LFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgYm90dG9tTGVmdDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiBsXG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeTogeSArIHQsXG4gICAgICB4OiByXG4gICAgfSxcbiAgICBib3R0b21SaWdodDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiByXG4gICAgfVxuICB9O1xufTtcblxudmFyIHBvc2l0aW9uID0gZXhwb3J0cy5wb3NpdGlvbiA9IGZ1bmN0aW9uIHBvc2l0aW9uKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCkge1xuICB2YXIgYyA9IGdldENvb3JkcyhzY29wZSlbcGxhY2VtZW50XTtcbiAgdmFyIGUgPSBnZXRDb29yZHModGFyZ2V0KTtcbiAgdmFyIF93aW5kb3cyID0gd2luZG93LFxuICAgICAgeSA9IF93aW5kb3cyLnBhZ2VZT2Zmc2V0O1xuXG5cbiAgdmFyIHZwID0ge1xuICAgIHRvcDogeSxcbiAgICBib3R0b206IHkgKyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogd2luZG93LmlubmVyV2lkdGhcbiAgfTtcblxuICB2YXIgb2Zmc2V0cyA9IHtcbiAgICB0b3A6IHtcbiAgICAgIHg6IGUud2lkdGggLyAyLFxuICAgICAgeTogZS5oZWlnaHRcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgeDogZS53aWR0aCAvIDIsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogZS5oZWlnaHQgLyAyXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0IC8gMlxuICAgIH0sXG4gICAgdG9wTGVmdDoge1xuICAgICAgeDogZS53aWR0aCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b21MZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAgYm90dG9tUmlnaHQ6IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICB9O1xuXG4gIHZhciBwb3N4ID0gYy54IC0gb2Zmc2V0c1twbGFjZW1lbnRdLng7XG4gIHZhciBwb3N5ID0gYy55IC0gb2Zmc2V0c1twbGFjZW1lbnRdLnk7XG5cbiAgaWYgKHBvc3ggPCB2cC5sZWZ0KSB7XG4gICAgcG9zeCA9IHZwLmxlZnQ7XG4gIH0gZWxzZSBpZiAocG9zeCArIGUud2lkdGggPiB2cC5yaWdodCkge1xuICAgIHBvc3ggPSB2cC5yaWdodCAtIGUud2lkdGg7XG4gIH1cblxuICBpZiAocG9zeSA8IHZwLnRvcCkge1xuICAgIHBvc3kgPSB2cC50b3A7XG4gIH0gZWxzZSBpZiAocG9zeSArIGUuaGVpZ2h0ID4gdnAuYm90dG9tKSB7XG4gICAgcG9zeSA9IHZwLmJvdHRvbSAtIGUuaGVpZ2h0O1xuICB9XG5cbiAgdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBwb3N4ICsgJ3B4KSB0cmFuc2xhdGVZKCcgKyBwb3N5ICsgJ3B4KSc7XG59O1xuXG52YXIgdGFjayA9IGV4cG9ydHMudGFjayA9IGZ1bmN0aW9uIHRhY2sodGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KSB7XG4gIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy10YWNrZWQnKTtcbiAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcblxuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdGFja2VkJyk7XG4gICAgfVxuICB9O1xufTsiXX0=
