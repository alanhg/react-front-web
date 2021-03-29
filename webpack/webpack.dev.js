const webpack = require('webpack');
const {merge} = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PROXY_URLS = require('./proxy-urls.json');
const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';
const ASSETS_URL = 'static';

module.exports = options =>
  merge(commonConfig({env: ENV, assetsUrl: ASSETS_URL}), {
    devtool: 'source-map',
    mode: ENV,
    entry: ['react-hot-loader/patch', './src/app/index'],
    output: {
      path: utils.root('dist'),
      filename: 'app/[name].bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
    },
    module: {
      rules: [
        {
          test: /\.(less|css)$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                localsConvention: 'camelCase',
                modules: {
                  mode: 'local',
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                },
                sourceMap: true
              }
            },
            {
              loader: require.resolve('less-loader'),
              options: {
                javascriptEnabled: true,
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    devServer: {
      stats: {
        children: true,
        errorDetails: true
      },
      hot: true,
      contentBase: './dist',
      port: 3000,
      proxy: [
        {
          context: ['/api'],
          target: `http${options.tls ? 's' : ''}://${PROXY_URLS[options.proxy]}`,
          secure: false,
          changeOrigin: true,
          cookieDomainRewrite: 'localhost'
        }
      ],
      watchOptions: {
        ignored: /node_modules/
      }
    },
    plugins: [
      new SimpleProgressWebpackPlugin({
        format: options.stats === 'minimal' ? 'compact' : 'expanded'
      }),
      new FriendlyErrorsWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/mock-data',
            to: 'dist/mock-data'
          },
          {from: './node_modules/antd/dist/antd.min.css', to: 'dist/assets/antd/3.26.18/'},
          {from: './node_modules/nprogress/nprogress.css', to: 'dist/assets/nprogress/0.2.0/'},
          {from: './node_modules/react/umd/react.development.js', to: 'dist/assets/react/16.9.0/'},
          {from: './node_modules/react-dom/umd/react-dom.development.js', to: 'dist/assets/react-dom/16.9.0/'}
        ]
      })
    ].filter(Boolean)
  });
