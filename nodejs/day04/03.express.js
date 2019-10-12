const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // 返回响应
  res.send('这是处理get请求的响应~');
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~ http://localhost:3000');
  else console.log(err);
});