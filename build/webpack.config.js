const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'dist/unobuilder-parser.js',
    libraryTarget: 'umd',
    library: 'UnoHtmlParser'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
    })
  ]
}