let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {
  ['x1', 'x2', 'y1', 'y2', 'r'].forEach(
    (prop) => {
      let value = prop === 'r' ? 1 : 0;
      if (!props[prop]) {
        warning(prop, 'e2d', name, loc, value.toString());
        props[prop] = types.numericLiteral(value);
      }
    }
  );
};