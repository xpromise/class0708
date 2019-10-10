/*
  1. 下载包
    npm install xxx  /  npm i xxx / npm i xxx -S   下载并安装到生产依赖中
      1. 下载并安装一个包
      2. 包安装到当前目录node_modules里面
      3. 将下载的包添加到package.json的dependencies中
      4. 生成package-lock.json文件 （缓存下载地址文件，让下一次下载速度更快）

    npm i xxx --save-dev / npm i xxx -D  下载并安装到开发依赖中

    npm i 下载package.json依赖中所有包（包含生产依赖和开发依赖）

    npm i xxx -g  全局安装一个包
      不会安装到本地，会安装指定目录：C:\Users\XiongJian\AppData\Roaming\npm
      全局安装指令包。 所以我们今后可以将包做为指令去使用

  2. 删除包
    npm remove xxx

  3. 创建package.json
    npm init 自定义初始化package.json
    npm init -y  初始化一个默认值package.json

 */