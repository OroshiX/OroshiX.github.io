---
layout: post
title:  "How to get a working copy of a bare repository in git?"
date:   2019-02-24 11:54:00 +0100
categories: git
tags: git init
---
## Bare repository to working tree
A bare repository has all the information about the git repository, but no working tree.  
In order to get a working copy of a bare repository, you can type this command:
```bash
git clone path/to/bare/repo.git myCloneRepo
```