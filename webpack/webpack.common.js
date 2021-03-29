const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const utils = require('./utils.js');

const getTsLoaderRule = env => {
  const rules = [
    {
      loader: 'cache-loader',
      options: {
        cacheDirectory: path.resolve('cache-loader')
      }
    },
    {
      loader: 'thread-loader',
      options: {
        workers: require('os').cpus().length - 1
      }
    },
    {
      loader: 'babel-loader',
      options: {cacheDirectory: true}
    }
  ];
  if (env === 'development') {
    rules.unshift({
      loader: 'react-hot-loader/webpack'
    });
  }
  return rules;
};

const isProduction = (options) => options.env === 'production';

module.exports = options => {
  return ({
    cache: !isProduction(options),
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
      modules: ['node_modules'],
      fallback: {'buffer': require.resolve('buffer')},
      alias: {
        app: utils.root('src/app/')
      }
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: getTsLoaderRule(options.env),
          include: [utils.root('./src/app')]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/images',
            publicPath: '/dist/assets/images'
          }
        },
        {
          test: /\.(woff2?|ttf|eot)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'dist/assets/fonts',
            publicPath: isProduction(options) ? `${options.assetsUrl}/fonts` : '/dist/assets/fonts',
            name: '[name].[ext]'
          }
        }
      ]
    },
    stats: {
      children: false
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.env),
          DEBUG_INFO_ENABLED: JSON.stringify(options.env) === 'development'
        }
      }),
      new CopyWebpackPlugin({
        patterns: [
          {from: './src/assets', to: 'dist'}
        ]
      }),
      new webpack.ProvidePlugin({
        regeneratorRuntime: 'regenerator-runtime/runtime'
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunksSortMode: 'auto',
        inject: 'body',
        templateParameters: {
          assetsURL: options.assetsUrl,
          env: isProduction(options) ? options.env + '.min' : options.env
        }
      })
    ]
  });
};
