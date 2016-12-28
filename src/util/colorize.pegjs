{
  let colors = require('colors');
}


Rule =
  Point / Identifier / DoubleQuotedString / Number

Identifier = first:[a-zA-Z_\./\\] last:([a-zA-Z_0-9./\\] / Operator) * {
  return colors.yellow(first + last.join(''));
}

Operator = op:("@" / ":") num:Number? { return colors.white(op) + (num || ''); }
Number = [0-9]* { return colors.green(text()); }
Point = "[" _ point1:(String / Number) _ "," _ point2:(String / Number) _"]" {
  return colors.yellow("(") + point1 + colors.yellow(', ') + point2 + colors.yellow(")");
}
String = DoubleQuotedString / SingleQuotedString

DoubleQuotedString = '"' ('\\"' / [^"\n\r])* '"' { return colors.green(text()); } / SingleQuotedString

SingleQuotedString = "'" ("\\'" / [^'\n\r])* "'" { return colors.green(text()); }

_ = [\r\n\t ]*