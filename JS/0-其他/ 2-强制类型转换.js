https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%BC%BA%E5%88%B6%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2
 页面搜索  强制其他类型转换

valueOf()
 toString()


你可能已经注意到，有三种不同的路径可以将对象转换为原始值：

强制原始值转换：[@@toPrimitive]("default") → valueOf() → toString()

强制数字类型转换、强制 number 类型转换、强制 BigInt 类型转换：[@@toPrimitive]("number") → valueOf() → toString()

强制字符串类型转换：[@@toPrimitive]("string") → toString() → valueOf()

在所有情况下，[@@toPrimitive]() 如果存在，必须可调用并返回原始值，而如果它们不可调用或返回对象，valueOf 或 toString 将被忽略

。在过程结束时，如果成功，结果保证是原始值。然后，由此产生的原始值会进一步强制类型转换，具体取决于上下文。