/*
 CRUD 增删改查
     C - create
         db.xxx.insert(文档对象)  
     R - read 
         db.xxx.find(查询条件, 投影)
         db.xxx.findOne(查询条件, 投影)
                             操作符：
            1. > >= < <= !==  $gt $gte $lt $lte $ne
            2. 或 $or $in
            3. 正则表达式
            4. $where
                             投影:  过滤一些不需要的字段
    U - update
        db.xxx.updateOne(查询条件, 更新的内容)
        db.xxx.updateMany(查询条件, 更新的内容)
            $set 设置
            $inc 增加
    D - delete
        db.xxx.deleteOne(查询条件)
        db.xxx.deleteMany(查询条件)
*/

db.students.insert({name: 'jack', age: 18});
db.students.insert([{name: 'tom', age: 19}, {name: 'jerry', age: 20}]);

db.students.find();
db.students.find({name: 'jack'});
// 查找年龄大于等于19
db.students.find({age: {$gte: 19}});
// 查找年龄等于18或者20
db.students.find({age: {$in: [18, 20]}});
db.students.find({$or: [{age: 18}, {name: 'jerry'}]});
// 查找姓名以J开头
db.students.find({name: /^j/});

db.students.find({$where: function () {
    // this就是遍历的文档对象
    return this.age === 18 || this.age === 20;
  }})

db.students.find({}, {name: 1, _id: 0});
db.students.find({}, {age: 0, _id: 0});

db.students.findOne();
db.students.find();

db.students.updateOne({name: 'jack'}, {$set: {age: 19}});
db.students.updateMany({}, {$inc: {age: 1}});

db.students.deleteOne({age: 21})

