let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {

  if (!props.operationType) {
    warning('operationType', 'e2d', name, loc, '"source-over"');
    props.operationType = types.stringLiteral("source-over");
  }

};