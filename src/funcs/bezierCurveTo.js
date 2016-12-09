module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { cp1x, cp1y, cp2x, cp2y, x, y } = attributes;


  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('bezierCurveTo')
      ),
      [cp1x, cp1y, cp2x, cp2y, x, y]
    )
  );
};