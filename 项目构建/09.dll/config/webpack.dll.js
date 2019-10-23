
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    jquery: ['jquery']
  },
  output: {
    path: resolve(__dirname, '../dll'),
    filename: '[name].js',
    library: '[name]' // 向外暴露全局jquery， 当其他文件引入jquery时，引入的就是library暴露的jquery
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve(__dirname, '../dll/manifest.json')
    })
  ],
  mode: 'production',
};