---
title: JavaScript 中的函数
slug: 3a432fe28affdb76dfbaf84777695b56
date: 2017-08-23 01:26:50
tags:
  - JavaScript
thumbnail: null
---

函数是 JavaScript 中的基础单元模块，用于代码复用、信息隐藏、和组合调用。

# 函数的定义

1.通过函数声明创建函数

```javascript
function sum(a, b) {
  return a + b
}
sum(2, 4) // > 6
```

2.通过函数表达式（函数字面量）创建函数

```javascript
var sum1 = function sum(a, b) {
  return a + b
}
sum1(2, 4) // > 6
var sum2 = function (a, b) {
  return a + b
}
sum1(2, 4) // > 6
```

3.通过内置 Function 对象创建函数

```javscript
var fun = new Function("a, b", "return a + b")
fun(2, 4) // > 6
```

# 函数的声明提升

1.通过函数声明创建的函数，会提升至当前作用域的顶部，同时进行赋值操作，所以可以在函数声明之前调用函数。

```javascript
sum(2, 4) // > 6
// other statement
function sum(a, b) {
  return a + b
} // 会提升至作用域顶部，同时进行赋值
```

2.通过函数表达式和内置 Function 对象创建的函数，与 var 声明的其他变量相同。也就是说声明会被提升，但是不会赋值，执行时才会被赋值，所以不能在函数表达式执行前调用函数。

```javascript
sum1(2, 4) // Uncaught TypeError: sum1 is not a function
// other statement
var sum1 = function sum(a, b) {
  return a + b
}
sum1(2, 4) // > 6

fun(2, 4) // Uncaught TypeError: fun is not a function
// other statement
var fun = new Function('a, b', 'return a + b')
fun(2, 4) // > 6
```

3.函数的重复声明
如果函数名重复，那么声明在后面的函数会覆盖声明在前面的函数。

```js
function f() {
  console.log(1)
}
function f() {
  console.log(2)
}
f() // > 2
```

4.函数声明提升的优先级要高于变量提升的优先级。

> 暂不明确

```javascript
console.log(fun) // > f fun(){ ... }
function fun() {
  console.log('Hello World!')
}
var fun = 'Hello World!'
console.log(fun) // > Hello World!

console.log(fun) // > f fun(){ ... }
var fun = 'Hello World!'
function fun() {
  console.log('Hello World!')
}
console.log(fun) // > Hello World!
```

# 特殊的函数

1.立即执行函数(IIFE),此类函数只会执行一次，而且可以有效的防止全局变量被污染。

```javascript
;(function () {
  // statement
})()
```

2.构造函数。

```javascript
function Constructor(arg1, arg2, ...args) {
  this.arg1 = arg1
  this.arg2 = arg2
  // ...
}

var cons = new Constructor()
```

# 函数的调用与 this 指向

在 JavaScript 中有以下四种方法调用模式：

> 函数在被调用时，除了声明时定义的参数，函数还会隐式的接收两个额外的参数`this`和`arguments`。

## 方法调用模式

当一个函数作为一个对象的属性时，它就是一个方法。当方法被调用时，`this`被绑定到当前的对象上，在方法中可以使用`this`去访问当前的对象，**this 到对象的绑定发生在方法被调用时**。

```javascript
var obj = {
  arg: 'arguments',
  method: function () {
    console.log(this.arg)
  },
}
obj.method() // > arguments
```

## 函数调用模式

当一个函数并非作为一个对象的属性时，他会被当作一个函数来调用。在不启用严格模式的情况下，`this` 指向全局变量，在浏览器环境下指向 `window`。

```javascript
function method() {
  console.log(this)
}
method() // > window
```

在启用严格模式时， `this`的值为 `undefined`。

```javascript
'use strict'
function method() {
  console.log(this)
}
method() // > undefined
```

以函数形式调用的函数通常不使用 `this` 关键字。不过，`this` 可以用来判断当前是否处于严格模式下。

```javascript
'use strict'
function isStrict() {
  return !this
}
console.log(isStrict())
```

## 构造器调用模式

通过使用 `new` 关键字来调用函数，函数会返回一个新的对象，同时 `this` 也会指向那个新的对象。需要注意的一点是 `new` 关键字会改变 `return` 语句的行为，使用`new` 关键字之后，函数必然会返回一个对象，但是并不会改变 `return` 语句的功能，在 `return` 之后的内容还是无法被执行到。

```javascript
function Constructor(arg1, arg2, ...args) {
  this.arg1 = arg1
  return
  this.arg2 = arg2
  // ...
}
var cons = new Constructor('123', 'dqw')
console.log(cons) // >Constructor{arg1:"123"}
```

## apply/call 调用模式

函数也可以通过 `Function.prototype.apply()` 与 `Function.prototype.call()` 来间接调用，两个方法都允许显示的指定调用所需的 `this` 值。

```javascript
var log = console.log
var a = 2
var b = 4
function sum() {
  return this.a + this.b
}
log(sum()) // > 6

var obj = { a: 3, b: 6 }
log(sum.apply(obj)) // > 9
log(sum.call(obj)) // > 9

function sum1(a, b) {
  return a + b
}
log(sum1(2, 4)) // > 6

var obj1 = { a: 3, b: 6 }
log(sum1.apply(obj1, [obj1.a, obj1.b])) // > 9
log(sum1.call(obj1, obj1.a, obj1.b)) // > 9

var obj2 = {}
log(sum1.apply(obj2, [4, 6])) // > 10
log(sum1.call(obj2, 4, 6)) // > 10
```

