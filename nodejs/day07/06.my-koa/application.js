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
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
  // 做一些准备
  callback() {
    // 整合中间件
    const fn = compose(this.middleware);

    const handleRequest = (req, res) => {
      // 处理请求回调函数
      const context = this.createContext(req, res);
      // 执行中间件函数
      this.handleRequest(context, fn);
    };

    return handleRequest;
  }
  // 创建context
  createContext(req, res) {
    const context = {};
    context.req = req;
    context.res = res;
    return context;
  }
  // 处理请求函数: 执行中间件函数
  handleRequest(context, fn) {

    const handleResponse = () => {
      // 统一返回成功响应
      respond(context);
    };

    const error = () => {
      // 返回失败错误
      context.res.statusCode = 500;
      context.res.end();
    };

    fn(context).then(handleResponse).catch(error);
  }
};

// 处理响应
function respond(context) {
  context.res.end(context.res.body);
}

function compose(middleware) {
  return function (context) {
    let index = -1;
    // 默认调用一次，为了触发第一个中间件函数
    return dispatch(0);
    function dispatch(i) {
      if (i <= index) return Promise.reject('不能调用多次next方法');
      index = i;
      const fn = middleware[i];
      // 处理在最后一个中间件调用next
      if (!fn) return Promise.resolve();

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
}

/*
  [(req, res, next) => {}, () => {}]
 */
/*function compose(middleware) {
  return function (req, res) {
    // 默认调用一次，为了触发第一个中间件函数
    return dispatch(0);

    function dispatch(i) {
      const fn = middleware[i];
      fn(req, res, dispatch.bind(null, i + 1));
    }
  }
}*/

/*
function compose(middleware) {

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      // if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      // 取出中间件函数
      let fn = middleware[i]

      // if (i === middleware.length) fn = next
      // if (!fn) return Promise.resolve()

      try {
        // next() 方法实际上就是 dispatch(i+1)
        const result = fn(context, dispatch.bind(null, i + 1));

        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}*/

/*
function add(x, y) {
  return x + y;
}
add(1, 2)

function add(x) {
  return function (y) {
    return x + y;
  }
}
add(1)(2)*/
