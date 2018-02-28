---
layout: post
title:  "How not to fast-forward merges in git?"
date:   2018-02-28 15:28:51 +0100
categories: git
tags: git merge no-ff
---

Sometimes, you make a branch just for clarity purpose: for example, you want to add a zoom capacity to your application, so
you create a new branch called `zoom`, and you go to that branch.

```bash
git checkout -b zoom
```

You then want to commit your changes concerning the zoom functionality. So you do some

```bash
git commit -m 'my zoom is now awesome' 
```

After that, you decide that your modifications are so awesome that they are going to be applied to the `master` branch.
So you go back to `master`

```bash
git checkout master
```

And you want to merge your branch to master... But what? If you just apply them with 
```bash
git merge zoom
```
Then, the branch you created for this feature will fast-forward to the master branch, because there were no commits 
to the master branch in between. So it will be as if the `zoom` branch had never existed (or was for nothing). So, in 
order to create a real merge coming from 2 different points in your history, you will have to do a

```bash
git merge --no-ff zoom
```

And tadaaa! You have a real merge, and your `zoom` branch now stands out in your history: you know which commits were in 
the zoom branch.

See the image below from [nvie post](http://nvie.com/posts/a-successful-git-branching-model/) to better understand the difference.

![Difference between ff and no ff]({{ "/assets/img/merge-ff.png" | absolute_url }})
