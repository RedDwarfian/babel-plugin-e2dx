let shadowStyleProps = ['shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY'];

module.exports = (props, children, loc, types, name) => {

  if (!props.style) {
    let hasAProp = shadowStyleProps.reduce((left, right) => left || !!props[right], false);

    if (!hasAProp) {
      warning('style', 'e2d', name, loc, '{}');
      props.style = types.objectExpression([]);
    }
  }

};