

module.exports = (member, types) => {
  if (types.isJSXIdentifier(member)) {
    return types.identifier(member.name);
  }

  let mapJSXMemberExpression = (name) => {
    return types.memberExpression(
      types.isJSXMemberExpression(name.object) ?
        mapJSXMemberExpression(name.object) : types.identifier(name.object.name),
      types.identifier(name.property.name)
    );
  };

  let result = mapJSXMemberExpression(member);
  return result;
};