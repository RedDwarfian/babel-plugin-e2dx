module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { text, x, y, maxWidth } = attributes;

  let args = [text];

  if (x) {
    args.push(x, y);
  }

  if (x && maxWidth) {
    args.push(maxWidth);
  }

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('fillText')
      ),
      args.concat(children)
    )
  );
};