module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { radius, position, sides } = attributes;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('createRegularPolygon')
      ),
      [radius, position, sides]
    )
  );
};