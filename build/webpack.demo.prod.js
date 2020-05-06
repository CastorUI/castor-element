const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    docs: './examples/main.js',
    'castor-ui': './packages/index.js',
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].[hash:7].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      packages: path.resolve(__dirname, '../packages'),
      examples: path.resolve(__dirname, '../examples'),
      'castor-ui': path.resolve(__dirname, '../'),
    },
    modules: ['node_modules'],
  },
  devServer: {
    host: '0.0.0.0',
    port: 8085,
    publicPath: '/',
    hot: true,
  },
  performance: {
    hints: false,
  },
  stats: {
    children: false,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|jsx?)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js'),
          },
        ],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        // todo: 这种写法有待调整
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([{ from: 'examples/versions.json' }]),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.FAAS_ENV': JSON.stringify(process.env.FAAS_ENV),
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: '#eval-source-map',
};

webpackConfig.devtool = false;

module.exports = webpackConfig;
