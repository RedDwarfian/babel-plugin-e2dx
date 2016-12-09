module.exports = (attributes, types) => attributes.reduce(
  (index, attribute) => {
    index[attribute.name.name] = types.isJSXExpressionContainer(attribute.value) ? attribute.value.expression : attribute.value;
    return index;
  },
{});