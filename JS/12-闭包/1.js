//  面试题， 为什么 vue2 的 data 需要返回一个 函数， 其实就是因为 用到了闭包
let e = {
    data: function() {
        return {
            
        }
    }
}

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures

闭包 (closure)

闭包让开发者 从 内部函数 访问 外部函数的 作用域。 

闭包会随着函数的创建  而被 同时创建


function makeAdder(x) {
    return function(y) {
      return x + y;
    };
  }
  var add5 = makeAdder(5);
  console.log(add5(2));  // 7


  function makeSizer(size) {
    return function() {
      document.body.style.fontSize = size + 'px';
    };
  }
  
  var size12 = makeSizer(12);
  var size14 = makeSizer(14);
  var size16 = makeSizer(16);
  size12，size14 和 size16 三个函数将分别把 body 文本调整为 12，14，16 像素。
  我们可以将它们分别添加到按钮的点击事件上。如下所示：
  
  document.getElementById('size-12').onclick = size12;
  document.getElementById('size-14').onclick = size14;
  document.getElementById('size-16').onclick = size16;
  