module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y, r, startAngle, endAngle, anticlockwise } = attributes;
  let args = [r];


  if (x) {
    args.unshift(x, y);
  }

  if (x && startAngle) {
    args.push(startAngle, endAngle);
  }
  if (x && startAngle && anticlockwise) {
    args.push(anticlockwise);
  }

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('fillArc')
      ),
      args
    )
  );
};