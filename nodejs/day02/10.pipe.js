
const fs = require('fs');
// 创建可读流
const rs = fs.createReadStream('C:\\Users\\XiongJian\\Desktop\\class0708\\day11\\05.文件写入.avi');
// 创建可写流
const ws = fs.createWriteStream('a.avi');

rs.pipe(ws);
