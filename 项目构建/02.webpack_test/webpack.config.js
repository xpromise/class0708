/*
  webpack.config.js就是webpack的配置文件：当你运行webpack指令时，会读取配置文件中的配置运行
 */

const { resolve } = require('path');
// 插件必须引入才能使用
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [ // loader配置
      {
        test: /\.css$/, // 检测文件是否是css文件
        use: [  // 执行顺序：从下到上，从右往左依次执行
          'style-loader', // 创建style标签，将js中的css代码放进标签内生效
          'css-loader', // 能将css文件打包到js中（会以commonjs方式整合到js文件中）
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', // 创建style标签，将js中的css代码放进标签内生效
          'css-loader', // 能将css文件打包到js中（会以commonjs方式整合到js文件中）
          'less-loader' // 将less编译成css文件
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader', // url-loader是基于file-loader使用
          options: {
            limit: 8192, // 8 * 1024 = 8 kb   8kb以下的图片会被base64处理
            outputPath: 'images', // 决定图片的输出路径 （output.path + outputPath）
            name: '[hash:10].[ext]', // 名称  hash:10 取前面10位hash值  ext 自动补全文件扩展名（文件之前是怎么样的扩展名，之后就是怎么样的）
          }
        }
      },
      {
        test: /\.html$/,
        /*use: {
          loader: 'html-loader'
        }*/
        loader: 'html-loader' // 解决html中img问题
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules
        loader: 'eslint-loader',
        options: {
          fix: true, // 自动修复， 一旦出现了eslint报错，自动修复
        },
      },
    ]
  },
  plugins: [ // 插件配置
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以./src/index.html为模板创建新的html文件（1. 结构和模板文件一样 2. 自动引入js/css）
    }),
  ],
  mode: 'development'
};