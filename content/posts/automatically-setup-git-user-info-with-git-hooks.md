---
title: 使用 git hooks (post-checkout) 配置 git 用户信息
tags:
  - null
categories:
  - git
date: 2019-10-31 15:47:48
---

最近遇到了需要对不同 git 仓库配置不同的 git 用户信息的问题。如果你向客户的代码仓库提交代码时，使用的是自己默认设置（`global`）的个人邮箱的话，一来可能客户的代码仓库会拒绝你通过个人邮箱上传的提交，二来这会显得不太专业。所以我想有没有一种方式可以在 git clone 项目之后，自动提醒我输入对应的用户信息。Google 一番之后，发现 git 有个 `post-checkout` 的钩子可以支持这样的功能。

> **更新:** 在同事的帮助下发现了这个链接，[https://stackoverflow.com/a/46239540](https://stackoverflow.com/a/46239540)。
> git 在 2.13 版本中增加了 conditional config includes。可以对特定的目录使用不同的配置。这种方式可以完美解决配置用户信息的问题。
>
> ```bash
> [includeIf "gitdir:~/code/work/"]
>  path = /Users/self/code/work/.gitconfig
> ```

# 为新项目自动配置用户信息

- 第一步、启用 git 模版

```bash
git config --global init.templatedir '~/.git-templates'
```

执行此配置后，执行 `git init` 或 `git clone` 命令时，会将 `~/.git-templates` 目录下的文件全部拷贝到 git 仓库的`.git` 目录下。

- 第二步、创建对应目录并且添加 post-checkout 钩子

```bash
mkdir -p ~/.git-templates/hooks
touch ~/.git-templates/hooks/post-checkout
```

- 第三步、实现配置用户信息的功能

```bash
#! /bin/bash

# 允许读取用户输入
exec < /dev/tty

function use_default_user () {
 git_user=$(git config --global user.name)
 git_email=$(git config --global user.email)

 echo The current user is $git_user:$git_email
}

function use_new_user () {
  read -p 'git.user: ' git_user
  read -p 'git.email: ' git_email

  echo The current user is $git_user:$git_email

  cd $GIR_PREFIX
  cd ..

  git config --local user.name $git_user
  git config --local user.email $git_email

  echo Git user has been set to $git_user: $git_email
}

while true; do
  read -p "[post-checkout hook] Confirm using the default user for this repository? (Y/n) " yn
  if [ "$yn" = "" ]; then
    yn='Y'
  fi
  case $yn in
      [Yy] ) use_default_user; break;;
      [Nn] ) use_new_user; exit;;
      * ) echo "Please answer y or n for yes or no.";;
  esac
done
```

- 第四步、赋予可执行权限

```bash
chmod a+x ~/.git-templates/hooks/post-checkout
```

- 第五步、运行查看效果

git clone 项目后会自动弹出是否选择默认用户的选项，如果输入 `Y`，或者不输入直接敲回车，就使用之前配置的默认用户。如果输入 `n`， 需要继续输入用户信息。 输入完成之后，仓库的用户信息就配置完成了。

```bash
➜  ~ git clone https://github.com/iwfan/chore-cli.git
Cloning into 'chore-cli'...
remote: Enumerating objects: 280, done.
remote: Counting objects: 100% (280/280), done.
remote: Compressing objects: 100% (180/180), done.
remote: Total 280 (delta 159), reused 197 (delta 88), pack-reused 0
Receiving objects: 100% (280/280), 156.62 KiB | 175.00 KiB/s, done.
Resolving deltas: 100% (159/159), done.
[post-checkout hook] Confirm using the default user for this repository? (Y/n) n
git.user: joeamasson
git.email: joeamasson@armyspy.com
The current user is joeamasson:joeamasson@armyspy.com
Git user has been set to joeamasson:joeamasson@armyspy.com
```

之后可以使用如下命令做校验

```bash
git config --local user.name
git config --local user.email
```

# 为老项目批量配置用户信息

克隆新项目的时候可以使用上述的方式进行配置，那么对于已经克隆下来的项目可以使用如下的方式批量配置。

```bash
find ~/working/ -type d -maxdepth 1 -name "*keyword*" | xargs -I % sh -c 'cd %; git config --local user.name "JoeAMasson"; git config --local user.email "JoeAMasson@armyspy.com"'
```
