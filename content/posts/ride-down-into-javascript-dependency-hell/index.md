---
title: 了解 JavaScript 依赖地狱
tags:
  - JavaScript
date: 2020-04-19T04:14:08.452Z
---

原文：[Ride Down Into JavaScript Dependency Hell | AppSignal Blog](https://blog.appsignal.com/2020/04/09/ride-down-the-javascript-dependency-hell.html)

每个 #JavaScript 项目在刚开始开发时总是信心满满，不愿意引入过多的 #npm 包。但就算花费了更多的时间也做了更多的工作，packages 还是越来越多。 `package.json` 也越来越膨胀，而且由于增加包或者删除包导致的`package-lock.json` 的巨大变更，也让 pull request 看起来十分可怕。

“这挺好的” - lead 如是说，并且其他人也点头称是。 我们需要做其他的事情嘛？我们很庆幸 JS 生态发展的很好，所以我们不应该再为解决同样的事情而造轮子了，这些事情开源社区已经解决过了。

假设说你想用 `gatsby.js` 搭建一个博客，在你安装`Gatsby.js`之后，恭喜你 🎉，你已经添加了 19000 个额外的依赖项（可怕吗 😨。这个行为正常吗？JS 的依赖 🌲 得变得多复杂？它到底是怎么变成依赖地狱的？让我们深入了解一下吧。

# JS Package 到底是什么？

NPM - the Node Package Manager, 它是世界上最大的 JS Package 管理中心，它比 RubyGems、Pypi 和 Maven combined 都要大的多。 [Module Counts website](http://www.modulecounts.com/) 追踪了最受欢迎的包管理中心的软件包数量。

![](content/posts/ride-down-into-javascript-dependency-hell/module-counts.png)

为了让你写的代码变成一个 NPM 包，你需要在你的项目中添加一个 `package.json` ，有了它你才能把你的代码变成一个可以发布到 NPM 包管理中心的包。

# 什么是 package.json

定义： 
- 罗列了项目依赖的包
- 使用了 semantic versioning 定义了项目所用的包的版本
- 让项目的构建可以重用。因此也更容易的与其他开发者分享

把它想象成一个 README。你可以在这里定义你的包的依赖关系，编写构建和测试脚本，也可以按照你想要的方式来描述你的包的版本以及它的作用。我们最感兴趣的是在 package.json 中指定依赖关系的能力。

听起来有点乱，想象有 A 包依赖于 B 包，而 B 包又依赖于 C 包。这个依赖是没有限制的，你想怎么做就怎么做。这就是为什么当你安装 `Gatsby.js` 的时候，你会得到另外的 19k 依赖包。

## package.json 中依赖的类型

为了更好的理解依赖是如何随着时间膨胀起来的，我们首先要了解一个项目有哪些不同的依赖类型，下面几个依赖类型你有可能在 package.json 中遇到过： 
- `dependencies` - 与项目代码直接相关的依赖项 
- `devDependencies` - 只在项目开发过程中会需要的依赖项
- `peerDependencies` - 项目运行所需的前置依赖 
- `optionalDependencies` - 可选的依赖，且如果这些依赖安装失败的话，并不会打断你的安装流程 
- `bundledDependencies` - 这是一个 packages 的数组，他们会和你的 package 捆绑在一起，当一些第三方的库不是一个 npm 的包又或者你想将其他项目当作包包含进来时，这很有用。

# package-lock.json 的作用

我们都知道这个文件总是会有很多的增加和删减的变更，并且我们通常不会审阅它。 `package-lock.json` 文件会在每次 `package.json` 文件 或者 `node_modules` 文件夹变动的时候自动生成，它记录了安装时生成的依赖树信息。这样之后的安装都可以根据`package-lock.json`生成相同的依赖树信息。这样就解决了不同用户生成的依赖树不一致的问题。

让我们来看一个在`package.json`中具有 React 依赖项的项目。如果转到 package-lock.json，你会看到类似以下内容：

```json
“react”: {
  “version”: "16.13.0”,
  “resolved”: “https://registry.npmjs.org/react/-/react-16.13.0.tgz”,
  "integrity": “sha512-TSavZz2iSLkq5/oiE7gnFzmURKZMltmi193rm5HEoUDAXpzT9Kzw6oNZnGoai/4+fUnm7FqS5dwgUL34TujcWQ==“,
  “requires": {
    “loose-envify”: “^1.1.0”,
    “object-assign”: “^4.1.1”,
    “prop-types”: “^15.6.2”
  }
}

```

`package-lock.json` 在你的项目中就是一个巨大的依赖项列表。它记录了依赖项的版本、模块的位置、一个代表了包完整性的哈希值。如果你继续看的话，你还能看到 React 所需要的包的信息，等等。这就是依赖地狱存在的地方，它定义了项目需要的一切事情。

# 分解 Gatsby.js 的依赖项

我们是如何通过一次安装就获得 19k 依赖项的呢？答案就是依赖的依赖，这就是我们安装 `Gatsby.js` 时发生的事情。

```shell
$ npm install —save gatsby

...

+ gatsby@2.19.28
added 1 package from 1 contributor, removed 9 packages, updated 10 packages and audited 19001 packages in 40.382s
```

如果我们查看 packge.json 文件，那里始终只有一个依赖。但是如果我们查看 package-lock.json ， 那是刚刚生成的一个将近 14k 行的怪物。更详细的信息可以查看 Gatsby.js github 仓库中的 [package.json](https://github.com/gatsbyjs/gatsby/blob/master/package.json) 。NPM 计算出了它有 [132](https://www.npmjs.com/package/gatsby) 个直接依赖项。想象一下，其中的每个依赖项仅具有一个额外依赖项，那么依赖项的数量将加倍到 264 个。然而更现实的情况是，每个依赖项不只具有一个额外依赖。

例如，我们可以看看 lodash 有多少个依赖项：

```shell
$ npm ls lodash
example-js-package@1.0.0
└─┬ gatsby@2.19.28
  ├─┬ @babel/core@7.8.6
  │ ├─┬ @babel/generator@7.8.6
  │ │ └── lodash@4.17.15  deduped
  │ ├─┬ @babel/types@7.8.6
  │ │ └── lodash@4.17.15  deduped
  │ └── lodash@4.17.15  deduped
  ├─┬ @babel/traverse@7.8.6
  │ └── lodash@4.17.15  deduped
  ├─┬ @typescript-eslint/parser@2.22.0
  │ └─┬ @typescript-eslint/typescript-estree@2.22.0
  │   └── lodash@4.17.15  deduped
  ├─┬ babel-preset-gatsby@0.2.29
  │ └─┬ @babel/preset-env@7.8.6
  │   ├─┬ @babel/plugin-transform-block-scoping@7.8.3
  │   │ └── lodash@4.17.15  deduped
  │   ├─┬ @babel/plugin-transform-classes@7.8.6
  │   │ └─┬ @babel/helper-define-map@7.8.3
  │   │   └── lodash@4.17.15  deduped
  │   ├─┬ @babel/plugin-transform-modules-amd@7.8.3
  │   │ └─┬ @babel/helper-module-transforms@7.8.6
  │   │   └── lodash@4.17.15  deduped
  │   └─┬ @babel/plugin-transform-sticky-regex@7.8.3
  │     └─┬ @babel/helper-regex@7.8.3
  │       └── lodash@4.17.15  deduped
  …
```

幸运的是，其中大部分 lodash 的版本都是一致的，我们只需要在 `node_modules` 中安装一个 lodash 即可。但是实际的生产项目中，不同的软件包需要其他包的不同版本，这也就是为什么会有很多关于`node_module`如此庞大的笑话（例如：`node_modules black hole`）, 但是在我们的项目中，目前的情况还不错：

```shell
$ du -sh node_modules
200M node_modules
```

200M 还不是很多，我之前看到过它轻松的超过了 700M。如果你想查看模块占据存储空间的更具体信息，你可以运行：

```shell
$ du -sh ./node_modules/* | sort -nr | grep '\dM.*’
 17M    ./node_modules/rxjs
8.4M    ./node_modules/@types
7.4M    ./node_modules/core-js
6.8M    ./node_modules/@babel
5.4M    ./node_modules/gatsby
5.2M    ./node_modules/eslint
4.8M    ./node_modules/lodash
3.6M    ./node_modules/graphql-compose
3.6M    ./node_modules/@typescript-eslint
3.5M    ./node_modules/webpack
3.4M    ./node_modules/moment
3.3M    ./node_modules/webpack-dev-server
3.2M    ./node_modules/caniuse-lite
3.1M    ./node_modules/graphql
…
```

没想到 rxjs 竟然偷偷摸摸地占据的如此多的空间。有一个简单的命令可以减少 node_modules 的大小，并拍平那些依赖项，那就是 ::`npm dedup`::

```shell
$ npm dedup
moved 1 package and audited 18701 packages in 4.622s

51 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

[去重](https://docs.npmjs.com/cli/dedupe)的动作会通过查找依赖项之间的公共包，且移动他们使得他们可以被重用的方式简化依赖树的结构。我们上述例子中的`lodash`就是这种情况，很多依赖包都使用了 `lodash@4.17.15` ，这样就不会有其他版本的包需要安装了。如果你使用 `yarn` ，你可以运行 `yarn dedupe`, 但是这是不必要的，因为你在执行 `yarn install` 的时候就自动执行了该命令。

# 依赖可视化

如果你想看看项目中使用的依赖可视化出来是什么样子的话，这有几个工具推荐给你：
- [NPM.ANVAKA.COM](https://npm.anvaka.com/)
![](content/posts/ride-down-into-javascript-dependency-hell/anvaka-vizualization-gatsby.png)

-   [NPM.BROOFA.COM](http://npm.broofa.com/)

![](content/posts/ride-down-into-javascript-dependency-hell/broofa-vizualization-gatsby.png)

- [Package Phobia](https://packagephobia.now.sh/): 这个网站可以看到你将要安装的包会占据多少空间。
    ![](content/posts/ride-down-into-javascript-dependency-hell/package-phobia-vizualization-gatsby.png)

# NPKill

如果你需要清理你电脑上的 node_modules，你可以使用 [npkill](https://github.com/voidcosmos/npkill)

![](content/posts/ride-down-into-javascript-dependency-hell/1587270281250.jpg)
