module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

let colors = __webpack_require__(23);
let colorize = __webpack_require__(24);

module.exports = (parameter, library, functionName, loc, replaceValue) => console.log(`
  ${colors.yellow.bold('WARNING')}: Parameter missing: [${colorize.parse(parameter)}] for [${colorize.parse(`${library}.${functionName}`)}]. Using value [${colorize.parse(replaceValue)}] instead.
    ${colorize.parse(loc)}`);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

/*

The MIT License (MIT)

Original Library 
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var colors = {};
module['exports'] = colors;

colors.themes = {};

var ansiStyles = colors.styles = __webpack_require__(21);
var defineProps = Object.defineProperties;

colors.supportsColor = __webpack_require__(22);

if (typeof colors.enabled === "undefined") {
  colors.enabled = colors.supportsColor;
}

colors.stripColors = colors.strip = function(str){
  return ("" + str).replace(/\x1B\[\d+m/g, '');
};


var stylize = colors.stylize = function stylize (str, style) {
  if (!colors.enabled) {
    return str+'';
  }

  return ansiStyles[style].open + str + ansiStyles[style].close;
}

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
var escapeStringRegexp = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe,  '\\$&');
}

function build(_styles) {
  var builder = function builder() {
    return applyStyle.apply(builder, arguments);
  };
  builder._styles = _styles;
  // __proto__ is used because we must return a function, but there is
  // no way to create a function with a different prototype.
  builder.__proto__ = proto;
  return builder;
}

var styles = (function () {
  var ret = {};
  ansiStyles.grey = ansiStyles.gray;
  Object.keys(ansiStyles).forEach(function (key) {
    ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
    ret[key] = {
      get: function () {
        return build(this._styles.concat(key));
      }
    };
  });
  return ret;
})();

var proto = defineProps(function colors() {}, styles);

function applyStyle() {
  var args = arguments;
  var argsLen = args.length;
  var str = argsLen !== 0 && String(arguments[0]);
  if (argsLen > 1) {
    for (var a = 1; a < argsLen; a++) {
      str += ' ' + args[a];
    }
  }

  if (!colors.enabled || !str) {
    return str;
  }

  var nestedStyles = this._styles;

  var i = nestedStyles.length;
  while (i--) {
    var code = ansiStyles[nestedStyles[i]];
    str = code.open + str.replace(code.closeRe, code.open) + code.close;
  }

  return str;
}

function applyTheme (theme) {
  for (var style in theme) {
    (function(style){
      colors[style] = function(str){
        if (typeof theme[style] === 'object'){
          var out = str;
          for (var i in theme[style]){
            out = colors[theme[style][i]](out);
          }
          return out;
        }
        return colors[theme[style]](str);
      };
    })(style)
  }
}

colors.setTheme = function (theme) {
  if (typeof theme === 'string') {
    try {
      colors.themes[theme] = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
      applyTheme(colors.themes[theme]);
      return colors.themes[theme];
    } catch (err) {
      console.log(err);
      return err;
    }
  } else {
    applyTheme(theme);
  }
};

function init() {
  var ret = {};
  Object.keys(styles).forEach(function (name) {
    ret[name] = {
      get: function () {
        return build([name]);
      }
    };
  });
  return ret;
}

var sequencer = function sequencer (map, str) {
  var exploded = str.split(""), i = 0;
  exploded = exploded.map(map);
  return exploded.join("");
};

// custom formatter methods
colors.trap = __webpack_require__(15);
colors.zalgo = __webpack_require__(16);

// maps
colors.maps = {};
colors.maps.america = __webpack_require__(17);
colors.maps.zebra = __webpack_require__(20);
colors.maps.rainbow = __webpack_require__(18);
colors.maps.random = __webpack_require__(19)

for (var map in colors.maps) {
  (function(map){
    colors[map] = function (str) {
      return sequencer(colors.maps[map], str);
    }
  })(map)
}

defineProps(colors, init());

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {
  let checkPosition = !!(props.x || props.y);

  if (checkPosition) {
    if (!props.x) {
      warning('x', 'e2d', name, loc, '0');
      props.x = types.numericLiteral(0);
    }

    if (!props.y) {
      warning('y', 'e2d', name, loc, '0');
      props.y = types.numericLiteral(0);
    }
  }

  if (!props.width) {
    warning('width', 'e2d', name, loc, '1');
    props.width = types.numericLiteral(0);
  }
  if (!props.height) {
    warning('height', 'e2d', name, loc, '1');
    props.height = types.numericLiteral(0);
  }
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {
  let checkAngles = !!(props.startAngle || props.endAngle || props.anticlockwise),
    checkPosition = !!(props.x || props.y || checkAngles);

  if (checkAngles) {
    if (!props.endAngle) {
      warning('endAngle', 'e2d', name, loc, 'Math.PI / 2');
      props.endAngle = types.numericLiteral(Math.PI * 2);
    }

    if (!props.startAngle) {
      warning('startAngle', 'e2d', name, loc, '0');
      props.startAngle = types.numericLiteral(0);
    }
  }

  if (checkPosition) {
    if (!props.x) {
      warning('x', 'e2d', name, loc, '0');
      props.x = types.numericLiteral(0);
    }

    if (!props.y) {
      warning('y', 'e2d', name, loc, '0');
      props.y = types.numericLiteral(0);
    }
  }

  if (!props.r) {
    warning('r', 'e2d', name, loc, '1');
    props.r = types.numericLiteral(1);
  }
};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {

  if (!props.style) {
    warning('style', 'e2d', name, loc, '"black"');
    props.style = types.stringLiteral("black");
  }

};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {

  if (!props.text) {
    warning('text', 'e2d', name, loc, '""');
    props.text = types.stringLiteral("");
  }

  if (!props.x) {
    warning('x', 'e2d', name, loc, '0');
    props.x = types.numericLiteral(0);
  }

  if (!props.y) {
    warning('y', 'e2d', name, loc, '0');
    props.y = types.numericLiteral(0);
  }
};

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = (path, types, callee, attributes, children) => {
  let { callExpression } = types;
  console.log(attributes);

  return path.replaceWith(
    callExpression(
      callee,
      [
        types.objectExpression(
          Object.getOwnPropertyNames(attributes).map(
            (attr) => types.objectProperty(
              types.identifier(attr),
              attributes[attr]
            )
          )
        )
      ].concat(children)
    )
  );
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var map = {
	"./arc.js": 25,
	"./arcTo.js": 26,
	"./beginClip.js": 27,
	"./beginPath.js": 28,
	"./bezierCurveTo.js": 29,
	"./children.js": 30,
	"./clearRect.js": 31,
	"./clip.js": 32,
	"./clipPath.js": 33,
	"./closePath.js": 34,
	"./createRegularPolygon.js": 35,
	"./ellipse.js": 36,
	"./fill.js": 37,
	"./fillArc.js": 38,
	"./fillRect.js": 39,
	"./fillStyle.js": 40,
	"./fillText.js": 41,
	"./globalAlpha.js": 42,
	"./globalCompositeOperation.js": 43,
	"./hitRect.js": 44,
	"./hitRegion.js": 45,
	"./imageSmoothingEnabled.js": 46,
	"./lineStyle.js": 47,
	"./lineTo.js": 48,
	"./moveTo.js": 49,
	"./params.js": 50,
	"./path.js": 51,
	"./quadraticCurveTo.js": 52,
	"./rect.js": 53,
	"./render.js": 54,
	"./resetTransform.js": 55,
	"./rotate.js": 56,
	"./scale.js": 57,
	"./setTransform.js": 58,
	"./shadowStyle.js": 59,
	"./skewX.js": 60,
	"./skewY.js": 61,
	"./stroke.js": 62,
	"./strokeArc.js": 63,
	"./strokeRect.js": 64,
	"./strokeStyle.js": 65,
	"./strokeText.js": 66,
	"./template.js": 67,
	"./textStyle.js": 68,
	"./transform.js": 69,
	"./translate.js": 70
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 7;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var map = {
	"./arc.js": 3,
	"./arcTo.js": 71,
	"./bezierCurveTo.js": 72,
	"./clearRect.js": 73,
	"./createRegularPolygon.js": 74,
	"./ellipse.js": 75,
	"./fillArc.js": 76,
	"./fillRect.js": 77,
	"./fillStyle.js": 4,
	"./fillText.js": 5,
	"./globalAlpha.js": 78,
	"./globalCompositeOperation.js": 79,
	"./hitRect.js": 80,
	"./path.js": 81,
	"./rect.js": 2,
	"./scale.js": 82,
	"./strokeArc.js": 83,
	"./strokeRect.js": 84,
	"./strokeStyle.js": 85,
	"./strokeText.js": 86,
	"./translate.js": 87
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 8;


/***/ },
/* 9 */
/***/ function(module, exports) {



module.exports = (member, types) => {
  if (types.isJSXIdentifier(member)) {
    return types.identifier(member.name);
  }

  let mapJSXMemberExpression = (name) => {
    return types.memberExpression(
      types.isJSXMemberExpression(name.object) ?
        mapJSXMemberExpression(name.object) : types.identifier(name.object.name),
      types.identifier(name.property.name)
    );
  };

  let result = mapJSXMemberExpression(member);
  return result;
};

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = (children, types) => children.filter(
  (child) => !types.isJSXText(child)
).map(
  (child) => child.expression || child
);

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = (attributes, types) => attributes.reduce(
  (index, attribute) => {
    index[attribute.name.name] = types.isJSXExpressionContainer(attribute.value) ? attribute.value.expression : attribute.value;
    return index;
  },
{});

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = require("babel-plugin-syntax-jsx");

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 14 */
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 14;


/***/ },
/* 15 */
/***/ function(module, exports) {

module['exports'] = function runTheTrap (text, options) {
  var result = "";
  text = text || "Run the trap, drop the bass";
  text = text.split('');
  var trap = {
    a: ["\u0040", "\u0104", "\u023a", "\u0245", "\u0394", "\u039b", "\u0414"],
    b: ["\u00df", "\u0181", "\u0243", "\u026e", "\u03b2", "\u0e3f"],
    c: ["\u00a9", "\u023b", "\u03fe"],
    d: ["\u00d0", "\u018a", "\u0500" , "\u0501" ,"\u0502", "\u0503"],
    e: ["\u00cb", "\u0115", "\u018e", "\u0258", "\u03a3", "\u03be", "\u04bc", "\u0a6c"],
    f: ["\u04fa"],
    g: ["\u0262"],
    h: ["\u0126", "\u0195", "\u04a2", "\u04ba", "\u04c7", "\u050a"],
    i: ["\u0f0f"],
    j: ["\u0134"],
    k: ["\u0138", "\u04a0", "\u04c3", "\u051e"],
    l: ["\u0139"],
    m: ["\u028d", "\u04cd", "\u04ce", "\u0520", "\u0521", "\u0d69"],
    n: ["\u00d1", "\u014b", "\u019d", "\u0376", "\u03a0", "\u048a"],
    o: ["\u00d8", "\u00f5", "\u00f8", "\u01fe", "\u0298", "\u047a", "\u05dd", "\u06dd", "\u0e4f"],
    p: ["\u01f7", "\u048e"],
    q: ["\u09cd"],
    r: ["\u00ae", "\u01a6", "\u0210", "\u024c", "\u0280", "\u042f"],
    s: ["\u00a7", "\u03de", "\u03df", "\u03e8"],
    t: ["\u0141", "\u0166", "\u0373"],
    u: ["\u01b1", "\u054d"],
    v: ["\u05d8"],
    w: ["\u0428", "\u0460", "\u047c", "\u0d70"],
    x: ["\u04b2", "\u04fe", "\u04fc", "\u04fd"],
    y: ["\u00a5", "\u04b0", "\u04cb"],
    z: ["\u01b5", "\u0240"]
  }
  text.forEach(function(c){
    c = c.toLowerCase();
    var chars = trap[c] || [" "];
    var rand = Math.floor(Math.random() * chars.length);
    if (typeof trap[c] !== "undefined") {
      result += trap[c][rand];
    } else {
      result += c;
    }
  });
  return result;

}


/***/ },
/* 16 */
/***/ function(module, exports) {

// please no
module['exports'] = function zalgo(text, options) {
  text = text || "   he is here   ";
  var soul = {
    "up" : [
      '̍', '̎', '̄', '̅',
      '̿', '̑', '̆', '̐',
      '͒', '͗', '͑', '̇',
      '̈', '̊', '͂', '̓',
      '̈', '͊', '͋', '͌',
      '̃', '̂', '̌', '͐',
      '̀', '́', '̋', '̏',
      '̒', '̓', '̔', '̽',
      '̉', 'ͣ', 'ͤ', 'ͥ',
      'ͦ', 'ͧ', 'ͨ', 'ͩ',
      'ͪ', 'ͫ', 'ͬ', 'ͭ',
      'ͮ', 'ͯ', '̾', '͛',
      '͆', '̚'
    ],
    "down" : [
      '̖', '̗', '̘', '̙',
      '̜', '̝', '̞', '̟',
      '̠', '̤', '̥', '̦',
      '̩', '̪', '̫', '̬',
      '̭', '̮', '̯', '̰',
      '̱', '̲', '̳', '̹',
      '̺', '̻', '̼', 'ͅ',
      '͇', '͈', '͉', '͍',
      '͎', '͓', '͔', '͕',
      '͖', '͙', '͚', '̣'
    ],
    "mid" : [
      '̕', '̛', '̀', '́',
      '͘', '̡', '̢', '̧',
      '̨', '̴', '̵', '̶',
      '͜', '͝', '͞',
      '͟', '͠', '͢', '̸',
      '̷', '͡', ' ҉'
    ]
  },
  all = [].concat(soul.up, soul.down, soul.mid),
  zalgo = {};

  function randomNumber(range) {
    var r = Math.floor(Math.random() * range);
    return r;
  }

  function is_char(character) {
    var bool = false;
    all.filter(function (i) {
      bool = (i === character);
    });
    return bool;
  }
  

  function heComes(text, options) {
    var result = '', counts, l;
    options = options || {};
    options["up"] =   typeof options["up"]   !== 'undefined' ? options["up"]   : true;
    options["mid"] =  typeof options["mid"]  !== 'undefined' ? options["mid"]  : true;
    options["down"] = typeof options["down"] !== 'undefined' ? options["down"] : true;
    options["size"] = typeof options["size"] !== 'undefined' ? options["size"] : "maxi";
    text = text.split('');
    for (l in text) {
      if (is_char(l)) {
        continue;
      }
      result = result + text[l];
      counts = {"up" : 0, "down" : 0, "mid" : 0};
      switch (options.size) {
      case 'mini':
        counts.up = randomNumber(8);
        counts.mid = randomNumber(2);
        counts.down = randomNumber(8);
        break;
      case 'maxi':
        counts.up = randomNumber(16) + 3;
        counts.mid = randomNumber(4) + 1;
        counts.down = randomNumber(64) + 3;
        break;
      default:
        counts.up = randomNumber(8) + 1;
        counts.mid = randomNumber(6) / 2;
        counts.down = randomNumber(8) + 1;
        break;
      }

      var arr = ["up", "mid", "down"];
      for (var d in arr) {
        var index = arr[d];
        for (var i = 0 ; i <= counts[index]; i++) {
          if (options[index]) {
            result = result + soul[index][randomNumber(soul[index].length)];
          }
        }
      }
    }
    return result;
  }
  // don't summon him
  return heComes(text, options);
}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

var colors = __webpack_require__(1);

module['exports'] = (function() {
  return function (letter, i, exploded) {
    if(letter === " ") return letter;
    switch(i%3) {
      case 0: return colors.red(letter);
      case 1: return colors.white(letter)
      case 2: return colors.blue(letter)
    }
  }
})();

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

var colors = __webpack_require__(1);

module['exports'] = (function () {
  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta']; //RoY G BiV
  return function (letter, i, exploded) {
    if (letter === " ") {
      return letter;
    } else {
      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
    }
  };
})();



/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

var colors = __webpack_require__(1);

module['exports'] = (function () {
  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta'];
  return function(letter, i, exploded) {
    return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 1))]](letter);
  };
})();

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

