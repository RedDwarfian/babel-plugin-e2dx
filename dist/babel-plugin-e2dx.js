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
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ function(module, exports, __webpack_require__) {

var map = {
	"./arc.js": 7,
	"./arcTo.js": 8,
	"./beginClip.js": 9,
	"./beginPath.js": 10,
	"./bezierCurveTo.js": 11,
	"./children.js": 12,
	"./clearRect.js": 13,
	"./clip.js": 14,
	"./clipPath.js": 15,
	"./closePath.js": 16,
	"./createRegularPolygon.js": 17,
	"./ellipse.js": 18,
	"./fill.js": 19,
	"./fillArc.js": 20,
	"./fillRect.js": 21,
	"./fillStyle.js": 22,
	"./fillText.js": 23,
	"./globalAlpha.js": 24,
	"./globalCompositeOperation.js": 25,
	"./hitRect.js": 26,
	"./hitRegion.js": 27,
	"./imageSmoothingEnabled.js": 28,
	"./lineStyle.js": 29,
	"./lineTo.js": 30,
	"./moveTo.js": 31,
	"./params.js": 32,
	"./path.js": 33,
	"./quadraticCurveTo.js": 34,
	"./rect.js": 35,
	"./render.js": 36,
	"./resetTransform.js": 37,
	"./rotate.js": 38,
	"./scale.js": 39,
	"./setTransform.js": 40,
	"./shadowStyle.js": 41,
	"./skewX.js": 42,
	"./skewY.js": 43,
	"./stroke.js": 44,
	"./strokeArc.js": 45,
	"./strokeRect.js": 46,
	"./strokeText.js": 47,
	"./template.js": 48,
	"./textStyle.js": 49,
	"./transform.js": 50,
	"./translate.js": 51
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
webpackContext.id = 1;


/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

module.exports = (children, types) => children.filter(
  (child) => !types.isJSXText(child)
).map(
  (child) => child.expression || child
);

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = (attributes, types) => attributes.reduce(
  (index, attribute) => {
    index[attribute.name.name] = types.isJSXExpressionContainer(attribute.value) ? attribute.value.expression : attribute.value;
    return index;
  },
{});

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("babel-plugin-syntax-jsx");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
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
/* 31 */
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
/* 32 */
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
/* 33 */
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
/* 34 */
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
/* 35 */
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
/* 36 */
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
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
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
/* 46 */
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
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ function(module, exports) {

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  console.log(children);
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

let transformAttributes = __webpack_require__(4);
let removeJSXText = __webpack_require__(3);
let { basename, extname } = __webpack_require__(6);
let funcContext = __webpack_require__(1);
let funcs = funcContext.keys().map(
  (name) => basename(name, extname(name))
);
console.log(funcs);
let svgElements = ['path', 'rect', 'ellipse'];
let customElement = __webpack_require__(0);
let parsemember = __webpack_require__(2);

module.exports = function({ types }) {

  return {
    visitor: {
      JSXElement(path, state) {
        let { node } = path;
        let { openingElement: { attributes, name }, children } = node;

        if (state.opts && state.opts.ignoreSVG && svgElements.includes(name)) {
          return;
        }
        let attrs = transformAttributes(attributes, types);
        children = removeJSXText(children, types);
        if (types.isJSXIdentifier(name) && funcs.includes(name.name)) {
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
    inherits: __webpack_require__(5)
  };
};

/***/ }
/******/ ]);