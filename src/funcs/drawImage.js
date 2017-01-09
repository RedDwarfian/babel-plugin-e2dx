module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  let { img, x, y, width, height, sx, sy, sWidth, sHeight } = attributes;

  let args = [];
  if (x || y) {
    args.push(x, y);
  }
  if ((x || y) && (width || height)) {
    args.push(width, height);
  }

  if (sx || sy || sWidth || sHeight) {
    args.unshift(sx, sy, sWidth, sHeight);
  }

  args.unshift(img);
  return path.replaceWith(
    callExpression(
      memberExpression(
        identifier('e2d'),
        identifier('drawImage')
      ),
      args
    )
  );
};