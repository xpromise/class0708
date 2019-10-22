/*
  webpack.config.js就是webpack的配置文件：当你运行webpack指令时，会读取配置文件中的配置运行

  npm i serve -g 下载全局包
  serve -s build -p 3000 开启服务器部署build目录下的资源
    就能通过 http://localhost:3000
 */
const { resolve } = require('path');
// 插件必须引入才能使用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, '../build'),
    publicPath: '/' // 所有资源src路径前面都会加上 /
  },
  module: {
    rules: [ // loader配置
      {
        test: /\.css$/, // 检测文件是否是css文件
        use: [  // 执行顺序：从下到上，从右往左依次执行
          MiniCssExtractPlugin.loader, // 提取js中的css成单独文件
          'css-loader', // 能将css文件打包到js中（会以commonjs方式整合到js文件中）
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-preset-env')(),
                require('cssnano')()
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // 能将css文件打包到js中（会以commonjs方式整合到js文件中）
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-preset-env')(),
                require('cssnano')()
              ]
            }
          },
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
            publicPath: '/images'
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
        enforce: 'pre', // 提前执行
        loader: 'eslint-loader',
        options: {
          fix: true, // 自动修复， 一旦出现了eslint报错，自动修复
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
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
      minify: { // 压缩HTML
        collapseWhitespace: true, // 去除空格
        removeComments: true, // 移除注释
        removeRedundantAttributes: true, // 移除默认值属性
        removeScriptTypeAttributes: true, // 移除script的type
        removeStyleLinkTypeAttributes: true, // 移除link/style的type属性
        useShortDoctype: true // 使用短的doctype
      }
    }),
    new AddAssetHtmlPlugin({ // 能给HtmlWebpackPlugin生成的html文件添加资源（js/css）
      filepath: require.resolve('../src/js/iconfont.js'),
      outputPath: 'js', // 决定文件输出路径
      publicPath: '/js', // 决定script.src的文件路径
    }),
    new MiniCssExtractPlugin({ // 提取css成单独文件
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CleanWebpackPlugin(), // 清除build目录下所有文件
    new OptimizeCssAssetsPlugin({
      // assetNameRegExp: /\.optimize\.css$/g,
      // cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        map: { // 解决source-map不生效问题
          inline: false,
          annotation: true,
        }
      },
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      // canPrint: true
    })
  ],
  mode: 'production',
  devtool: 'cheap-module-source-map', // 追踪源代码错误
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