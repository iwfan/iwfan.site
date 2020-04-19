---
title: TypeScript 类型检查机制
tags:
  - TypeScript
date: 2020-03-30 22:18:01
---

本篇主要讲述 TypeScript 中对于类型检查（操作）的一些知识。主要包括类型推论、类型兼容、类型收缩和 assert 类型断言。

# 类型推论

类型推论是值 TS 可以自动的推导出变量的类型。TS 的目标是为 JS 提供一套可选的静态类型检查系统。所以在 TS 中不会强制要求你必须指明变量或者对象的类型，相反变量或者对象的类型在不指明的情况下是可以被 TS compiler 推测出来的。熟悉类型推论可以在编写 TS 代码的时候节省很多时间。

TS 类型推测的规则很简单，用一句话概括就是：你是谁、你在哪。

## 你是谁 - inference by value type

先看一个例子：

```javascript
const PI = 3.14;
```

当 TS compiler 在推测 PI 的类型时，会根据该常量指向的值也就是 3.14 来推测。由于 3.14 是 `number` 类型，所以 PI 也就被推测为 `number` 类型。

### basic rules

`TS Compiler 推测类型的基本规则就是在初始化的时候按值推测。`

```typescript
let num = 123; // type is number
let str = "ts"; // type is string
let bool = false; // type is boolean
```

这其中还有一些细节：

### null / undefined

```typescript
let empty = null; // type is any
let blank = undefined; // type is any
```

TS 对 JS 原始类型的推测比较简单，但是是如果变量的值为 `null / undefined`, 那么 TS 会将它的类型推测为 `any`。 这是因为在**默认的情况**下 TS 中 `null / undefined` 是所有类型的子类型， 而子类型是可以被上层更为具体的类型代替的。

再看一个例子：

```typescript
let v1 = undefined; // same for null.   a is a any type

v1 = 3;

type T = typeof v1;

let v2: T = "1"; // Type '"1"' is not assignable to type 'number'.(2322)
```

上面的例子中，TS Compiler 首先将 `v1` 推测为 `any` 类型。之后 我们把 **`3`** 赋值给 `v1`，然后获取到 `v1` 的类型`T`，最后发现 `T` 的类型变成了 `number`。 这说明被推测为 `any` 类型的变量是可以继续推测的， 当然除非你 `显式的声明类型为any`。

### inference for Object literal

在推测对象字面量类型的时候，TS 会将对象的结构抽取出来，做为对象的类型。

```typescript
let obj1 = { name: "foo", age: 24 }; // 对象的类型推测是根据对象的结构，此时obj1的类型就是 { name: string, age: number }

obj1.name = 100; // Type '100' is not assignable to type 'string'.
```

这个推测对于对象的解构同样生效

```typescript
let { age } = obj1; // age is type number
```

### inference for function

TS 中函数的类型由 `参数类型` 和 `返回值类型` 两部分组成。
**参数类型**： 如果函数的参数有默认值，那么参数的类型就是默认值的类型， 否则就是 `any`。**返回值类型**：如果计算返回值的变量的类型都可以确定，TS 可以正确推测出类型。 如有一个参与计算返回值的变量的类型为 `any`, 那么 TS 也会将返回值的类型推测为 `any`。

```typescript
function fun(a, b = 0, c = "1", d = 1) {
  // 参数类型： a: any, b: number, c: string, d: number
  return a + b; // 返回值类型： any
  return b + c; // string
  return b + d; // number
}
```

对于函数类型的推测，还有第二种情况，就是根据语境（contextual）来推测，稍后会讲到。

### best common type

当对多个表达式进行类型推测时（如：推测数组，元组的类型）， TS 会参考每一个成员的类型，然后寻找最通用的类型。如果找不到最通用的类型，那么就会联合多个成员的类型，也就是使用联合类型。

```typescript
let arr1 = []; //  any[]

let arr2 = [1, 2, 3, 4, 5]; //  number[]

let arr3 = [1, "2", true, null, 5]; // (string|number|boolean)[]

let arr4 = [new Date(), new RegExp(``), new Function()]; // (Date|RegExp|Function)[]

class P {}
class A extends P {}
class B extends P {}
class C extends P {}

let arr5 = [new A(), new B(), new C()]; // (A | B | C)[]
let arr6 = [new A(), new B(), new C(), new P()]; // P[]
```

## 你在哪 - inference by contextual

你在哪：按对象当时所处的上下文来推测类型。这种按语境推测的类型也被称为 `contextual type`。
例如：

```typescript
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button); //<- OK
  console.log(mouseEvent.kangaroo); //<- Error!
};

window.onscroll = function (uiEvent) {
  console.log(uiEvent.button); //<- Error!
};
```

在这些情况下， TS Compiler 就可以推测出来 mouseEvent / uiEvent 的类型。

# 类型兼容与  Soundness

何为 Soundness ？首先来看一段代码:

```typescript
interface Media {
  width: number;
  height: number;
}

interface Image {
  width: number;
  height: number;
  src: string;
  alt?: string;
}

let m: Media = { width: 100, height: 100 };

let img: Image = { width: 100, height: 100, src: "" };

m = img; // 🆗
```

上面的代码中，Image 类型的 img 可以正确赋值给 Media 类型的 m。并不会出现错误，这是因为**TypeScript 是基于结构类型(Structural type system)**的，而不是基于**名义类型(Nominal type system)**的。
Soundness 是安全、可靠的意思。因为基于结构型的类型系统并没有基于名义类型的系统那么安全，所以 Typescript 也是 unsound 的，也就是不安全的。这在[ TypeScript 设计目标](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals)中有着明确表述。
在 Non-Goals 部分，明确说明 TypeScript 是在正确性与生产力之间寻求一个平衡，所以 sound 并不是 TypeScript 的设计目标。

