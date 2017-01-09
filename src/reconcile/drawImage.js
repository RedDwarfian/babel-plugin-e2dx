let warning = require('../util/warning');
let source = ['sx', 'sy', 'sWidth', 'sHeight'];
let size = ['width', 'height'];
let position = ['x', 'y'];

module.exports = (props, children, loc, types, name) => {
  let hassource = (!!props.sx) || (!!props.sy) || (!!props.sWidth) || (!!props.sHeight);

  let hassize = hassource || (!!props.width) || (!!props.height);

  let hasposition = hassize || (!!props.x) || (!!props.y);

  if (hassource) {
    for(let i = 0; i < source.length; i++) {
      warning(source[i], 'e2d', name, loc, '0');
      props[source[i]] = types.numericLiteral(0);
    }
  }

  if (hassize) {
    for(let i = 0; i < size.length; i++) {
      warning(size[i], 'e2d', name, loc, '0');
      props[size[i]] = types.numericLiteral(0);
    }
  }

  if (hasposition) {
    for(let i = 0; i < position.length; i++) {
      warning(position[i], 'e2d', name, loc, '0');
      props[position[i]] = types.numericLiteral(0);
    }
  }

  if (!props.img) {
    warning('img', 'e2d', name, loc, 'emptyImage');
    props.img = types.newExpression(
      types.identifier('Image'),
      []
    );
  }
};