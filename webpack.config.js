require('dotenv').config();
const path = require('path');

const public = path.resolve(__dirname, 'public');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.MODE,
  target: 'web',
  entry: {
    index: './src/index.js',
    about: './src/about.js'
  },
  output: {
    filename: '[name].js',
    path: public
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env'], cacheDirectory: true}
      }]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: { minimize: process.env.MODE === 'production'}
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/html/index.html',
      inject: true,
      chunks: ['index'],
      excludeChunks: ['server']
    }),
    new HtmlWebpackPlugin({
      title: 'Page Not Found',
      filename: 'about.html',
      template: './src/html/about.html',
      inject: true,
      chunks: ['about'],
      excludeChunks: ['server']
    }),
    new HtmlWebpackPlugin({
      title: 'Page Not Found',
      filename: '404.html',
      template: './src/html/404.html',
      inject: true,
      excludeChunks: ['server']
    })
  ]
};
