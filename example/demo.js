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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, via, hashtags) {
  return 'https://twitter.com/share?url=' + url + '&text=' + encodeURIComponent(text) + (via ? '&via=' + via : '') + (hashtags ? '&hashtags=' + encodeURIComponent(hashtags) : '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpY29ucy5qcyIsImluZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L2luZGV4LmpzIiwiLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvZW1haWwuanMiLCIuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy9mYWNlYm9vay5qcyIsIi4uL3BhY2thZ2UvZGlzdC9zaGFyZXJzL3R3aXR0ZXIuanMiLCIuLi9wYWNrYWdlL25vZGVfbW9kdWxlcy90YWNranMvZGlzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSw2MEJBQU47O0FBRUEsSUFBTSwrakJBQU47O0FBRUEsSUFBTSxtZUFBTjs7Ozs7QUNKUDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBTUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsYUFBSztBQUNqRCxNQUFNLElBQUkscUJBQU87QUFDZixhQUFTLGNBRE07QUFFZixxQkFBaUI7QUFGRixHQUFQLEVBR1AsQ0FDRDtBQUFBLHlCQUFtQix1QkFBUSxHQUFSLENBQW5CO0FBQUEsR0FEQyxFQUVEO0FBQUEseUJBQW1CLHdCQUFTLEdBQVQsQ0FBbkI7QUFBQSxHQUZDLEVBR0Q7QUFBQSx5QkFBbUIscUJBQU0sR0FBTixDQUFuQjtBQUFBLEdBSEMsQ0FITyxDQUFWOztBQVNBLGFBQVc7QUFBQSxXQUFNLEVBQUUsT0FBRixFQUFOO0FBQUEsR0FBWCxFQUE4QixLQUE5QjtBQUNELENBWEQ7OztBQ1hBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsUUFBUSxNQUFSLEdBQWlCLFNBQWpCOztBQUVBLElBQUksVUFBVSxRQUFRLFFBQVIsQ0FBZDs7QUFFQTs7Ozs7Ozs7QUFRQSxJQUFJLGFBQWEsU0FBUyxVQUFULENBQW9CLENBQXBCLEVB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RCxJQUFnRixNQUFNLFVBQVUsR0FBaEIsR0FBc0IsRUFBdEcsS0FBNkcsV0FBVyxlQUFlLG1CQUFtQixRQUFuQixDQUExQixHQUF5RCxFQUF0SyxDQUFQO0FBQ0QsQ0FGRDs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjb25zdCB0d2l0dGVyID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxLjQxNFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIgZD1cIk0xNiAzLjAzOGMtLjU5LjI2LTEuMjIuNDM3LTEuODg1LjUxNy42NzctLjQwNyAxLjE5OC0xLjA1IDEuNDQzLTEuODE2LS42MzQuMzctMS4zMzcuNjQtMi4wODUuNzktLjU5OC0uNjQtMS40NS0xLjA0LTIuMzk2LTEuMDQtMS44MTIgMC0zLjI4MiAxLjQ3LTMuMjgyIDMuMjggMCAuMjYuMDMuNTEuMDg1Ljc1LTIuNzI4LS4xMy01LjE0Ny0xLjQ0LTYuNzY2LTMuNDJDLjgzIDIuNTguNjcgMy4xNC42NyAzLjc1YzAgMS4xNC41OCAyLjE0MyAxLjQ2IDIuNzMyLS41MzgtLjAxNy0xLjA0NS0uMTY1LTEuNDg3LS40MXYuMDRjMCAxLjU5IDEuMTMgMi45MTggMi42MzMgMy4yMi0uMjc2LjA3NC0uNTY2LjExNC0uODY1LjExNC0uMjEgMC0uNDEtLjAyLS42MS0uMDU4LjQyIDEuMzA0IDEuNjMgMi4yNTMgMy4wNyAyLjI4LTEuMTIuODgtMi41NCAxLjQwNC00LjA3IDEuNDA0LS4yNiAwLS41Mi0uMDE1LS43OC0uMDQ1IDEuNDYuOTMgMy4xOCAxLjQ3NCA1LjA0IDEuNDc0IDYuMDQgMCA5LjM0LTUgOS4zNC05LjMzIDAtLjE0IDAtLjI4LS4wMS0uNDIuNjQtLjQ2IDEuMi0xLjA0IDEuNjQtMS43eiBcIj48L3BhdGg+PC9zdmc+YFxuXG5leHBvcnQgY29uc3QgZmFjZWJvb2sgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEuNDE0XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBkPVwiTTE1LjExNyAwSC44ODNDLjM5NSAwIDAgLjM5NSAwIC44ODN2MTQuMjM0YzAgLjQ4OC4zOTUuODgzLjg4My44ODNoNy42NjNWOS44MDRINi40NlY3LjM5aDIuMDg2VjUuNjA3YzAtMi4wNjYgMS4yNjItMy4xOSAzLjEwNi0zLjE5Ljg4MyAwIDEuNjQyLjA2NCAxLjg2My4wOTR2Mi4xNmgtMS4yOGMtMSAwLTEuMTk1LjQ4LTEuMTk1IDEuMTh2MS41NGgyLjM5bC0uMzEgMi40MmgtMi4wOFYxNmg0LjA3N2MuNDg4IDAgLjg4My0uMzk1Ljg4My0uODgzVi44ODNDMTYgLjM5NSAxNS42MDUgMCAxNS4xMTcgMCBcIj48L3BhdGg+PC9zdmc+YFxuXG5leHBvcnQgY29uc3QgZ21haWwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEuNDE0XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBkPVwiTTE2IDN2MTBjMCAuNTY3LS40MzMgMS0xIDFoLTFWNC45MjVMOCA5LjIzMyAyIDQuOTI1VjE0SDFjLS41NjcgMC0xLS40MzMtMS0xVjNjMC0uMjgzLjEwOC0uNTMzLjI4Ny0uNzEyQy40NjcgMi4xMDcuNzE4IDIgMSAyaC4zMzNMOCA2LjgzMyAxNC42NjcgMkgxNWMuMjgzIDAgLjUzMy4xMDguNzEzLjI4OC4xNzkuMTc5LjI4Ny40MjkuMjg3LjcxMnogXCI+PC9wYXRoPjwvc3ZnPmBcbiIsImltcG9ydCBzc2hhcmUgZnJvbSAnLi4vcGFja2FnZS9kaXN0L2luZGV4LmpzJ1xuaW1wb3J0IHR3aXR0ZXIgZnJvbSAnLi4vcGFja2FnZS9kaXN0L3NoYXJlcnMvdHdpdHRlci5qcydcbmltcG9ydCBmYWNlYm9vayBmcm9tICcuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy9mYWNlYm9vay5qcydcbmltcG9ydCBlbWFpbCBmcm9tICcuLi9wYWNrYWdlL2Rpc3Qvc2hhcmVycy9lbWFpbC5qcydcblxuaW1wb3J0IHtcbiAgdHdpdHRlciBhcyB0dyxcbiAgZmFjZWJvb2sgYXMgZmIsXG4gIGdtYWlsXG59IGZyb20gJy4vaWNvbnMuanMnXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBlID0+IHtcbiAgY29uc3QgcyA9IHNzaGFyZSh7XG4gICAgY29udGV4dDogJy5qcy1zaGFyYWJsZScsXG4gICAgdHJhbnNpdGlvblNwZWVkOiAyMDBcbiAgfSwgW1xuICAgIHVybCA9PiBgPGEgaHJlZj1cIiR7dHdpdHRlcih1cmwpfVwiIHRhcmdldD1cIl9ibGFua1wiPiR7dHd9PC9hPmAsXG4gICAgdXJsID0+IGA8YSBocmVmPVwiJHtmYWNlYm9vayh1cmwpfVwiIHRhcmdldD1cIl9ibGFua1wiPiR7ZmJ9PC9hPmAsXG4gICAgdXJsID0+IGA8YSBocmVmPVwiJHtlbWFpbCh1cmwpfVwiPiR7Z21haWx9PC9hPmAsXG4gIF0pXG5cbiAgc2V0VGltZW91dCgoKSA9PiBzLmRlc3Ryb3koKSwgMTAwMDApXG59KVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5zc2hhcmUgPSB1bmRlZmluZWQ7XG5cbnZhciBfdGFja2pzID0gcmVxdWlyZSgndGFja2pzJyk7XG5cbi8qKlxuICogQ2hlY2sgaWYgY2xpY2sgaGFwcGVuZWRcbiAqIHdpdGhpbiB0aGUgZGlhbG9nXG4gKlxuICogQHBhcmFtIHtldmVudH0gZSBUaGUgY2xpY2sgZXZlbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkaWFsb2cgVGhlIHNoYXJlIGRpYWxvZ1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xudmFyIHZhbGlkQ2xpY2sgPSBmdW5jdGlvbiB2YWxpZENsaWNrKGUsIGRpYWxvZykge1xuICByZXR1cm4gZS50YXJnZXQgIT09IGRpYWxvZyB8fCAhZGlhbG9nLmNvbnRhaW5zKGUudGFyZ2V0KTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgZXZlbnQgaXMgd2l0aGluXG4gKiB0aGUgdXNlci1zcGVjaWZpZWQgc2NvcGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZWwgVGhlIGVsZW1lbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIGV2ZW50XG4gKiBAcGFyYW0ge2FycmF5fSBjb250ZXh0IEFycmF5IG9mIGVsZW1lbnRzIHRvIHNjb3BlIHRvXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG52YXIgaXNJbkNvbnRleHQgPSBmdW5jdGlvbiBpc0luQ29udGV4dChlbCwgY29udGV4dCkge1xuICByZXR1cm4gIWNvbnRleHQgfHwgW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbnRleHQpKS5maWx0ZXIoZnVuY3Rpb24gKGN0eCkge1xuICAgIHJldHVybiBlbCA9PT0gY3R4IHx8IGN0eC5jb250YWlucyhlbCk7XG4gIH0pLmxlbmd0aCA+IDA7XG59O1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgbWFpbiBwb3J0YWxcbiAqIHRoYXQgdGhlIGxpbmtzIGFyZVxuICogcmVuZGVyZWQgaW50by4gU2V0XG4gKiBhY2Nlc3NpYmxpdHkgYXR0cnMuXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSBhIERPTSBlbGVtZW50XG4gKi9cbnZhciBjcmVhdGVQb3J0YWwgPSBmdW5jdGlvbiBjcmVhdGVQb3J0YWwoKSB7XG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmNsYXNzTmFtZSA9ICdzc2hhcmUnO1xuICBkaXYucm9sZSA9ICdkaWFsb2cnO1xuICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1NoYXJlIERpYWxvZycpO1xuICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgcmV0dXJuIGRpdjtcbn07XG5cbi8qKlxuICogUmVuZGVyIHNoYXJlIGxpbmtzLFxuICogcmV0dXJuIG5vZGUgYW5kIGRlc3Ryb3kgbWV0aG9kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGhlIGhpZ2hsaWdodGVkIHRleHRcbiAqIEBwYXJhbSB7YXJyYXl9IHNoYXJlcnMgQXJyYXkgb2YgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIGVsZW1lbnRzIG9yIHN0cmluZ3NcbiAqIEBwYXJhbSB7b2JqZWN0fSBwb3J0YWwgVGhlIHBvcnRhbCByZXR1cm5lZCBmcm9tIGNyZWF0ZVBvcnRhbCgpXG4gKi9cbnZhciByZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodGV4dCwgc2hhcmVycywgcG9ydGFsKSB7XG4gIHBvcnRhbC5pbm5lckhUTUwgPSAnXFxuICAgIDxkaXYgY2xhc3M9XCJzc2hhcmVfX2lubmVyXCI+JyArIHNoYXJlcnMubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgdmFyIGVsID0gcyh0ZXh0KTtcbiAgICByZXR1cm4gdHlwZW9mIGVsID09PSAnc3RyaW5nJyA/IGVsIDogZWwub3V0ZXJIVE1MO1xuICB9KS5qb2luKCcnKSArICc8L2Rpdj5cXG4gICc7XG5cbiAgcG9ydGFsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICBwb3J0YWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gIHZhciBub2RlID0gcG9ydGFsLmNoaWxkcmVuWzBdO1xuXG4gIHJldHVybiB7XG4gICAgbm9kZTogbm9kZSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgcG9ydGFsLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICogR2V0IHJhbmdlIG9iamVjdCBmb3IgaGlnaGxpZ2h0ZWQgdGV4dFxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gcmFuZ2VcbiAqL1xudmFyIGdldFNlbGVjdGlvbiA9IGZ1bmN0aW9uIGdldFNlbGVjdGlvbigpIHtcbiAgdmFyIHJhbmdlID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXG4gIGlmIChyYW5nZS5jb2xsYXBzZWQpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiByYW5nZS5yYW5nZUNvdW50IDwgMSA/IG51bGwgOiByYW5nZS5nZXRSYW5nZUF0KDApO1xufTtcblxuLyoqXG4gKiBJbml0XG4gKi9cbnZhciBzc2hhcmUgPSBmdW5jdGlvbiBzc2hhcmUoX3JlZikge1xuICB2YXIgX3JlZiRjb250ZXh0ID0gX3JlZi5jb250ZXh0LFxuICAgICAgY29udGV4dCA9IF9yZWYkY29udGV4dCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IF9yZWYkY29udGV4dCxcbiAgICAgIF9yZWYkdHJhbnNpdGlvblNwZWVkID0gX3JlZi50cmFuc2l0aW9uU3BlZWQsXG4gICAgICB0cmFuc2l0aW9uU3BlZWQgPSBfcmVmJHRyYW5zaXRpb25TcGVlZCA9PT0gdW5kZWZpbmVkID8gMjAwIDogX3JlZiR0cmFuc2l0aW9uU3BlZWQ7XG4gIHZhciBzaGFyZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBbXTtcblxuICB2YXIgcG9ydGFsID0gY3JlYXRlUG9ydGFsKCk7XG5cbiAgdmFyIGJhciA9IG51bGw7XG4gIHZhciBkaWFsb2cgPSBudWxsO1xuICB2YXIgdGltZW91dCA9IDA7XG4gIHZhciBmb2N1c05vZGUgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBTZWxlY3Rpb25zXG4gICAqL1xuICB2YXIgcHJldmlvdXNSYW5nZSA9IG51bGw7XG4gIHZhciBjdXJyZW50UmFuZ2UgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgZGlhbG9nLCB0YWNranMgaW5zdGFuY2VcbiAgICogcmVtb3ZlcyBsaXN0ZW5lcnMsIGFuZCBzZXRzXG4gICAqIGFjY2Vzc2libGl0eSBhdHRycyBiYWNrIHRvIGRlZmF1bHRzXG4gICAqL1xuICB2YXIgaGlkZSA9IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgaWYgKCFkaWFsb2cgfHwgIWJhcikgcmV0dXJuO1xuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhpZGUpO1xuICAgIHBvcnRhbC5jbGFzc0xpc3QuYWRkKCdpcy1oaWRpbmcnKTtcblxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHBvcnRhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRpbmcnKTtcbiAgICAgIHBvcnRhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgIGJhci5kZXN0cm95KCk7XG4gICAgICBkaWFsb2cuZGVzdHJveSgpO1xuICAgICAgZGlhbG9nID0gbnVsbDtcbiAgICAgIGJhciA9IG51bGw7XG4gICAgICBwb3J0YWwucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgZm9jdXNOb2RlLmZvY3VzKCk7XG4gICAgfSwgdHJhbnNpdGlvblNwZWVkKTtcbiAgfTtcblxuICB2YXIgaGFuZGxlU2VsZWN0aW9uID0gZnVuY3Rpb24gaGFuZGxlU2VsZWN0aW9uKGtleXVwKSB7XG4gICAgY3VycmVudFJhbmdlID0gZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICBpZiAoIWN1cnJlbnRSYW5nZSkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogU2F2ZSBsYXN0IGZvY3VzZWQgbm9kZVxuICAgICAqL1xuICAgIGZvY3VzTm9kZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICB2YXIgdGV4dCA9IGN1cnJlbnRSYW5nZS50b1N0cmluZygpO1xuICAgIHZhciBwcmV2aW91c1RleHQgPSBwcmV2aW91c1JhbmdlID8gcHJldmlvdXNSYW5nZS50b1N0cmluZygpIDogJyc7XG5cbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICAvKipcbiAgICAgKiBJZiBubyB0ZXh0LCBvciB0aGUgdGV4dCBpcyB0aGUgc2FtZVxuICAgICAqIGFmdGVyIGEgY2xpY2sgZXZlbnQsIGhpZGUuXG4gICAgICpcbiAgICAgKiBPdGhlcndpc2UsIGlmIGl0J3MgbmV3IHRleHRcbiAgICAgKiByZW5kZXIgYSBuZXcgZGlhbG9nLlxuICAgICAqL1xuICAgIGlmICghdGV4dCB8fCB0ZXh0Lmxlbmd0aCA8PSAwIHx8IHByZXZpb3VzVGV4dCA9PT0gdGV4dCAmJiAha2V5dXApIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9IGVsc2UgaWYgKCFwcmV2aW91c1JhbmdlIHx8IHByZXZpb3VzVGV4dCAhPT0gdGV4dCkge1xuICAgICAgZGlhbG9nID0gcmVuZGVyKHRleHQsIHNoYXJlcnMsIHBvcnRhbCk7XG5cbiAgICAgIHByZXZpb3VzUmFuZ2UgPSBjdXJyZW50UmFuZ2U7XG5cbiAgICAgIGJhciA9ICgwLCBfdGFja2pzLnRhY2spKHBvcnRhbCwgY3VycmVudFJhbmdlLCAndG9wJyk7XG5cbiAgICAgIC8qKlxuICAgICAgICogRW5zdXJlcyB5b3UgZG9uJ3Qgc2VlIHRoZVxuICAgICAgICogZGlhbG9nIGZseSBpbnRvIHBsYWNlXG4gICAgICAgKi9cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3J0YWwuZm9jdXMoKTtcbiAgICAgICAgcG9ydGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGluZycpO1xuICAgICAgICBwb3J0YWwuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgICB9LCB0cmFuc2l0aW9uU3BlZWQpO1xuXG4gICAgICAvKipcbiAgICAgICAqIEFkZCBsaXN0ZW5lciwgd2hpY2ggaXMgcmVtb3ZlZFxuICAgICAgICogaW1tZWRpYXRlbHkgaWYgaXQncyB0cmlnZ2VyZWRcbiAgICAgICAqL1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhpZGUpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgbW91c2V1cCA9IGZ1bmN0aW9uIG1vdXNldXAoZSkge1xuICAgIHZhbGlkQ2xpY2soZSwgcG9ydGFsKSAmJiBpc0luQ29udGV4dChlLnRhcmdldCwgY29udGV4dCkgPyBoYW5kbGVTZWxlY3Rpb24oKSA6IGhpZGUoKTtcbiAgfTtcbiAgdmFyIGtleXVwID0gZnVuY3Rpb24ga2V5dXAoZSkge1xuICAgIGlmICghY3VycmVudFJhbmdlKSByZXR1cm47XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHJldHVybiBoaWRlKCk7XG4gICAgaWYgKGlzSW5Db250ZXh0KGN1cnJlbnRSYW5nZS5zdGFydENvbnRhaW5lci5wYXJlbnROb2RlLCBjb250ZXh0KSkgaGFuZGxlU2VsZWN0aW9uKHRydWUpO1xuICB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGtleXVwKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBoaWRlKTtcblxuICByZXR1cm4ge1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5dXApO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCBoaWRlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoaWRlKTtcbiAgICAgIGJhciAmJiBiYXIuZGVzdHJveSgpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jb250YWlucyhwb3J0YWwpICYmIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocG9ydGFsKTtcbiAgICAgIGZvY3VzTm9kZSAmJiBmb2N1c05vZGUuZm9jdXMoKTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzLnNzaGFyZSA9IHNzaGFyZTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNzaGFyZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHMpIHtcbiAgcmV0dXJuIFwibWFpbHRvOj9ib2R5PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHMpICsgXCIlMGElMGFcIiArIGVuY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAocykge1xuICByZXR1cm4gXCJodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIucGhwP3U9XCIgKyBlbmNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLmhyZWYpICsgXCImcXVvdGU9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocyk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHRleHQsIHZpYSwgaGFzaHRhZ3MpIHtcbiAgcmV0dXJuICdodHRwczovL3R3aXR0ZXIuY29tL3NoYXJlP3VybD0nICsgdXJsICsgJyZ0ZXh0PScgKyBlbmNvZGVVUklDb21wb25lbnQodGV4dCkgKyAodmlhID8gJyZ2aWE9JyArIHZpYSA6ICcnKSArIChoYXNodGFncyA/ICcmaGFzaHRhZ3M9JyArIGVuY29kZVVSSUNvbXBvbmVudChoYXNodGFncykgOiAnJyk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBnZXRDb29yZHMgPSBleHBvcnRzLmdldENvb3JkcyA9IGZ1bmN0aW9uIGdldENvb3JkcyhlbGVtZW50KSB7XG4gIHZhciBfZWxlbWVudCRnZXRCb3VuZGluZ0MgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgbCA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5sZWZ0LFxuICAgICAgciA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5yaWdodCxcbiAgICAgIHQgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MudG9wLFxuICAgICAgYiA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5ib3R0b207XG5cbiAgdmFyIF93aW5kb3cgPSB3aW5kb3csXG4gICAgICB5ID0gX3dpbmRvdy5wYWdlWU9mZnNldDtcblxuXG4gIHJldHVybiB7XG4gICAgaGVpZ2h0OiBiIC0gdCxcbiAgICB3aWR0aDogciAtIGwsXG4gICAgdG9wOiB7XG4gICAgICB5OiB5ICsgdCxcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICB5OiB5ICsgYixcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgeTogdCArIChiIC0gdCkgLyAyLFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIHk6IHQgKyAoYiAtIHQpIC8gMixcbiAgICAgIHg6IHJcbiAgICB9LFxuICAgIHRvcExlZnQ6IHtcbiAgICAgIHk6IHkgKyB0LFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgYm90dG9tTGVmdDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiBsXG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeTogeSArIHQsXG4gICAgICB4OiByXG4gICAgfSxcbiAgICBib3R0b21SaWdodDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiByXG4gICAgfVxuICB9O1xufTtcblxudmFyIHBvc2l0aW9uID0gZXhwb3J0cy5wb3NpdGlvbiA9IGZ1bmN0aW9uIHBvc2l0aW9uKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCkge1xuICB2YXIgYyA9IGdldENvb3JkcyhzY29wZSlbcGxhY2VtZW50XTtcbiAgdmFyIGUgPSBnZXRDb29yZHModGFyZ2V0KTtcbiAgdmFyIF93aW5kb3cyID0gd2luZG93LFxuICAgICAgeSA9IF93aW5kb3cyLnBhZ2VZT2Zmc2V0O1xuXG5cbiAgdmFyIHZwID0ge1xuICAgIHRvcDogeSxcbiAgICBib3R0b206IHkgKyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogd2luZG93LmlubmVyV2lkdGhcbiAgfTtcblxuICB2YXIgb2Zmc2V0cyA9IHtcbiAgICB0b3A6IHtcbiAgICAgIHg6IGUud2lkdGggLyAyLFxuICAgICAgeTogZS5oZWlnaHRcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgeDogZS53aWR0aCAvIDIsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogZS5oZWlnaHQgLyAyXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0IC8gMlxuICAgIH0sXG4gICAgdG9wTGVmdDoge1xuICAgICAgeDogZS53aWR0aCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b21MZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAgYm90dG9tUmlnaHQ6IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICB9O1xuXG4gIHZhciBwb3N4ID0gYy54IC0gb2Zmc2V0c1twbGFjZW1lbnRdLng7XG4gIHZhciBwb3N5ID0gYy55IC0gb2Zmc2V0c1twbGFjZW1lbnRdLnk7XG5cbiAgaWYgKHBvc3ggPCB2cC5sZWZ0KSB7XG4gICAgcG9zeCA9IHZwLmxlZnQ7XG4gIH0gZWxzZSBpZiAocG9zeCArIGUud2lkdGggPiB2cC5yaWdodCkge1xuICAgIHBvc3ggPSB2cC5yaWdodCAtIGUud2lkdGg7XG4gIH1cblxuICBpZiAocG9zeSA8IHZwLnRvcCkge1xuICAgIHBvc3kgPSB2cC50b3A7XG4gIH0gZWxzZSBpZiAocG9zeSArIGUuaGVpZ2h0ID4gdnAuYm90dG9tKSB7XG4gICAgcG9zeSA9IHZwLmJvdHRvbSAtIGUuaGVpZ2h0O1xuICB9XG5cbiAgdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBwb3N4ICsgJ3B4KSB0cmFuc2xhdGVZKCcgKyBwb3N5ICsgJ3B4KSc7XG59O1xuXG52YXIgdGFjayA9IGV4cG9ydHMudGFjayA9IGZ1bmN0aW9uIHRhY2sodGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KSB7XG4gIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy10YWNrZWQnKTtcbiAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcblxuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdGFja2VkJyk7XG4gICAgfVxuICB9O1xufTsiXX0=