> Apply a sound or "provably correct" type system. Instead, strike a balance between correctness and productivity.

**TypeScript 结构化类型系统的基本规则是，如果`x`要兼容`y`，那么`y`至少具有与`x`相同的属性。**

## 普通对象/函数的类型兼容

Y 要包含 X 所有的必选属性。是包含关系。

```typescript
+-----------------+
|  Image          |
|       +-------+ |
|       | Media | |
|       +-------+ |
+-----------------+
```

在兼容对象类型时只看属性就可以了，但是当函数类型的兼容时，就要考虑两个部分，第一个是参数列表，第二个是返回值。但是规则是相同的，都要满足包含关系才可以兼容, **参数列表是向下兼容，只能少不能多。 对象类型是向上兼容，只能多不能少。**

```typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK, y 函数的参数列表可以包含 x
x = y; // Error, x 的参数列表不足以包含 y

let x = () => ({ name: "Alice" });
let y = () => ({ name: "Alice", location: "Seattle" });

x = y; // OK, y 的返回值可以包含 x 的返回值
y = x; // Error, 反之无法包含
```

## 函数重载

对于有重载的函数，源函数的每个重载都要在目标函数上找到对应的函数签名。（函数签名就是完整的函数定义）。

```typescript
interface T1 {
  fun(a: number, b: number): number;
  fun(a: string, b: string): string;
}

class Test1 implements T1 {
  fun(a: number, b: number): number;
  fun(a: string, b: string): string;
  fun(a: number | string, b: number | string): number | string {
    return 0;
  }
}

let t1 = new Test1();

function fun(c: number | string, d: number | string): number | string {
  return 0;
}

t1.fun = fun; //ERROR, 只有一个函数签名。

class Test2 {
  fun(a: number, b: number): number;
  fun(a: string, b: string): string;
  fun(a: number | string, b: number | string): number | string {
    return 0;
  }
}
t1.fun = new Test2().fun; // OK
```

## 枚举

普通枚举类型与数字类型兼容，字符串枚举与字符串兼容，不同的枚举之间是不兼容的。

```typescript
enum Status {
  Ready,
  Waiting,
}
enum Color {
  Red,
  Blue,
  Green,
}

let status = Status.Ready;
status = Color.Green; // Error
```

## 类

在类类型的兼容性比较上，只有类的实例部分会参与比较，而静态部分和构造函数部分不会参与比较。类的私有成员与受保护的成员会影响兼容性。只有当 private 与 protected 的成员都来自同一类时，才可以正确兼容。

```typescript
class Human {
  private type: "human" = "human";
}

class Animal {
  private type: "animal" = "animal";
}

class Teacher extends Human {
  public name: string = "";
  constructor(name: string) {
    super();
    this.name = name;
  }
}

class Student extends Human {
  public name: string = "";
  constructor(name: string) {
    super();
    this.name = name;
  }
}

class Test extends Animal {
  public name: string = "";
  constructor(name: string) {
    super();
    this.name = name;
  }
}

let h1 = new Teacher("foo");

let s1 = new Student("bar");

let t1 = new Test("test");

h1 = s1; // OK

s1 = h1; // OK

h1 = t1; // ERROR, 私有成员不是来自同一个类
```

# [对象字面量赋值检查](https://github.com/Microsoft/TypeScript/pull/3823)

TS 会对对象字面量作出更严格的检查。

```typescript
interface Person {
  name: string;
  age: number;
}

function fun(p: Person) {
  // ...
}

const p = { name: "foo", age: 12, other: "other" };

fun(p); // OK!
fun({ name: "foo", age: 12, other: "other" }); // ERROR! TS 检测出了多余的属性
```

如果出现此类问题，解决的方式也有很多：

1. 使用临时变量绕过此项检查。
2. 使用类型断言强制制定类型。
3. 给 Person 添加字符串索引类型。

# 类型保护 / 类型收缩

TS 具有  [基于控制流的类型分析](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#control-flow-based-type-analysis)  的能力，在遇到控制流的时候，可以自动将类型收缩特定的类型。

```typescript
function triple(input: number | string): number | string {
  if (typeof input === "number") {
    return input * 3;
  } else {
    return new Array(4).join(input);
  }
}
```

## typeof

```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

## instanceOf

```typescript
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5
    ? new SpaceRepeatingPadder(4)
    : new StringPadder("  ");
}

// Type is 'SpaceRepeatingPadder | StringPadder'
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder; // type narrowed to 'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder; // type narrowed to 'StringPadder'
}
```

## in

TS 只支持 in 操作符的类型收缩， 并不支持 hasOwnProperty 这样的类型收缩。

```typescript
interface Media {
  width: number;
  height: number;
}

interface Image {
  width: number;
  height: number;
  src: string;
  alt?: string;
}

function log(p: Media | Image) {
  if ("src" in p) {
    p.src;
  } else {
    p.width;
  }
}
```

## 自定义的类型保护函数

```typescript
function isNumber(x: any): x is number {
  // 类型谓词
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(" ") + value;
  }
  if (isString(padding)) {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

## assert 类型断言函数

TS 3.7 中新增了一个 assert 断言函数，它可以在不使用控制流的情况下实现类型收窄。

```typescript
function yell(str) {
  assert(typeof str === "string");

  return str.toUppercase();
  //         ~~~~~~~~~~~
  // error: Property 'toUppercase' does not exist on type 'string'.
  //        Did you mean 'toUpperCase'?
}
```

assert 断言函数可以和自定义类型保护函数一起使用，

```typescript
function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new AssertionError("Not a string!");
  }
}
```
