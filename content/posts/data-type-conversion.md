---
title: JavaScript从基础到弃坑 - 数据类型转换
categories:
  - JavaScript
  - TypeConversion
tags:
  - JavaScript
  - TypeConversion
date: 2017-09-17 18:06:48
---

<p style="text-indent:2em;">JavaScript是一种弱类型的语言，JS中变量相对于强类型语言的变量要更加灵活，因为它没有数据类型的限制，你可以放心的赋予变量任何数据类型的值。但是数据本身和各种运算符是有类型的，如果运算时，被运算符发现数据类型不匹配，它会自动进行类型转换。如果不知道类型转换的规则，可能会得到意想不到的结果。</p><!--more-->

# 扫盲

在 ES5 中一共有六种数据类型：

- `number` 用来表示 **3.1415926535897932384626**
- `string` 你听说过 **Hello World!** 吗
- `boolean` 谎言与真相
- `null` 空即是色
- `undefined` 色即是空
- `object` 一花一世界

他们又可以细分为两种，一种是原始类型(`primitive type`)的数据:

- `number`
- `string`
- `boolean`
- `null`
- `undefined`

另一种是复合类型(`complex type`)的数据

- `object`

复合类型还可以细分为三种

- `object`
- `array`
- `function`

# 显示转换

显示转换是指通过调用**特定**的方法，将数据转换成**特定**的类型。

## 转换**number**类型

JavaScript 中主要有三种方法可以将其他类型的数据显示转换成数字类型：

1. `Number构造函数`
2. `parseInt`
3. `parseFloat`

他们都可以将其他数据类型的值转换为`数字`或者`NaN`。

### 原始类型值的转换规则

| input     | Number   | parseInt | parseFloat |
| --------- | -------- | -------- | ---------- |
| 数字      | 不转换   | 向下取整 | 不转换     |
| 字符串    | 数字/NaN | 数字/NaN | 数字/NaN   |
| 布尔值    | 0/1      | NaN      | NaN        |
| null      | 0        | NaN      | NaN        |
| undefined | NaN      | NaN      | NaN        |

#### 对数字的转换

```js
Number(3.1415926); // > 3.1415926
parseInt(3.1415926); // > 3
parseFloat(3.1415926); // > 3.1415926
```

`parseInt` 在转换数字时会向下取整，损失精度。`Number` 和 `parseFloat` 转换结果不变。
在转换数字时，如果数字是以 0 开头，那么将数字转换为 8 进制，如果数字是以 0x 开头的，那么将数字转换为 16 进制。

```js
Number(010); // > 8
parseInt(010); // > 8
parseFloat(010); // > 8

Number(0x10); // > 16
parseInt(0x10); // > 16
parseFloat(0x10); // > 16
```

#### 对字符串的转换

```js
Number(""); // > 0
parseInt(""); // > NaN
parseFloat(""); // > NaN

Number("Hello 123"); // > NaN
parseInt("Hello 123"); // > NaN
parseFloat("Hello 123"); // > NaN

Number("123 Hello"); // > NaN
parseInt("123 Hello"); // > 123
parseFloat("123 Hello"); // > 123
```

`Number` 转换字符串时，会把字符串当作一个整体，如果字符串是空的，那么返回`0`，如果字符串字符串不是空的，且字符串中有一个字符不是数字，那么转换结果就是 `NaN`。
`parseInt` 与 `parseFloat` 在转换字符串时，会一个字符一个字符的转换，如果字符串开头存在数字，那么返回数字，如果字符串开头不是数字，那么直接返回 `NaN`。
在用`parseInt`进行转换时，如果字符串是以`0x`开头的数字，那么将字符串转换为 16 进制。

```js
parseInt("0x0010Hello"); // > 16
parseFloat("0x0010Hello"); // > 0
```

#### 对布尔的转换

```js
Number(true); // > 1
parseInt(true); // > NaN
parseFloat(true); // > NaN

Number(false); // > 0
parseInt(false); // > NaN
parseFloat(false); // > NaN
```

`Number` 在转换布尔值的时候， 如果布尔值为 `true` 返回 `1`，否则返回 `0` 。
`parseInt`与`parseFloat` 转换布尔值总是返回 `NaN`。

#### 对 null 的转换

```js
Number(null); // > 0
parseInt(null); // > NaN
parseFloat(null); // > NaN
```

`Number` 转换 null 值的结果为 `0`，`parseInt`与`parseFloat` 转换 null 的值为 `NaN`。

#### 对 undefined 的转换

```js
Number(undefined); // > NaN
parseInt(undefined); // > NaN
parseFloat(undefined); // > NaN
```

