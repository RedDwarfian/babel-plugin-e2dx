let colors = require('colors/safe');
let colorize = require('./colorize.pegjs');

module.exports = (parameter, library, functionName, loc, replaceValue) => console.log(`
  ${colors.yellow.bold('WARNING')}: Parameter missing: [${colorize.parse(parameter)}] for [${colorize.parse(`${library}.${functionName}`)}]. Using value [${colorize.parse(replaceValue)}] instead.
    ${colorize.parse(loc)}`);