module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x1, y1, x2, y2, r } = attributes;


  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('arcTo')
      ),
      [x1, y1, x2, y2, r]
    )
  );
};