`Number`、`parseInt`与`parseFloat` 转换 undefined 的值为 `NaN`。

### 复合类型值的转换规则

JS 中将复合类型转换为数字的规则比较复杂，主要分为两个阶段：

> 1.`ToPrimitive`阶段，JS 引擎首先执行`ToPrimitive`方法，将对象转换为原始类型的数据，在这个方法中首先执行对象的`valueOf`方法，如果此方法返回值是原始类型，则直接进入第二阶段。如果不是，则继续执行该对象的`toString`方法，如果此方法返回原始类型的数据，则进入第二阶段，否则抛出异常。 2.`ToNumber` 阶段，按照原始类型的规则转换数据。

1.`valueOf` 返回原始值

```js
var obj = {
  valueOf: function () {
    console.log("-- 1 --");
    return 1;
  },
  toString: function () {
    console.log("-- 2 --");
    return {};
  },
};

console.log(Number(obj));
// > -- 1 --
// > 1
```

2.`toString` 返回原始值

```js
var obj = {
  valueOf: function () {
    console.log("-- 1 --");
    return {};
  },
  toString: function () {
    console.log("-- 2 --");
    return 3;
  },
};

console.log(Number(obj));
// > -- 1 --
// > -- 2 --
// > 3
```

3.不返回原始值

```js
var obj = {
  valueOf: function () {
    console.log("-- 1 --");
    return {};
  },
  toString: function () {
    console.log("-- 2 --");
    return {};
  },
};

console.log(Number(obj));
// > -- 1 --
// > -- 2 --
// > Uncaught TypeError: Cannot convert object to primitive value
```

#### 转换 object

```js
({}
  .valueOf()(
    // > {}
    {}
  )
  .toString()); // > "[object Object]"
```

所以 object 转换数字的结果为 `Number("[object Object]") = NaN`

#### 转换 array

```js
[].valueOf() 		// > []
[].toString() 		// > ""

[1].valueOf() 		// > [1]
[1].toString() 		// > "1"

[1,2].valueOf() 		// > (2) [1, 2]
[1, 2].toString() 		// > "1,2"
```

此处可以根据数组`toString`的结果，按照转换字符串的规则进行转换。

#### 转换 function

```js
(function () {}
  .valueOf()(
    // > ƒ (){}
    function () {}
  )
  .toString()); // > "function (){}"
```

所以 function 转换数字的结果为 `Number("function (){}") = NaN`

## 转换**string**类型

JavaScript 中通过使用`String构造函数`, 将其他类型的值转换为字符串

### 原始类型值的转换规则

原始类型转换 string 的规则比较简单：

```js
String(3.14); // > "3.14"
String("Hello"); // > "Hello"
String(true); // > "true"
String(false); // > "false"
String(null); // > "null"
String(undefined); // > "undefined"
```

### 复合类型值的转换规则

JS 中将复合类型转换为字符串与转换数字的规则比较接近，区别点主要是在第一阶段求原值过程，在转换数字时，`ToPrimitive`方法会首先调用对象的 `valueOf`方法,其次执行`toString`方法， 在转换字符串时，则先调用对象的`toString`方法，其次执行`valueOf`方法。

> 1.`ToPrimitive`阶段，JS 引擎首先执行`ToPrimitive`方法，将对象转换为原始类型的数据，在这个方法中首先执行对象的`toString`方法，如果此方法返回值是原始类型，则直接进入第二阶段。如果不是，则继续执行该对象的`valueOf`方法，如果此方法返回原始类型的数据，则进入第二阶段，否则抛出异常。 2.`ToString` 阶段，按照原始类型的规则转换数据。

以下代码反应了这一过程： 1.`toString` 返回原值

```js
var obj = {
  valueOf: function () {
    console.log("-- 1 --");
    return {};
  },
  toString: function () {
    console.log("-- 2 --");
    return 1;
  },
};
console.log(String(obj));
// > -- 2 --
// > 1
```

2.`valueOf` 返回原值

```js
var obj = {
  valueOf: function () {
    console.log("-- 1 --");
    return "";
  },
  toString: function () {
    console.log("-- 2 --");
    return {};
  },
};
console.log(String(obj));
// > -- 2 --
// > -- 1 --
// >
```

3.都不返回原值

```js
var obj = {
  valueOf: function () {
    console.log("-- 1 --");
    return {};
  },
  toString: function () {
    console.log("-- 2 --");
    return {};
  },
};
console.log(String(obj));
// > -- 2 --
// > -- 1 --
// > Uncaught TypeError: Cannot convert object to primitive value
```

#### 转换 object 为 string

```js
({}.toString()); // > "[object Object]"
String({}); // > "[object Object]"
```

