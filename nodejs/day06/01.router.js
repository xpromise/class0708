const express = require('express');
const app = express();
/*
  路由器中间件：Router
    作用：分类管理路由
 */

// 路由器实例对象：可以看做是一个小型app应用对象（因为router包含app部分方法：路由和中间件）
const router = new express.Router();

router.use((req, res, next) => {
  console.log('中间件函数执行了~');
  next();
});

router.get('/', (req, res) => {
  res.send('这是服务器返回的响应');
});

// 应用路由器中间件
app.use(router);

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});