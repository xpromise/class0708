// 引入koa
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const _ = require('koa-route');
// 创建app应用对象
const app = new Koa();

// 设置第三方中间件：解析请求体参数
app.use(bodyParser());

app.use(_.get('/test1', (ctx, next) => {

  ctx.body = '这是/test1返回的响应~';
}));

app.use(_.get('/test2', (ctx, next) => {

  ctx.body = '这是/test2返回的响应~';
}));

// 设置中间件
app.use((ctx, next) => {
  // 获取查询字符串参数
  console.log(ctx.query);
  // 获取请求体参数
  console.log(ctx.request.body); // { username: 'admin', password: '123' }
  // 返回响应
  ctx.body = '这是服务器返回的响应~';
});

// 监听端口号
app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});