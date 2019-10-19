const express = require('express');
const app = express();

app.use(express.static('public'));
// 解析请求体参数：只能解析采用urlencoded编码
app.use(express.urlencoded({extended: true}));
// 解析请求体参数：只能解析采用json编码
app.use(express.json());

app.get('/ajax', (req, res) => {
  // 函数名：fn
  const { callback } = req.query;

  const data = {name: 'tom', age: 55};

  // 返回响应  fn({name: 'tom', age: 55})   callback(json)

  res.send(`${callback}(${JSON.stringify(data)})`);
});

app.post('/ajax', (req, res) => {
  console.log(req.body);

  res.json({name: 'tom', age: 20});
});

app.get('/cors', (req, res) => {
  // 设置响应头
  const safeUrl = ['http://localhost:63342', 'https://www.baidu.com'];
  // 允许所有地址跨域
  // res.set('access-control-allow-origin', '*');
  const url = req.headers.origin;
  console.log(url);
  if (safeUrl.includes(url)) {
    // 允许单个地址跨域
    res.set('access-control-allow-origin', url);
    res.set('access-control-allow-headers', 'X-Juejin-Src,X-Juejin-Client,X-Juejin-Uid,X-Juejin-Token');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
    res.set('Access-Control-Max-Age', 86400);
  }

  /*
    Access-Control-Allow-Credentials: true  允许预检请求
      当请求方式是POST PUT DELETE，或者请求头中有特殊字段（X-Juejin-Src）,这个时候浏览器会先发送一个预检请求（请求方式是options）
      预检请求： 检查当前请求是否能进行跨域。  如果不行，就不在发请求了。 如果行，在发送真正的请求
    Access-Control-Allow-Headers: X-Juejin-Src,X-Juejin-Client,X-Juejin-Uid,X-Juejin-Token
      允许以上这些字段跨域跨域（如果请求头中的特殊字段不在包含范围，就不允许跨域）
    Access-Control-Allow-Methods: GET, PUT, POST, DELETE, HEAD
      允许怎么样请求方式跨域跨域
    Access-Control-Allow-Origin: https://juejin.im
      允许哪些地址可以跨域
    Access-Control-Max-Age: 86400
     预检请求跨域缓存
   */

  res.send('hello cors');
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});