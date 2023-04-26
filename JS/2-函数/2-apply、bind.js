// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
// bind 的使用
// **.apply(thisArg)
// **.apply(thisArg, argsArray)

function func1(a, b) {
    log('bind ', this, a, b)
}
var obj = {
    a: 10
}
// 这样使用的话 func1 的 this 就能访问到 obj 了
func1.apply(obj, [1,2])

// apply 的第一个参数 指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
var m = [1,2,33,4]
// math 原始用法是 
var s1 = Math.max(1, 2, 33, 4)
var s2 = Math.max.apply(null, m) // // 基本等同于 Math.max(numbers[0], ...) 或 Math.max(1,2,33, ..)
var s3 = Math.max.apply(null, null)
// apply 的第二个参数 如果该参数的值为 null 或 undefined，则表示不需要传入任何参数。
log(s1) // 33
log(s2) // 33
log(s3) // -Infinity


var arr = [1,2]
var addArr = [3,4,]
arr.push(addArr)
log(arr) //  [1, 2, Array(2)
// 但是，如果 push 的参数是数组，它会将该数组作为单个元素添加，
// 而不是将这个数组内的每个元素添加进去，因此我们最终会得到一个数组内的数组。
// 如果不想这样呢？concat 符合我们的需求，但它并不是将元素添加到现有数组，
// 而是创建并返回一个新数组。然而我们需要将元素追加到现有数组......
// 那么怎么做好？难道要写一个循环吗？别当然不是！
arr.push.apply(arr, addArr) // 2-apply、bind.js:37 (5) [1, 2, Array(2), 3, 4]
console.info(arr)


// bind 
window.x = 10
var module = {
    x: 20,
    getX: function () {
        return this.x
    }
}
log('s ', module.getX()) // 20    调用getX函数的前面，也就是module
var s0 = module.getX.bind(module) 
log('s0 ', s0()) // 20    调用getX函数的前面，也就是module

var s1 = module.getX
log('s1 ', s1())   //  10   因为函数是在全局作用域中调用的   

var s2 = module.getX.bind(window,) // 绑定 getX 的this为 bind 的参数一
log('s2 ', s2())   //  10   因为函数是在全局作用域中调用的



// 配合 setTimeout
// TODO: 在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window（或 global）对象。
function late() {
    this.age = 10
}
late.prototype.time = function() {
    // setTimeout 第一个参数回调的 this 关键字会指向 window（或 global）对象。
    // 这里手动绑定 this 为当前 
    window.setTimeout(this.show.bind(this), 500) // 10 

    // setTimeout 第一个参数回调的 this 关键字会指向 window（或 global）对象。
    // window.setTimeout(this.show.bind(this), 500) // undefined

    setTimeout(() => {
        this.show()   // 10
    }, 500);

    setTimeout(function(){
        this.show()   // this.show is not a function
    }, 500);
}
late.prototype.show = function() {
    console.log('show ', this.age)
}
var l = new late()
l.time()