var colors = __webpack_require__(1);

module['exports'] = function (letter, i, exploded) {
  return i % 2 === 0 ? letter : colors.inverse(letter);
};

/***/ },
/* 21 */
/***/ function(module, exports) {

/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var styles = {};
module['exports'] = styles;

var codes = {
  reset: [0, 0],

  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],

  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39],

  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],

  // legacy styles for colors pre v1.0.0
  blackBG: [40, 49],
  redBG: [41, 49],
  greenBG: [42, 49],
  yellowBG: [43, 49],
  blueBG: [44, 49],
  magentaBG: [45, 49],
  cyanBG: [46, 49],
  whiteBG: [47, 49]

};

Object.keys(codes).forEach(function (key) {
  var val = codes[key];
  var style = styles[key] = [];
  style.open = '\u001b[' + val[0] + 'm';
  style.close = '\u001b[' + val[1] + 'm';
});

/***/ },
/* 22 */
/***/ function(module, exports) {

/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var argv = process.argv;

module.exports = (function () {
  if (argv.indexOf('--no-color') !== -1 ||
    argv.indexOf('--color=false') !== -1) {
    return false;
  }

  if (argv.indexOf('--color') !== -1 ||
    argv.indexOf('--color=true') !== -1 ||
    argv.indexOf('--color=always') !== -1) {
    return true;
  }

  if (process.stdout && !process.stdout.isTTY) {
    return false;
  }

  if (process.platform === 'win32') {
    return true;
  }

  if ('COLORTERM' in process.env) {
    return true;
  }

  if (process.env.TERM === 'dumb') {
    return false;
  }

  if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
    return true;
  }

  return false;
})();

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

