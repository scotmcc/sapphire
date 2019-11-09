require('dotenv').config();
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: process.env.MODE,
  target: 'node',
  entry: {
    client: './src/server/server.js'
  },
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'public')
  }
}
