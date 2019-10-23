function Event() {
  this._events = {};
}
// 绑定事件方法
Event.prototype.on = function (eventType, callback) {
  // 如果事件不存在
  if (!this._events[eventType]) {
    // 创建事件存起来，值为空数组
    this._events[eventType] = [];
  }
  // 将事件回调函数添加进去
  this._events[eventType].push(callback);
};
// 解绑事件方法
Event.prototype.off = function (eventType, callback) {
  this._events[eventType] = this._events[eventType].filter((item) => item !== callback);
};
// 触发事件方法
Event.prototype.emit = function (eventType, data) {
  this._events[eventType].forEach((callback) => callback(data));
};
// 绑定一次性事件方法
Event.prototype.once = function (eventType, callback) {
  const that = this;
  // 如果事件不存在
  if (!this._events[eventType]) {
    // 创建事件存起来，值为空数组
    this._events[eventType] = [];
  }

  const newFn = function () {
    // 调用一次
    callback();
    // 解绑事件
    that.off(eventType, newFn);
  };
  // 将事件回调函数添加进去
  this._events[eventType].push(newFn);
};

const event = new Event();

event.once('click', function () {
  console.log(111);
});
event.on('click', function () {
  console.log(222);
});
const callback = function () {
  console.log(333);
};
event.on('click', callback);

event.emit('click');

event.off('click', callback);

event.emit('click');