//
// Remark: Requiring this file will use the "safe" colors API which will not touch String.prototype
//
//   var colors = require('colors/safe);
//   colors.red("foo")
//
//
var colors = __webpack_require__(1);
module['exports'] = colors;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

module.exports = (function() {
  "use strict";

  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser  = this,

        peg$FAILED = {},

        peg$startRuleFunctions = { Rule: peg$parseRule },
        peg$startRuleFunction  = peg$parseRule,

        peg$c0 = /^[a-zA-Z_.\/\\]/,
        peg$c1 = { type: "class", value: "[a-zA-Z_\\./\\\\]", description: "[a-zA-Z_\\./\\\\]" },
        peg$c2 = /^[a-zA-Z_0-9.\/\\]/,
        peg$c3 = { type: "class", value: "[a-zA-Z_0-9./\\\\]", description: "[a-zA-Z_0-9./\\\\]" },
        peg$c4 = function(first, last) {
          return colors.yellow(first + last.join(''));
        },
        peg$c5 = "@",
        peg$c6 = { type: "literal", value: "@", description: "\"@\"" },
        peg$c7 = ":",
        peg$c8 = { type: "literal", value: ":", description: "\":\"" },
        peg$c9 = function(op, num) { return colors.white(op) + (num || ''); },
        peg$c10 = /^[0-9]/,
        peg$c11 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c12 = function() { return colors.green(text()); },
        peg$c13 = "[",
        peg$c14 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c15 = ",",
        peg$c16 = { type: "literal", value: ",", description: "\",\"" },
        peg$c17 = "]",
        peg$c18 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c19 = function(point1, point2) {
          return colors.yellow("(") + point1 + colors.yellow(', ') + point2 + colors.yellow(")");
        },
        peg$c20 = "\"",
        peg$c21 = { type: "literal", value: "\"", description: "\"\\\"\"" },
        peg$c22 = "\\\"",
        peg$c23 = { type: "literal", value: "\\\"", description: "\"\\\\\\\"\"" },
        peg$c24 = /^[^"\n\r]/,
        peg$c25 = { type: "class", value: "[^\"\\n\\r]", description: "[^\"\\n\\r]" },
        peg$c26 = "'",
        peg$c27 = { type: "literal", value: "'", description: "\"'\"" },
        peg$c28 = "\\'",
        peg$c29 = { type: "literal", value: "\\'", description: "\"\\\\'\"" },
        peg$c30 = /^[^'\n\r]/,
        peg$c31 = { type: "class", value: "[^'\\n\\r]", description: "[^'\\n\\r]" },
        peg$c32 = /^[\r\n\t ]/,
        peg$c33 = { type: "class", value: "[\\r\\n\\t ]", description: "[\\r\\n\\t ]" },

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parseRule() {
      var s0;

      s0 = peg$parsePoint();
      if (s0 === peg$FAILED) {
        s0 = peg$parseIdentifier();
        if (s0 === peg$FAILED) {
          s0 = peg$parseDoubleQuotedString();
          if (s0 === peg$FAILED) {
            s0 = peg$parseNumber();
          }
        }
      }

      return s0;
    }

    function peg$parseIdentifier() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c0.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c1); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c2.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c3); }
        }
        if (s3 === peg$FAILED) {
          s3 = peg$parseOperator();
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c2.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c3); }
          }
          if (s3 === peg$FAILED) {
            s3 = peg$parseOperator();
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c4(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseOperator() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 64) {
        s1 = peg$c5;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c6); }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s1 = peg$c7;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseNumber();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c9(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseNumber() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c10.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c10.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c11); }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c12();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsePoint() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c13;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c14); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseString();
          if (s3 === peg$FAILED) {
            s3 = peg$parseNumber();
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s5 = peg$c15;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c16); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseString();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseNumber();
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 93) {
                        s9 = peg$c17;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c18); }
                      }
                      if (s9 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c19(s3, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseString() {
      var s0;

      s0 = peg$parseDoubleQuotedString();
      if (s0 === peg$FAILED) {
        s0 = peg$parseSingleQuotedString();
      }

      return s0;
    }

    function peg$parseDoubleQuotedString() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s1 = peg$c20;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.substr(peg$currPos, 2) === peg$c22) {
          s3 = peg$c22;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
        if (s3 === peg$FAILED) {
          if (peg$c24.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c25); }
          }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.substr(peg$currPos, 2) === peg$c22) {
            s3 = peg$c22;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c23); }
          }
          if (s3 === peg$FAILED) {
            if (peg$c24.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c25); }
            }
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s3 = peg$c20;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c21); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c12();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseSingleQuotedString();
      }

      return s0;
    }

    function peg$parseSingleQuotedString() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c26;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c27); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.substr(peg$currPos, 2) === peg$c28) {
          s3 = peg$c28;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c29); }
        }
        if (s3 === peg$FAILED) {
          if (peg$c30.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c31); }
          }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.substr(peg$currPos, 2) === peg$c28) {
            s3 = peg$c28;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c29); }
          }
          if (s3 === peg$FAILED) {
            if (peg$c30.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c31); }
            }
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c26;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c27); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c12();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1;

      s0 = [];
      if (peg$c32.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c33); }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c32.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c33); }
        }
      }

      return s0;
    }


      let colors = __webpack_require__(88);


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})()

