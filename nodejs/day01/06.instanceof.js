/*
  A instanceof B
  检测A.__proto__ 是否等于 B.prototype
 */

/*function _instanceof(A, B) {
  // A取隐式原型
  A = A.__proto__;
  // B取显示原型
  const b = B.prototype;

  if (A === null) return false;
  if (A === b) return true;

  return _instanceof(A, B);
}*/

function _instanceof(A, B) {
  // A取隐式原型
  A = A.__proto__;
  // B取显示原型
  B = B.prototype;

  while (true) {
    if (A === null) return false;
    if (A === B) return true;
    // 找隐式原型上的隐式原型
    A = A.__proto__;
  }
}