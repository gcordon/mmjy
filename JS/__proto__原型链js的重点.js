// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype

TODO:
__proto__ 和 prototype 有啥区别
1. __proto__    数组  对象  函数  new函数之后的     都有  也就是大部分是有的
2. prototype    只有  函数有   死记就好了

那么他们是什么关系呢
    *.__proto__ 的意思是访问他的父亲    * 是他自己  .__proto_ 是他的父亲  
    所有就是  
        [1,2,3].__proto__    =>  他的父亲就是最开始的 Array.prototype
        {a:1}.__proto_      =>   他的父亲就是 Object.prototype  就能拿到他的父亲
    那是否就能继续呢，可以
    [1,2,3].__proto__.__proto__           => 就是 自己 [1,2,3] -> 父亲 Array.prototype -> 爷爷 Object.prototype
    [1,2,3].__proto__.__proto__.__proto__ => 就是 自己 [1,2,3] -> 父亲 Array.prototype -> 爷爷 Object.prototype -> null 因为最高级就是 Object.prototype

                [1,2,3].__proto__           == Array.prototype
                [1,2,3].__proto__.__proto__ == Object.prototype


    {a:1}.__proto_           => 就是 自己 {a:1} -> 父亲 Object.prototype
    {a:1}.__proto_.__proto__ =>  就是 自己 {a:1} -> 父亲 Object.prototype -> 爷爷 null

                    {a:1}.__proto__          == Object.prototype
                    {a:1}.__proto__.__proto__ == null


    从上面的推倒，可以知道， 最顶层就是 Object.prototype, 


    // 特殊点： 函数
    function f() {}
    f.__proto__  =>          f.__proto__ == Function.prototype
    f.prototype  =>     再一次提醒，只有函数才有 .prototype 能访问
                        f.prototype.a = 10  f.prototype.log = function() { console.log('log')}
                        f.prototype  获取到的是    {a: 10, log: ƒ, constructor: ƒ}
    f.prototype.__proto__ =>   自己 f -> f.构造函数的prototype -> Object.prototype
                        // 特殊注意相等  f.prototype.__proto__ ===  f.__proto__.__proto__ 但是不要学，不关心， 只关心 f.prototype 就好了

    然后看一下 函数被 new 调用后 
    var fn = new f()
    fn.__proto_   前面说了 __proto__ 就是获取他的父亲，那fn的父亲就是 f函数， 所以 fn.__proto_ === f.prototype

    类推  fn的父亲的父亲            f函数的父亲的父亲
    fn.__proto__.__proto__  ===  f.prototype.__proto__



    怎么判断 prototype 呢， 用 Object.getPrototypeOf(*)
    Object.getPrototypeOf(a) === Array.prototype
    Object.getPrototypeOf({}) === Object.prototype

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
    从上面的 __proto__ 来推到 instanceof  这个方法的实现
    arr = [1,2,3]
    arr instanceof Array     应该就是     a.__proto__ === Array.prototype 这样子来判断

    const myDate = new Date();
    1 myDate instanceof Date; // true
    2 myDate instanceof Object; // true
    3 myDate instanceof String; // false
    1 2 都是对的，所以说 js 的一切皆为对象

    再推到一下，为什么 js 一切皆为对象

    Array.prototype.__proto__ === Object.prototype
    Function.prototype.__proto__ === Object.prototype

    


// clear()
// ctrl +  option + n 可触发当前 js文件

// function obj 才有 __proto__ 这个属性
var log = console.log.bind(console)
function func() {
}
//  这里之所有要 new 是因为要把func 的值拿出来，具体的 看 new 的实现就能明白， 如果 直接 拿 func的话，如果 func 没返回值，那就是空了， 
var newFunc = new func()
var obj = {}
var arr = []


log('--------------log __proto__ ----------------------')
// TODO: __proto__ 介绍 
// TODO: Object.prototype (en-US) 的 __proto__ TODO: 属性是一个访问器属性 （一个 getter 函数和一个 setter 函数）,
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
// __proto___ 的优化 pai
// Object.getPrototypeOf/Reflect.getPrototypeOf 和Object.setPrototypeOf/Reflect.setPrototyp
log(func.__proto__, )
// ƒ () { [native code] }
log(newFunc.__proto__, )
// VM5058:14 {constructor: ƒ}
log(obj.__proto__, )
// VM5058:15 {name: 2, constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, …}
log(arr.__proto__, )
// VM5058:16 [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
// TODO: 如上所得， 都有 __proto__ 属性
log('--------------log prototype ----------------------')
log(func.prototype)
// {constructor: ƒ}
log(newFunc.prototype)
// VM5069:23 undefined
log(obj.prototype)
// VM5069:24 undefined
log(arr.prototype)
// VM5069:25 undefined
log(Object.prototype)
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
// TODO: 如上所得， 只有 function函数 和 Object对象 有 prototype 属性
log('----------------log __proto and prototype --------------------')


var setValue1 = function() {
    // TODO: 查找 值  规则
    // 1. 找 x.x 的值, 
    // 2  找 x.__proto__
    // 3. 找 x.prototype.__proto__ 
    // 4. [x.prototype无法直接访问]
    // 直接赋值
    func.a = 1;
    // 挂在原型  TODO: func.prototype 直接调用是获取不了的  需要 s = new 函数()  s才能获取到这个值
    func.prototype.a = 3;
    // 这里 __proto__ 是 func 自己的属性
    func.__proto__.a = 4;
    // 这个是 func 原型链的访问属性  这个访问属性是 Object.prototype  所以  func.prototype.__proto__ === Object.prorotype
    func.prototype.__proto__.a = 5;
    // 这里 __proto__ 是 newFunc 自己的属性  newFunc有 __proto__ 属性
    newFunc.a = 6;
    newFunc.__proto__.a = 7;
    // TODO: 这里可以试试 delete newFunc.a 的值持续试试

    // TODO: 一样的
    log(newFunc.__proto__ === func.prototype);  // true
}

var setValue2 = function () {
    newFunc.__proto__.a = 10; // TODO: 这里相当于执行了 func.prototype.a = 10
    func.prototype.__proto__.a = 11; // TODO: 这里相当于执行了 Object.a = 11 或者 Object.__proto__.a = 11;
    // newFunc.prototype; // TODO: 没有 prototype 因为他是new出来的
}
setValue2()
