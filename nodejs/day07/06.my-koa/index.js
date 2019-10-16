const Koa = require('./application');

const app = new Koa();

// 设置中间件
app.use((req, res, next) => {
  console.log(111);
  // 返回响应
  next();
  // next(); // 报错
});

app.use((req, res, next) => {
  console.log(222);

  next();
  // 返回响应
  res.end('hello my koa');
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});