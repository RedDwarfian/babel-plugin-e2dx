
let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {

  if (!props.id) {
    warning('id', 'e2d', name, loc, '""');
    props.id = types.stringLiteral("");
  }

  if (!props.region) {
    warning('region', 'e2d', name, loc, "undefined");
    props.region = types.unaryExpression("void", types.numericLiteral(0));
  }
};