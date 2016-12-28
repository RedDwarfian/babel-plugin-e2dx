var path = require('path'),
    pkg = require('./package.json'),
    webpack = require('webpack');

let buildConfig = (useBabel, minify, name) => ({
  context: __dirname,
  entry: {
    [name]: './src/plugin.js'
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    library: 'babel-plugin-e2dx',
    libraryTarget: 'commonjs2'
  },
  externals: [
    'babel-plugin-syntax-jsx',
    'colors'
  ],
  module: {
    rules: [
      { test: /\.pegjs$/, use: ["peg-loader"] }
    ]
  },
  target: 'node',
  performance: false
});
module.exports = [
  buildConfig(false, false, pkg.name),
];