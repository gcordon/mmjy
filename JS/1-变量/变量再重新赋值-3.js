console.group('var let const 区别-3 之变量再重新赋值')
var var33 = 33
log(var33) // 33
var var33 = 33   // 可以继续声明
var33 = 333
log(var33) // 333

let let44 = 44
log(let44)  // 44
// let let44 = 444   // ❌ 无法重新声明块范围变量“let44”
let44 = 444  
log(let44) // 44


const const55  = 55
log(const55)
// const const55  = 55  // ❌ 无法重新声明块范围变量“const55”
// const55 = 555 // ❌ 不能给常量重新赋值 Assignment to constant variable
// log(const55)  // ❌ 不能重常量新赋值 Assignment to constant variable


let let444 = {
    a: 444
}
log(let444) // {a: 444}
let444.a = 4444
log(let444.a) // 4444
let44 = 1
log(let44) // 1


const const555 = {
    a: 555
}
log(const555) // {a: 555}
const555.a = 5555
log(const555.a) // 5555
// const55 = 2  // ❌无法重新赋值     Assignment to constant variable.
// log(const55)  // ❌ 无法重新赋值     Assignment to constant variable.