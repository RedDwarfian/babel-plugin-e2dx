module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('scale')
      ),
      (attributes.value ? [attributes.value] : [attributes.x, attributes.y]).concat(children)
    )
  );
};