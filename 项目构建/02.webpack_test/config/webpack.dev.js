/*
  webpack.config.js就是webpack的配置文件：当你运行webpack指令时，会读取配置文件中的配置运行
 */

const { resolve } = require('path');
// 插件必须引入才能使用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: './js/built.js',
    path: resolve(__dirname, '../build')
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
        // npm i eslint eslint-loader -D
        // npx install-peerdeps --dev eslint-config-airbnb-base
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules
        loader: 'eslint-loader',
        options: {
          fix: true, // 自动修复， 一旦出现了eslint报错，自动修复
        },
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: 'file-loader', // 将文件原封不动输出出去
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [ // 插件配置
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以./src/index.html为模板创建新的html文件（1. 结构和模板文件一样 2. 自动引入js/css）
    }),
    new AddAssetHtmlPlugin({ // 能给HtmlWebpackPlugin生成的html文件添加资源（js/css）
      filepath: require.resolve('../src/js/iconfont.js'),
      outputPath: 'js', // 决定文件输出路径
      publicPath: 'js', // 决定script.src的文件路径
    }),
  ],
  mode: 'development',
  // npm i webpack-dev-server -D
  devServer: { // 开启一个服务器来运行构建后的代码
    contentBase: resolve(__dirname, "../build"), // 运行代码的路径
    compress: true, // 启动gzip压缩
    port: 3000, // 端口号
    open: true, // 自动打开浏览器
    hot: true, // 开启模块热替换功能
  },
  devtool: 'cheap-module-eval-source-map', // 追踪源代码错误
  resolve: {
    alias: { // 配置路径别名
      $css: resolve(__dirname, '../src/css'),
      $less: resolve(__dirname, '../src/less'),
    },
    extensions: [".js", ".json", ".less"] // 自动解析文件扩展名
  },
  // targets: 'web',
  externals: {
    jquery: 'jQuery' // 外部文件，从而不会被webpack打包
  },
  performance: {
    hints: false // 不提示性能问题
  }
};