module.exports = (path, types, attributes, children) => {
  let { identifier, memberExpression, callExpression } = types;
  console.log(attributes);

  let createStatement = callExpression(
    memberExpression(
      memberExpression(
        identifier('e2d'),
        identifier('Canvas')
      ),
      identifier('create')
    ),
    [attributes.width, attributes.height]
  );

  let renderStatement = callExpression(
    memberExpression(createStatement, identifier('render')),
    children
  );
  return path.replaceWith(
    children.length > 0 ? renderStatement : createStatement
  );
};