let babel = require('babel-core');

babel.transformFile(
  './test.jsx',
  {
    "plugins": [
      ['./dist/babel-plugin-e2dx.js', { "ignoreSVG": false, "react": false }]
    ]
  },
  (err, result) => {
    if (err)
      return console.log(err);

    let { code } = result;
    return console.log(code);
  }
);