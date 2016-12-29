let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {

  if (!props.angle) {
    warning('angle', 'e2d', name, loc, '0');
    props.angle = types.numericLiteral(0);
  }

};