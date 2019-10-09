/*
  path nodejs核心模块，只需要引入就能使用
    路径，专门用来处理路径问题

    path.resolve
    path.join
 */

// 引入path模块
const path = require('path');

console.log(__dirname + '\\index.html');

console.log(__dirname + '..\\index.js');

// join: 将所有路径拼接成一个路径返回（一般用于相对路径）
const filepath1 = path.join('../', 'js/index.js');
console.log(filepath1);
// resolve: 将所有路径拼接成一个路径，并会装换成绝对路径返回（一般用于绝对路径）
const filepath2 = path.resolve('../', 'js/index.js');
console.log(filepath2);
