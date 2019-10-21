import '../css/test1.css';
import '../css/test2.css';

import print from './module1';

document.getElementById('btn').onclick = function () {
  print();
};

// 如果module.hot存在，说明当前启用了HMR功能
if (module.hot) {
  // 一旦module1文件发生变化，就会调用后面的回调函数更新。而其他文件不更新
  module.hot.accept('./module1', function () {
    /*document.getElementById('btn').onclick = function () {
      print();
    };*/
  })
}


