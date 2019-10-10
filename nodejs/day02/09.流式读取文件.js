

const fs = require('fs');
// 创建可读流
const rs = fs.createReadStream('C:\\Users\\XiongJian\\Desktop\\class0708\\day11\\05.文件写入.avi');
// 创建可写流
const ws = fs.createWriteStream('a.avi');

rs.once('open', () => {
  console.log('可读流打开了~');
});

rs.once('close', () => {
  console.log('可读流关闭了~');
  // 关闭可写流
  ws.end();
});

ws.once('open', () => {
  console.log('可写流打开了~');
});

ws.once('close', () => {
  console.log('可写流关闭了~');
});

// 接受读取的数据
rs.on('data', (thunk) => {
  // 65536 byte = 64 kb
  // console.log(thunk.length); // 每次读取的数据
  ws.write(thunk);
});

