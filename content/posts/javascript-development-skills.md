---
title: 一些有用的开发技巧
categories:
  - JavaScript
date: 2018-08-27 15:17:01
---

# 不通过 new 关键字使用构造函数

一个普通的构造函数看起来像这样：

```javascript
function User(name) {
  this.name = name;
}
User.prototype.say = function __say__() {
  console.log(`My name is ${this.name}`);
};
```

正常情况下，通过 new 关键字使用该构造函数:

```javascript
var user = new User("John");
console.log(user);
```

如果调用者忘了使用 new 关键字来调用构造函数， 那么在非严格模式下，构造函数内部的属性就会被附加到全局变量上：

```javascript
// 非严格模式
var user = User("John");
console.log(window.name); // 'John'

// 严格模式下禁止将 undefined 替换为全局变量
// 所以在严格模式下 调用 User会报错
```

- 第一种解决方案， 强制使用 new 关键字。
    修改构造函数的内容,这种方案的缺点是不好处理可变参数的情况。

  ```javascript
  function User(name, age, sex, favor, avatar) {
    if (!(this instanceof User)) {
        // 强制使用 new
        return new User(name, age, sex, favor, avatar)
    }

    this.name = name
    ...
  }
  // 改造之后， 不通过new也可以使用构造函数
  ```

- 第二种方案, 使用 Object.create()
  ```javascript
  function User(name, age, favor) {
    var self = (this instanceof User) ? this : Object.create(User.prototype)
    self.name = name
    self.age = age
    ...
  }
  ```
  > Object.create 的原理
  ```javascript
  Object.create =
    Object.create ||
    function (proto) {
      function TempConstructor() {}
      TempConstructor.prototype = proto;
      return new TempConstructor();
    };
  ```

# 在子类的构造函数中调用父类的构造函数

```javascript
function Animal(name) {
    this.name = name
    this.type = 'animal'
}

Animal.prototype.eat = function __eat__() {}

function Dog(name, sex) {
    // 如果在此处不调用父类的构造函数，
    // 那么就会丢失父类的实例属性 type
    Animal.apply(this, arguments)
    this.name = name
    ...
}
// 继承Animal
Dog.prototype = Object.create(Anima.prototype)
// 修正constructor属性
Dog.prototype.constructor = Dog
Dog.prototype.jump = function __jump__() {}
```

# 无法通过 this 修改原型链上的属性值

> 坑出没， 请注意。 （在 ES6 的`class`语法中， 已经不可以在原型上增加属性了）

```javascript
function Constructor() {}
Object.assign(Constructor.prototype, {
  data: "foo",
  setData: function () {
    this.data = "bar";
  },
});

var c1 = new Constructor();
c1.setData();
// 请思考下面这行代码的运行结果
console.log(Constructor.prototype.data);
```

<style>summary {outline: none;cursor: pointer;}</style>
<details>
<summary>点击此处查看答案</summary>
<p>答案是：`foo`</p>
</details>

`setData`方法给`this`的 data 属性赋值为`bar`，这里的赋值并不会赋值给原型上的 data 属性， 而是赋值给了这个实例对象本身。
如果想给原型上的属性重新赋值，可以参考如下方法：

```javascript
function Constructor() {}
Object.assign(Constructor.prototype, {
  data: "foo",
  setProtoData: function () {
    var proto = Object.getPrototypeOf(this);
    proto.data = "bar";
  },
});

var c1 = new Constructor();
c1.setProtoData();
console.log(Constructor.prototype.data); // bar
```

# 使用 null 做原型创建字典型的数据

```javascript
var dict1 = {
  key1: "value1",
  key2: "value2",
};

// 如果字典的原型不小心被污染
var proto = Object.assign(Object.getPrototypeOf(dict1), { foo: "bar" });
Object.setPrototypeOf(dict1, proto);

// 那么在取值的时候就会产生影响
console.log(dict1["foo"]); // bar
for (var key in dict1) {
  console.log(key); //  'key1', 'key2', 'foo'
}
```

使用 null 作为字典的原型

```javascript
var dict2 = Object.create(null);
Object.assign(dict2, {
  key1: "value1",
  key2: "value2",
});

var proto = Object.assign(Object.getPrototypeOf(dict2), { foo: "bar" });
Object.setPrototypeOf(dict1, proto);
// 会报错
```

# 缓存昂贵的计算结果

假设有这样一个函数:

```javascript
function fun(n) {
  // 根据n的值，经过大量计算后，返回需要的结果
  /**
     省略大量计算过程
    **/
  return result;
}
```

如果我们经常调用这个函数，那么每次的计算过程都是很耗时且复杂的， 如果我们针对这个函数做一下缓存，那么结果就会好很多。

```javascript
function fun(n) {
  if (!fun.cache) {
    fun.cache = {};
  }
  if (Object.hasOwnProperty.call(fun.cache, n)) {
    return fun.cache[n];
  }
  /**
        进行大量计算
    **/
  return (fun.cache[n] = result);
}
```

# 实现伪重载(针对不通数量的实参，处理对应的 case)

重载是指同名的函数可以有多个版本的实现，调用时根据不同的参数或者返回值执行对应的函数。
js 中不能存在同名的函数，但是可以根据函数形参与实参的 length 属性，实现伪重载。（只适用于不同数量的参数）

```javascript
function addReloadFunction(target, methodName, func) {
  var beforeProp = target[methodName];
  target[methodName] = function reloadFunc() {
    // 如果参数长度匹配
    if (arguments.length === func.length) {
      return func.apply(target, arguments);
    } else {
      if (typeof beforeProp === "function") {
        return beforeProp.apply(target, arguments);
      }
    }
  };
}

var obj = {};
addReloadFunction(obj, "reload", function () {
  console.log("zero arg");
});
addReloadFunction(obj, "reload", function (a) {
  console.log("one arg");
});
addReloadFunction(obj, "reload", function (a, b) {
  console.log("two args");
});

obj.reload(); // zero arg
obj.reload(1); // one arg
obj.reload(1, 2); // two args
```

# 使用原生 JS 向 DOM 中添加字符串 HTML

这里要介绍一个特殊的 HTML 元素`Template`。

```javascript
var template = document.createElement("template");
template.innerHTML = strHtmlTpl;
container.appendChild(template.content);
```
