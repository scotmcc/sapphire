require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternalsPlugin = require('webpack-node-externals');

const dist = path.resolve(__dirname, 'public');

const PUG = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader']
};

const JS = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: { presets: ['@babel/preset-env'], cacheDirectory: true }
    }
  ]
};

const CSS = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
};

const HTML = {
  test: /\.html$/,
  use: [
    {
      loader: 'html-loader',
      options: { minimize: process.env.MODE === 'production' }
    }
  ]
};

module.exports = [
  {
    mode: process.env.MODE,
    target: 'web',
    entry: {
      index: './src/javascripts/index.js',
      about: './src/javascripts/about.js'
    },
    output: {
      filename: '[name].js',
      path: dist,
      publicPath: '/'
    },
    devtool: 'source-map',
    module: { rules: [PUG, JS, CSS, HTML] },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new WebpackPwaManifest({
        name: 'Sapphire',
        short_name: 'Sapphire',
        description: 'Sapphire: A web framework',
        filename: 'manifest.json'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        Popper: ['popper.js', 'default'],
        Util: 'exports-loader?Util!bootstrap/js/dist/util'
      }),
      new HtmlWebpackPlugin({
        title: 'PUG Test Page',
        filename: 'index.html',
        template: './src/pug/index.pug',
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
  },
  {
    mode: process.env.MODE,
    node: { __filename: false, __dirname: false },
    target: 'node',
    entry: './src/server/server.js',
    output: {
      filename: 'server.js',
      path: dist,
      publicPath: '/'
    },
    externals: [new nodeExternalsPlugin()]
  }
];
