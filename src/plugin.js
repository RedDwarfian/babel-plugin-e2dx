

let transformAttributes = require('./util/transformAttributes');
let removeJSXText = require('./util/removeJSXText');
let funcs = ['arc', 'createRegularPolygon', 'hitRect', 'rect',
             'stroke', 'arcTo', 'ellipse', 'hitRegion',
             'render', 'strokeArc', 'beginClip', 'fill',
             'imageSmoothingEnabled', 'resetTransform', 'strokeRect',
             'beginPath', 'fillArc', 'lineStyle', 'rotate',
             'strokeText', 'bezierCurveTo', 'fillRect', 'lineTo',
             'scale', 'textStyle', 'clearRect', 'fillStyle',
             'moveTo', 'setTransform', 'transform', 'clip',
             'fillText', 'path', 'shadowStyle', 'translate',
             'clipPath', 'globalAlpha', 'placeholder', 'skewX',
             'closePath', 'globalCompositeOperation',  'quadraticCurveTo', 'skewY'];

module.exports = function({ types }) {
  return {
    visitor: {
      JSXElement(path, state) {
        let { node } = path;
        let { openingElement: { attributes, name: { name } }, children } = node;
        if (funcs.includes(name)) {
          return require('./funcs/' + name)(path,
            types,
            transformAttributes(attributes, types),
            removeJSXText(children, types)
          );
        }
      }
    },
    inherits: require('babel-plugin-syntax-jsx')
  };
};