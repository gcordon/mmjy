
console.log('想法1 同步1')
setTimeout(() => {
    console.log('想法5 异步2 setTimeout 宏任务') 
}, 0)
new Promise((resolve) => {
    console.log('想法2 同步2')
    resolve()
})
    .then(() => {
        console.log('想法4 异步1 promise 微任务') 
    })
console.log('想法3 同步3')

js分为同步和异步
同步任务是直接放在主线程上排队依次执行的

异步任务是放任务队列中执行的，如果有多个异步任务将会在任务队列中排队等待，任务队列下一步会被移动到调用栈，
然后主线程会执行调用栈的任务。

异步任务又区分俩种，微任务和宏任务
（先为微任务再执行宏任务）：
promise构造函数是同步，then catch是微任务 setTimeout 是宏任务

js 是单线程，单线程是指 js 引擎在解析和执行js代码的时候只有【一个主线程】每次只能做一件事。
然后在调用ajax的时候，主线程在等待响应ajax的过程中会先去执行其他的事情，把ajax回调函数放到任务队列中，不会造成线程阻塞，
所以说js处理ajax的方式是异步的。

综上所述，检测调用栈是否为空以及讲某个任务添加到调用栈的过程就是event loop