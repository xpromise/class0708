// 引入express
const express = require('express');
/*
  const path = require('path');
  const { resolve } = path;
 */
const { resolve } = require('path');
// 引入连接数据库
require('./db');
// 引入model
const Users = require('./models/users');

// 创建App应用对象
const app = express();

// 设置路由
// 处理登录请求的路由
app.get('/login', async (req, res) => {
  // 1. 获取用户提交的数据
  const { username, password } = req.query;
  // 2. 正则校验
  const usernameReg = /^[A-Za-z0-9_]{5,15}$/; // 用户名只能包含英文、数字、下划线，长度为5-15位
  const passwordReg = /^[A-Za-z0-9_]{5,15}$/; // 密码只能包含英文、数字、下划线，长度为5-15位
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
  // 3. 验证用户名密码是否正确
  const user = await Users.findOne({username, password});
  if (user) {
    // 说明找到了，用户名密码是正确
    res.send('登录成功');
  } else {
    res.send('用户名或密码错误');
  }
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
  // res.send('注册成功');
  // res.sendFile(resolve(__dirname, 'public/login.html')); // 网址没变
  res.redirect('http://localhost:3000/login.html');
});

/*
  问题：每次修改服务器代码，都需要重启服务器，太麻烦
  解决：
    npm i nodemon -g // 将来作为指令使用
    nodemon app.js
 */
app.get('/register.html', (req, res) => {
  // 返回注册页面
  res.sendFile(resolve(__dirname, 'public/register.html'));
});

app.get('/login.html', (req, res) => {
  // 返回登录页面
  res.sendFile(resolve(__dirname, 'public/login.html'));
});

// 监听端口号
app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功 http://localhost:3000');
  else console.log(err);
});