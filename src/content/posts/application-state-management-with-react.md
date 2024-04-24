---
title: React 应用状态管理
emoji: 🎰
created_at: "2020-09-18"
original: https://kentcdodds.com/blog/application-state-management-with-react
---

状态管理在任何应用中都是最难的部分。这也是为什么如此多的状态管理库层出不穷的原因。虽然状态管理本身是一个复杂的问题，但我认为让状态管理如此复杂的另一个原因就是我们经常 **过度设计(over-engineer)** 我们的解决方案。

在我使用 React 的过程中，有一个状态管理方案是我个人一直试图实现的，随着 React Hooks 的发布（以及 React Context 的大规模改进），这种状态管理方法已经被大幅简化。

我们经常说 React 组件是构建应用的乐高积木，但有多少人会认为在积木中包含了状态管理呢？我个人解决状态管理问题的 "秘密 "是，**考虑应用程序的状态在应用程序的树状结构中如何映射**。

Redux 如此成功的原因之一是 react-redux 解决了 [prop drilling](https://kentcdodds.com/blog/prop-drilling) 问题。你可以通过将组件传递到 `connect` 函数中，从而在组件树中的不同位置共享数据。这一功能非常好，它对 reducer/action creators/等等的使用也很好，但我相信 Redux 的普遍性是因为它解决了开发者的 [prop drilling](https://kentcdodds.com/blog/prop-drilling) 痛点。

但这也是我很少使用 Redux 的原因：我不断的看到开发者将应用程序中的所有状态都砸到 Redux 中（不仅仅是全局状态，局部状态也是这样）。这导致了非常多的问题，其中最重要的一点是当你在维护任何状态的交互时，都涉及到 `reducers`、 `action creatores/types`、和 `dispatch` 的调用。这最终导致你不得不打开许多文件，在你的脑海中追踪代码，以弄清楚正在发生什么，以及它对代码库的其他部分有什么影响。

如果 Redux 管理的是 **真正的全局状态**，这倒没有什么影响。但是对于简单状态的管理（如弹窗的打开/关闭状态 或者简单表单输入框的状态）就会变成一个大问题。更糟糕的是 Redux 的可扩展性不是很好，这就导致了如果你的应用变得越来越大，这个问题就会越来越难解决。你当然可以通过拆分 `reducers` 管理应用的不同部分，从而降低维护状态的复杂度，但是间接执行所有的 `reducers` 和 `action creators` 的方案也不是最优解。

即使不使用 Redux，将应用的所有状态放在单个对象中也可能导致其他问题。当一个 React 的 `<Context.Provider>` 中的值更新时，所有消费这个 Context 中数据的组件都会被更新并且都需要重新渲染，即使消费数据的组件是一个只关心一小部分数据的函数式组件。这可能会导致潜在的性能问题。（React-Redux v6 也试图使用此方法，直到他们意识这种方法不能兼容 Hooks 的运行逻辑，这迫使他们使用不同的方法在 v7 中来解决这些问题。）**但我的观点是，如果你的状态在逻辑上更加分离，并且将状态置于更关心它的且离它更近的 React Tree Node 上，你就不会有这个问题**。

---

如果你正在用 React 来构建应用，那么在你的应用中本身就已经存在了一个状态管理库，你根本不需要执行 `npm install` （或者 `yarn add`）任何东西。你的用户不需要消耗额外的流量，它在 NPM 上已经集成到所有的 React packages 中，并且 React team 已经为它提供了非常好的文档，它就是 React 本身。

> **React 本身就是一个状态管理库**

当你在构建一个 React 应用时，你其实是在用一堆组件构建一颗组件树，这个组件树的根是 `<App />`，这棵树的最末端是一些原生的 `<input>` 、 `<div>` 和 `<button>` 等元素。这种 UI 的渲染方式并不是像原生 HTML 那样 — 将所有的元素都放在一个文件中来渲染 UI，相反我们是用一个个独立的组件来管理组成 UI 的元素，这最终成为了构建 UI 的一个非常有效的方法。同理这种方式也可以用于状态管理，而且目前你很可能会这样做：

```jsx
function Counter() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}
```

注意我说的这些也可以用于 `class components`, Hooks 只是让事情变得更容易了一些（特别是我们马上要介绍的 Context）

```jsx
class Counter extends React.Component {
  state = { count: 0 }
  increment = () => this.setState(({ count }) => ({ count: count + 1 }))
  render() {
    return <button onClick={this.increment}>{this.state.count}</button>
  }
}
```

> “ 好的 Kent, 在独立的组件中维护单个状态确实比较简单，但如果遇到跨组件状态共享时应该怎么处理呢？比如，如果我想这样做：”

```jsx
function CountDisplay() {
  // where does `count` come from?
  return <div>The current counter count is {count}</div>
}

function App() {
  return (
    <div>
      <CountDisplay />
      <Counter />
    </div>
  )
}
```

> “ `count` 在 `<Counter>` 组件中，我需要一个状态管理工具能在 `<CountDisplay>` 中访问到 `count` ，并且能在 `<Counter>` 中更新它! ”

这个问题的答案在 React 刚发布时就已经存在了（或许更早？），并且我记得它一直在 React 的文档中：[状态提升](https://reactjs.org/docs/lifting-state-up.html)

“状态提升”无疑是用来解答这个问题的最合理最正确的答案。你可以这样使用：

```jsx
function Counter({ count, onIncrementClick }) {
  return <button onClick={onIncrementClick}>{count}</button>
}

function CountDisplay({ count }) {
  return <div>The current counter count is {count}</div>
}

function App() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  return (
    <div>
      <CountDisplay count={count} />
      <Counter count={count} onIncrementClick={increment} />
    </div>
  )
}
```

我们刚刚将 `<Counter>` 管理 `count` 的职责提升到了 `<App>` 中，这真的很简单。而且我们还可以一直提升状态到应用程序的顶部。

> "好的， Kent, 但是怎么处理 [prop drilling](https://kentcdodds.com/blog/prop-drilling) 的问题呢？“

Great question. 第一步就是重新思考组件组织的方式，好好利用一下 [组件组合](https://reactjs.org/docs/context.html#before-you-use-context)。看看这个例子：

```jsx
function App() {
  const [someState, setSomeState] = React.useState("some state")
  return (
    <>
      <Header someState={someState} onStateChange={setSomeState} />
      <LeftNav someState={someState} onStateChange={setSomeState} />
      <MainContent someState={someState} onStateChange={setSomeState} />
    </>
  )
}
```

你可以这样使用组件组合的方式，重新组织组件树：

```jsx
function App() {
  const [someState, setSomeState] = React.useState("some state")
  return (
    <>
      <Header logo={<Logo someState={someState} />} settings={<Settings onStateChange={setSomeState} />} />
      <LeftNav>
        <SomeLink someState={someState} />
        <SomeOtherLink someState={someState} />
        <Etc someState={someState} />
      </LeftNav>
      <MainContent>
        <SomeSensibleComponent someState={someState} />
        <AndSoOn someState={someState} />
      </MainContent>
    </>
  )
}
```

如果你不是很清楚我在说什么的话，你可以看看 [Michael Jackson](https://twitter.com/mjackson) 的 [视频](https://www.youtube.com/watch?v=3XaXKiXtNjw) 可以帮助你理解我想表达的意思。

但即使使用 `component composition` 也不能完全解决 `props drilling` 的问题。所以下一步就是使用 React 的 Context API。这实际上已经是一个 "解决方案 "了，但在很长一段时间里，这个解决方案是 "非官方的"。所以许多人都选择了 `react-redux` ，因为它用我说的机制解决了这个问题，也不用担心 React 文档中的警告。但是现在 Context API 已经被官方支持，我们可以直接使用，没有任何问题。

```jsx
// src/count/count-context.js
import * as React from "react"

const CountContext = React.createContext()

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }
  return context
}

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = React.useMemo(() => [count, setCount], [count])
  return <CountContext.Provider value={value} {...props} />
}

export { CountProvider, useCount }

// src/count/page.js
import * as React from "react"
import { CountProvider, useCount } from "./count-context"

function Counter() {
  const [count, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>{count}</button>
}

function CountDisplay() {
  const [count] = useCount()
  return <div>The current counter count is {count}</div>
}

function CountPage() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}
```

该代码示例是精心策划的，我不建议你使用 Context 来解决此问题。请阅读 [Prop Drilling](https://kentcdodds.com/blog/prop-drilling)， 以便更好地了解为什么 Prop Drilling 不一定是问题， 而且通常是可取的。不要把 Context 作为第一优先级的解决方案！

这种方法的有趣之处在于我们可以把所有操作状态的公共逻辑抽取在 `useCount` Hook 内：

```jsx
function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }

  const [count, setCount] = context
  const increment = () => setCount(c => c + 1)

  return {
    count,
    setCount,
    increment,
  }
}
```

你也可以很容易地把 `useState` 替换为 `useReducer`

```jsx
function countReducer(state, action) {
  switch (action.type) {
    case "INCREMENT": {
      return { count: state.count + 1 }
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

function CountProvider(props) {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 })
  const value = React.useMemo(() => [state, dispatch], [state])
  return <CountContext.Provider value={value} {...props} />
}

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }

  const [state, dispatch] = context
  const increment = () => dispatch({ type: "INCREMENT" })

  return {
    state,
    dispatch,
    increment,
  }
}
```

这提供了巨大的灵活性，并将复杂程度降低了几个数量级。在这样做的时候，有几件重要的事情要记住:

1. 在你的应用程序中，并非所有的东西都需要在一个单一的状态对象中，保持逻辑上的分离（用户设置不一定要和通知在同一个上下文中）。使用这种方法，你会有多个 Context。
2. 不是所有的上下文都需要在全局范围内访问! 尽可能地将状态保持在需要的地方。

更多关注在第二点上。你的应用程序树可能看起来像这样

```jsx
function App() {
  return (
    <ThemeProvider>
      <AuthenticationProvider>
        <Router>
          <Home path="/" />
          <About path="/about" />
          <UserPage path="/:userId" />
          <UserSettings path="/settings" />
          <Notifications path="/notifications" />
        </Router>
      </AuthenticationProvider>
    </ThemeProvider>
  )
}

function Notifications() {
  return (
    <NotificationsProvider>
      <NotificationsTab />
      <NotificationsTypeList />
      <NotificationsList />
    </NotificationsProvider>
  )
}

function UserPage({ username }) {
  return (
    <UserProvider username={username}>
      <UserInfo />
      <UserNav />
      <UserActivity />
    </UserProvider>
  )
}

function UserSettings() {
  // this would be the associated hook for the AuthenticationProvider
  const { user } = useAuthenticatedUser()
}
```

请注意，每个页面都可以有自己的 Provider，每个 Provider 拥有它下面的组件所必需的数据。Code Splitting 对这个东西也是 "有效的"。数据如何进入每个 Provider，取决于这些 Provider 使用的 Hook，以及你如何在应用程序中使用数据，但你知道从哪里开始查找数据流（在 Provider 中）。

想了解更多更多关于这种方案的优点，请查阅 ["State Colocation will make your React app faster"](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster) 和 ["Colocation"](https://kentcdodds.com/blog/colocation)。如果想了解更多关于 context，阅读 [“How to use React Context effectively”](https://kentcdodds.com/blog/how-to-use-react-context-effectively)。

**Server Cache 和 UI State**

最后再补充一件事，state 有各种类型，但每一种类型的 state 都可以归入两个大类中。

1. Server Cache - 状态实际上存储在服务端，我们将其存储在客户端中便于快速访问（像 用户信息）。
2. UI State - 只用在 UI 层，用来控制应用的交互（如弹窗的 `isOpen` 状态）。

当我们把这两者关联起来的时候，我们就犯了一个错误。 `Server Cache` 在本质上与 `UI State` 有着不同的问题，因此需要以不同的方式进行管理。如果你认可这个观点：你所拥有的实际上根本不是状态，而是状态的缓存，那么你就可以开始正确地思考它，从而正确地管理它。

你肯定可以用你自己的 useState 或 useReducer，在恰当的位置用正确的 useContext 来管理这个问题。但请允许我帮助你提个醒，缓存是一个非常难的问题（有人说这是计算机科学中最难的问题之一），在这个问题上，站在巨人的肩膀上是明智的。

这就是为什么我使用并推荐 [react-query](https://github.com/tannerlinsley/react-query) 来处理这种状态。我知道，我告诉过你，你不需要一个状态管理库，但我并不认为 react-query 是一个状态管理库。我认为它是一个缓存。而且它是一个非常好的缓存。看看它吧， [Tanner Linsley](https://twitter.com/tannerlinsley) 是个聪明人。

**性能如何 ？What about performance?**

当你遵循上述建议时，性能基本上不会是一个问题。特别是当你遵循[有关 `colocation` 的建议](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)时。然而，在一些使用案例中，性能肯定会出现问题。当你遇到与状态有关的性能问题时，首先要检查的是有多少组件由于状态变化而被重新渲染，并确定这些组件是否真的需要由于该状态变化而被重新渲染。如果是这样，那么问题就不在于你的状态管理机制，而在于你的渲染速度，在这种情况下你需要[加快渲染速度](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render)。

然而，如果你注意到有很多组件在渲染时没有 DOM 更新或只是需要副作用，那么这些组件就在进行不必要的渲染。这种情况在 React 中经常发生，而且它本身通常不是一个问题（你应该首先[专注于快速不必要的重新渲染](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render)），但如果它真的是瓶颈，那么这里有一些方法可以解决 React 上下文中状态的性能问题。

1. 把你的状态分成不同的逻辑部分，而不是在一个大的 Store 中，所以对状态的任何部分的单一更新都不会触发对你的应用程序中的每个组件的更新。
2. [优化 Context provider](https://kentcdodds.com/blog/how-to-use-react-context-effectively)
3. 引入 [jotai](https://github.com/react-spring/jotai)

又来了，又是对一个库的推荐。的确，有一些场景并不适合用 React 内置的状态管理抽象。在所有可用的抽象中，jotai 对于这些场景是最有希望解决的。如果你想知道这些场景是什么，jotai 能很好地解决的什么样的问题，查看： [Recoil 现代 React 的状态管理 - Dave McCabe aka @mcc_abe 在 @ReactEurope 2020](https://www.youtube.com/watch?v=_ISAA_Jt9kI) 。Recoil 和 jotai 非常相似（并且解决相同类型的问题）。但根据我对它们的（有限的）经验，我更喜欢 jotai。

在任何情况下，大多数应用程序都不需要像 recoil 或 jotai 这样的原子状态管理工具。

**总结**

同样也你可以用 Class Component 做相同的事情, 但 Hooks 使它更容易管理。 你完全可以用 React 15 实现这一理念，没有任何问题。但注意尽可能地保持状态在需要它的地方，只有在 `Prop Drilling` 真正成为一个问题的时候再考虑使用 `Context`, 这样做会让你更容易管理状态。
