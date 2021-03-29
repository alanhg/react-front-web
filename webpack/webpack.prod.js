const webpack = require('webpack');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const utils = require('./utils.js');

const commonConfig = require('./webpack.common.js');
const ObsoleteWebpackPlugin = require('obsolete-webpack-plugin');

const ENV = 'production';
const ASSETS_URL = 'https://';

function getPlugins(options = {}) {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].css'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: './src/mock-data', to: 'dist'}
      ]
    }),
    new ObsoleteWebpackPlugin()
  ];
  if (options.analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return plugins;
}

module.exports = options => merge(commonConfig({env: ENV, assetsUrl: ASSETS_URL}), {
  // devtool: 'source-map', // Enable source maps. Please note that this will slow down the build
  mode: ENV,
  entry: {
    main: './src/app/index'
  },
  output: {
    path: utils.root('dist/assets'),
    filename: 'app/[name].[contenthash].bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.s?css$/,
        loader: 'stripcomment-loader'
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              localsConvention: 'camelCase',
              modules: {
                mode: 'local',
                localIdentName: '[name]_[local]_[hash:base64:5]'
              },
              sourceMap: false
            }
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              javascriptEnabled: true,
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: false,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          ecma: 6,
          toplevel: true,
          module: true,
          beautify: false,
          comments: false,
          compress: {
            warnings: false,
            ecma: 6,
            module: true,
            toplevel: true,
            drop_console: false
          },
          output: {
            comments: false,
            beautify: false,
            indent_level: 2,
            ecma: 6
          },
          keep_classnames: false,
          keep_fnames: false,
          dead_code: true,
          drop_debugger: true
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: getPlugins(options)
})
