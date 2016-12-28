let rect = require('./rect');

let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {

  if (!props.id) {
    warning('id', 'e2d', name, loc, '""');
    props.id = types.stringLiteral("");
  }
  return rect(props, children, loc, types, name);
};