/***/ },
/* 25 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y, r, startAngle, endAngle, anticlockwise } = attributes;
  let args = [r];


  if (x) {
    args.unshift(x, y);
  }

  if (x && startAngle) {
    args.push(startAngle, endAngle);
  }
  if (x && startAngle && anticlockwise) {
    args.push(anticlockwise);
  }
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('arc')
      ),
      args
    )
  );
};

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x1, y1, x2, y2, r } = attributes;


  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('arcTo')
      ),
      [x1, y1, x2, y2, r]
    )
  );
};

/***/ },
/* 27 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('beginClip')
      ),
      []
    )
  );
};

/***/ },
/* 28 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('beginPath')
      ),
      []
    )
  );
};

/***/ },
/* 29 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { cp1x, cp1y, cp2x, cp2y, x, y } = attributes;


  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('bezierCurveTo')
      ),
      [cp1x, cp1y, cp2x, cp2y, x, y]
    )
  );
};

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2t'),
        identifier('children')
      ),
      []
    )
  );
};

/***/ },
/* 31 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y, width, height } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('clearRect')
      ),
      x ? [x, y, width, height] : [width, height]
    )
  );
};

/***/ },
/* 32 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('clip')
      ),
      [attributes.path].concat(children)
    )
  );
};

/***/ },
/* 33 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('clipPath')
      ),
      []
    )
  );
};

/***/ },
/* 34 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('closePath')
      ),
      []
    )
  );
};

/***/ },
/* 35 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { radius, position, sides } = attributes;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('createRegularPolygon')
      ),
      [radius, position, sides]
    )
  );
};

/***/ },
/* 36 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise } = attributes;
  let args = [radiusX, radiusY];


  if (x) {
    args.unshift(x, y);
  }

  if (x && rotation) {
    args.push(rotation);
  }

  if (x && rotation && startAngle) {
    args.push(startAngle, endAngle);
  }

  if (x && rotation && startAngle && anticlockwise) {
    args.push(anticlockwise);
  }

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('ellipse')
      ),
      args
    )
  );
};

/***/ },
/* 37 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('fill')
      ),
      []
    )
  );
};

/***/ },
/* 38 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y, r, startAngle, endAngle, anticlockwise } = attributes;
  let args = [r];


  if (x) {
    args.unshift(x, y);
  }

  if (x && startAngle) {
    args.push(startAngle, endAngle);
  }
  if (x && startAngle && anticlockwise) {
    args.push(anticlockwise);
  }

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('fillArc')
      ),
      args
    )
  );
};

/***/ },
/* 39 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y, width, height } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('fillRect')
      ),
      x ? [x, y, width, height] : [width, height]
    )
  );
};

/***/ },
/* 40 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { style } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('fillStyle')
      ),
      [style].concat(children)
    )
  );
};

/***/ },
/* 41 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { text, x, y, maxWidth } = attributes;

  let args = [text];

  if (x) {
    args.push(x, y);
  }

  if (x && maxWidth) {
    args.push(maxWidth);
  }

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('fillText')
      ),
      args.concat(children)
    )
  );
};

/***/ },
/* 42 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { alpha } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('globalAlpha')
      ),
      [alpha].concat(children)
    )
  );
};

/***/ },
/* 43 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { operationType } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('globalCompositeOperation')
      ),
      [operationType].concat(children)
    )
  );
};

/***/ },
/* 44 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { id, x, y, width, height } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('hitRect')
      ),
      x ? [id, x, y, width, height] : [id, width, height]
    )
  );
};

/***/ },
/* 45 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { id, region } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('hitRegion')
      ),
      [id, region]
    )
  );
};

/***/ },
/* 46 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { value } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('imageSmoothingEnabled')
      ),
      [value].concat(children)
    )
  );
};

/***/ },
/* 47 */
/***/ function(module, exports) {

let props = ['lineWidth', 'lineCap', 'lineJoin', 'miterLimit', 'lineDash', 'lineDashOffset'];

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression,
        objectExpression, objectProperty } = types;
  let { style } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('lineStyle')
      ),
      style ? [style].concat(children) :
        [
          objectExpression(
            props
            .filter(
              (prop) => !!attributes[prop]
            )
            .map(
              (prop) => objectProperty(identifier(prop),attributes[prop])
            )
          )
        ].concat(children)
    )
  );
};

