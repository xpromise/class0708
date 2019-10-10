/*
  nodejs会对异步代码进行划分优先级：
    微任务：promise.then().catch().finally()   process.nextTick()
    宏任务：setTimeout / setInterval / setImmediate

    简单理解：
      1. 微任务优先级比宏任务更高
      2. 微任务最牛逼就是process.nextTick
      3. setTimeout / setImmediate 看nodejs事件轮询机制
 */
const fs = require('fs');

fs.readFile('a.txt', () => {
  console.log(333);
  setTimeout(() => {
    console.log(111);
  });

  setImmediate(() => {
    console.log(222);
  });
});

Promise.resolve().then(() => {
  console.log(444);
});

process.nextTick(() => {
  console.log(555);
});

console.log(666);