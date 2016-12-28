let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {
  let defaults = {
    radius: ['1', types.numericLiteral(1)],
    position: ['[0,0]', types.arrayExpression([types.numericLiteral(0), types.numericLiteral(0)])],
    sides: ['3', types.numericLiteral(3)]
  };

  Object.getOwnPropertyNames(defaults).forEach(
    (prop) => {
      if (!props[prop]) {
        warning(prop, 'e2d', name, loc, defaults[prop][0]);
        props[prop] = defaults[prop][1];
      }
    }
  );
};