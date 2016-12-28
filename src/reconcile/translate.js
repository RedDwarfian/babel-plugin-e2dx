let warning = require('../util/warning');
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