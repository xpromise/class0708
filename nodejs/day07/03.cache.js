const express = require('express');
const { resolve } = require('path');
const { readFile, stat, watchFile } = require('fs');
const etag = require('etag');

const app = express();

/*
  缓存：
    强制缓存
      http 1.1 cache-control
      http 1.0 expires

      特点：在缓存的期限内，不会发送请求，直接读取缓存

    协商缓存
      响应头（服务器发给浏览器）
        etag 文件唯一标识
        last-modified 文件最近一次修改时间
      请求头
        if-none-match 文件唯一标识
        if-modified-since 文件最近一次修改时间

      流程：
        第一次浏览器访问服务器资源： 服务器设置响应头并返回资源给浏览器
          etag xxx
          last-modified xxx
        浏览器接受到服务器返回的响应头，就会存储起来。
        第二次浏览器访问服务器资源，自动携带上之前存的响应头，作为请求头发送过去（会改名字）
          etag --> if-none-math
          last-modified --> if-modified-since
        服务器
          判断服务器保存的etag和浏览器发送过来if-none-math的值是否相等
          判断服务器保存的last-modified和浏览器发送过来if-modified-since的值是否相等
          如果都相等，走协商缓存  304
          如果有一个不相等，说明资源发生过变化，返回新资源

      特点：一定会访问服务器（一定发送请求），由服务器决定是否走缓存

      当强制缓存和协商缓存都存在：
        先看强制缓存。命中了，就直接读取缓存
        如果强制缓存失效（过期了），看协商缓存
 */


app.get('/', (req, res) => {
  // 访问当前路由，返回index.html
  // sendFile方法默认设置强制缓存、协商缓存
  // res.sendFile(resolve(__dirname, 'public/index.html'));
  const filePath = resolve(__dirname, 'public/index.html');
  readFile(filePath, (err, data) => {
    if (!err) {
      // 返回响应
      res.end(data);
    } else {
      console.log(err);
    }
  });
});

// 强制缓存
app.get('/js/index.js', (req, res) => {
  const filePath = resolve(__dirname, 'public/js/index.js');
  readFile(filePath, (err, data) => {
    if (!err) {
      // 设置强制缓存  设置响应头
      res.set('cache-control', 'max-age=20');
      // res.set('expires', new Date(Date.now() + 10000).toGMTString());
      // 返回响应
      res.end(data);
    } else {
      console.log(err);
    }
  });
});


let etagName = '';
let lastModified = 0;

const filePath = resolve(__dirname, 'public/css/index.css');

// 监视文件的变化
watchFile(filePath, (curr, prev) => {
  // 说明文件发生了变化，修改etagName/lastModified
  etagName = etag(curr);
  lastModified = new Date().toGMTString();
});
// 读取文件，获取初始化etagName， lastModified
stat(filePath, (err, stats) => {
  if (!err) {
    etagName = etag(stats);
    lastModified = new Date().toGMTString();
  }
});

// 协商缓存
app.get('/css/index.css', (req, res) => {

  // 就要和etag对比
  const ifNoneMatch = req.headers['if-none-match'];
  // 就要和lastModified对比
  const ifModifiedSince = req.headers['if-modified-since'];

  if (ifNoneMatch === etagName && ifModifiedSince === lastModified) {
    // 都相等，走缓存
    res.status(304).end();
    return
  }
  // 返回新资源
  readFile(filePath, (err, data) => {
    if (!err) {
      // 设置协商缓存
      // 接受浏览器发送过的etag和last-modified。 与当前的值对比。 如果一样，走缓存，不一样就返回最新的资源
      res.set('etag', etagName);
      res.set('last-modified', lastModified);
      // 返回响应
      res.end(data);
    } else {
      console.log(err);
    }
  });
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});