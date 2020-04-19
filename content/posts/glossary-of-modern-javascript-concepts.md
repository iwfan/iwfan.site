---
title: 现代 JavaScript 概念汇总
tags:
  - JavaScript
date: 2018-09-15 21:08:52
---

原文： [Glossary of Modern JavaScript Concepts: Part 1](https://auth0.com/blog/glossary-of-modern-javascript-concepts/)

这篇文章主要讲了一些目前常用在 JavaScript 编程中的概念，包括

# side-effects(函数副作用)

函数副作用是指调用函数时，除了返回函数值以外，还对主调用函数产生附加的影响。例如：修改全局变量的值。

# pure function(纯函数)

纯函数如下所示：

```javascript
function half(x) {
  return x / 2;
}
```

它具有以下几个特点：

1. 纯函数的返回值只由它的参数决定，不会产生函数副作用。
2. 当调用纯函数时，可以用它的结果来代替函数调用，这被称为[引用透明](https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B0%E5%89%AF%E4%BD%9C%E7%94%A8#%E5%BC%95%E7%94%A8%E9%80%8F%E6%98%8E)。 例如： `var total = 5 + half(6)`, 可以被替换为： `var total = 5 + 3`。
3. 纯函数只依赖当前作用域中的`状态`，而不会改变额外的状态， 也就是说不会产生函数副作用。
4. 纯函数不能调用非纯函数。

# impure function(非纯函数)

与纯函数对应的就是非纯函数，非纯函数会产生函数副作用。非纯函数会修改它作用域之外的状态。
例如：

```javascript
var globalVal = "Hello";
function impureFunction() {
  globalVal = "World";
}
```

# 状态

{% blockquote %} 状态是指程序中可以访问和操作的一些数据，例如存储在内存和数据库中的数据。在任何给定的时刻，应用程序中变量的内容都代表了应用程序的状态。{% endblockquote %}

- **`statefulness(有状态)`**
  有状态的概念跟`非纯函数`类似。比如下面这个函数就是一个有状态的函数，它依赖于外部的`number`变量, 此时`number`就是这个程序的一个状态。

```javascript
var number = 1;
function increment() {
  return number++;
}
increment();
```

- **`statelessness(无状态)`**
  无状态的函数或者组件，它们只依赖于它们自己作用域中的变量或者参数，并不会去访问或者修改它们作用域之外的内容。
  这个概念跟`纯函数`也是一致的。参考如下示例, 与上面做对比。

```javascript
var number = 1;
function increment(n) {
  return n + 1;
}
increment(number);
```

# Immutability and Mutability(不变性与可变性)

- [ `Immutable` ]: 不变性：如果一个对象是不可变的，那么它的值自创建以后便不能被修改。
- [ `Mutable` ]: 可变性：如果一个对象是可变的，那么它的值可以随意修改。

JavaScript 中基础数据类型都是`Immutable`。

# Imperative and Declarative Programming(命令式编程和声明式编程)

- 命令式编程是在编写 how， 也就是告诉计算机怎样做， 例如循环输出数字中的内容。 命令式编程是这样的。
  ```javascript
  var arr = [1, 2, 3, 4, 5];
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
  ```
  直接告诉告诉计算机做循环。
- 声明式编程是在编写 what，是告诉计算机你想做什么而不是怎么做。同样循环输出，使用声明式编程是这样的。

  ```javascript
  var arr = [1, 2, 3, 4, 5];
  arr.map((item) => console.log(item));
  ```

# 高阶函数

高阶函数是指接收函数作为参数，或者返回一个函数作为结果的函数。

```javascript
// filter 接受一个函数作为参数
var result = [1, 2, 3].filter((item) => item > 2);

// bind 返回一个函数作为结果
var func = fun.bind(this, 1);
```

# 函数式编程

函数式编程主要包括以下几个内容：

1.  数据是不可变的。**(Immutable)**
2.  函数是无状态的。**(stateless)**
3.  核心功能使用没有副作用的纯函数来完成。**(pure function)**
4.  命令式的代码管理副作用， 而使用声明式的代码执行核心内容。

这里有一个使用函数式编程的例子：
给出一段文字，取得词语的数量和大于五个字符的词。

```javascript
// 待查找的文字
var fpCopy = `Functional programming is powerful and enjoyable to write, It's very cool!`;
////// pure function 纯函数 | 声明式编程 | 无状态 stateless //////
// 从字符串中删除特殊字符
var stripPunctuation = (str) => str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
// 按空格将字符串拆为数组
var getArr = (str) => str.split(" ");
// 获取数组的长度
var getWordCount = (arr) => arr.length;
// 查找大于五个字符的关键字， 并返回其小写的形式
var getKeywords = (arr) =>
  arr.filter((item) => item.length > 5).map((item) => item.toLowerCase());

///// impure function 非纯函数 | 命令式
function processCopy(str, prepFn, arrFn, countFn, kwFn) {
  const copyArray = arrFn(prepFn(str));

  console.log(`Word count: ${countFn(copyArray)}`);
  console.log(`Keywords: ${kwFn(copyArray)}`);
}

processCopy(fpCopy, stripPunctuation, getArr, getWordCount, getKeywords);
```

# Observables(可观测对象)

Observables 与数组类似， 只是它的项是随着时间异步到达的（也可以称为流）。它表示一个可调用未来值或事件的集合。我们可以订阅 observable 并对它们发出的事件作出反应。
以监听按钮点击事件为例， 一般情况下使用命令式的`addEventListener`进行事件添加。

```javascript
const button = document.querySelector("button");
button.addEventListener(
  "click",
  (evt) => {
    console.log("click");
  },
  { passive: true }
);
```

如果使用 Rxjs， 就会是下面这样。

```javascript
const button = document.querySelector("button");
const source$ = Rx.Observable.fromEvent(button, "click");
source$.subscribe((event) => console.log("Clicked!"));
```

- [ `Hot Observables` ]: 热可观测对象，一般监测的是 UI 上的事件， 例如点击按钮、 鼠标移动。 这种事件是不管你有没有订阅， 都会触发事件。上面的例子就是热可观测对象。

- [ `cold Observables`]: 冷可观测对象，只有在一开始订阅时会触发一次事件， 然后就需要等下次订阅才会再次触发。 下面是一个冷可观测对象的例子：

```javascript
const source$ = Rx.Observable.range(1, 5);

const subscription = source$.subscribe(
  (value) => {
    console.log(`Next: ${value}`);
  }, // onNext
  (event) => {
    console.log(`Error: ${event}`);
  }, // onError
  () => {
    console.log("Completed!");
  } // onCompleted
);
// 触发完成之后不会再次触发了。
// 2s后再次订阅才会触发
setTimeout(() => {
  source$.subscribe(
    (value) => {
      console.log(`Next: ${value}`);
    }, // onNext
    (event) => {
      console.log(`Error: ${event}`);
    }, // onError
    () => {
      console.log("Completed!");
    } // onCompleted
  );
}, 2000);
```

# Reactive Programming（反应式编程）

反应式编程关注于随着时间的推移传播和响应传入事件，以声明方式（描述要做什么而不是如何做）。下面是一个使用 JS 进行响应式编程的例子：
{% blockquote info %}页面上有一个文本输入框， 用来输入 6 位字符的验证码。 同时在输入法下方的 code 标签内，展示用户输入的最新的验证码。{% endblockquote %}
html 代码如下：

```html
<input id="confirmation-code" type="text" />
<p>
  <strong>Valid code attempt:</strong>
  <code id="attempted-code"></code>
</p>
```

反应式编程代码如下：

```javascript
const confCodeInput = document.getElementById("confirmation-code");
const attemptedCode = document.getElementById("attempted-code");

const confCodes$ = Rx.Observable.fromEvent(confCodeInput, "input")
  .map((e) => e.target.value)
  .filter((code) => code.length === 6);

const subscription = confCodes$.subscribe(
  (value) => {
    console.log(value);
    attemptedCode.innerText = value;
  },
  (event) => {
    console.warn(`Error: ${event}`);
  },
  () => {
    console.info("Completed!");
  }
);
```

# Functional Reactive Programming（函数反应式编程）

> 反应式编程(Reactive Programming)是基于函数式编程(Functional Programming), 用来解决 callback， 异步事件的部分， 所以又叫做函数反应式编程。
> [(函数式编程和反应式编程（reactive programming）有什么区别？ - Nshen 的回答 - 知乎](https://www.zhihu.com/question/36431501/answer/154070289)

在函数式反应编程最初的定义中， 有两个基本属性：

- [ `denotative` ]: 每个函数或类型的含义都是精确，简单和独立于实现的。`函数`指的是这个属性。
- [ `continuous time（时间连续）` ]: 变量在某个特定时间点具有特定的值， 但是两个时间点之间还有无数个其他的时间点。`反应`指的是这个属性。

简单地说函数反应式编程就是用会随着时间变化的值，进行函数式编程。
函数反应式编程应该是：

- [ `dynamic（动态的）`]: 能够随时间或者输入值的改变做出响应
- [ `time-varying (随时间变化的)` ]: 当反应值不断变化时，反应行为也可以不断变化
- [ `efficient (高效的)`]: 最小化输入变化时所需的处理量
- [ `historically aware (历史可追溯的)`]: 用纯函数管理从一个时间点到另一个时间点的状态; 并且状态是 Immutable 的，状态的改变不会影响全局。
