const express = require('express');
const app = express();

app.use(express.static('public'));
// 解析请求体参数：只能解析采用urlencoded编码
app.use(express.urlencoded({extended: true}));
// 解析请求体参数：只能解析采用json编码
app.use(express.json());

app.get('/ajax', (req, res) => {
  console.log(req.query);

  res.json({name: 'tom', age: 55});
});

app.post('/ajax', (req, res) => {
  console.log(req.body);

  res.json({name: 'tom', age: 20});
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});