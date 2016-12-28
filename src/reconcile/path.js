let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {
  if (!props.path) {
    warning('path', 'e2d', name, loc, 'null');
    props.path = types.nullLiteral();
  }
};