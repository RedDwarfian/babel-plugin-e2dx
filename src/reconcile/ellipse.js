let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {
  let checkAngles = !!(props.startAngle || props.endAngle || props.anticlockwise),
    checkPosition = !!(props.x || props.y || props.rotation || checkAngles);

  if (checkAngles) {
    if (!props.endAngle) {
      warning('endAngle', 'e2d', name, loc, 'Math.PI/2');
      props.endAngle = types.numericLiteral(Math.PI * 2);
    }

    if (!props.startAngle) {
      warning('startAngle', 'e2d', name, loc, '0');
      props.startAngle = types.numericLiteral(0);
    }
    if (!props.rotation) {
      warning('rotation', 'e2d', name, loc, '0');
      props.rotation = types.numericLiteral(0);
    }
  }

  if (checkPosition) {
    if (!props.x) {
      warning('x', 'e2d', name, loc, '0');
      props.x = types.numericLiteral(0);
    }

    if (!props.y) {
      warning('y', 'e2d', name, loc, '0');
      props.y = types.numericLiteral(0);
    }
  }

  if (!props.radiusX) {
    warning('radiusX', 'e2d', name, loc, '1');
    props.radiusX = types.numericLiteral(1);
  }

  if (!props.radiusY) {
    warning('radiusY', 'e2d', name, loc, '1');
    props.radiusY = types.numericLiteral(1);
  }
};