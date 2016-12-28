let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {

  if (!props.style) {
    warning('style', 'e2d', name, loc, '"black"');
    props.style = types.stringLiteral("black");
  }

};