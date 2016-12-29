let warning = require('../util/warning');
module.exports = (props, children, loc, types, name) => {

  if (!props.func) {
    warning('func', 'e2t', name, loc, 'defaultFunc');
    props.func = types.arrowFunctionExpression(
      [types.identifier('props'), types.identifier('children')],
      types.identifier('children')
    );
  }
  
};