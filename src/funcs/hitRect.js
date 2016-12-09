module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { id, x, y, width, height } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('hitRect')
      ),
      x ? [id, x, y, width, height] : [id, width, height]
    )
  );
};