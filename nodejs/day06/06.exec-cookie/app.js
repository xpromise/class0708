// 引入express
const express = require('express');
/*
  const path = require('path');
  const { resolve } = path;
 */
// const { resolve } = require('path');
// 引入连接数据库
require('./db');
// 引入router
const userRouter = require('./routers/user-router');
const uiRouter = require('./routers/ui-router');
// 创建App应用对象
const app = express();
// 配置ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// 内置中间件 - 静态资源中间件
app.use(express.static('public'));

app.use(uiRouter);
// 解析请求体参数
app.use(express.urlencoded({extended: true}));
// 应用路由器
app.use(userRouter);
// 监听端口号
app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功 http://localhost:3000');
  else console.log(err);
});