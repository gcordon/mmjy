// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function

// async 和 prmise 的使用场景
/*
例子：
做事情1 。。。。同步
做事情3 (ajax) 。。。。。异步，这里可能会等待 2 秒中后才执行  这里用到了 promise
做事情2。。。。同步 
按照事件执行机制的话， 顺序是 
做事情1 做事情2  做事情3 


那如果换成 async awiat 配合呢
事情1 。。。。同步
做事情3 (ajax) 。。。。。await就能让异步的操作变为同步，这里可能会等待 2 秒中后才执行  这里用到了 awit
做事情2。。。。同步 
按照事件执行机制的话， 顺序是 
做事情1 做事情3 做事情2
*/

// async 和 await 是关键字的 意思
// async 关键字声明的函数可能包含    0 个或者  多个 await 表达式
// await 表达式会暂停整个 async 函数的执行进程并出让其控制权
// await 表达式 === await Promise.resove()  就是 await 表达式的意思
// 只有当其等待的基于 promise 的异步操作被兑现或拒绝之后才会恢复进程
// promise 的解决值会被当做该 await 表达式的返回值
// 使用 async/awiat 关键字就可以在异步代码中使用普通的 try/catch 代码块


// 备注： async/await的目的为了简化使用基于 promise 的 API 时所需的语法。
// async/await 的行为就好像搭配使用了生成器和 promise。
async function w() {
    // 从第一行代码直到（并包括）第一个 await 表达式（如果有的话）都是同步运行的。
    // 这样的话，一个不含 await 表达式的 async 函数是会同步运行的。
    // 然而，如果函数体内有一个 await 表达式，async 函数就一定会异步执行。
    
    // return 1
    // 上面代码等价于下面
    // return Promise.resolve(1)

    await 1
    // 上面代码等价于下面
    return Promise.resolve(1).then(() => undefined)
}

log(w()) // 2-async-await.js:4 Promise {<fulfilled>: undefined}

w().then((e)=>{
    log(e)
}).catch((err)=>{
    log(err)
})


// 1 foo 函数的第一行将会同步执行，await 将会等待 promise 的结束。
// 然后暂停通过 foo 的进程，并将控制权交还给调用 foo 的函数。

// 2 一段时间后，当第一个 promise 完结的时候，控制权将重新回到 foo 函数内。
// 示例中将会将1（promise 状态为 fulfilled）作为结果返回给 await 表达式的左边即 result1。
// 接下来函数会继续进行，到达第二个 await 区域，此时 foo 函数的进程将再次被暂停。

// 3 一段时间后，同样当第二个 promise 完结的时候，result2 将被赋值为 2，
// 之后函数将会正常同步执行，将默认返回undefined 。

async function foo() {
  const result1 = await new Promise((resolve) =>
    setTimeout(() => resolve("1"))
  );
  const result2 = await new Promise((resolve) =>
    setTimeout(() => resolve("2"))
  );
}


log(' 特殊 情况 ****  注意点')

function getResove(model) {
  let v
  if (model == 1) {
    v = Promise.resolve(1)
  } else if (model == 2) {
    v = Promise.reject(2)
  } else {
    v = null
  }
  return v
}
async function t() {
  try {
    return getResove(2) // 这样的话 不会 走到下面的 catch 方法
    // return await getResove(2) // 这样的话 会走到 下面 catch 方法 
  } catch (error) {
    log('错误 ', error)
    return null
  }
}
log('t 函数返回值', )
t()
.then(
  e=>log(`t 正确: ${e}`)
)
.catch(
  err=> log(`t 错误: ${err}`)
)