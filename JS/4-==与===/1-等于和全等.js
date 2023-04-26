
log('  ----   相等  ==    -----')
var s = '1,2' == [1,2] // true 因为 左边 '1,2' 字符串 右边 [1,2]被强制转成 [1,2].toString()变成了 '1,2' 

var a1 = ''
var a2 = 0
var a3 = false
// == 默认等于 会进行 类型转型 分为如下步骤
// 0 进行强制转换类型
// 1 在比较前将两个被比较的值转换为相同类型
// 1.1 会将 a1 强制转换变成 flase   
// 1.2 会将 a2 强制转换变成 false
var d1 = a1 == a2 // true   因为最后俩边都强制转换 布尔值 也就是 false == false 
var d2 = a1 == a3 // true
var d3 = a2 == a3 // true

log('  ----   全等 ===    -----')

var b1 = ''
var b2 = 0
var b3 = false
var b4 = true
var g1 = a1 == a2 // false  因为 b1 类型是 string b2 类型是 number
var g2 = a1 == a3 // false  因为 b1 类型是 string b3 类型是 boolean
var g3 = a2 == a3 // false  因为 b1 类型是 number b3 类型是 boolean
var g4 = b3 == b4 // false 虽然 b3和b4 类型都是 boolean  但是 b3 值是true b4 值是 false
var g5 = b3 == b3 // true b3和b3类型相同、值相同 
var g6 = b4 == b4 // true b4和b4类型相同、值相同 