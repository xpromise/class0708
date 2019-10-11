/*
  入口文件：
    1. 使用连接数据库模块
    2. 引入Model，从而能对数据库进行操作
 */
//  1. 使用连接数据库模块（引入加载模块所有代码，连接数据库）
require('./db');

// 2. 引入Model，从而能对数据库进行操作
const Students = require('./models/students');

Students.create({
  name: '刘超111111',
  age: 30,
  sex: '男'
})
  .then((value) => {
    console.log('成功', value);
  })
  .catch((reason) => {
    console.log('失败', reason);
  });