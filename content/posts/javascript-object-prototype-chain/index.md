---
title: 关于JavaScript的对象原型
tags:
  - prototype
date: 2018-11-12 15:49:45
---

![javascript-object-prototype](./javascript-prototype-chain.png)

<!--more-->

记几个容易被忽略的点:

1. **原型的作用是为了共享属性，避免内存的浪费。**
2. **JavaScript 使用原型链来实现继承。**
3. **`prototype`是函数才有的属性。**
4. **`Function`即是鸡也是蛋，即是构造函数，也是实例。**
