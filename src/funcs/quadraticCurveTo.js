module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { cpx, cpy, x, y } = attributes;

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('quadraticCurveTo')
      ),
      [cpx, cpy, x, y]
    )
  );
};