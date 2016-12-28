module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { style } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('strokeStyle')
      ),
      [style].concat(children)
    )
  );
};