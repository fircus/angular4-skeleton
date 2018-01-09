const {root} = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
  entry: {
    client: root('./src/main.browser.ts')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['@ngtools/webpack']
      }
    ]
  },
  output: {
    filename: '[name].js'
  },
  node: {
    fs: 'empty'
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: root('./src/index.html'),
      output: root('dist'),
      inject: 'head'
    }),
    new ScriptExtPlugin({
      defaultAttribute: 'defer'
    })
  ]
};
