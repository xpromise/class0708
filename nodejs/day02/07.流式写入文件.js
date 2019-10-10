/*
  流式写入文件
    fs.createWriteStream(path[, options])
 */

const fs = require('fs');

// 创建可写流
const ws = fs.createWriteStream('b.txt');

// 绑定一次性事件
ws.once('open', () => {
  console.log('可写流打开了~');
});

ws.once('close', () => {
  console.log('可写流关闭了~');
});

// 写入数据
ws.write('锄禾日当午');
ws.write('锄禾日当午');

ws.write('汗滴禾下土');
ws.write('汗滴禾下土');

ws.write('谁知盘中餐');
ws.write('谁知盘中餐');

ws.write('粒粒皆辛苦');
ws.write('粒粒皆辛苦');

// 手动关闭
// ws.close(); // 可能会导致数据没有全部写入进去
ws.end();