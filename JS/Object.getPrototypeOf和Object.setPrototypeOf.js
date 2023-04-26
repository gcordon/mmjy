// es6 extends 继承
class Human {}
class SuperHero extends Human {}

const superMan = new SuperHero();


// es5 Object.setPrototypeOf 继承
function Hu(name, level) {
    this.name = name
    this.level = level
}
function Su(name, level) {
    Hu.call(this, name, level)
}
// Object.setPrototypeOf() 方法设置一个指定的对象的原型（
Object.setPrototypeOf(Hu.prototype, Su.prototype)
// Hook up the static properties
Object.setPrototypeOf(Hu, Su);
Hu.prototype.speak = function () {
    return `${this.name} says hello.`;
}
Su.prototype.fly = function () {
    return `${this.name} is flying.`;
}
const ku = new Hu('Clark Kent', 1);
console.log(ku.fly());
console.log(ku.speak())