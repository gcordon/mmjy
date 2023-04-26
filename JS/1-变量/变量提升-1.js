console.group('var let const 区别-1   之变量 提升与基本区别')

log('var 的使用 ---- ---- -----')
var var1 = 1
log(var1, window.var1) // 1    1

// var 会 变量提升
log(var2) // undefined
var var2 = 2
// 上面代码会被编译成如下
var var2
log(var2) // undefined
var2 = 2


log('let 的使用 ---- ---- -----')
let let1 = 3
log(let1) // 3

// let 不会 变量提升
// log(let2) // ❌ Cannot access 'let2' before initializatio  翻译结果:[ReferenceError:初始化之前无法访问“let2”]
let let2 = 4


log('const 的使用 ---- ---- -----')
const const1 = 5
log(const1) // 5

// const 和 let 一样也不会 变量提升
// log(const2) // ❎ Cannot access 'const2' before initialization 翻译结果:[未捕获的ReferenceError:无法在初始化前访问“const2”]
let const2 = 6
