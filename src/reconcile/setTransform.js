let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {

  if (!props.matrix) {
    warning('matrix', 'e2d', name, loc, 'identityMatrix');
    props.matrix = types.arrayExpression([
      types.numericLiteral(1),
      types.numericLiteral(0),
      types.numericLiteral(0),
      types.numericLiteral(1),
      types.numericLiteral(0),
      types.numericLiteral(0)
    ]);
  }

};