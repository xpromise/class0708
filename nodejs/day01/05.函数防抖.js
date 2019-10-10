
/*
  函数防抖：让函数在规定时间内只调用一次。 触发最后一次
 */
function debounce(fn, time = 300) {
  let timerId = null;
  return function () {
    // 将上一次定时器给清除掉
    clearTimeout(timerId);
    // 重新设置新的定时器
    timerId = setTimeout(() => {
      fn.apply(this, arguments);
    }, time)
  }
}