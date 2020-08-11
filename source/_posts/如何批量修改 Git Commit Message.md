---
title: 如何批量修改 Git Commit Message
slug: f443a642c1432935a4484f5914fe86a3
date: 2020-08-11 08:13:19
tags:
  - git
thumbnail: null
---

Git Commit Message 的修改已经是一个老生常谈的问题了，常见的解决方案也有许多。

想象这样一种情况，当你在本地的 git repo 中完成了一次 commit 后，如果觉得刚才写的 commit message 不够友好，你可以执行:

```shell
git commit --amend
```

在弹出的编辑器中输入要修改的 message 保存即可。

但是如果你的 commit 已经被 push 到了远端。此时你也可以通过 `rebase` 来修改 commit。

```shell
git rebase -i HEAD~N
```

N 代表的是 Head 之前的第 N 个 commit，但是 rebase 的时候并不包括这个 N 哦。

然后在弹出的编辑器中会有一些提示信息：

```txt
# Rebase c4b8a18..ede3a70 onto c4b8a18 (1 command)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

然后你可以将要修改的 commit 前的命令 修改为 reword 或 r。

之后继续输入新的 message 即可。

**但是这样的 rebase 可能会导致之前解决过的冲突，需要你再解决一遍。而且 还得一个一个的修改每一个 commit 的 message。**

那么有没有一个 批量修改 message 的方法呢？下面就可以引出来 `git filter-branch`

使用方法如下：

```git
git filter-branch --msg-filter 'echo "prefix to message " && cat' master..HEAD
```

这个命令的意思是在指定区间的 commit message 前添加前缀 `prefix to message`, `master..HEAD` 指的是一个 commit 区间。

你还可以使用 `sed` 命令来修改：

```shell
git filter-branch -f --msg-filter 'sed "s/^/prefix to message /"' master..HEAD
```

你还可以向 commit message 后面拼接信息

```shell
git filter-branch -f --msg-filter 'cat && echo "[suffix]"' master..HEAD
```

参考文章：[update-git-commit-messages](https://davidwalsh.name/update-git-commit-messages)
