module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { value } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('imageSmoothingEnabled')
      ),
      [value].concat(children)
    )
  );
};