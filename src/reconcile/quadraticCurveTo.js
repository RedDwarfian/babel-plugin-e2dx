let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {
  ['cpx', 'cpy', 'x', 'y'].forEach(
    (prop) => {
      if (!props[prop]) {
        warning(prop, 'e2d', name, loc, '0');
        props[prop] = types.numericLiteral(0);
      }
    }
  );
};