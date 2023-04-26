// https://juejin.cn/post/7128233572380442660#comment




var o = {
    name: 1,
    echo(e1, e2) {
        console.log('name ', this.name);
        console.log(`e1 = ${e1} ===   e2 = ${e2}`);
        return this.name
    }
}
var l = {
    name: 2,
}

o.echo() // 1   指向了 o

var c1 = o.echo
c1()  // undefine 指向了 window

//  call 参数一  函数指向的新的this  参数二  k1,k2,k3  多个值
Function.prototype.myCall = function(target,...args){
    //  apply 参数一 函数指向的新的this  参数二  [] 数组
// Function.prototype.myApply = function(target,args){
    // call的实现就是 
    // 让 l 对象有 echo 方法

    target = target || window
    const symbolKey = Symbol()
    // 这个 this 就是 echo 方法
    // 所以就是 l 添加了一个 key  这个 key 是随机唯一性的， value 是 echo 这个方法
    target[symbolKey] = this

    // 下面调用就是 l.echo(参数)
    // target 就是 l
    // 那么 taget.echo   echo前是target echo的this就是taget 啦
    const res = target[symbolKey](...args) // args本身是rest参数，搭配的变量是一个数组，数组解构后就可以一个个传入函数中

    // 调用完就删除掉
    delete target[symbolKey] // 执行完借用的函数后，删除掉，留着过年吗？

    //  最后返回调用完函数后的结果
    return res
}
Function.prototype.myBind = function(target, args) {
    //  bind 和 apply 大致相同，只不过 bind 是返回一个函数  而 apply 和 call 是直接调用函数
    target = target || window
    const symbolKey = Symbol()
    target[symbolKey] = this
    // 返回一个闭包， 闭包内调用函数
    return function(...闭包参数) {
        // 闭包内部函数 访问 外部函数， 也就是访问 taget
        // 调用函数
        // 参数
        target[symbolKey](...args, ...闭包参数)
    }

}

//   链接：https://juejin.cn/post/7128233572380442660
o.echo.call(l, '你', '是')  // 2  改变了 this 的指向， 指向了 l
o.echo.myCall(l, '你', '是')
let b = o.echo.myBind(l, '闭') 
b('包')