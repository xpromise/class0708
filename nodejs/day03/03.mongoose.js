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
// 创建Document对象
const s = new Students({
  name: '刘超333',
  age: 20,
  sex: '男',
  hobby: ['唱', '跳', 'rap', '篮球'],
  info: '我不要你觉得，我要我觉得',
  xxx: 'xxx'
});
// 保存文档对象
s.save((err) => {
  if (!err) {
    console.log('文档保存成功~');
  } else {
    console.log(err);
  }
});