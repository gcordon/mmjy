function valueOfFunc(n) {
    this.number = n
    this.age = 10
}
valueOfFunc.prototype.valueOf = function() {
    return this.number + 1
}
var o = new valueOfFunc(3)
log(o + 10) // 3 + 1 + 10