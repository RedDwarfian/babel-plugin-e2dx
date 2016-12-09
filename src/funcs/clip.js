module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('clip')
      ),
      [attributes.path].concat(children)
    )
  );
};