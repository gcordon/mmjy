1.call
Object.prototype.myCall = function (context, ...params) {

    if (typeof this !== 'function') {

        throw TypeError('holp caller is functiom')

    }

    let fn = Symbol('fn')

    let obj = context || window

    obj[fn] = this

    let res = obj[fn](...params)

    delete obj[fn]

    return res

}

复制代码
2.apply
Object.prototype.myApply = function (context, params = []) {

    if (typeof this !== 'function') {

        throw TypeError('holp caller is functiom')

    }

    let fn = Symbol('fn')

    let obj = context || window

    obj[fn] = this

    let res = obj[fn](...params)

    delete obj[fn]

    return res

}
复制代码
3.bind
Object.prototype.myBind = function (context, ...arg) {

    if (typeof this !== 'function') {

        throw TypeError('holp caller is functiom')

    }

    let obj = context || window

    return (...arg2) => {

        this.call(obj, ...arg, ...arg2)

    }

}

复制代码
4.instanceOf

function instance(L, R) {

    let l = L.__proto__

    let r = R.prototype

    while (true) {

        if (l === null) return false

        if (l === r) return true

        l = l.__proto__

    }

}

复制代码
5.Objeact.create
function create(obj) {

    function F() { }

    F.prototype = obj

    return new F()

}

复制代码
6.promise

function myPromise(constructor) {

    let that = this

    this.status = 'pendding'

    this.succVal = ''

    this.errVal = ''

    function resovle(val) {

        if (that.status === 'pendding') {

            that.succVal = val

            that.status = 'resolved'

        }

    }

    function reject(val) {

        if (that.status === 'pendding') {

            that.errVal = val

            that.status = 'rejected'

        }

    }

    try {

        constructor(resovle, reject)

    } catch (error) {

        reject(error)

    }

}

myPromise.prototype.then = function (succFn, errFn) {

    let that = this

    switch (that.status) {

        case 'resolved': succFn(that.succVal)
            break

        case 'rejected': errFn(that.errVal)
            break

    }

}

复制代码
7.new

function myNew(context, ...params) {

   let obj = Object.create(context.prototype)

   let res = context.apply(obj, params)

   return typeof res === 'object' ? res : obj

}

复制代码
8.深拷贝

function deepClone(p, c) {

    for (let prop in p) {

        if (typeof p[prop] === 'object') {

            c[prop] = p[prop] instanceof Array ? [] : {}

            deepClone(p[prop], c[prop])

        } else {

            c[prop] = p[prop]

        }

    }

}

复制代码
9.es5继承

function Animal(name) {

    this.name = name

}

Animal.prototype.sayName = function () {

    console.log(this.name)

}

function Dog(name, age) {

    Animal.call(this, name)

    this.age = age

}

Dog.prototype = Object.create(Animal.prototype)

Dog.prototype.constructor = "Dog"

Dog.prototype.sayAge = function () {

    console.log(this.age)

}

复制代码
10.二分查找
function binarySearch(arr, start, end, value) {

    if (start > end) {
        return -1
    }

    let middle = parseInt((start + end) / 2)

    if (value < arr[middle]) {

        end = middle - 1

        return binarySearch(arr, start, end, value)

    } else if (value > arr[middle]) {

        start = middle + 1

        return binarySearch(arr, start, end, value)

    } else if (value === arr[middle]) {

        return middle

    }

}
复制代码
11.快排

function quickSort(arr) {

    if (arr.length <= 1) { return arr; }

    let middle = Math.floor(arr / 2)

    let value = arr.splice(middle, 1)[0]

    let left = [], right = []

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] > value) {

            right.push(arr[i])

        } else if (arr[i] <= value) {

            left.push(arr[i])

        }

    }

    return quickSort(left).concat([value], quickSort(right))

}

复制代码
12.冒泡排序
function bubbleSort(arr) {

   let len = arr.length

   let temp

   for (let i = 0; i < len; i++) {

       for (let j = i + 1; j < len; j++) {

           if (arr[i] < arr[j]) {

               temp = arr[i]

               arr[i] = arr[j]

               arr[j] = temp

           }

       }

   }

   return arr

}
复制代码
13.选择排序
function selectSort(arr) {

   let len = arr.length

   let minIndex, temp

   for (let i = 0; i < len; i++) {

       minIndex = i

       for (let j = i + 1; j < len; j++) {

           if (arr[minIndex] > arr[j]) {

               minIndex = j

           }

       }

       temp = arr[minIndex]

       arr[minIndex] = arr[i]

       arr[i] = temp

   }

   return arr

}
复制代码
14.原生Ajax
let xhr = new XMLHttpRequest()

xhr.open(Get,'xxx.js',false)

xhr.onreadystatechange = function () {

   if (xhr.status === 200 && xhr.readyState === 4) {

       console.log(xhr.responseText)

   }

}
复制代码
15.订阅发布模式
let Observer = (function () {

    let __msg = {}

    return {

        register: function (type, fn) {
            if (typeof __msg[type] === 'undefined') {
                __msg[type] = [fn]
            } else {
                __msg[type].push(fn)
            }
        },
        dispatch: function (type, args) {
            if (!__msg[type]) return
            let len = __msg[type].length
            let params = { type, args }
            for (let i = 0; i < len; i++) {
                __msg[type][i].call(this, params)
            }
        },
        remove: function (type, fn) {
            if (__msg[type] instanceof Array) {
                let len = __msg[type].length - 1
                for (let i = len; i >= 0; i--) {
                    __msg[type][i] === fn && __msg[type].splice(i, 1)
                }
            }
        }

    }

})()
复制代码
16.斐波那契算法
function fibo(n) {

    if (n === 1 || n === 2) {

        return 1

    }

    return fibo(n - 2) + fibo(n - 1)

}
复制代码
17.去重
function questStep(arr) {

    let key = {}

    let value = []

    arr.forEach(element => {

        if (!(element in key)) {

            key[element] = true

            value.push(element)

        }

    })

    return value

}

复制代码
18.防抖
let antiShake = function () {

    let timer = null

    return function () {

        timer && clearTimeout(timer)

        timer = setTimeout(() => {

            console.log('防抖成功')

            timer = null
            
        }, 2000)


    }
}
复制代码
19.节流
function throttle() {

    let timer = null

    return () => {

        if (!timer) {

            timer = setTimeout(() => {

                console.log('节流成功')

                timer = null

            }, 2000)

        }

    }
}
复制代码
20.双向绑定
function bothwayBind(fromKey, container, obj, key) {

    Object.defineProperty(obj, key, {

        set(val) {

            fromKey.value = val

            container.innerHTML = val

        }

    })

    fromKey.onkeyup = function (e) {

        obj[key] = e.target.value
        
    }

}

作者：孤猎
链接：https://juejin.cn/post/6844903972705157128
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。