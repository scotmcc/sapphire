require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternalsPlugin = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const autoprefixer = require('autoprefixer');
const precss = require('precss');

function page(name) {
  const info = path.parse(name);
  return new HtmlWebpackPlugin({
    template: name,
    filename: `${info.name}.html`,
    chunks: ['client', 'wii', 'bcss', 'bootstrap', 'fa', `${info.name}`],
    excludeChunks: ['server']
  });
}

const entry = {
  wii: 'webpack-icons-installer',
  bcss: 'bootstrap/dist/css/bootstrap.min.css',
  bootstrap: 'bootstrap',
  client: './src/client.js',
  fa: 'font-awesome/scss/font-awesome.scss',
  about: './src/client/controllers/about.js',
  forums: './src/client/controllers/forums.js',
  games: './src/client/controllers/games.js',
  groups: './src/client/controllers/groups.js',
  index: './src/client/controllers/index.js',
  login: './src/client/controllers/login.js',
  news: './src/client/controllers/news.js'
};

const output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'public'),
  publicPath: '/'
};

const views = [
  page('./src/client/views/404.pug'),
  page('./src/client/views/about.pug'),
  page('./src/client/views/forums.pug'),
  page('./src/client/views/games.pug'),
  page('./src/client/views/groups.pug'),
  page('./src/client/views/index.pug'),
  page('./src/client/views/news.pug'),
  page('./src/client/views/login.pug')
];

const plugins = [
  new ExtractTextPlugin('main.css'),
  // new TransferWebpackPlugin([{ from: 'src' }]),
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
    'window.jQuery': 'jquery',
    tether: 'tether',
    Tether: 'tether',
    'window.Tether': 'tether',
    Popper: ['popper.js', 'default'],
    Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
    Button: 'exports-loader?Button!bootstrap/js/dist/button',
    Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
    Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
    Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
    Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
    Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
    Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
    Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
    Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
    Util: 'exports-loader?Util!bootstrap/js/dist/util'
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  })
];

const rules = [
  { test: /\.pug$/, use: ['pug-loader'] },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: ['file-loader?name=images/[name].[ext]', 'image-webpack-loader?bypassOnDebug']
  },
  { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
  { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      // { loader: 'script-loader', options: { sourceMap: true, useStrict: true } },
      { loader: 'babel-loader', query: { cacheDirectory: true } }
    ]
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: '[name].[ext]',
      outputPath: 'assets'
    }
  },
  {
    test: /\.(scss)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [precss, autoprefixer];
            }
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    })
  },
  { test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery' },
  {
    test: /font-awesome\.config\.js/,
    use: [{ loader: 'style-loader' }, { loader: 'font-awesome-loader' }]
  }
];

const client = {
  mode: process.env.MODE,
  target: 'web',
  entry: entry,
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
