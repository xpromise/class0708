// 引入express
const express = require('express');
// 引入连接数据库
require('./db');
// 引入model
const Users = require('./models/users');

// 创建App应用对象
const app = express();

// 设置路由
// 处理登录请求的路由
app.get('/login', (req, res) => {

});

// 处理注册请求的路由
app.get('/register', async (req, res) => {
  /*
    1. 获取用户提交数据  req.query
    2. 正则校验
    3. 验证用户名是否已存在
    4. 将用户数据保存在数据库中
    5. 注册成功
   */

  // 1. 获取用户提交数据  req.query
  const { username, password, rePassword, email } = req.query;
  // 2. 正则校验
  // 定义正则规则
  const usernameReg = /^[A-Za-z0-9_]{5,15}$/; // 用户名只能包含英文、数字、下划线，长度为5-15位
  const passwordReg = /^[A-Za-z0-9_]{5,15}$/; // 密码只能包含英文、数字、下划线，长度为5-15位
  const emailReg = /^[A-Za-z0-9_]{3,10}@[A-Za-z0-9_]{2,5}\.(com|cn)$/; // xxx@xxx.com
  // 校验
  if (!usernameReg.test(username)) {
    // 用户名校验失败
    res.send('用户名只能包含英文、数字、下划线，长度为5-15位');
    return;
  }

  if (!passwordReg.test(password)) {
    // 密码校验失败
    res.send('密码只能包含英文、数字、下划线，长度为5-15位');
    return;
  }

  if (password !== rePassword) {
    res.send('两次输入密码不一致，请重新输入');
    return;
  }

  if (!emailReg.test(email)) {
    res.send('邮箱校验失败');
    return;
  }
  // 3. 验证用户名是否已存在  Model.findOne({username: username})
  const result = await Users.findOne({username});
  if (result) {
    // 用户名已存在
    res.send('用户名已存在');
    return;
  }
  // 4. 将用户数据保存在数据库中
  const user = await Users.create({
    username,
    password,
    email
  });
  console.log('注册成功的用户数据：', user);
  // 5. 注册成功
  res.send('注册成功');
});

// 监听端口号
app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功 http://localhost:3000');
  else console.log(err);
});