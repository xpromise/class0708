const http = require('http');

module.exports = class Application {
  constructor() {
    // 中间件数组
    this.middleware = [];
  }

  // 使用中间件
  use(fn) {
    // 将所有中间件函数添加到一个数组中
    this.middleware.push(fn);
    return this;
  }

  // 监听端口号
  listen(...args) {
    const server = http.createServer((req, res) => {
      // 处理请求回调函数
      // 执行中间件函数
      this.middleware.forEach((fn) => fn(req, res));
    });
    server.listen(...args);
  }
};