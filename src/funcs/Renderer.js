module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;

  let statement = callExpression(
    memberExpression(
      callExpression(
        memberExpression(
          memberExpression(
            identifier('e2d'),
            identifier('Renderer')
          ),
          identifier('create')
        ),
        [attributes.width, attributes.height].concat(attributes.parent ? [attributes.parent] : [])
      ),
      identifier('ready')
    ),
    []
  );

  if (attributes.style) {
    //add the styles
    statement = callExpression(
      memberExpression(statement, identifier('style')),
      [attributes.style]
    );
  }

  if (children.length > 0 ) {
    statement = callExpression(
      memberExpression(statement, identifier('render')),
      children
    );
  }

  return path.replaceWith(statement);
};