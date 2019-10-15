const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
/*
  cookie
    1. 是什么？
      一个解决http协议无状态（http协议没办法区分是谁发送的请求）的技术
      本质上：是一个存储在浏览器的文本：key-value
    2. 作用：
     解决http协议无状态
     存储少量的文本
    3. 使用：
      - 设置
        res.cookie(key, value, options);
      - 获取
        req.cookies 默认不解析  引入第三方中间件 cookie-parser
         npm i cookie-parser
      - 清除
        res.clearCookie()
    4. 时效性
      默认cookie是会话（临时）存储：当服务器返回cookie给客户端开启会话，关闭浏览器结束会话（结束会话就会自动清除cookie）
      持久化cookie
        res.cookie('id', '123456789', {maxAge: 1000 * 3600 * 24 * 7})
    5. 工作原理：
      1. 客户端发送请求到服务器去，请求登录，当登录成功，服务器返回一个cookie（凭证：用户信息）给客户端
      2. 客户端接收到cookie会自动保存，下次发送请求会自动携带。 服务器就要获取cookie并解析，判断cookie是否合法
      3. 如果合法就返回正确响应，如果不合法就清除cookie，返回错误响应
*/

// 解析cookie数据，解析成对象，挂载到req.cookies上
app.use(cookieParser());

app.get('/', (req, res) => {
  // 设置cookie
  // res.cookie('id', '123456789'); // 会话cookie
  // res.cookie('id', '123456789', {maxAge: 1000 * 3600 * 24 * 7, httpOnly: true});

  // 获取cookie
  // console.log(req.cookies); // { 'Webstorm-ef037c84': '6dd4cb30-4200-4430-b5a8-a4ca17524f5d', id: '123456789' }

  // 删除
  res.clearCookie('id');
  // res.cookie('id', 'xxxx', {maxAge: 0});

  // 返回响应
  res.send('返回响应~~');
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});