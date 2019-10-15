const express = require('express');
const app = express();
/*
  ejs：模板引擎
    1. 服务器渲染技术
    2. 使用：
      1. 下载ejs
        npm i ejs
      2. 配置ejs
        // 配置使用哪个模板引擎
        app.set('view engine', 'ejs');
        // 配置模板资源目录
        app.set('views', './views');
      3. 使用ejs
        // 将数据渲染到页面上，并返回渲染好数据的页面给浏览器
        res.render('模板资源名称', { 要渲染的数据 })
 */

// 配置使用哪个模板引擎
app.set('view engine', 'ejs');
// 配置模板资源目录
app.set('views', 'views');

app.get('/', (req, res) => {
  const person = [
    { name: '<strong>jack</strong>', age: '<strong>18</strong>' },
    { name: 'rose', age: 20 }
  ];
  res.render('index.ejs', { person });
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});