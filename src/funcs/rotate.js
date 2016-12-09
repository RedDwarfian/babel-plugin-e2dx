module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { angle } = attributes;
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('rotate')
      ),
      [angle].concat(children)
    )
  );
};