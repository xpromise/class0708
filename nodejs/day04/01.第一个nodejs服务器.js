// 引入http
const http = require('http');
// 引入querystring
const qs = require('querystring');

// 使用http模块创建服务
const server = http.createServer((request, response) => {
  // 回调函数：处理请求，返回响应的函数
  // 当客户端通过http://localhost:3000访问服务器，服务器会自动接受请求，自动调用回调函数
  /*
    request 请求对象：包含客户端发送给服务器的消息 --> 只能处理请求
    response 响应对象：包含服务器返回给客户端的消息 --> 用来返回响应
   */
  
  // 处理请求： 接受请求参数
  // 浏览器会默认请求 /favicon.ico --> 就是浏览器小图标   现在先不处理，忽略
  if (request.url === '/favicon.ico') return response.end();

  // console.log(request.url); // /?username=123&password=456 查询字符串参数

  // ['username=123', 'password=456']
  /*const queryString = request.url.split('?')[1].split('&').reduce((prev, curr) => {
    // ['username', '123']  数组的解构赋值
    const [key, value] = curr.split('=');
    // 给对象添加属性和值
    prev[key] = value;
    // 返回出去
    return prev;
  }, {});*/

  const url = request.url.split('?')[1];
  const queryString = url ? qs.parse(url) : {};
  console.log(queryString); // { username: '123', password: '456' }

  // 告诉客户端，请你使用utf-8解析
  // 设置响应头
  // text/plain 代表响应内容是纯文本  charset=utf-8 代表响应内容编码方式是utf-8
  response.setHeader('content-type', 'text/plain;charset=utf-8');
  // 返回响应
  // response.end('hello nodejs server');
  response.end('这是nodejs服务器返回的响应');
});
// 监听端口号
server.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~, 访问地址：http://localhost:3000');
  else console.log(err);
});