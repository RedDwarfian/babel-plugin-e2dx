let transformAttributes = require('./util/transformAttributes');
let removeJSXText = require('./util/removeJSXText');
let { basename, extname } = require('path');
let funcContext = require.context('./funcs/', false, /\.js$/i);
let funcs = funcContext.keys().map(
  (name) => basename(name, extname(name))
);
console.log(funcs);
let svgElements = ['path', 'rect', 'ellipse'];
let customElement = require('./customElement');
let parsemember = require('./util/parseMember');

module.exports = function({ types }) {

  return {
    visitor: {
      JSXElement(path, state) {
        let { node } = path;
        let { openingElement: { attributes, name }, children } = node;

        if (state.opts && state.opts.ignoreSVG && svgElements.includes(name)) {
          return;
        }
        let attrs = transformAttributes(attributes, types);
        children = removeJSXText(children, types);
        if (types.isJSXIdentifier(name) && funcs.includes(name.name)) {
          return funcContext('./' + name.name + '.js')(path,
            types,
            attrs,
            children
          );
        }

        return customElement(path,
          types,
          parsemember(name, types),
          attrs,
          children
        );
      }
    },
    inherits: require('babel-plugin-syntax-jsx')
  };
};