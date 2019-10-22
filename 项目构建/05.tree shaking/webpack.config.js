
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
  tree shaking: 去除没有使用的js代码
    原理：
      1. 使用ES6模块化语法
      2. 开启webpack生产环境配置
 */

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: './js/built.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production'
  /*mode: 'development',
  optimization: {
    usedExports: true, // 开启tree shaking
  },*/
};