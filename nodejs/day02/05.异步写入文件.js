/*
  异步写入文件
    1. 打开文件
      fs.open(path[, flags[, mode]], callback)
        callback
          err 错误对象：如果方法出错了，值就是错误对象，如果方法没有出错，就是null
            错误优先机制：要求开发者写异步代码优先处理错误
          fd
    2. 写入文件
      fs.write(fd, string[, position[, encoding]], callback)
    3. 关闭文件
      fs.close(fd, callback)
 */

const fs = require('fs');

fs.open('./b.txt', 'w', (err, fd) => {
  // 判断方法有无错误
  if (err) {
    // 出错了~
    console.log('open方法出错了： ', err);
  } else {
    // 没有出错
    fs.write(fd, '锄禾日当午', (err) => {
      if (err) {
        console.log('write方法出错了：', err);
      } else {

      }
      // 不管写入成功或者失败，都要关闭文件
      fs.close(fd, (err) => {
        if (err) {
          console.log('write方法出错了：', err);
        } else {

        }
      })
    })
  }
});

(async () => {

  // 打开文件
  const fd = await new Promise((resolve, reject) => {
    // 执行异步操作
    fs.open('c.txt', 'w', (err, fd) => {
      if (!err) {
        // 将promise对象改为成功状态
        resolve(fd);
      } else {
        // 将promise对象改为失败状态
        reject(err);
      }
    })
  });

  // 写入文件
  await new Promise((resolve, reject) => {
    fs.write(fd, '汗滴禾下土', (err) => {
      if (!err) {
        resolve();
      } else {
        // 打印错误信息
        console.error(err);
        resolve(err);
      }
    })
  });

  // 关闭文件
  await new Promise((resolve, reject) => {
    fs.close(fd, (err) => {
      if (!err) resolve();
      else reject(err);
    })
  })

})();

