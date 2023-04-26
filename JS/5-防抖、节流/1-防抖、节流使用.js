// 1.返回函数使用了闭包，闭包会永远在内存中保存所以这个pre都是记录的上一次的结果

// 1 防抖 
// 比如 a在说话 说到一半  中途b插嘴了 那 a 又需要从0开始
// 在函数需要频繁触发时: 在规定时间内，只让最后一次生效，前面的不生效。
let Trembling = (callback) => {
    let 干活中 = null
    return (e) => {
        // 中途b插嘴了
        if (干活中) {
            // 从0开始
            干活中 = null
        }
        // 2.修改this的目的是让函数的指向指向绑定事件的DOM
        callback.call(this, e)
        
        // this.x = 11
        干活中 = setTimeout(()=>{
            干活中 = null
        }, 1000)
    }
}
// 2 节流
// 比如 a需要 干很多活  领导a、b、c安排了活  a接受了，但是会按到领导a到c的顺序执行下去干
var throttle2 = (callback) => {
    let 干活中 = null
    return (e) => {
        if (干活中) {
            return
        }
        // 2.修改this的目的是让函数的指向指向绑定事件的DOM
        callback.call(this, e)

        干活中 = setTimeout(()=>{
            log('干活中间  ', 干活中)
            干活中 = null
        }, 500)
    }
}
var throttle = (callback, delay = 1000) => {
    // https://skilled.dev/course/throttle
    var throttleTimeout = null
    let storeEvent = null

    var throttledEventHandler  = (event) => {
        storeEvent = event

        if (throttleTimeout == null) {
            callback(storeEvent)

            storeEvent = null

            throttleTimeout = setTimeout(() => {
                throttleTimeout = null

                if (storeEvent) {
                    throttledEventHandler(storeEvent)
                }
            }, delay)
        }
    }

    return throttledEventHandler
}
var returnedFunction = throttle(function(event) {
    // Do all the taxing stuff and API requests
    log(event)
  }, 500);
  
  window.addEventListener('scroll', returnedFunction);

// window.onscroll = (Trembling((event)=>{
//     log(event, this.x)
// }))
// window.onscroll = throttle((event)=>{
//     log(event, this.x)
// })

let s = (a) => {
    return (b) => {
        log('参数', a, b)
    }
}
// log(s(1)(2))