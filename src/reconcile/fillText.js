let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {
  let hasPoint = !!(props.x || props.y);

  if (hasPoint)  {
    if (!props.x) {
      warning('x', 'e2d', name, loc, '0');
      props.x = types.numericLiteral(0);
    }

    if (!props.y) {
      warning('y', 'e2d', name, loc, '0');
      props.y = types.numericLiteral(0);
    }
  }

  if (!props.text) {
    warning('text', 'e2d', name, loc, '""');
    props.text = types.stringLiteral("");
  }

};