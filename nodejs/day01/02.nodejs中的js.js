/*
  browser的js： DOM BOM ES
  nodejs的js:
    DOM 操作文档节点。 没有DOM
    BOM 操作浏览器。 基本没有BOM
      console
      setTimeout
      setInterval
    ES 语法规范： 基本全部包含


    setImmediate
    process.nextTick
 */

// console.log(global); // nodejs的全局对象

process.nextTick(() => {
  console.log('process.nextTick() 333');
});

setImmediate(() => {
  console.log('setImmediate() 222');
});

setTimeout(() => {
  console.log('setTimeout() 111');
}, 1000);

/*
  timers  定时器阶段  队列中只包含定时器到点回调函数
  pending callbacks
  idle, prepare
  poll  轮询阶段 队列中包含其他异步I/O回调函数（文件/数据库读写）
    依次执行轮询队列中的回调函数。
    依次完所有回调函数：
      1. 当发现之前设置过setImmediate
      2. 定时器到点了
      会去下一个check阶段。  如果以上两个条件都没有满足，就会一直停留在poll轮询阶段
  check 检查阶段 队列中只包含setImmediate回调函数
  close callbacks

  process.nextTick 能在任意阶段优先执行
 */



