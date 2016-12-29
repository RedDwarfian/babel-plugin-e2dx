let lineStyleProps = ['lineWidth', 'lineCap', 'lineJoin', 'miterLimit', 'lineDash', 'lineDashOffset'];

let warning = require('../util/warning');

module.exports = (props, children, loc, types, name) => {

  if (!props.style) {
    let hasAProp = lineStyleProps.reduce((left, right) => left || !!props[right], false);

    if (!hasAProp) {
      warning('style', 'e2d', name, loc, '{}');
      props.style = types.objectExpression([]);
    }
  }

};