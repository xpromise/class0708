/*
  用来创建Model对象
 */
const mongoose = require('mongoose');

// 创建Schema对象
const studentsSchema = new mongoose.Schema({
  // 约束条件
  name: {
    type: String,
    unique: true, // 唯一的
    required: true // 必须的
  },
  age: Number,
  sex: String,
  hobby: [String], // 类型是数组，数组里面放字符串
  info: mongoose.SchemaTypes.Mixed, // 混合类型（任意类型）
  createTime: {
    type: Date,
    default: Date.now
  }
});

// 创建Model对象
const Students = mongoose.model('students', studentsSchema);

// 暴露
module.exports = Students;