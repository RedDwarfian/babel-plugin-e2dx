module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise } = attributes;
  let args = [radiusX, radiusY];


  if (x) {
    args.unshift(x, y);
  }

  if (x && rotation) {
    args.push(rotation);
  }

  if (x && rotation && startAngle) {
    args.push(startAngle, endAngle);
  }

  if (x && rotation && startAngle && anticlockwise) {
    args.push(anticlockwise);
  }

  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('ellipse')
      ),
      args
    )
  );
};