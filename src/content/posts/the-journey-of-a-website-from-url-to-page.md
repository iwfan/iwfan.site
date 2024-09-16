---
title: 从 URL 到 页面渲染
emoji: 🌀
created_at: "2021-08-18"
---

从用户输入 URL 到浏览器将页面呈献给用户，这中间具体经过了

1. DNS 解析
2. 与服务器建立链接
3. 请求 HTML 文件
4. 解析 HTML 文件
5. 渲染 HTML 文件

## DNS 解析

DNS 是如何解析的？

按照域名关系，逐级向域名服务器发送请求解析

IP 地址是不需要经过 DNS 寻址的

## 建立链接

## 请求文件

浏览器使用 HTTP 协议与服务器通信，在 HTTP 协议之下， HTTP1.1 与 HTTP2 使用的都是 TCP 协议，与服务器建立链接。

TCP 协议的链接建立需要经过三次握手、四次挥手。
三次握手是要确保链接被正确建立的。

缓存问题

强缓存
协商缓存

## 解析 HTML 文件

element =》 DOM
CSS rules =》 CSSOM

DOM + CSSOM = Parse Tree

## Layout。 Compotions 渲染
