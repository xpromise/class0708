const express = require('express');
const app = express();
/*
  执行顺序：
    当服务器接受请求时，会依次触发路由（满足请求方式和请求路径相等才能触发）或中间件（任意请求）
      如果满足条件触发了，
        内部调用了next方法，就还看下一个
        内部没有调用next方法，请求就终止
      如果满足条件没有触发，接着看下一个。所有的都没触发，最终返回404
 */
/*app.get('/', (req, res, next) => {
  console.log(222);
});*/

app.use((req, res, next) => {
  console.log(111);
  next();
});

app.use((req, res, next) => {
  console.log(222);
  next();
});

app.use((req, res, next) => {
  console.log(333);
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})