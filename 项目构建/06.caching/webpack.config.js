
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
  hash  webpack每次打包都会生成一个唯一的hash值，问题：所有资源会共享同一个hash值，一个文件变化，会导致所有文件缓存失效
  chunkhash webpack每次打包生成的chunk（打包输出文件）分别生成一个唯一的hash值。 问题：如果文件一开始在一起，会是同一个hash值
  contenthash 每一个输出文件都会生成一个唯一的hash值，这个hash值是根据文件内容生成的， 解决：不同文件，使用不同的hash
 */

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: './js/[contenthash:10].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({ // 提取css成单独文件
      filename: 'css/[contenthash:10].css',
      chunkFilename: 'css/[contenthash:10].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  mode: 'production'
};