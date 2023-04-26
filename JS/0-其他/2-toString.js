// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
// 所有继承自 Object.prototype 的对象
// （即，除了 null-prototype 对象之外的对象）都继承 toString() 方法。
var s = 0xff
log(s.toString())  //255
log(s.toString(2)) // 11111111

var n = 11
log(n.toString(), typeof n.toString()) // 11 string
log(true.toString(), typeof true.toString()) // 11 string
log([1,2].toString(), typeof [1,2].toString()) // 1,2 string
log({a:1}.toString(), typeof {a:1}.toString()) // [object Object] string



// 要将基本的 Object.prototype.toString() 用于重写的对象（或者在 null 或 undefined 上调用它）
// 你需要在它上面调用 Function.prototype.call() 或者 Function.prototype.apply()，
// 将要检查的对象作为第一个参数传递（称为 thisArg）。

// Object.prototype.toString() 返回 "[object Type]"，这里的 Type 是对象的类型。如果对象有
log(Object.prototype.toString.call(null)) // [object Null]
log(Object.prototype.toString.call(undefined)) // [object Undefined]
log(Object.prototype.toString.call(1)) // [object Number]
log(Object.prototype.toString.call('s')) // [object String]
log(Object.prototype.toString.call({})) // [object Object]
