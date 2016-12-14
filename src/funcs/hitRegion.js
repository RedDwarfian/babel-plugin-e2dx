module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { id, region } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('hitRegion')
      ),
      [id, region]
    )
  );
};