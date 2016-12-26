module.exports = (path, types, callee, attributes, children) => {
  let { callExpression } = types;
  console.log(attributes);

  return path.replaceWith(
    callExpression(
      callee,
      [
        types.objectExpression(
          Object.getOwnPropertyNames(attributes).map(
            (attr) => types.objectProperty(
              types.identifier(attr),
              attributes[attr]
            )
          )
        )
      ].concat(children)
    )
  );
};