/***/ },
/* 48 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('lineTo')
      ),
      x ? [x, y] : []
    )
  );
};

/***/ },
/* 49 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y } = attributes;


  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('moveTo')
      ),
      x ? [x, y] : []
    )
  );
};

/***/ },
/* 50 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2t'),
        identifier('params')
      ),
      [attributes.func].concat(children)
    )
  );
};

/***/ },
/* 51 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('path')
      ),
      children
    )
  );
};

/***/ },
/* 52 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { cpx, cpy, x, y } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('quadraticCurveTo')
      ),
      [cpx, cpy, x, y]
    )
  );
};

/***/ },
/* 53 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y, width, height } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('rect')
      ),
      x ? [x, y, width, height] : [width, height]
    )
  );
};

/***/ },
/* 54 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { ctx } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('render')
      ),
      children.concat([ctx])
    )
  );
};

/***/ },
/* 55 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('resetTransform')
      ),
      children
    )
  );
};

/***/ },
/* 56 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { angle } = attributes;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('rotate')
      ),
      [angle].concat(children)
    )
  );
};

/***/ },
/* 57 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('scale')
      ),
      (attributes.value ? [attributes.value] : [attributes.x, attributes.y]).concat(children)
    )
  );
};

/***/ },
/* 58 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { matrix } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('setTransform')
      ),
      [matrix].concat(children)
    )
  );
};

/***/ },
/* 59 */
/***/ function(module, exports) {

let props = ['shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY'];

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression,
        objectExpression, objectProperty } = types;
  let { style } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('shadowStyle')
      ),
      style ? [style].concat(children) :
        [
          objectExpression(
            props
            .filter(
              (prop) => !!attributes[prop]
            )
            .map(
              (prop) => objectProperty(identifier(prop),attributes[prop])
            )
          )
        ].concat(children)
    )
  );
};

