/*
  name
  version
  dependencies 生产依赖
  devDependencies 开发依赖
    开发环境：能让代码运行的环境
    生产环境: 输出上线用的代码的环境

    开发依赖：生产环境和开发环境使用的自动化构建的包(运行时不需要的依赖)  如: babel
    生产依赖：代码运行时依赖 如：jQuery
  scripts 运行包的指令
    start 启动项目（开发环境） npm start
    build 生成上线代码（生产环境） npm run build
    test 测试项目 npm run test
 */