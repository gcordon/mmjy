// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
var a = [1,2,3]
// Object.setPrototypeOf(obj, prototype)
// obj
// 要设置其原型的对象。

// prototype
// 该对象的新原型（一个对象或 null）。
Object.setPrototypeOf(a, { log: function() { console.log(2)}})


function Ctor() {}
const inst = new Ctor();
console.log(Object.getPrototypeOf(inst) === Ctor.prototype); // true