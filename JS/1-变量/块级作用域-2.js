console.group('var let const 区别-2   之块级作用域')

{
    var var11 = 11
}
log(var11) // 11
// 获取 到了上面块级作用域的变量 , 说明 var 没有块级作用域的用途

{
    let let22 = 22
}
// log(let22) // ❌ let22 is not defined
// 获取 不到 上面块级作用域的变量 , 说明 let 没有块级作用域的用途    

{
    let const33 = 33
}
// log(const33) // ❌  const33 is not defined
// 获取 不到 上面块级作用域的变量 , 说明 let 没有块级作用域的用途  


