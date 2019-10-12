// 引入express
const express = require('express');
// 创建application应用对象
const app = express();
// 设置路由: 接受处理请求
// get: GET请求  '/' 请求路径
app.get('/', (req, res) => {
  // 接受请求，处理请求参数
  console.log(req.query); // {}  { username: '123', password: '456' }
  // 返回响应
  res.send('这是express服务器返回的响应111');
});
app.get('/test', (req, res) => {
  // 接受请求，处理请求参数
  console.log(req.query); // {}  { username: '123', password: '456' }
  // 返回响应
  res.send('这是express服务器返回的响应222');
});
// 处理post请求
app.post('/', (req, res) => {
  // 接受请求，处理请求参数
  console.log(req.query); // {}  { username: '123', password: '456' }
  // 返回响应
  res.send('这是express服务器返回的响应');
});
// 监听端口号：
/*
  http://localhost:3000/test
  http://127.0.0.1:3000
  http://192.168.0.176:3000

  协议://域名（ip地址）:端口号/路径?查询字符串
    ip地址: 192.168.0.176
    域名：localhost / www.baidu.com

    DNS解析： 将域名解析成ip地址

    端口号：
      http  80
      https 443

    查询字符串： 以?开头，key=value。用&连接
      ?username=123&password=456
 */
app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了， http://localhost:3000');
  else console.log(err);
});