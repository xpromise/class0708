/*
  用来创建Model对象
 */
const mongoose = require('mongoose');

// 创建Schema对象
const citiesSchema = new mongoose.Schema({
  // 约束条件
  code: String,
  province: String,
  city: String,
  county: String,
  name: String,
  level: Number,
});

// 创建Model对象
const Cities = mongoose.model('cities', citiesSchema);

// 暴露
module.exports = Cities;