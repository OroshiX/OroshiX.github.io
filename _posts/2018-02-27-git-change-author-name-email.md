---
layout: page
title:  "How to change the author (committer name/email) of multiple commits in git?"
date:   2018-02-27 14:40:11 +0100
categories: git
tags: git commit
---

```bash
# If you have not yet changed your committer name and email, do this
git config user.name <myName>
git config user.email <myEmail>
# (add -g option if you want to config all your git globally

# Do an interactive rebase
git rebase -i -p <Ref of a commit before your bad commits> 
# for example HEAD^ (one commit before now) or HEAD~5 (5 before)
# Mark all bad commits with the "edit" word instead of "pick"
# Then amend the commits
git commit --amend --reset-author --no-edit
# And continue the rebase until all commits are amended
git rebase --continue
```

