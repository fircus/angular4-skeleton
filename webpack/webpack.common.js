const {root} = require('./helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * This is a common webpack config which is the base for all builds
 */
module.exports = {
  devtool: 'eval',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: root('dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: root('./src/assets/images/favicon.ico'),
        to: root('dist')
      },
      {
        from: root('./src/assets/i18n'),
        to: root('dist/assets/i18n')
      },
      {
        from: root('./src/assets/images'),
        to: root('dist/assets/images')
      }
    ])
  ]
};
