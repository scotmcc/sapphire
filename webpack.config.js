require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternalsPlugin = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function page(name) {
  const info = path.parse(name);
  return new HtmlWebpackPlugin({
    template: name,
    filename: `${info.name}.html`,
    chunks: ['client', `${info.name}`],
    excludeChunks: ['server']
  });
}

const output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'public'),
  publicPath: '/'
};

const controllers = {
  client: './src/client.js',
  about: './src/client/controllers/about.js',
  forums: './src/client/controllers/forums.js',
  games: './src/client/controllers/games.js',
  groups: './src/client/controllers/groups.js',
  index: './src/client/controllers/index.js',
  news: './src/client/controllers/news.js'
};

const views = [
  // page('./src/client/views/404.pug'),
  page('./src/client/views/about.pug'),
  page('./src/client/views/forums.pug'),
  page('./src/client/views/games.pug'),
  page('./src/client/views/groups.pug'),
  page('./src/client/views/index.pug'),
  page('./src/client/views/news.pug')
];

const plugins = [
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
    filename: '[name].css',
    chunkFilename: '[id].css'
  })
];

const rules = [
  { test: /\.pug$/, loader: 'pug-loader' },
  { test: /\.less$/, loader: ['style-loader', 'css-loader', 'less-loader'] },
  { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          cacheDirectory: true
        }
      }
    ]
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
];

const client = {
  mode: process.env.MODE,
  target: 'web',
  devtool: 'source-map',
  entry: controllers,
  output: output,
  module: { rules: rules },
  plugins: [].concat(plugins, views)
};

const server = {
  mode: process.env.MODE,
  node: { __filename: false, __dirname: false },
  target: 'node',
  entry: './src/server.js',
  output: output,
  externals: [new nodeExternalsPlugin()]
};
module.exports = [client, server];
