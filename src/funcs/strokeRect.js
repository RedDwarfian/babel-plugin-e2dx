module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y, width, height } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('strokeRect')
      ),
      x ? [x, y, width, height] : [width, height]
    )
  );
};