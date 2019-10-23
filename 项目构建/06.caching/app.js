const express = require('express');
const app = express();

// maxAge： 强制缓存时间 1小时
app.use(express.static('build', { maxAge: 1000 * 3600 }));

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~ http://localhost:3000');
  else console.log(err);
});