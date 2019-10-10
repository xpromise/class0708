/*
  fs.readFile(path, callback)
    callback
      err
      data 读取的文件内容
        是一个buffer数据，想要具体内容，需要toString
 */

const fs = require('fs');

fs.readFile('./package.json', (err, data) => {
  if (!err) {
    console.log(data.toString());
  } else {
    console.log(err);
  }
});