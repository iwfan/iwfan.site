---
title: Docker初探
tags:
  - Docker
date: 2018-06-03 19:45:58
---

<p style="text-indent:2em;"> 在实际的开发过程中，我们经常遇到需要将项目部署至不同的服务器上，每部署一次，一些项目的依赖，比如数据库、消息队列、缓存服务等，也需要重复的下载、安装、配置，而且有时候相同配置的服务却不能正确运行在另一台机器上。搞得十分头大。Docker就可以很好的解决这个问题。</p><!--more-->

# Docker 简介

Docker 是一种新兴的虚拟化方式，可以 **简单**的理解为一个轻量的虚拟机。它与虚拟机最主要的区别是，Docker 不是模拟的整个操作系统，而是实现了对进程进行隔离。

## 安装

地址: [https://docs.docker.com/install/](https://docs.docker.com/install/)
各平台的安装过程大同小异，便不再赘述。

安装完成之后，可以输入如下命令校验安装是否成功：

```shell
docker version
```

> Version: 18.03.1-ce
> API version: 1.37
> Go version: go1.9.5
> Git commit: 9ee9f40
> Built: Thu Apr 26 07:12:48 2018
> OS/Arch: windows/amd64
> Experimental: false
> Orchestrator: swarm
> ...

```shell
docker run hello-world
```

> Hello from Docker!
> This message shows that your installation appears to be working correctly.
> ...

## 初探

通过下图可以很好的理解 Docker 的运行过程。
![docker 运行图](/images/article_image/docker-struct.png)

Docker 是以 C/S 的方式运行，图中央的`DOCKER_HOST`表示的是安装好 Docker 的宿主机，也就是我们自己的机器。在安装好 Docker 之后，就会宿主机上启动一个`Docker Daemon`进程，一般称之为`守护进程`。我们对 Docker 的操作，例如图左侧的`docker build`等。都会发送给守护进程，由守护进程来执行具体的操作，例如生成镜像、启动容器或者停止容器等等。而 Docker 就是通过镜像和容器来完成虚拟化。

图右侧的`Registry`是用来存储镜像的服务，可以理解为镜像仓库，用来存储用户制作的镜像。守护进程可以和`Registry`进行交互，比如从仓库中拉取镜像，推送自己制作的镜像到仓库中等等。

从上图中可以看出 Docker 的基本概念包括： 镜像、容器和仓库。下面就来详细介绍它们。

# 镜像

这是 Docker 官方文档对于 image 的定义：

> Docker images are the basis of containers. An Image is an ordered collection of root filesystem changes and the corresponding execution parameters for use within a container runtime. An image typically contains a union of layered filesystems stacked on top of each other. An image does not have state and it never changes.

简单的翻译过来就是：

> 镜像是容器运行的基础。一个镜像包含了一个完整的 root 文件系统和容器运行时需要的参数。镜像是分层存储的，由多层文件联合组成。镜像没有状态并且永远不会发生改变。

**镜像是容器的基础**， 这句比较好理解。在 Docker 中， 镜像与容器的关系就像是面向对象编程中类与实例的关系一样。容器是通过镜像生成的，所以说镜像是容器的基础。一个镜像也可以生成多个容器。

**镜像包含完成的 root 文件系统和参数**，镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。

**镜像是分层存储的**，因为镜像包含操作系统完整的 root 文件系统，其体积往往是庞大的，因此在 Docker 设计时，就充分利用 Union FS 的技术，将其设计为分层存储的架构。

**镜像没有状态且永不改变**，镜像不包含**任何动态数据**，其内容在构建之后也不会被改变。 **这点比较重要**

<!--如果将镜像比做一个JavaScript文件，将Docker引擎比做浏览器，那么他们之间的关系也就不言而喻了。js文件可以运行在各个系统的浏览器中，镜像文件也可以运行在各个系统的Docker引擎中。Docker镜像与操作系统无关，无论在什么平台上，同一个镜像可以随意运行。-->

## 常用的镜像操作

拉取镜像

```shell
docker pull [imageName][:tag]
```

查看本地镜像

```shell
docker image ls
docker images
```

删除镜像

```shell
docker image rm [imageName]
docker rmi [imageName]
```

# 容器

容器是一个运行时，是 Docker 镜像的实例。 它可以被启动、暂停、删除等等。容器运行在一个隔离的环境里，它有自己的文件系统、自己的网络配置。

> 按照 Docker 最佳实践的要求，容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用 数据卷（Volume）、或者绑定宿主目录，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。

## 常用的容器操作

根据镜像创建容器并运行

```shell
docker run [image][:tag] [-i|-t|-d] [--name|--rm] [command]
```

查看

```shell
docker ps [-a]
docker container ls [-a]
```

启动

```shell
docker start [container]
```

停止

```shell
docker stop [container]
```

删除

```shell
docker rm [-f删除运行中的容器] [container]
```

进入

```shell
docker exec -it [container] bash
```

# 仓库

仓库就是一个集中存储、分发镜像的服务。

## 常用的仓库操作

搜索镜像

```shell
docker search [imageName]
```

推送镜像

```shell
docker push [imageName][:tag]
```

# 数据卷

数据卷 是一个可供一个或多个容器使用的特殊目录，可以提供很多有用的特性：

- `数据卷`可以在容器之间共享和重用
- 对`数据卷`的修改会立马生效
- 对`数据卷`的更新，不会影响镜像

数据卷 默认会一直存在，即使容器被删除
数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡。因此，使用数据卷后，容器删除或者重新运行之后，数据却不会丢失。

## 数据卷操作

创建数据卷

```shell
docker volume create [vloumeName]
e.g.
docker volume create mysql_volume
```

查看数据卷

```shell
docker volume ls
```

查看数据卷具体信息

```shell
docker inspect [volumeName]
```

使用--mount 参数挂载数据卷

```shell
docker run --mount source=[volumeName],target=[容器中的目录] [imageName]
e.g. 启动mysql服务
docker run --name mysql -d --mount source=mysql_volume,target=/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7
e.g. 不创建数据卷，直接挂载宿主机目录
docker run --name mysql -d --mount type=bind,source=$pwd/data,target=/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7
e.g. 挂载主机目录的默认权限是`可读可写`，可以通过增加 `readonly` 指定为 只读
docker run --name mysql -d --mount type=bind,source=$pwd/data,target=/var/lib/mysql,readonly -e MYSQL_ROOT_PASSWORD=root mysql:5.7
```

使用-v(--volume)参数挂载数据卷

```shell
docker run -v [宿主机目录]:[容器中的目录] [imageName]
e.g.
docker run --name mysql -d -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7
```

删除数据卷

```shell
docker volume rm [volumeName]
```

# 访问容器

上文中启动 mysql 容器之后，并不能成功连接到数据库服务。上文中也说过容器运行在一个隔离的环境中， 那么怎么才能访问到容器中的服务呢？这就需要端口映射。
先将 mysql 服务停止。

```shell
docker rm -f mysql
```

然后加入端口映射

```shell
docker run --name mysql -d -p 3306:3306 -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7
```

现在就可以正确连接到 mysql 服务了。

> 参考：

1. [Docker 从入门到实践](https://yeasy.gitbooks.io/docker_practice)