#### 转换 array 为 string

```js
[1, 2, 3].toString(); // > "1, 2, 3"
String([1, 2, 3]); // > "1, 2, 3"
```

#### 转换 function 为 string

```js
function fn() {
  console.log("--- ^ ---");
}
fn.toString(); // > "function fn() {console.log('--- ^ ---')}"
String(fn); // > "function fn() {console.log('--- ^ ---')}"
```

## 转换**boolean**类型

通过使用`Boolean构造函数`，将其他类型的数据显示的转换成布尔值，布尔类型的转换规则如下：

> 除`undefined`、`null`、`''`、`0(不区分正负)`、`NaN` 这五个值之外，其他的值都是 true。

```js
Boolean(undefined); // > false
Boolean(null); // > false
Boolean(0); // > false
Boolean(""); // > false
Boolean(NaN); // > false

Boolean({}); // > true
Boolean([]); // > true
Boolean(function () {}); // > true
```

## 小结

1.以上就是 JavaScript 中数据类型的显示转换规则，其中`number`类型的转换规则相对复杂一些，在对 number 的转换过程中，`parseInt`与`parseFloat`的规则要简单一些，简单的记忆方式是 `parseInt`与`parseFloat` 只能转换数字或者以数字开头的字符串， 其他全部是`NaN`。`Number构造函数`可以转换数字或者数字字符串，如果字符串中含有除数字之外的其他字符，则返回`NaN`。在转换`null`、`''`时，返回 0，其余都是`NaN`。 2.`string`需要注意的一点是，在转换复合类型时，在`ToPrimitive`阶段首先调用的是`toString`，其次才是`valueOf`。 3.`boolean`只需要记住五个特殊值即可。

# 移花接木 (隐式转换)

## 一元运算符 `+`、`-`

一元运算符`+`与`-`可以将其他类型的值转换为数字，`-`转换的结果为负数。他们的转换规则与`Number`构造函数的转换规则相同。

```js
+3.14 - // > 3.14
3.14 + // > -3.14
"" - // > 0
"" + // > -0
"hello" - // > NaN
"hello" + // > NaN
true - // > 1
true + // > -1
false - // > 0
false + // > -0
null - // > 0
null + // > -0
undefined - // > NaN
undefined + // > NaN
{} - // > NaN
{} + // > NaN
[] - // > 0
[] + // > -0
[1] - // > 1
[1] + // > -1
[1, 2] - // > NaN
[1, 2] + // > NaN
function () {} - // > NaN
  function () {}; // > NaN
```

## 一元运算符 `!` 取反

取反运算符一般用于将布尔值变为相反值。但是如果运算子不是布尔值，就会隐式的将它变为布尔值，转变规则与`Boolean构造函数`相同。

```js
!null       // > true
!''         // > true
!0          // > true
!undefined  // > true
!NaN        // > true

其他的都为 false
```

> 小技巧：可以使用两个`!`,达到与`Boolean()` 相同的效果。

```js
!!null; // > false
!!""; // > false
!!0; // > false
!!undefined; // > false
!!NaN; // > false
```

## 二元运算符

### + 号运算符

二元运算符 `+` 的隐式转换规则比较复杂, 因为它可以完成两种操作，一是加法运算，二是字符串的拼接。它的运算规则如下：

> 1.如果运算子中包含对象，则先按照转换数字的方式将对象转换为原始值(这里只是转换为原始值，不会直接转成数字)，既先执行`valueOf`方法，再执行`toString`方法。如果对象是 Date 类型，则先执行`toString`方法。 2.当运算子都为原始类型之后，若有一个运算子为`string`类型，则执行字符串拼接 (这里分两种情况，如果运算符左边是数字，则将其他原始类型的值也转换为数字，否则执行字符串拼接)。 3.否则将其他类型的值转换为数字，执行加法运算。

1.如果`+`运算符两边的运算子都是数字，那么不转换类型，执行加法运算。

```js
3 + 3; // 6
```

2.如果`+`运算符右边运算子的原始类型不是数字，那么自动地将他们转换为数字。如果右边是字符串， 那么就会将两个算子拼接在一起。

```js
3 + "5"; // 3 + '5' = '3' + '5' = '35'
3 + true; // 3 + Number(true) = 3 + 1 = 4
3 + null; // 3 + Number(null) = 3 + 0 = 3
3 + undefined; // 3 + Number(undefined) = 3 + NaN = NaN

"3" + 4 + 5; // 345
3 + 4 + "5"; // 75
```

3.如果运算子中存在对象

