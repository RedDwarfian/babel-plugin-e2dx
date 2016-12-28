let warning = require('../util/warning');

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
    warning('width', 'e2d', name, loc, '0');
    props.width = types.numericLiteral(0);
  }
  if (!props.height) {
    warning('height', 'e2d', name, loc, '0');
    props.height = types.numericLiteral(0);
  }
};