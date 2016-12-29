let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {

  if (!props.value) {
    warning('value', 'e2d', name, loc, 'true');
    props.value = types.booleanLiteral(true);
  }

};