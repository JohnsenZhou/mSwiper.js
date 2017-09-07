const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/mSwiper.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mSwiper.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })

  ],
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    port: 8080,
    hot: true
  }
}