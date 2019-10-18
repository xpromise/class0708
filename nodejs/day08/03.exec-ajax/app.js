const express = require('express');
require('./db');
const Cities = require('./models/cities');
const app = express();

app.use(express.static('public'));

// 处理省份路由
app.get('/province', async (req, res) => {
  try {
    // 去数据库中查找所有省份的数据并返回
    const result = await Cities.find({level: 1}, {name: 1, province: 1, _id: 0});
    // 返回成功响应
    res.json({code: 0, data: result});
  } catch (e) {
    // 返回成功响应
    res.json({code: 1, errMsg: '网络出现异常，请刷新试试~'});
  }
});
// 处理城市路由
app.get('/city', async (req, res) => {
  try {
    // 获取请求参数
    const { province } = req.query;
    if (!province) {
      return res.json({code: 2, errMsg: '请选择省份'});
    }
    // 去数据库中查找所有省份的数据并返回
    const result = await Cities.find({level: 2, province}, {name: 1, city: 1, _id: 0});
    // 返回成功响应
    res.json({code: 0, data: result});
  } catch (e) {
    // 返回成功响应
    res.json({code: 1, errMsg: '网络出现异常，请刷新试试~'});
  }
});
// 处理区县路由
app.get('/county', async (req, res) => {
  try {
    // 获取请求参数
    const { province, city } = req.query;
    if (!province) {
      return res.json({code: 2, errMsg: '请选择省份'});
    }
    if (!city) {
      return res.json({code: 2, errMsg: '请选择城市'});
    }
    // 去数据库中查找所有省份的数据并返回
    const result = await Cities.find({level: 3, province, city}, {name: 1, county: 1, _id: 0});
    // 返回成功响应
    res.json({code: 0, data: result});
  } catch (e) {
    // 返回成功响应
    res.json({code: 1, errMsg: '网络出现异常，请刷新试试~'});
  }
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});