/***/ },
/* 60 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { angle } = attributes;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('skewX')
      ),
      [angle].concat(children)
    )
  );
};

/***/ },
/* 61 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { angle } = attributes;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('skewY')
      ),
      [angle].concat(children)
    )
  );
};

/***/ },
/* 62 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('stroke')
      ),
      []
    )
  );
};

/***/ },
/* 63 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y, r, startAngle, endAngle, anticlockwise } = attributes;
  let args = [r];


  if (x) {
    args.unshift(x, y);
  }

  if (x && startAngle) {
    args.push(startAngle, endAngle);
  }
  if (x && startAngle && anticlockwise) {
    args.push(anticlockwise);
  }

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('strokeArc')
      ),
      args
    )
  );
};

/***/ },
/* 64 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y, width, height } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('strokeRect')
      ),
      x ? [x, y, width, height] : [width, height]
    )
  );
};

/***/ },
/* 65 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { style } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('strokeStyle')
      ),
      [style].concat(children)
    )
  );
};

/***/ },
/* 66 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { text, x, y, maxWidth } = attributes;

  let args = [text];

  if (x) {
    args.push(x, y);
  }

  if (x && maxWidth) {
    args.push(maxWidth);
  }

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('strokeText')
      ),
      args.concat(children)
    )
  );
};

/***/ },
/* 67 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2t'),
        identifier('template')
      ),
      children
    )
  );
};

/***/ },
/* 68 */
/***/ function(module, exports) {

let props = ['font', 'textAlign', 'textBaseline', 'direction']

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression,
        objectExpression, objectProperty } = types;
  let { style } = attributes;


  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('textStyle')
      ),
      style ? [style].concat(children) :
        [
          objectExpression(
            props
            .filter(
              (prop) => !!attributes[prop]
            )
            .map(
              (prop) => objectProperty(identifier(prop),attributes[prop])
            )
          )
        ].concat(children)
    )
  );
};

