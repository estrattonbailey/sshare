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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpY29ucy5qcyIsImluZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L2luZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvZW1haWwuanMiLCIuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy9mYWNlYm9vay5qcyIsIi4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL3R3aXR0ZXIuanMiLCIuLi9wYWNrYWdlL25vZGVfbW9kdWxlcy90YWNranMvZGlzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSw2MEJBQU47O0FBRUEsSUFBTSwrakJBQU47O0FBRUEsSUFBTSxtZUFBTjs7Ozs7QUNKUDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBTUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsYUFBSztBQUNqRCx1QkFBTztBQUNMLGFBQVMsY0FESjtBQUVMLHFCQUFpQjtBQUZaLEdBQVAsRUFHRyxDQUNEO0FBQUEseUJBQW1CLHVCQUFRLEdBQVIsQ0FBbkI7QUFBQSxHQURDLEVBRUQ7QUFBQSx5QkFBbUIsd0JBQVMsR0FBVCxDQUFuQjtBQUFBLEdBRkMsRUFHRDtBQUFBLHlCQUFtQixxQkFBTSxHQUFOLENBQW5CO0FBQUEsR0FIQyxDQUhIO0FBUUQsQ0FURDs7O0FDWEE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLE1BQVIsR0FBaUIsU0FBakI7O0FBRUEsSUFBSSxVQUFVLFFBQVEsUUFBUixDQUFkOztBQUVBOzs7Ozs7OztBQVFBLElBQUksYUFBYSxTQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUIsTUFBdkIsRUFBK0I7QUFDOUMsU0FBTyxFQUFFLE1BQUYsS0FBYSxNQUFiLElBQXVCLENBQUMsT0FBTyxRQUFQLENBQWdC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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjb25zdCB0d2l0dGVyID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxLjQxNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgZD1cIk0xNiAzLjAzOGMtLjU5LjI2LTEuMjIuNDM3LTEuODg1LjUxNy42NzctLjQwNyAxLjE5OC0xLjA1IDEuNDQzLTEuODE2LS42MzQuMzctMS4zMzcuNjQtMi4wODUuNzktLjU5OC0uNjQtMS40NS0xLjA0LTIuMzk2LTEuMDQtMS44MTIgMC0zLjI4MiAxLjQ3LTMuMjgyIDMuMjggMCAuMjYuMDMuNTEuMDg1Ljc1LTIuNzI4LS4xMy01LjE0Ny0xLjQ0LTYuNzY2LTMuNDJDLjgzIDIuNTguNjcgMy4xNC42NyAzLjc1YzAgMS4xNC41OCAyLjE0MyAxLjQ2IDIuNzMyLS41MzgtLjAxNy0xLjA0NS0uMTY1LTEuNDg3LS40MXYuMDRjMCAxLjU5IDEuMTMgMi45MTggMi42MzMgMy4yMi0uMjc2LjA3NC0uNTY2LjExNC0uODY1LjExNC0uMjEgMC0uNDEtLjAyLS42MS0uMDU4LjQyIDEuMzA0IDEuNjMgMi4yNTMgMy4wNyAyLjI4LTEuMTIuODgtMi41NCAxLjQwNC00LjA3IDEuNDA0LS4yNiAwLS41Mi0uMDE1LS43OC0uMDQ1IDEuNDYuOTMgMy4xOCAxLjQ3NCA1LjA0IDEuNDc0IDYuMDQgMCA5LjM0LTUgOS4zNC05LjMzIDAtLjE0IDAtLjI4LS4wMS0uNDIuNjQtLjQ2IDEuMi0xLjA0IDEuNjQtMS43eiBcIj48L3BhdGg+PC9zdmc+YFxuXG5leHBvcnQgY29uc3QgZmFjZWJvb2sgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEuNDE0XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBkPVwiTTE1LjExNyAwSC44ODNDLjM5NSAwIDAgLjM5NSAwIC44ODN2MTQuMjM0YzAgLjQ4OC4zOTUuODgzLjg4My44ODNoNy42NjNWOS44MDRINi40NlY3LjM5aDIuMDg2VjUuNjA3YzAtMi4wNjYgMS4yNjItMy4xOSAzLjEwNi0zLjE5Ljg4MyAwIDEuNjQyLjA2NCAxLjg2My4wOTR2Mi4xNmgtMS4yOGMtMSAwLTEuMTk1LjQ4LTEuMTk1IDEuMTh2MS41NGgyLjM5bC0uMzEgMi40MmgtMi4wOFYxNmg0LjA3N2MuNDg4IDAgLjg4My0uMzk1Ljg4My0uODgzVi44ODNDMTYgLjM5NSAxNS42MDUgMCAxNS4xMTcgMCBcIj48L3BhdGg+PC9zdmc+YFxuXG5leHBvcnQgY29uc3QgZ21haWwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEuNDE0XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBkPVwiTTE2IDN2MTBjMCAuNTY3LS40MzMgMS0xIDFoLTFWNC45MjVMOCA5LjIzMyAyIDQuOTI1VjE0SDFjLS41NjcgMC0xLS40MzMtMS0xVjNjMC0uMjgzLjEwOC0uNTMzLjI4Ny0uNzEyQy40NjcgMi4xMDcuNzE4IDIgMSAyaC4zMzNMOCA2LjgzMyAxNC42NjcgMkgxNWMuMjgzIDAgLjUzMy4xMDguNzEzLjI4OC4xNzkuMTc5LjI4Ny40MjkuMjg3LjcxMnogXCI+PC9wYXRoPjwvc3ZnPmBcbiIsImltcG9ydCBzc2hhcmUgZnJvbSAnLi4vcGFja2FnZS9kaXN0L2luZGV4LmpzJ1xuaW1wb3J0IHR3aXR0ZXIgZnJvbSAnLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvdHdpdHRlci5qcydcbmltcG9ydCBmYWNlYm9vayBmcm9tICcuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy9mYWNlYm9vay5qcydcbmltcG9ydCBlbWFpbCBmcm9tICcuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy9lbWFpbC5qcydcblxuaW1wb3J0IHtcbiAgdHdpdHRlciBhcyB0dyxcbiAgZmFjZWJvb2sgYXMgZmIsXG4gIGdtYWlsXG59IGZyb20gJy4vaWNvbnMuanMnXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBlID0+IHtcbiAgc3NoYXJlKHtcbiAgICBjb250ZXh0OiAnLmpzLXNoYXJhYmxlJyxcbiAgICB0cmFuc2l0aW9uU3BlZWQ6IDIwMFxuICB9LCBbXG4gICAgdXJsID0+IGA8YSBocmVmPVwiJHt0d2l0dGVyKHVybCl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHt0d308L2E+YCxcbiAgICB1cmwgPT4gYDxhIGhyZWY9XCIke2ZhY2Vib29rKHVybCl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtmYn08L2E+YCxcbiAgICB1cmwgPT4gYDxhIGhyZWY9XCIke2VtYWlsKHVybCl9XCI+JHtnbWFpbH08L2E+YCxcbiAgXSlcbn0pXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnNzaGFyZSA9IHVuZGVmaW5lZDtcblxudmFyIF90YWNranMgPSByZXF1aXJlKCd0YWNranMnKTtcblxuLyoqXG4gKiBDaGVjayBpZiBjbGljayBoYXBwZW5lZFxuICogd2l0aGluIHRoZSBkaWFsb2dcbiAqXG4gKiBAcGFyYW0ge2V2ZW50fSBlIFRoZSBjbGljayBldmVudFxuICogQHBhcmFtIHtvYmplY3R9IGRpYWxvZyBUaGUgc2hhcmUgZGlhbG9nXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG52YXIgdmFsaWRDbGljayA9IGZ1bmN0aW9uIHZhbGlkQ2xpY2soZSwgZGlhbG9nKSB7XG4gIHJldHVybiBlLnRhcmdldCAhPT0gZGlhbG9nIHx8ICFkaWFsb2cuY29udGFpbnMoZS50YXJnZXQpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBldmVudCBpcyB3aXRoaW5cbiAqIHRoZSB1c2VyLXNwZWNpZmllZCBzY29wZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCBUaGUgZWxlbWVudCB0aGF0IHRyaWdnZXJlZCB0aGUgZXZlbnRcbiAqIEBwYXJhbSB7YXJyYXl9IGNvbnRleHQgQXJyYXkgb2YgZWxlbWVudHMgdG8gc2NvcGUgdG9cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbnZhciBpc0luQ29udGV4dCA9IGZ1bmN0aW9uIGlzSW5Db250ZXh0KGVsLCBjb250ZXh0KSB7XG4gIHJldHVybiAhY29udGV4dCB8fCBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGV4dCkpLmZpbHRlcihmdW5jdGlvbiAoY3R4KSB7XG4gICAgcmV0dXJuIGVsID09PSBjdHggfHwgY3R4LmNvbnRhaW5zKGVsKTtcbiAgfSkubGVuZ3RoID4gMDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBtYWluIHBvcnRhbFxuICogdGhhdCB0aGUgbGlua3MgYXJlXG4gKiByZW5kZXJlZCBpbnRvLiBTZXRcbiAqIGFjY2Vzc2libGl0eSBhdHRycy5cbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IGEgRE9NIGVsZW1lbnRcbiAqL1xudmFyIGNyZWF0ZVBvcnRhbCA9IGZ1bmN0aW9uIGNyZWF0ZVBvcnRhbCgpIHtcbiAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuY2xhc3NOYW1lID0gJ3NzaGFyZSc7XG4gIGRpdi5yb2xlID0gJ2RpYWxvZyc7XG4gIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnU2hhcmUgRGlhbG9nJyk7XG4gIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICByZXR1cm4gZGl2O1xufTtcblxuLyoqXG4gKiBSZW5kZXIgc2hhcmUgbGlua3MsXG4gKiByZXR1cm4gbm9kZSBhbmQgZGVzdHJveSBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUaGUgaGlnaGxpZ2h0ZWQgdGV4dFxuICogQHBhcmFtIHthcnJheX0gc2hhcmVycyBBcnJheSBvZiBmdW5jdGlvbnMgdGhhdCByZXR1cm4gZWxlbWVudHMgb3Igc3RyaW5nc1xuICogQHBhcmFtIHtvYmplY3R9IHBvcnRhbCBUaGUgcG9ydGFsIHJldHVybmVkIGZyb20gY3JlYXRlUG9ydGFsKClcbiAqL1xudmFyIHJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZXh0LCBzaGFyZXJzLCBwb3J0YWwpIHtcbiAgcG9ydGFsLmlubmVySFRNTCA9ICdcXG4gICAgPGRpdiBjbGFzcz1cInNzaGFyZV9faW5uZXJcIj4nICsgc2hhcmVycy5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICB2YXIgZWwgPSBzKHRleHQpO1xuICAgIHJldHVybiB0eXBlb2YgZWwgPT09ICdzdHJpbmcnID8gZWwgOiBlbC5vdXRlckhUTUw7XG4gIH0pLmpvaW4oJycpICsgJzwvZGl2PlxcbiAgJztcblxuICBwb3J0YWwuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gIHBvcnRhbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgdmFyIG5vZGUgPSBwb3J0YWwuY2hpbGRyZW5bMF07XG5cbiAgcmV0dXJuIHtcbiAgICBub2RlOiBub2RlLFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICBwb3J0YWwucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBHZXQgcmFuZ2Ugb2JqZWN0IGZvciBoaWdobGlnaHRlZCB0ZXh0XG4gKlxuICogQHJldHVybiB7b2JqZWN0fSByYW5nZVxuICovXG52YXIgZ2V0U2VsZWN0aW9uID0gZnVuY3Rpb24gZ2V0U2VsZWN0aW9uKCkge1xuICB2YXIgcmFuZ2UgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgaWYgKHJhbmdlLmNvbGxhcHNlZCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIHJhbmdlLnJhbmdlQ291bnQgPCAxID8gbnVsbCA6IHJhbmdlLmdldFJhbmdlQXQoMCk7XG59O1xuXG4vKipcbiAqIEluaXRcbiAqL1xudmFyIHNzaGFyZSA9IGZ1bmN0aW9uIHNzaGFyZShfcmVmKSB7XG4gIHZhciBfcmVmJGNvbnRleHQgPSBfcmVmLmNvbnRleHQsXG4gICAgICBjb250ZXh0ID0gX3JlZiRjb250ZXh0ID09PSB1bmRlZmluZWQgPyBudWxsIDogX3JlZiRjb250ZXh0LFxuICAgICAgX3JlZiR0cmFuc2l0aW9uU3BlZWQgPSBfcmVmLnRyYW5zaXRpb25TcGVlZCxcbiAgICAgIHRyYW5zaXRpb25TcGVlZCA9IF9yZWYkdHJhbnNpdGlvblNwZWVkID09PSB1bmRlZmluZWQgPyAyMDAgOiBfcmVmJHRyYW5zaXRpb25TcGVlZDtcbiAgdmFyIHNoYXJlcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IFtdO1xuXG4gIHZhciBwb3J0YWwgPSBjcmVhdGVQb3J0YWwoKTtcblxuICB2YXIgYmFyID0gbnVsbDtcbiAgdmFyIGRpYWxvZyA9IG51bGw7XG4gIHZhciB0aW1lb3V0ID0gMDtcbiAgdmFyIGZvY3VzTm9kZSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFNlbGVjdGlvbnNcbiAgICovXG4gIHZhciBwcmV2aW91c1JhbmdlID0gbnVsbDtcbiAgdmFyIGN1cnJlbnRSYW5nZSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBkaWFsb2csIHRhY2tqcyBpbnN0YW5jZVxuICAgKiByZW1vdmVzIGxpc3RlbmVycywgYW5kIHNldHNcbiAgICogYWNjZXNzaWJsaXR5IGF0dHJzIGJhY2sgdG8gZGVmYXVsdHNcbiAgICovXG4gIHZhciBoaWRlID0gZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBpZiAoIWRpYWxvZyB8fCAhYmFyKSByZXR1cm47XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGlkZSk7XG4gICAgcG9ydGFsLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGluZycpO1xuXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcG9ydGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGluZycpO1xuICAgICAgcG9ydGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgICAgYmFyLmRlc3Ryb3koKTtcbiAgICAgIGRpYWxvZy5kZXN0cm95KCk7XG4gICAgICBkaWFsb2cgPSBudWxsO1xuICAgICAgYmFyID0gbnVsbDtcbiAgICAgIHBvcnRhbC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICBmb2N1c05vZGUuZm9jdXMoKTtcbiAgICB9LCB0cmFuc2l0aW9uU3BlZWQpO1xuICB9O1xuXG4gIHZhciBoYW5kbGVTZWxlY3Rpb24gPSBmdW5jdGlvbiBoYW5kbGVTZWxlY3Rpb24oa2V5dXApIHtcbiAgICBjdXJyZW50UmFuZ2UgPSBnZXRTZWxlY3Rpb24oKTtcblxuICAgIGlmICghY3VycmVudFJhbmdlKSByZXR1cm47XG5cbiAgICAvKipcbiAgICAgKiBTYXZlIGxhc3QgZm9jdXNlZCBub2RlXG4gICAgICovXG4gICAgZm9jdXNOb2RlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgIHZhciB0ZXh0ID0gY3VycmVudFJhbmdlLnRvU3RyaW5nKCk7XG4gICAgdmFyIHByZXZpb3VzVGV4dCA9IHByZXZpb3VzUmFuZ2UgPyBwcmV2aW91c1JhbmdlLnRvU3RyaW5nKCkgOiAnJztcblxuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgIC8qKlxuICAgICAqIElmIG5vIHRleHQsIG9yIHRoZSB0ZXh0IGlzIHRoZSBzYW1lXG4gICAgICogYWZ0ZXIgYSBjbGljayBldmVudCwgaGlkZS5cbiAgICAgKlxuICAgICAqIE90aGVyd2lzZSwgaWYgaXQncyBuZXcgdGV4dFxuICAgICAqIHJlbmRlciBhIG5ldyBkaWFsb2cuXG4gICAgICovXG4gICAgaWYgKCF0ZXh0IHx8IHRleHQubGVuZ3RoIDw9IDAgfHwgcHJldmlvdXNUZXh0ID09PSB0ZXh0ICYmICFrZXl1cCkge1xuICAgICAgaGlkZSgpO1xuICAgIH0gZWxzZSBpZiAoIXByZXZpb3VzUmFuZ2UgfHwgcHJldmlvdXNUZXh0ICE9PSB0ZXh0KSB7XG4gICAgICBkaWFsb2cgPSByZW5kZXIodGV4dCwgc2hhcmVycywgcG9ydGFsKTtcblxuICAgICAgcHJldmlvdXNSYW5nZSA9IGN1cnJlbnRSYW5nZTtcblxuICAgICAgYmFyID0gKDAsIF90YWNranMudGFjaykocG9ydGFsLCBjdXJyZW50UmFuZ2UsICd0b3AnKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBFbnN1cmVzIHlvdSBkb24ndCBzZWUgdGhlXG4gICAgICAgKiBkaWFsb2cgZmx5IGludG8gcGxhY2VcbiAgICAgICAqL1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBvcnRhbC5mb2N1cygpO1xuICAgICAgICBwb3J0YWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkaW5nJyk7XG4gICAgICAgIHBvcnRhbC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICAgIH0sIHRyYW5zaXRpb25TcGVlZCk7XG5cbiAgICAgIC8qKlxuICAgICAgICogQWRkIGxpc3RlbmVyLCB3aGljaCBpcyByZW1vdmVkXG4gICAgICAgKiBpbW1lZGlhdGVseSBpZiBpdCdzIHRyaWdnZXJlZFxuICAgICAgICovXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGlkZSk7XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YWxpZENsaWNrKGUsIHBvcnRhbCkgJiYgaXNJbkNvbnRleHQoZS50YXJnZXQsIGNvbnRleHQpID8gaGFuZGxlU2VsZWN0aW9uKCkgOiBoaWRlKCk7XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmICghY3VycmVudFJhbmdlKSByZXR1cm47XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHJldHVybiBoaWRlKCk7XG4gICAgaWYgKGlzSW5Db250ZXh0KGN1cnJlbnRSYW5nZS5zdGFydENvbnRhaW5lci5wYXJlbnROb2RlLCBjb250ZXh0KSkgaGFuZGxlU2VsZWN0aW9uKHRydWUpO1xuICB9KTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBoaWRlKTtcbn07XG5cbmV4cG9ydHMuc3NoYXJlID0gc3NoYXJlO1xuZXhwb3J0cy5kZWZhdWx0ID0gc3NoYXJlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAocykge1xuICByZXR1cm4gXCJtYWlsdG86P2JvZHk9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocykgKyBcIiUwYSUwYVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzKSB7XG4gIHJldHVybiBcImh0dHA6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci5waHA/dT1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uaHJlZikgKyBcIiZxdW90ZT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChzKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzKSB7XG4gIHJldHVybiBcImh0dHBzOi8vdHdpdHRlci5jb20vc2hhcmU/dXJsPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5ocmVmKSArIFwiJnRleHQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocyk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBnZXRDb29yZHMgPSBleHBvcnRzLmdldENvb3JkcyA9IGZ1bmN0aW9uIGdldENvb3JkcyhlbGVtZW50KSB7XG4gIHZhciBfZWxlbWVudCRnZXRCb3VuZGluZ0MgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgbCA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5sZWZ0LFxuICAgICAgciA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5yaWdodCxcbiAgICAgIHQgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MudG9wLFxuICAgICAgYiA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5ib3R0b207XG5cbiAgdmFyIF93aW5kb3cgPSB3aW5kb3csXG4gICAgICB5ID0gX3dpbmRvdy5wYWdlWU9mZnNldDtcblxuXG4gIHJldHVybiB7XG4gICAgaGVpZ2h0OiBiIC0gdCxcbiAgICB3aWR0aDogciAtIGwsXG4gICAgdG9wOiB7XG4gICAgICB5OiB5ICsgdCxcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICB5OiB5ICsgYixcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgeTogdCArIChiIC0gdCkgLyAyLFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIHk6IHQgKyAoYiAtIHQpIC8gMixcbiAgICAgIHg6IHJcbiAgICB9LFxuICAgIHRvcExlZnQ6IHtcbiAgICAgIHk6IHkgKyB0LFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgYm90dG9tTGVmdDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiBsXG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeTogeSArIHQsXG4gICAgICB4OiByXG4gICAgfSxcbiAgICBib3R0b21SaWdodDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiByXG4gICAgfVxuICB9O1xufTtcblxudmFyIHBvc2l0aW9uID0gZXhwb3J0cy5wb3NpdGlvbiA9IGZ1bmN0aW9uIHBvc2l0aW9uKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCkge1xuICB2YXIgYyA9IGdldENvb3JkcyhzY29wZSlbcGxhY2VtZW50XTtcbiAgdmFyIGUgPSBnZXRDb29yZHModGFyZ2V0KTtcbiAgdmFyIF93aW5kb3cyID0gd2luZG93LFxuICAgICAgeSA9IF93aW5kb3cyLnBhZ2VZT2Zmc2V0O1xuXG5cbiAgdmFyIHZwID0ge1xuICAgIHRvcDogeSxcbiAgICBib3R0b206IHkgKyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogd2luZG93LmlubmVyV2lkdGhcbiAgfTtcblxuICB2YXIgb2Zmc2V0cyA9IHtcbiAgICB0b3A6IHtcbiAgICAgIHg6IGUud2lkdGggLyAyLFxuICAgICAgeTogZS5oZWlnaHRcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgeDogZS53aWR0aCAvIDIsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogZS5oZWlnaHQgLyAyXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0IC8gMlxuICAgIH0sXG4gICAgdG9wTGVmdDoge1xuICAgICAgeDogZS53aWR0aCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b21MZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAgYm90dG9tUmlnaHQ6IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICB9O1xuXG4gIHZhciBwb3N4ID0gYy54IC0gb2Zmc2V0c1twbGFjZW1lbnRdLng7XG4gIHZhciBwb3N5ID0gYy55IC0gb2Zmc2V0c1twbGFjZW1lbnRdLnk7XG5cbiAgaWYgKHBvc3ggPCB2cC5sZWZ0KSB7XG4gICAgcG9zeCA9IHZwLmxlZnQ7XG4gIH0gZWxzZSBpZiAocG9zeCArIGUud2lkdGggPiB2cC5yaWdodCkge1xuICAgIHBvc3ggPSB2cC5yaWdodCAtIGUud2lkdGg7XG4gIH1cblxuICBpZiAocG9zeSA8IHZwLnRvcCkge1xuICAgIHBvc3kgPSB2cC50b3A7XG4gIH0gZWxzZSBpZiAocG9zeSArIGUuaGVpZ2h0ID4gdnAuYm90dG9tKSB7XG4gICAgcG9zeSA9IHZwLmJvdHRvbSAtIGUuaGVpZ2h0O1xuICB9XG5cbiAgdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBwb3N4ICsgJ3B4KSB0cmFuc2xhdGVZKCcgKyBwb3N5ICsgJ3B4KSc7XG59O1xuXG52YXIgdGFjayA9IGV4cG9ydHMudGFjayA9IGZ1bmN0aW9uIHRhY2sodGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KSB7XG4gIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy10YWNrZWQnKTtcbiAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcblxuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdGFja2VkJyk7XG4gICAgfVxuICB9O1xufTsiXX0=
