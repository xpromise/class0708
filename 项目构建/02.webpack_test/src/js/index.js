import add from './module1';
import Person from './module2';
import data from '../json/data';
import $ from 'jquery'; // 引入样式: 为了webpack能够打包样式资源

import '$css/test1.css';
import '$css/test2.css';
import '$css/iconfont.css';
import '$less/test1';
import '$less/test2';
console.log($);
console.log(data);
console.log(add(3, 3));
const p = new Person('jack', 18);
console.log(p);
console.log(1 === '1');
const promise = new Promise(function pro(resolve) {
  return setTimeout(resolve, 1000);
});
console.log(promise);

if (module.hot) {
  module.hot.accept('./module1', function hot() {});
}
/*
  下载包：
    npm i webpack webpack-cli -g
    npm i webpack webpack-cli -D
  使用：
    webpack src/js/index.js -o build/js/built.js --mode=development
      功能：
        1. 将所有js打包成一个js
        2. 将ES6的模块化语法装换成浏览器能识别的语法
    webpack src/js/index.js -o build/js/built.js --mode=production
      功能：
        1. 将所有js打包成一个js
        2. 将ES6的模块化语法装换成浏览器能识别的语法
        3. 压缩js代码
    默认webpack只能打包js和json文件，其他文件类型需要引入loader解析
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
