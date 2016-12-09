let props = ['shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY'];

module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression,
        objectExpression, objectProperty } = types;
  let { style } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('shadowStyle')
      ),
      style ? [style].concat(children) :
        [
          objectExpression(
            props
            .filter(
              (prop) => !!attributes[prop]
            )
            .map(
              (prop) => objectProperty(identifier(prop),attributes[prop])
            )
          )
        ].concat(children)
    )
  );
};