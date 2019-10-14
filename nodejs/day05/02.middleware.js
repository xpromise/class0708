const express = require('express');
const app = express();
/*
  中间件 middleware
    1. 是什么？ 本质上就是一个函数
    2. 组成：
      req 请求对象
      res 响应对象
      next 调用下一个中间件/路由
    3. 作用：
      执行任意代码
      修改req和res对象(一个请求，所有中间件和路由共用同一个req和res对象)
      接受请求、处理请求、返回响应
      调用下一个中间件/路由
    4. 应用：
      应用级中间件
        修改req和res对象， 并能做权限管理（登录验证、防盗链...）
        将路由的公共逻辑提取到应用级中间件去完成
      内置中间件
        官方express提供的中间件
          express.static 静态资源中间件：可以向外暴露服务器的静态资源，外界可以直接访问 http://localhost:3000/hello.html
          express.urlencoded 解析请求体数据（解析post请求参数）
      路由器中间件
        router 路由器
      第三方中间件
        cookie-parser 解析cookie数据
        express-session
      错误处理中间件
        专门用来处理错误
 */
// 使用express.static中间件
app.use(express.static('./public'));
// 解析请求体数据
app.use(express.urlencoded({extended: true}));

// 应用级中间件：匹配任意的请求
/*app.use((req, res, next) => {
  // 登录验证
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).send('你没有登录');
  }
});*/

app.post('/', (req, res) => {
  // 接受post请求体参数
  console.log(req.body); // undefined  { username: 'aaa', password: 'bbb' }
  console.log(a);

  res.send('aaa');
});


app.get('/hello.html', (req, res) => {
  res.sendFile('xxxx');
});


app.get('/cart', (req, res) => {
  console.log('路由函数执行了');
  // console.log(req.xxx);
  res.send('aaa');
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('出错了~');
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});