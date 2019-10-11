/*
  连接数据库
 */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose_test', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

mongoose.connection.once('open', (err) => {
  if (!err) console.log('数据库连接成功~');
  else console.log(err);
});
// 当前模块要不要暴露内容？ 看外面需要不要使用模块内部的数据