```js
3 + {}; // 3 + "[Object Object]" = "3[Object Object]"
3 + []; // 3 + "" = "3"

{
}
+{}; // "[object Object][object Object]"
{
}
+[](
  // {}; +[] = +0 = 0
  {}
) + []; // "[object Object]" + "" = "[object Object]"
```

### -（减）、 \*（乘）、 /（除）、 %（求余）

`-`、`*`、`/`、`%` 都会将其他类型的值转换为数字。

```js
3 - "2"; // > 3 - Number('2') = 1
3 * null; // > 3 * Number(null) = 3 * 0 = 0
3 / undefined; // > 3 / Number(undefined) = 3 / NaN = NaN
3 % [2]; // > 3 % Number([2]) = 3 % 2 = 1
```

### 比较运算符

比较运算符有`>`、`<`、`>=`、`<`, 他们的转换规则如下：

> 1.如果两个运算子都为字符串，那么按照字典顺序比较。 2.否则将其他的数据类型都转换为数字，再比较。

```js
3 > 2; // true
3 > "5"; // 3 > 5   = false
3 > "q"; // false

3 > null; // 3  > Number(null) => 3 > 0  =  true
3 > undefined; // false
```

> 任何值与`NaN`相比较，结果都是`NaN`。

```js
1 > NaN; // false
1 <= NaN; // false

"1" > NaN; // false
"1" <= NaN; // false

NaN > NaN; // false
NaN <= NaN; // false
```

### 相等运算符

JavaScript 中有两种判断是否相等的运算符，第一个是 JS 遗留下的糟粕 `==`, 第二个是严格相等运算符 `===`。
他们的区别的严格相等不会进行隐式转换。一旦两个运算子的类型不相同，那么就返回`false`。

为什么说**`==`**是糟粕呢？ 我认为 `==` 进行的很多隐式转换都不是很合理， 如果使用不当，结果会适得其反。

```js
2 == true; // > false
```

以下是 `==` 的简单转换规则： 1.`null`与`undefined` 与其他任何值的比较结果都是 false， 除非他们两个互相比较。

```js
null == 3; // > false
undefined == 3; // > false

null == NaN; // > false
undefined == NaN; // > false

null == ""; // > false
undefined == ""; // > false

null == false; // > false
undefined == false; // > false

null == undefined; // > true
```

2.在比较其他的原始类型时，会转换为数字。

```js
1 == true; // > 1 == Number(true)   => true
2 == true; // > 2 == Number(true)   => false

"" == 0; // > true
"" == false; // > Number('') === Number(false)   true
```

3.原始类型与复合类型比较时，会将复合类型转换成对应的原始类型。

```js
(([1] == (1)[1]) == // > Number([1]) == 1  => true
  "1"[1]) == // > String([1]) == Number('1') => true
  true; // > Boolean([1]) == true => true
```

## 一道很扯淡的题目

```js
0 == null; // > false
0 > null; // > false
0 >= null; // > true   why?
```

第一行 `null` 与除`undefined`以外任何值相比较的结果都是 `false`。

第二行 `0 > null`, 因为运算子没有字符串， 所以将其他类型的值转换为数字， 所以

> => 0 > Number(null)  
> => 0 > 0
> => false。

第三行 `0 >= null`, 还是没有字符串，转换为数字,

> => 0 >= Number(null)
> => 0 >= 0
> => true

# 其他操作符的小知识

## 逗号运算符

`,` 逗号运算符总是返回最后一个表达式的结果。

```js
for (var i = 1, j = 1; i < 10, j < 5; i++, j++) {}

console.log(i, j); // > 5 5
```

## `&&`且运算符

且运算符的运算规则如下：

> 1.如果第一个运算子的值为 false, 则返回第一个运算子的值，且不再对第二个运算子进行计算。 2.否则返回第二个运算子的值。

```js
0 && 3; // > 0

3 && 0; // > 0
```

## `||`或运算符

或运算符的运算规则如下：

> 1.如果第一个运算子的值为 true, 则返回第一个运算子的值，且不再对第二个运算子进行计算。 2.否则返回第二个运算子的值。

```js
0 || 3; // > 3
3 || 0; // > 3
```

## `~`否运算符

连续使用两个否运算符，进行向下取整，这是所有取整方法中最快的一种。

```js
~~3.1415926; // > 3

~~3.9999; // > 3
```

## `^`异或运算符

异或运算符常用于不借助第三方变量，交换两个变量的值。

```js
var a = 9;
var b = 5;

a = a ^ b;
b = a ^ b;
a = a ^ b;

console.log(a, b); // > 5 9
```

EOF

> 参考资料： 1.阮一峰 ： [JavaScript 标准参考教程](http://javascript.ruanyifeng.com/grammar/conversion.html)
