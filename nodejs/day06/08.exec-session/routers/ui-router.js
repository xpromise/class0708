const express = require('express');
const { resolve } = require('path');
const cookieParser = require('cookie-parser');
const Users = require('../models/users');

const router = new express.Router();
// 解析cookie
router.use(cookieParser());

router.get('/user.html', async (req, res) => {
  // 解析session：自动解析cookie里面的session_id，去数据库中找到session对象，挂在到req.session
  try {
    const { userId } = req.session;
    if (userId) {
      // 判断是否合法
      const user = await Users.findOne({_id: userId});
      if (user) {
        res.sendFile(resolve(__dirname, '../private/user.html'));
        return;
      }
    }
  } catch (e) {
    // 防止报错导致程序中断
    console.log(e);
  }
  res.clearCookie('userId');
  res.status(401).send('你没有权限访问当前页面！请登录后访问');
});

module.exports = router;