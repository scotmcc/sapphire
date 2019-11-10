require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternalsPlugin = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dist = path.resolve(__dirname, 'public');
const dev_mode = process.env.MODE === 'development';

module.exports = [
  {
    mode: process.env.MODE,
    target: 'web',
    entry: {
      _: './src/components/underscore.js',
      index: './src/javascripts/index.js',
      about: './src/javascripts/about.js'
    },
    output: {
      filename: '[name].js',
      path: dist,
      publicPath: '/'
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.scss']
    },
    module: {
      rules: [
        { test: /\.less$/, loader: 'less-loader' },
        { test: /\.pug$/, use: ['html-loader?attrs=false', 'pug-html-loader'] },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: { presets: ['@babel/preset-env'], cacheDirectory: true }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [{ loader: 'html-loader', options: { minimize: !dev_mode } }]
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]',
            outputPath: 'assets' //the icons will be stored in dist/assets folder
          }
        }
      ]
    },
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
      new MiniCssExtractPlugin({
        filename: dev_mode ? '[name].css' : '[name].[hash].css',
        chunkFilename: dev_mode ? '[id].css' : '[id].[hash].css'
      }),
      new HtmlWebpackPlugin({
        title: 'PUG Test Page',
        filename: 'index.html',
        template: './src/pug/index.pug',
        inject: true,
        chunks: ['_', 'index'],
        excludeChunks: ['server']
      }),
      new HtmlWebpackPlugin({
        title: 'Page Not Found',
        filename: 'about.html',
        template: './src/html/about.html',
        inject: true,
        chunks: ['_', 'about'],
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
