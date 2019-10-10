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


    npm配置淘宝镜像
      npm config set registry https://registry.npm.taobao.org


    安装yarn: npm i yarn -g

     yarn add xxx 下载并添加生产依赖中
     yarn add xxx --dev 下载并添加开发依赖中
     yarn remove xxx
     yarn global add xxx 全局安装一个包(不推荐使用，全局安装推荐npm：
      npm全局下载的包的地址默认配置了环境变量，可以直接访问
      yarn全局下载的包需要手动配置环境变量
      )
      yarn全局安装的路径 C:\Users\XiongJian\AppData\Local\Yarn\bin 需要将当前目录添加成环境变量

     yarn配置淘宝镜像
      yarn config set registry https://registry.npm.taobao.org

    问题：npm和yarn不能混着用
      如果先用yarn下载，在用npm。 npm会把yarn下载的包删除掉
        解决： npm i / yarn 重新下载所有包
      如果先用npm下载，在用yarn。 没问题

 */

const math = require('math');

console.log(math.add(1, 2));
