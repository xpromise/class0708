/*
  简单写入文件
    fs.writeFile(file, data[, options], callback)
 */

const fs = require('fs');

fs.writeFile('d.txt', '窗前明月光', (err) => {
  if (!err) {
    console.log('文件写入成功~');
  } else {
    console.log(err);
  }
});