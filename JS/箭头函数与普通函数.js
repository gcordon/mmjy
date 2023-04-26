// 箭头函数与普通函数
// 箭头函数没有自己的this，只能通过作用域链来向上查找离自己最近的那个函数的this

// 没有this 自然也不能 使用 call apply bind 方法来改变this
// 如果普通函数包含箭头函数，箭头函数的this就是被它包含的那个函数

// 参考：
// https://github.com/mqyqingfeng/Blog/issues/85

// 代码实现:
// this 情况一
