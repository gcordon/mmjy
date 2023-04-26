https://juejin.cn/post/6941355126191816711
块级格式化上下文，简称BFC

常见的 bfc 场景
bfc 内部的 box 会垂直方向，一个接一个地放置
<div>
    <p>1</p>
    <p>2</p>
</div>
给 p 都设置了 margin: 100px; 也就是上下左右都是 100 

我们期望的是 p1向下垂直100px和p2向上垂直100px，
但是其实实际代码展示的是, p1向下垂直50 p2向上垂直50， 

要解决这个问题， 就要创建 bfc       bfc 就不会出现 垂直重叠 像素的问题
给 其中一个 p1 或者 p2 增加一个 overflow: hidden 属性

<div>
    <div >
        <p>1</p>
    </div>
    <p>2</p>
</div>


1.2 创建BFC的方法

html根元素;
float 的值不为 none;
overflow 的值不为visible；
display 的值为 table-cell、table-caption , inline-block ,flex, inline-flex,grid,inline-grid中的任何一个；
position 的值不为 relative 和 static。

作者：药师kabuto
链接：https://juejin.cn/post/6941355126191816711
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。