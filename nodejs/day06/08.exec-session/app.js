// 引入express
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
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

app.use(session({
  secret: 'alogg8ip83o',  // 参与session_id加密的字符串
  saveUninitialized: false, // 没有存东西，不创建session
  resave: false, // 没有修改session，不会重新保存
  store: new MongoStore({ // session存在哪里
    url: 'mongodb://localhost:27017/exec',
    // touchAfter: 24 * 3600 // time period in seconds
    ttl: 3600 * 24 * 7 // session在数据库中保存7天
  }),
  cookie: {
    maxAge: 3600 * 24 * 7 * 1000, // cookie有效期为7天
    httpOnly: true
  }
}));

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