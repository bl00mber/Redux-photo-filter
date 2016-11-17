const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  output: {
    filename: 'client.js'
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css!postcss-loader',
    }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __DEVELOPMENT__: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, '../server'), to: path.join(__dirname, '../dist') }
    ])
  ],
};
