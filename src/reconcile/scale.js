let warning = require('../util/warning');

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