---
title: CORS与JSONP
slug: 0be4a46e698285676c0d721ed3c00772
date: 2018-09-09 20:01:26
tags:
  - JavaScript
thumbnail: null
---

同源策略是浏览器中的一个重要机制，它可以防止网站加载不安全的内容。同源指的是网站的**`协议相同`**、**`域名相同`**、**`端口相同`**。
以`https://wangfan.site`为例，跟以下几个 URL 做对比。

| URL                                   | 是否同源 | 备注                   |
| :------------------------------------ | :------- | :--------------------- |
| `https://wangfan.site/dir/file1.html` | 同源     | 协议、域名、端口都相同 |
| `http://wangfan.site`                 | 不同源   | 所使用的协议不相同     |
| `https://blog.wangfan.site`           | 不同源   | 域名不相同             |
| `https://wangfan.site:8888`           | 不同源   | 端口不相同             |

如果使用不同源的资源，会受到一些限制， 比如：无法操作`Cookie`、`LocalStorage`和`IndexDB`，无法操作 DOM，不能发送或者响应 Ajax 请求。

这些限制在某些情况下可以通过修改源来解决，例如：
**子域访问父域**：可以在`https://blog.wangfan.site`和`https://wangfan.site`下，同时设置`document.domain = 'wangfan.site'`。 这样在`blog`这个子域下就可以操作父域的数据了。

但是如果两个源不是父子域的关系便不能这样操作了，这种情况下就要使用跨域了。

# 准备

以下是一个用来测试的`server.js`和`index.html`，只保留了最基本的结构。

```jsx
// server.js
const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2] || 1125
const server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true)
  let { pathname, query } = parsedUrl
  let { headers } = req

  if (pathname === '/') {
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.write(fs.readFileSync('index.html'))
  }
  /* 
    这中间的内容在下面的具体跨域方案中做补充
  */
  res.end()
})
server.listen(port)
console.log(`✨ 跨域测试服务启动成功(●ˇ∀ˇ●)\\n🎉 <http://localhost>:${port}`)
```

```html
<!-- index.html -->
<body>
  <h1>跨域测试服务</h1>
</body>
```

# JSONP 跨域

## 简介

JSONP 是 JSON with Padding 的缩写形式， 它的原理就是利用 script 标签不受同源策略的限制来实现交互。其实这是历史遗留下来的“BUG”。
JSONP 请求回来的数据格式一般是一个回调函数包裹着 JSON 数据：

> callback({ site: 'blog.wangfan.site', desc: 'JSONP 跨域' })

从这个格式便可知 Padding 指的就是回调函数， 而 JSON 就是这个回调的实参。
一次成功的 JSONP 请求主要包含两个部分：

1. 一个预先定义好的回调函数。
2. 一个发送请求的 script 标签。

## 准备服务

首先在`server.js`中增加如下内容, 用来提供 jsonp 跨域的后端接口。

```jsx
if (pathname === '/jsonp') {
  res.setHeader('Content-Type', 'application/javascript;charset=utf-8')
  let data = { desc: 'JSONP 跨域', ...query }
  if (!query.cb) {
    query.cb = 'callback'
  }
  res.write(`${query.cb}(${JSON.stringify(data)})`)
}
```

然后在 command line 中输入 `node server.js`， 服务默认会使用 1125 端口， 如下你想指定端口， 请输入`node server.js 8888`。

## 发送 JSONP 请求

新建 `jsonp.html` 文件， 增加内容如下：

```html
<body>
  <script>
    function jsonpCrossOrigin(json) {
      console.log(json)
    }
  </script>
  <script src="<http://localhost:1125/jsonp?type=jsonp&cb=jsonpCrossOrigin>"></script>
