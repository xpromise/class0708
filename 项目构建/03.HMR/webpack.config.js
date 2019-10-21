
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    path: resolve(__dirname, 'build'),
    filename: './js/built.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // 实现了css的HMR功能
          'css-loader',
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    hot: true, // 问题：html无法热更新
  }
};