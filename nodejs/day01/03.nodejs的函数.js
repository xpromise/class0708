/*
  nodejs的模块化： commonjs
    require
    module.exports
    exports

    每一个nodejs文件都是一个模块，模块就符合commonjs规范
    实际上每一个模块都被包裹了一层看不见的函数

    function (exports, require, module, __filename, __dirname) {}
      exports 暴露
      require 引入
      module 暴露
      __filename  当前文件的绝对路径
      __dirname 当前文件夹的绝对路径
 */

console.log(arguments.callee.toString());

console.log(__dirname); // C:\Users\XiongJian\Desktop\class0708-git\nodejs\day01
console.log(__filename); // C:\Users\XiongJian\Desktop\class0708-git\nodejs\day01\03.nodejs的函数.js