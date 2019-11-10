const { spawn } = require('child_process');
const { resolve } = require('path');
const { rmdir } = require('fs');
const webpack = require('webpack');

const compiler = webpack(require('../webpack.config.js'));

let server = null;

function start() {
  server = spawn('node', ['./public/server.js']);
}

function restart() {
  server.kill('SIGHUP');
  start();
}

compiler.watch({}, (err, stats) => {
  console.log(err, stats);
  if (server) return restart();
  start();
});
