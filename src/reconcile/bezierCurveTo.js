let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {
  ['cp1x', 'cp1y', 'cp2x', 'cp2y', 'x', 'y'].forEach(
    (prop) => {
      if (!props[prop]) {
        warning(prop, 'e2d', name, loc, '0');
        props[prop] = types.numericLiteral(0);
      }
    }
  );
};