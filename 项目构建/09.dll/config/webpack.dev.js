
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const webpack = require('webpack');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, '../build'),
    filename: './js/[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, '../dll/manifest.json')
    }),
    new AddAssetHtmlPlugin({ // 加载提前打包好的jquery
      filepath: resolve(__dirname, '../dll/jquery.js'),
      outputPath: 'js',
      publicPath: 'js',
    }),
  ],
  mode: 'development',
};