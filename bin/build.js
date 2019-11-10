const { resolve } = require('path');
const { rmdir } = require('fs');
const webpack = require('webpack');

const compiler = webpack(require('../webpack.config.js'));

rmdir(resolve(process.env.PWD, 'public'), { recursive: true }, () => {
  compiler.run((err, stats) => {
    console.log(err, stats);
  });
});
