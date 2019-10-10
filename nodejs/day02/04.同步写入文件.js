/*
  fs是nodejs核心模块，需要引入才能使用

  同步写入文件：
    1. 打开文件
      fs.openSync(path[, flags, mode])
        path  文件路径
        flags 可选值，一定有默认值  'r'   要对文件进行的操作
        mode  可选值，一定有默认值 0o666  设置文件的操作权限
          0o666 可读可写
          0o111 文件可执行
          0o222 文件可写入
          0o444 文件可读取
        返回值：表示文件描述符的整数。
    2. 写入文件
      fs.writeSync(fd, string[, position[, encoding]])
        fd 文件描述符的整数
        string 写入的内容
        position 从哪个位置开始  0
        encoding 编码方式  utf-8

        返回值：写入的字节数
    3. 关闭文件
      fs.closeSync(fd)
 */

// 引入fs
const fs = require('fs');

// 打开文件
const fd = fs.openSync('./a.txt', 'a');
console.log(fd);

// 写入文件
const byte = fs.writeSync(fd, '111今天天气真晴朗~');
console.log(byte);

// 关闭文件
fs.closeSync(fd);