const { spawn } = require('child_process');
const webpack = require('webpack');

const compiler = webpack(require('../webpack.config.js'));

let server = null;

function start() {
  server = spawn('node', ['./public/main.js']);
  server.stdout.pipe(process.stdout);
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
