---
title: 如何实现一个Lazyman
emoji: 👴
created_at: "2018-10-23"
---

实现一个 LazyMan，可以按照以下方式调用: `LazyMan('Hank')`  输出:

> Hi! This is Hank!

`LazyMan('Hank').sleep(10).eat('dinner')`  输出

> Hi! This is Hank! //等待 10 秒.. Wake up after 10 Eat dinner~

`LazyMan('Hank').eat('dinner').eat('supper')`  输出

> Hi This is Hank! Eat dinner~ Eat supper~

`LazyMan('Hank').sleepFirst(5).eat('supper')`  输出

> //等待 5 秒 Wake up after 5 Hi This is Hank! Eat supper

以此类推。

ES6 与队列实现

```jsx
class _LazyMan {
  constructor(name) {
    this.taskQueue = []
    this.runTimer = null
    this.sayHi(name)
  }

  run() {
    if (this.runTimer) {
      clearTimeout(this.runTimer)
    }
    this.runTimer = setTimeout(async () => {
      for (let asyncFunc of this.taskQueue) {
        await asyncFunc()
      }
      this.taskQueue.length = 0
      this.runTimer = null
    })
    return this
  }
  sayHi(name) {
    this.taskQueue.push(async () => console.log(`Hi!, This is ${name}`))
    return this.run()
  }
  eat(food) {
    this.taskQueue.push(async () => console.log(`Eat ${food}`))
    return this.run()
  }
  sleep(second) {
    this.taskQueue.push(async () => this._timeout(second))
    return this.run()
  }
  sleepFirst(second) {
    this.taskQueue.unshift(async () => this._timeout(second))
    return this.run()
  }
  async _timeout(s) {
    await new Promise(reslove => {
      setTimeout(reslove, s * 1e3)
    })
  }
}

let LazyMan = name => new _LazyMan(name)
```
