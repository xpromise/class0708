/*
  Buffer nodejs中用来存储二进制数据的容器
    Buffer.alloc()  安全的
    Buffer.allocUnsafe() 不安全的

    Buffer.from(string) 能将一个字符串数据装换buffer，以二进制数据存储
    buf.toString() 将buffer数据装换成字符串
 */

// const buf = new Buffer(10); // 即将被废弃
// console.log(buf);

const buf1 = Buffer.alloc(10);
console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

const buf2 = Buffer.allocUnsafe(10);
console.log(buf2); // <Buffer 60 77 8b be 1d 02 00 00 30 d5>
// buf2是一个伪数组
buf2[0] = 50;
console.log(buf2);
/*
  十六进制
  00 - ff
  十进制
  0 - 255
  二进制
  00000000 - 11111111

  1 bit 位
  1 byte 字节 = 8 bit
    英文字母 1字节
    中文 3字节
  1 kb = 1024 byte
  1 mb = 1024 kb
  1 gb = 1024 mb
 */

// const str = 'hello atguigu';
const str = '尚硅谷';
const buf3 = Buffer.from(str);
console.log(buf3.toString());
