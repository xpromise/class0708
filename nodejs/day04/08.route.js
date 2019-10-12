const express = require('express');
const path = require('path');

const app = express();
/*
  路由:
    1. 是什么？
      定义访问的url（定义以怎么样url访问服务器）和处理请求返回响应的方法
      key-value映射关系（key是path， value是callback）
      总之：服务器用来处理请求、返回响应。
    2. 组成：
        method 请求方式  GET(查) POST(增) PUT(改) DELETE(删)
        path 请求路径
          '/' --> 'http://localhost:3000'  一对一
          '/test' --> 'http://localhost:3000/test'  一对一
          '/:xxx' --> 'http://localhost:3000/123456'  'http://localhost:3000/456789' 一对多
          /^\/test/ --> 一对多
       callback 回调函数
        request
          req.url 获取请求路径
          req.query 获取get请求的查询字符串参数
          req.params 获取请求地址:id参数
          req.body 获取post请求的请求体参数（默认是不解析的）
          req.headers 获取请求头所有信息，返回值是对象
        response
          res.end(body) 快速返回响应（不添加任何多余的内容）
          res.send(body) 返回响应： 会根据body的类型添加相应的相应头
            如果是string  添加 Content-type: text/html; charset=utf8
            如果是对象  会转化成json返回响应
          res.json(body) 将响应内容装换成json返回
          res.download(body) 返回响应，浏览器会自动下载
          res.sendFile(body) 返回响应，浏览器会自动打开
          res.redirect() 返回响应，返回重定向

          res.set(key, value) 设置响应头
          res.status() 设置响应状态码
 */
app.get('/', (req, res) => {
  // res.status(500);
  res.json({name: 'jack', age: 18});
  // res.download('./06.响应报文.md');
  // res.sendFile(path.resolve('./06.响应报文.md'));
  // res.redirect('http://www.atguigu.com');
});

app.post('/test', (req, res) => {

});

app.get('/hotel/:id', (req, res) => {
  console.log(req.params); // { id: '123456' }

  res.send('这是服务器返回的响应~');
});

app.get(/^\/test/, (req, res) => {
  console.log(req.headers);
  
  res.send('这是服务器返回的响应1111~');
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功 http://localhost:3000');
  else console.log(err);
});