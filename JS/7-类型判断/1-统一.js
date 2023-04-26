log('checkType ----')
var checkType = (el) => {
    log(`${el} : ${Object.prototype.toString.call(el)}`)
}
checkType(1) // [object Number]
checkType(true) // [object Boolean]
checkType([]) // [object Array]
checkType({}) // [object Object]
checkType('a') // [object String]
checkType(null) // [object Null]
checkType(undefined) // [object Undefined]

log(`\n checkArray ----`)
var checkArray = el => {
    log(Array.isArray(el))
    log(el.constructor == Array)
    // 一直向父查找
    log(el instanceof Array)
}
checkArray([])

log(`\n constructor ----`)
log([].constructor == Array)
log(''.constructor == String)
log({}.constructor == Object)
log(`${123}`.constructor == Number)