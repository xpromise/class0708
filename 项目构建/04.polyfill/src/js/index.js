// 引入polyfill
// import '@babel/polyfill';

const promise = new Promise(resolve => setTimeout(resolve, 1000));
console.log(promise);

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const p = new Person('jack', 18);
console.log(p);