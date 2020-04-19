---
title: 如何编写更好的React代码
tags:
  - React
date: 2018-10-27 23:12:22
keywords: React
---

这是一篇不完整译文，删减了一些我认为与 React 关系不大的内容，例如如何在 vscode 中自定义 Snippet。 或者众所周知的内容， 例如使用 React DevTools。

原文链接：[https://blog.bitsrc.io/how-to-write-better-code-in-react-best-practices-b8ca87d462b0](https://blog.bitsrc.io/how-to-write-better-code-in-react-best-practices-b8ca87d462b0)

# 使用代码检查工具(linter)

一个好的 linter 对写出优秀的代码是十分重要的，一套优秀的 linting 规则能够帮助你检查任何可能导致代码出现问题的内容。

```javascript
import react from 'react';
/* Other imports */
/* Code */
export default class App extends React.Component {
  render() {
    const {userIsLoaded, user} = this.props;
    if (!userIsLoaded) return <Loader />;
    return (
      /* Code */
    )
  }
}
```

参考以上代码，如果你想在`render`函数中使用`this.props.hello`这个属性，那么 linter 可以立即指出错误：

    'hello' is missing in props validation (react/prop-types)

linter 的作用并不是只在于帮你发现问题，更重要的作用在于它会帮你意识到什么才是最佳实践。从而你自己就会开始避免错误。

一些有用的资源：

- [ESLint](https://eslint.org/)
- [Airbnb’s JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React ESLint Package](https://www.npmjs.com/package/eslint-plugin-react)

# propTypes 和 defaultProps

propTypes 能够检查你传递的 props。当你传递的 props 数据与设置的 propsType 不一致时，错误日志会让你更容易的找到问题所在。

当你需要验证像 Object 或者 Array 这样模糊的 props 时，你可以使用 PropTypes.shape 来精确的验证每一个属性。

```javascript
static propTypes = {
  userIsLoaded: PropTypes.boolean.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
  )}.isRequired,
}
```

defaultProps 能够让你给你的 props 提供一个默认值。当存在默认值时，你可以取消一些不必要的 props 传递。

```
static defaultProps = {
  userIsLoaded: false,
}
```

propTypes 现在已经不包含在 React 内部了。你需要独立的安装它。

- [propTypes](https://www.npmjs.com/package/prop-types)

> 当 React 与 TypeScript 结合使用时， 能做到更好的 props 检查。

# 了解何时需要创建新组件

```javascript
export default class Profile extends PureComponent {
  static propTypes = {
    userIsLoaded: PropTypes.bool,
    user: PropTypes.shape({
      _id: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    userIsLoaded: false,
  }

  render() {
    const { userIsLoaded, user } = this.props;
    if (!userIsLoaded) return <Loaded />;
    return (
      <div>
        <div className="two-col">
          <section>
            <MyOrders userId={user.id} />
            <MyDownloads userId={user._id} />
          </section>
          <aside>
            <MySubscriptions user={user} />
            <MyVotes user={user} />
          </aside>
        </div>
        <div className="one-col">
          {isRole('affiliate', user={user._id} &&
            <MyAffiliateInfo userId={user._id} />
          }
        </div>
      </div>
    )
  }
}
```

上面是一个 Profile 的组件，在 Profile 内部还有一些像 MyOrders 或者 MyDownloads 的组件。我把它们都放在 Profile 里面，把它们变成一个大组件，因为它们都是同样的需要 User 数据。

当你不知道是否需要新建一个组件时，请思考以下问题：

- 你代码的功能是不是正在变得复杂？
- 你的代码是否可以独立的完成他需要处理的业务逻辑？
- 你是否打算重用你的代码？

如果上面的问题有任何一个的答案是肯定的， 那么你就需要新建一个组件了。

## 介绍两个创建组件时需要遵循的原则：

**组件：单一职责原则**

- 每个组件只做一件事
- 如果组件变得复杂，那么应该拆分为小组件(即方便维护，也可以减少不必要的更新)

**数据状态管理: DRY(Don't Repeat Yourself)原则**

- 能够计算得到的状态不要单独存储
- 组件尽量无状态，所需数据通过 props 获取

# 了解 Component、PureComponet 和 Stateless Functional Component 的区别

对于 React 开发者，知道何时去使用 Component、PureComponent 和 Stateless Functional Component 是一件十分重要的事情。

## Stateless Functional Component

```javascript
const Billboard = () => (
  <ZoneBlack>
    <Heading>React</Heading>
    <div className="billboard_product">
      <Link className="billboard_product-image" to="/">
        <img alt="#" src="#">
      </Link>
      <div className="billboard_product-details">
        <h3 className="sub">React</h3>
        <p>Lorem Ipsum</p>
      </div>
    </div>
  </ZoneBlack>
);
```

函数式的无状态组件是很常见的一种 React 组件。它提供了一种友好、简洁的方式去创建组件，函数式组件不使用任何 state、props 和生命周期函数。

简而言之，函数式组件就是一个可以返回 JSX 的纯函数。

## PureComponent

通常情况下，当一个组件获得一个新的 prop 时，React 会重新渲染该组件。但是有时候，一个组件获得了一个并没有实际发生改变的 prop (比如在原来的数据中增加了一个新属性，但是组件的渲染函数，并不依赖于该属性)，React 仍然会重新渲染该组件。这是因为继承自`Component`的组件的`shouldComponentUpdate`函数默认总是返回 true。

使用 PureComponent 可以解决这个问题，PureComponent 在内部实现了一个带有浅属性和状态比较的 shouldComponentUpdate。如果是 PureComponent 的 prop 是简单类型并且发生变动，会触发重绘。但是如果发生改变的是一个对象的内置属性，那么 PureComponent 将不会重新渲染。

**那我们如何得知 React 何时触发了不需要的重绘呢？**
你可以使用 [Why Did You Update](https://github.com/maicki/why-did-you-update) 这个 React 包。当发生可能不必要的重新渲染时，此包将在控制台中通知你。

一旦你发现了不必要的重新渲染，你可以使用 PureComponent 来代替 Component。

# 牢记 {} !== {}

众所周知`{} === {}`的结果是**false**, 而在 JSX 中给组件传递 props 经常遇到这样的写法:

```javascript
<TodoItem
  style={{ color: red }}
  id={id}
  content={content}
  onRemoveTodo={() => removeTodo}
  onToggleTodo={() => toggleTodo}
/>
```

上面的 JSX 中， style、 onRemoveTodo 和 onToggleTodo 都直接使用了对象/函数字面量的写法。这种写法在每次 render 执行时，都会返回一个**新**的对象/函数。由于 PureComponent 或者 React.memo 默认都采用的是 shallow compare 也就是浅对比实现的 shouldComponentUpdate。所以在每次浅对比时，`{ color: 'red' } === { color: 'red' }` 的结果都为 false， 所以会导致组件不必要的 re-render, 造成浪费。

所以要牢记 `{} !== {}`, 不要给组件的 props 使用字面量的写法(原生 DOM 元素就没有这个限制了)， 将他们定义成变量, 赋值给 props, 这样可以保证 shouldComponentUpdate 有一个正确的结果。

# 使用内联条件语句

```javascript
render() {
  let MyAffiliateInfo = null
  if (isRole('affiliate', user._id)) {
    MyAffiliateInfo = <MyAffiliateInfo userId={user._id} />
  }
  return (
     <div className="one-col">
       { /* if Conditional Statements */ }
       { MyAffiliateInfo }
       { /* Inline Conditional Statements */ }
       { isRole('affiliate', user._id) &&
         <MyAffiliateInfo userId={user._id} />
       }
     </div>
  )
}
```

使用内联条件语句的好处是: 你不需要为条件判断写多余的逻辑， 也不需要额外的 if 语句。可以使代码看起来更整洁。