</body>
```

最后在浏览器中打开该页面, 查看浏览器的输出结果。

> {desc: "JSONP 跨域", type: "jsonp", cb: "jsonpCrossOrigin"}

这样就完成了一次 JSONP 跨域访问。
但这只是一个最原始的版本，缺点异常明显。每次发送请求之前都需要手动定义一个固定的函数， 并且不能动态发送请求。 实际工作中会将这个功能封装起来。

## 封装 JSONP 函数

```jsx
function jsonp(url, param, callbackKey) {
  return new Promise((reslove, reject) => {
    try {
      // step 1. 预先定义好的回调函数
      const randomFuncName =
        'cb_' + Math.random().toString(32).substr(2) + Date.now().toString(32)
      window[randomFuncName] = (json) => {
        delete window[randomFuncName]
        document.querySelector(`#${randomFuncName}`).remove()
        reslove(json)
      }
      // step 2. 处理url
      const hasQueryString = ''.includes.call(url, '?')
      const paramStrArr = []
      for (let key in param) {
        paramStrArr.push(`${key}=${param[key]}`)
      }
      url += `${hasQueryString ? '&' : '?'}${paramStrArr.join(
        '&'
      )}&${callbackKey}=${randomFuncName}`
      // step 3. 生成script标签,发送请求
      const scriptEl = document.createElement('script')
      scriptEl.id = randomFuncName
      scriptEl.src = url
      document.body.appendChild(scriptEl)
    } catch (exception) {
      reject(exception)
    }
  })
}
```

然后试着调用一下

```jsx
jsonp('<http://localhost:1125/jsonp>', { type: 'jsonp' }, 'cb').then((data) => {
  console.log(data)
})
```

## 优缺点

JSONP 的优点就是其卓越的兼容性，完全不用考虑老版本的浏览器(*垃圾 IE， 毁我青春*╰（‵□′）╯)。

缺点就是安全性， 如果通过 JSONP 请求服务器返回的结果是这种格式，那该怎么说？

> callback({desc: "JSONP 跨域", type: "jsonp", cb: "jsonpCrossOrigin"});alert(1);

因为 jsonp 请求回来的数据其实是一段 javascript 代码， 如果这段代码被其他人加入一些恶意脚本， 那么后果就很严重了。
并且 jsonp 使用 script 标签发送请求， 而 script 标签默认是同源情况下发送 cookie， 非同源就不发送， 所以不能精确控制是否携带 cookie 和自定义请求头。
而且 script 标签不受同源策略的限制，本就是历史遗留下来的“bug”。所以 JSONP 慢慢的被更为标准的 CORS 代替了。

# CORS 跨域

浏览器将 CORS 跨域请求分为两类：`简单请求`和`非简单请求`。关于这两者的详细区别请查看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)。

## 简单请求

对于`简单请求`会在首部字段中增加一个`Origin`的选项，用来说明此次请求来自哪个源（协议 + 域名 + 端口），然后直接发起请求。
先来看一个具体的例子：
首先在`server.js`中增加如下内容， 用来提供接口。

```
if (pathname === "/cors") {
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", headers["origin"]);
  res.write(JSON.stringify({ desc: "CORS 跨域 ", ...query }));
}

```

然后启动服务，之后新建一个`cors.html`:

```
<script>
  fetch("<http://localhost:1125/cors?type=cors>", {
    method: "post",
  })
    .then((data) => data.json())
    .then((json) => console.log(json));
</script>

```

打开该页面便可以查看输出结果。

也可以看到请求头中多了 `Origin`字段。

就这样一个 CORS 请求就完成了，前端基本不需要做额外的处理，一切只需要在后端增加响应的首部字段

```
Access-Control-Allow-Origin
```

。

## 非简单请求

对于复杂请求，比如我们想使用 RESTful API 中的`PUT`或者`DELETE`方法做请求，并且还想发送自定义请求头和 Cookie。此时浏览器对于这些`非简单请求`会首先使用`OPTIONS`方法发起一个预检请求。
在预检请求中会携带这样的请求头：

- `Origin`
- `Access-Control-Request-Headers`: 浏览器发送的自定请求头
- `Access-Control-Request-Methods`: 浏览器使用的 HTTP 请求方法

如果后端允许我们请求， 那么浏览器才会发出真正的请求。

修改`server.js`做测试

```
if (pathname === "/cors") {
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", headers["origin"]);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, cros-header1, cros-header2"
  );
  res.setHeader("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", 60 * 10);
  res.write(JSON.stringify({ desc: "CORS 跨域 ", ...query }));
}

```

使用`fetch`测试 CORS 的接口。

```
fetch("<http://localhost:1125/cros>", {
  method: "PUT",
  body: JSON.stringify({ name: "火柴盒" }),
  headers: {
    "Content-Type": "application/json",
    "cros-header1": "test",
  },
  credentials: "include",
  mode: "cors",
})
  .then((res) => res.json())
  .then((json) => console.log(json));

```

CORS 常用的首部字段及其含义：

| 首部字段                           | 可选 | 备注                                                                                                               |
| :--------------------------------- | :--: | :----------------------------------------------------------------------------------------------------------------- |
| `Access-Control-Allow-Origin`      | 必须 | 表示接受哪个域的请求，可选`*`，表示全部，但是需要传递 Cookie 的情况下，不能使用'\*'， 需要使用具体的`Origin`值代替 |
| `Access-Control-Allow-Headers`     | 可选 | 值为逗号分隔的客户端发送的额外首部字段, 例如： `userId, token`                                                     |
| `Access-Control-Allow-Methods`     | 可选 | 值为逗号分隔的客户端使用的 HTTP 请求方法, 例如： `PUT, DELETE`                                                     |
| `Access-Control-Expose-Headers`    | 可选 | 值为逗号分隔的期望浏览器可以拿到的额外首部字段信息, 例如: `token, appid`                                           |
| `Access-Control-Allow-Credentials` | 可选 | 布尔值，表示是否允许发送 Cookie, 需要浏览器端配合                                                                  |
| `Access-Control-Max-Age`           | 可选 | 表示本次预检请求的有效期， 在有效期之内不用再发送额外的预检请求。 单位是秒(s)                                      |

# 参考资料

1. [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
2. [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
3. [浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
4. [HTTP 访问控制（CORS)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