/***/ },
/* 69 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { matrix } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('transform')
      ),
      [matrix].concat(children)
    )
  );
};

/***/ },
/* 70 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('translate')
      ),
      [attributes.x, attributes.y].concat(children)
    )
  );
};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {
  ['x1', 'x2', 'y1', 'y2', 'r'].forEach(
    (prop) => {
      let value = prop === 'r' ? 1 : 0;
      if (!props[prop]) {
        warning(prop, 'e2d', name, loc, value.toString());
        props[prop] = types.numericLiteral(value);
      }
    }
  );
};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {
  ['cp1x', 'cp1y', 'cp2x', 'cp2y', 'x', 'y'].forEach(
    (prop) => {
      if (!props[prop]) {
        warning(prop, 'e2d', name, loc, '0');
        props[prop] = types.numericLiteral(0);
      }
    }
  );
};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {
  let defaults = {
    radius: ['1', types.numericLiteral(1)],
    position: ['[0,0]', types.arrayExpression([types.numericLiteral(0), types.numericLiteral(0)])],
    sides: ['3', types.numericLiteral(3)]
  };

  Object.getOwnPropertyNames(defaults).forEach(
    (prop) => {
      if (!props[prop]) {
        warning(prop, 'e2d', name, loc, defaults[prop][0]);
        props[prop] = defaults[prop][1];
      }
    }
  );
};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {
  let checkAngles = !!(props.startAngle || props.endAngle || props.anticlockwise),
    checkPosition = !!(props.x || props.y || props.rotation || checkAngles);

  if (checkAngles) {
    if (!props.endAngle) {
      warning('endAngle', 'e2d', name, loc, 'Math.PI/2');
      props.endAngle = types.numericLiteral(Math.PI * 2);
    }

    if (!props.startAngle) {
      warning('startAngle', 'e2d', name, loc, '0');
      props.startAngle = types.numericLiteral(0);
    }
    if (!props.rotation) {
      warning('rotation', 'e2d', name, loc, '0');
      props.rotation = types.numericLiteral(0);
    }
  }

  if (checkPosition) {
    if (!props.x) {
      warning('x', 'e2d', name, loc, '0');
      props.x = types.numericLiteral(0);
    }

    if (!props.y) {
      warning('y', 'e2d', name, loc, '0');
      props.y = types.numericLiteral(0);
    }
  }

  if (!props.radiusX) {
    warning('radiusX', 'e2d', name, loc, '1');
    props.radiusX = types.numericLiteral(1);
  }

  if (!props.radiusY) {
    warning('radiusY', 'e2d', name, loc, '1');
    props.radiusY = types.numericLiteral(1);
  }
};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {

  if (!props.value) {
    warning('value', 'e2d', name, loc, '1');
    props.value = types.numericLiteral(1);
  }

};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {

  if (!props.operationType) {
    warning('operationType', 'e2d', name, loc, '"source-over"');
    props.operationType = types.stringLiteral("source-over");
  }

};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

let rect = __webpack_require__(2);

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {

  if (!props.id) {
    warning('id', 'e2d', name, loc, '""');
    props.id = types.stringLiteral("");
  }
  return rect(props, children, loc, types, name);
};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types, name) => {
  if (!props.path) {
    warning('path', 'e2d', name, loc, 'null');
    props.path = types.nullLiteral();
  }
};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);

module.exports = (props, children, loc, types) => {

  if (props.value || (props.x && props.y)) {
    return;
  }

  if (!props.x) {
    warning('x', 'e2d', 'scale', loc, 'Replaced parameter [x] with value [1]');
    props.x = types.numericLiteral(1);
  }

  if (!props.y) {
    warning('y', 'e2d', 'scale', loc, 'Replaced parameter [y] with value [1]');
    props.y = types.numericLiteral(1);
  }

};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

let warning = __webpack_require__(0);
module.exports = (props, children, loc, types) => {
  if (!props.x) {
    warning('x', 'e2d', 'translate', loc, '0');
    props.x = types.numericLiteral(0);
  }

  if (!props.y) {
    warning('y', 'e2d', 'translate', loc, '0');
    props.y = types.numericLiteral(0);
  }
};

/***/ },
/* 88 */
/***/ function(module, exports) {

module.exports = require("colors");

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

let transformAttributes = __webpack_require__(11);
let removeJSXText = __webpack_require__(10);
let { basename, extname } = __webpack_require__(13);

let getName = (name) => basename(name, extname(name));
//transformers
let funcContext = __webpack_require__(7);
let funcs = funcContext.keys().map(getName);

//reconciler
let reconcilersContext = __webpack_require__(8);
let reconcilers = reconcilersContext.keys().map(getName);


let svgElements = ['path', 'rect', 'ellipse'];
let customElement = __webpack_require__(6);
let parsemember = __webpack_require__(9);

module.exports = function({ types }) {

  return {
    visitor: {
      JSXElement(path, state) {

        let { node } = path;
        let { openingElement: { attributes, name }, children, loc } = node;

        if (state.opts && state.opts.ignoreSVG && svgElements.includes(name)) {
          return;
        }
        let attrs = transformAttributes(attributes, types);
        children = removeJSXText(children, types);
        if (types.isJSXIdentifier(name) && funcs.includes(name.name)) {

          //parameter verification
          if (reconcilers.includes(name.name)) {
            reconcilersContext('./' + name.name + '.js')(attrs, children, `${path.hub.file.log.filename}@${loc.start.line}:${loc.start.column}`, types, name.name);
          }

          return funcContext('./' + name.name + '.js')(path,
            types,
            attrs,
            children
          );
        }

        return customElement(path,
          types,
          parsemember(name, types),
          attrs,
          children
        );
      }
    },
    inherits: __webpack_require__(12)
  };
};

/***/ }
/******/ ]);