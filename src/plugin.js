let { sync } = require('glob');
let { basename, extname } = require('path');
let transformAttributes = require('./util/transformAttributes');
let removeJSXText = require('./util/removeJSXText');
let funcs = sync('./src/funcs/*.js').map(
  (name) => basename(name, extname(name))
);
module.exports = function({ types }) {
  return {
    visitor: {
      JSXElement(path, state) {
        let { node } = path;
        let { openingElement: { attributes, name: { name } }, children } = node;
        if (funcs.includes(name)) {
          return require('./funcs/' + name)(path, types, transformAttributes(attributes, types), removeJSXText(children, types));
        }
      }
    },
    inherits: require('babel-plugin-syntax-jsx')
  };
};