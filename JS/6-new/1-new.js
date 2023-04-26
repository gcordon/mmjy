function Car(make, model, year) {
    //  这里的 this  == window 了
    //  如果想要 this 不是 window ，那么需要改成箭头函数， 获取在调用函数的时候 bind call 或 apply 绑定 this 值
    this.make = make;
    this.model = model;
    this.year = year;
    this.t = function() {
        console.log(this.make)
    }
    return this
}
function news(funcOrClass, ...args) {
    // 创建一个空的简单 JavaScript 对象（即 {}）；
    var o = {}
    // 为步骤 1 新创建的对象添加属性 __proto__，将该属性链接至构造函数的原型对象；
    o.__proto__ = funcOrClass.prototype
    // 将步骤 1 新创建的对象作为 this 的上下文；
    // 如果该函数没有返回对象，则返回 this。
    let s = funcOrClass.apply(o, args)
    if (Object.prototype.toString.call(s) === '"[object Object]"') {
        return s
    } else {
        return o
    }
}
var car1 = new Car('Eagle', 'Talon TSi', 1993);
var car2 = news(Car, 'Eagle', 'Talon TSi', 1993)

console.log(car1)
console.log(car2)
car1.t()
car2.t()