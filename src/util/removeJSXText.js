module.exports = (children, types) => children.filter(
  (child) => !types.isJSXText(child)
).map(
  (child) => child.expression || child
);