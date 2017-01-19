let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {

  if (!props.alpha) {
    warning('alpha', 'e2d', name, loc, '1');
    props.alpha = types.numericLiteral(1);
  }

};