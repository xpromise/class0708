
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: './js/built.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // js兼容性按需加载： 根据你使用js语法来自动加载兼容性的包
                useBuiltIns: "usage",
                corejs: { version: 3, proposals: true },
                targets: { // 指定兼容性做到哪个版本浏览器
                  ie: 9,
                  chrome: 59,
                  edge: 13,
                  firefox: 50,
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
};