`apply` 接收的参数是数组， `call` 接收的是单独的参数

> **`this`** 是一个关键字，不是变量，也不是属性名，JavaScript 的语法不允许给 `this` 赋值。

# 函数的参数

1.函数定义时，可以通过`length` 属性获得函数形参的数量。

```javascript
function fun(a, b) {}
fun.length // > 2
```

2.可以通过 `arguments.length` 获得实参的数量。

```javascript
function fun(a, b, c) {
  console.log(arguments.length)
}
fun(1) // > 1
fun(1, 2, 3) // > 3
fun(1, 2, 3, 4, 5) // > 5
```

3.当实参的数量小于形参的数量时，不足的实参都将被设置为 `undefined`。为了程序的健壮性，可以通过注释说明参数可选。

```javascript
function fun(a, /* optional*/ b) {
  b = b || [] // 如果b没有值则赋值为数组
}
```

4.实参也是局部变量

```javascript
var a1 = 3
function fun1(a1) {
  a1 = 5 // 并不会影响全局变量
}
fun1(a1)
console.log(a1) // > 3

var a2 = 'hello'
function fun2(a2) {
  a2 = 'world'
}
fun2(a2)
console.log(a2) // > hello

var a3 = true
function fun3(a3) {
  a3 = false
}
fun3(a3)
console.log(a3) // > true

var a4
function fun4(a4) {
  a4 = 'hello'
}
fun4(a4)
console.log(a4) // > undefined

var a5 = null
function fun5(a5) {
  a5 = 'hello'
}
fun5(a5)
console.log(a5) // > null

var a6 = { name: 'hello' }
function fun6(a6) {
  a6 = { name: 'world' } // 重新赋值不会影响全局的变量
  // a6.name = "hello world"         // 修改属性则会影响
}
fun6(a6)
console.log(a6)
```

5.arguments
`arguments` 中除了数组元素，还定义了 `callee` 属性，它指代当前正在执行的函数，在严格模式下对这个属性的读写操作会产生一个类型错误。

```javascript
// 'use strict' // Uncaught TypeError
function fun(x) {
  if (x <= 1) return 1
  console.log(x)
  return x * arguments.callee(x - 1)
}
```

# 函数返回

## return 返回

正常情况下，在函数体执行完成之后，函数才会结束，默认返回一个 `undefined` 。但是在函数执行过程中，一旦遇到`return` 关键字，就会立即返回`return`之后结果。

> JavaScript 会在 `return` 关键字后自动的在行尾添加一个分号。所以下面的代码就会出现问题。

```javascript
// 没有问题的版本
function fun() {
  return { name: 'wangfan' }
}
console.log(fun()) // >  {name:"wangfan"}

// 有问题的版本
function fun() {
  return // 在这里换行
  {
    name: 'wangfan'
  }
}
console.log(fun()) // >  undefined
```

## 构造函数的返回值

JavaScript 中的构造函数不一定会返回此构造函数的实例化对象，存在以下几种情况： 1.如果构造函数中没有 return 语句， 那么返回此构造函数的实例化对象。

```js
function F() {}
var f = new F()
console.log(f) // > F {}
```

2.如果构造函数中 return 返回的是原始类型的数据 ，例如: `number`、`string`、`boolean`、`null`、`undefined`， 那么也会返回此构造函数的实例化对象。

```js
function F() {
  return 'wangfan'
}
var f = new F()
console.log(f) // > F {}
```

3.如果构造函数中 return 返回的是复合类型的数据，那么实际返回值为这个复合类型的值。

```js
function F() {
  return { name: 'wangfan' }
}
var f = new F()
console.log(f) // > {name:"wangfan"}
```

## 通过 throw 抛出错误返回

JavaScript 允许抛出自定义的错误。

```javascript
function sum(a, b) {
  if (!arguments.length) {
    throw new Error('没有参数')
  }
  if (arguments.length < 2) {
    throw { name: 'Type Error', message: '参数不足！' }
  }
  return a + b
}

try {
  sum() // > Error: 没有参数
  sum(1) // > {name: "Type Error", message: "参数不足！"}
} catch (error) {
  console.log(error)
}
```

# bind

`Function.prototype.bind()` ，bind 方法可以将一个对象绑定在函数上，并返回一个新的函数, 返回函数的`length` 属性值是被绑定函数的形参减去绑定实参的个数，并且返回的函数没有 `prototype` 属性；

```javascript
var param = 'Hi!'
var obj = {
  param: 'hello',
  method: function (arg) {
    return this.param + arg
  },
}

console.log(obj.method(' world')) // > hello world

//  此时 this 指向全局对象
var m = obj.method
console.log(m(' ^ ^ ')) // > Hi! ^ ^
console.log(m.prototype) //  {constructor:f ... }
console.log(m.length) // 1

var m1 = obj.method.bind(obj, ' - - ')
console.log(m1(' ---  ')) // hello - -
console.log(m1.prototype) // >  "hello world"
console.log(m1.length) // 0
```

**EOF**
