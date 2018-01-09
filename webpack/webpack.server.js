const {root} = require('./helpers');

const {AotPlugin} = require('@ngtools/webpack');
const nodeExternals = require('webpack-node-externals');

/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
  entry: root('./src/main.server.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
      }
    ]
  },
  externals: [nodeExternals({
    whitelist: [
      /^@angular\/material/,
      /^@ngx-translate\/core/
    ]
  })],
  output: {
    filename: 'server.js'
  },
  target: 'node'
};
