// 引入mongoose
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost:27017/mongoose_test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
// 绑定一次性事件
mongoose.connection.once('open', (err) => {
  if (!err) {
    console.log('数据库连接成功了~');
  } else {
    console.log(err);
  }
});
// 创建schema对象：用来约束集合中文档
const studentsSchema = new mongoose.Schema({
  // 约束条件： 约束集合文档的key和value
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
// 创建Model对象: 等于数据库中的集合
const Students = mongoose.model('students', studentsSchema);

/*
  CRUD -
    C create
      Students.create(文档对象, 回调函数)
      当你不传回调函数时，返回值是promise
    R read
      Students.find(查询条件, 投影, 回调函数)  promise内部的值 是数组(找没找到都是[])
      Students.findOne(查询条件, 投影, 回调函数) promise内部的值 是对象(没找到是null)
    U update
      Students.updateOne(查询条件, 更新内容, 回调函数)
      Students.updateMany(查询条件, 更新内容, 回调函数)
    D delete
      Students.deleteOne(查询条件, 回调函数)
      Students.deleteMany(查询条件, 回调函数)
 */

// const result = Students.deleteMany({sex: '111'});

// const result = Students.updateMany({}, {$inc: {age: 1}});

// const result = Students.findOne({age: {$gt: 20}});
// const result = Students.find({age: {$in: [22, 24]}});
// const result = Students.find({name: /111/});
/*const result = Students.find({$where: function () {
  return this.age === 20;
}}, {name: 1, age: 1, _id: 0});*/


/*const result = Students.create([
  {
    name: '刘超666',
    age: 24,
    sex: '女',
    hobby: ['男'],
    info: '时长两年半的王牌练习生'
  },
  {
    name: '刘超777',
    age: 26,
    sex: '女',
    hobby: ['男'],
    info: '时长两年半的王牌练习生'
  }
], (err) => {
  if (!err) {
    console.log('数据创建成功~');
  } else {
    console.log(err);
  }
});*/

const result = Students.create({
  name: '刘超101010',
  age: 26,
  sex: '女',
  hobby: ['男'],
  info: '时长两年半的王牌练习生'
});

result
  .then((value) => {
    console.log('成功：', value);
  })
  .catch((reason) => {
    console.log('失败: ', reason);
  });
