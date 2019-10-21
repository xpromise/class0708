/*
  webpack.config.js就是webpack的配置文件：当你运行webpack指令时，会读取配置文件中的配置运行
 */

const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build/js')
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
      }
    ]
  },
  plugins: [ // 插件配置

  ],
  mode: 'development'
};