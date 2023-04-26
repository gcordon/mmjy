/*
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this
TODO: 重点
this 的概念

在绝大多数情况下，函数的调用方式决定了 this 的值（运行时绑定）
this 不能在执行期间被赋值，并且在每次函数被调用时 this 的值也可能会不同。

ES5 引入了 bind 方法来设置函数的 this 值，而不用考虑函数如何被调用的。
ES2015 引入了箭头函数，

箭头函数不提供自身的 this 绑定 （ this 的值将保持为闭合词法上下文的值）。
*/
const test = {
    prop: 42,
    func: function () {
        return this.prop
    },
}

console.log(test.func())
// Expected output: 42




// 在浏览器中，window 对象同时也是全局对象：
console.log(this === window); // true


// 在函数内部，this的值取决于函数被调用的方式。
function f1(){
    return this;
}
//在浏览器中：
f1() === window;   //在浏览器中，全局对象是 window   相当于 window.f1() 所以 f1函数中的 this 是 window

class Example {
    constructor() {
        // Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。
        // 给定对象的原型。如果没有继承属性，则返回 null 。
        const proto = Object.getPrototypeOf(this)
        console.log(Object.getOwnPropertyNames(proto))

        // Object.getPrototypeOf('foo');
        // String {"", constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}
    }
    first() {}
    second() {}
    static third() {}
}

new Example() // ['constructor', 'first', 'second']


class Base {
    constructor() {
        this.a = 10
    }
}
class Good extends Base {
    constructor() {
        /*
        https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this
        上面打开链接搜索关键字  派生类
        如下这段代码同 super 是一样的效果 
        var s = new Base()
        return s
        */

        // 
        super()
    }
}
var g = new Good()
log(g.a)




// 对象可以作为 bind 或 apply 的第一个参数传递，并且该参数将绑定到该对象。
var obj = {a: 'Custom'};

// 声明一个变量，并将该变量作为全局对象 window 的属性。
var a = 'Global';

function whatsThis() {
  return this.a;  // this 的值取决于函数被调用的方式
}

whatsThis()          // 'Global' 因为在这个函数中 this 没有被设定，所以它默认为 全局/ window 对象
whatsThis.call(obj)  // 'Custom' 因为函数中的 this 被设置为 obj
whatsThis.apply(obj) // 'Custom' 因为函数中的 this 被设置为 obj






function add(c, d) {
    return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

// 第一个参数是用作“this”的对象
// 其余参数用作函数的参数
add.call(o, 5, 7); // 16

// 第一个参数是用作“this”的对象
// 第二个参数是一个数组，数组中的两个成员用作函数参数
add.apply(o, [10, 20]); // 34



// bind方法
// ECMAScript 5 引入了 Function.prototype.bind()。
// 调用f.bind(someObject)会创建一个与f具有相同函数体和作用域的函数，但是在这个新函数中，
// this将永久地被绑定到了bind的第一个参数，无论这个函数是如何被调用的。
function f(){
    return this.a;
}

var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var h = g.bind({a:'yoo'}); // bind 只生效一次！
console.log(h()); // azerty

var o = {a:37, f:f, g:g, h:h};
console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty
  


var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true

// 接着上面的代码
// 作为对象的一个方法调用
var obj = {foo: foo};
console.log(obj.foo() === globalObject); // true

// 尝试使用 call 来设定 this
console.log(foo.call(obj) === globalObject); // true

// 尝试使用 bind 来设定 this
foo = foo.bind(obj);
console.log(foo() === globalObject); // true






// 创建一个含有 bar 方法的 obj 对象，
// bar 返回一个函数，
// 这个函数返回 this，
// 这个返回的函数是以箭头函数创建的，
// 所以它的 this 被永久绑定到了它外层函数的 this。
// bar 的值可以在调用中设置，这反过来又设置了返回函数的值。
var obj = {
    bar: function() {
      var x = (() => this);
      return x;
    }
  };
  
  // 作为 obj 对象的一个方法来调用 bar，把它的 this 绑定到 obj。
  // 将返回的函数的引用赋值给 fn。
  var fn = obj.bar();
  
  // 直接调用 fn 而不设置 this，
  // 通常 (即不使用箭头函数的情况) 默认为全局对象
  // 若在严格模式则为 undefined
  console.log(fn() === obj); // true
  
  // 但是注意，如果你只是引用 obj 的方法，
  // 而没有调用它
  var fn2 = obj.bar;
  // 那么调用箭头函数后，this 指向 window，因为它从 bar 继承了 this。
  console.log(fn2()() == window); // true
  
//   在上面的例子中，一个赋值给了 obj.bar的函数（称为匿名函数 A），
//   返回了另一个箭头函数（称为匿名函数 B）。因此，在 A 调用时，函数 B 的this被永久设置为 
//   obj.bar（函数 A）的this。当返回的函数（函数 B）被调用时，它this始终是最初设置的。
//   在上面的代码示例中，函数 B 的this被设置为函数 A 的this，即 obj，
//   所以即使被调用的方式通常将其设置为 undefined 或全局对象
//   （或者如前面示例中的其他全局执行环境中的方法），它的 this 也仍然是 obj 。




// 同样，this 的绑定只受最接近的成员引用的影响。
// 在下面的这个例子中，我们把一个方法g当作对象o.b的函数调用。
// 在这次执行期间，函数中的this将指向o.b。
// 事实证明，这与他是对象 o 的成员没有多大关系，最近的引用才是最重要的。

// o.b = {g: independent, prop: 42};
// console.log(o.b.g()); // 42



// 类 this  和 函数 this
// 一起使用
class Car {
    constructor() {
      // Bind sayBye but not sayHi to show the difference
      this.sayBye = this.sayBye.bind(this);
    }
    sayHi() {
      console.log(`Hello from ${this.name}`);
    }
    sayBye() {
      console.log(`Bye from ${this.name}`);
    }
    get name() {
      return 'Ferrari';
    }
  }
  
  class Bird {
    get name() {
      return 'Tweety';
    }
  }
  
  const car = new Car();
  const bird = new Bird();
  
  // The value of 'this' in methods depends on their caller
  car.sayHi(); // Hello from Ferrari
  bird.sayHi = car.sayHi;
  bird.sayHi(); // Hello from Tweety
  
  // For bound methods, 'this' doesn't depend on the caller
  bird.sayBye = car.sayBye;
  bird.sayBye();  // Bye from Ferrari
  