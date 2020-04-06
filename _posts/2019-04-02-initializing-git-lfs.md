---
layout: post
title:  "How to initialize git LFS?"
date:   2019-04-02 16:48:00 +0100
categories: git
tags: git lfs
---
## Git LFS -- Large File System
In order to have a good performance, we don't put big files in Git repositories. Sometimes, the repository won't allow us to have files bigger than a certain size.  

So in order to have them, we have to enable LFS for them.

### Initialization

```bash 
git lfs install       # initialize the Git LFS project
git lfs track "*.mp3" # treat all .mp3 files as large files
git lfs track "*.wav" # also treat .wav as large files (and so on)
```
The last two commands add some lines to a file named ```.gitattribute```. It should now look like this:
```
*.mp3 filter=lfs diff=lfs merge=lfs -text
*.wav filter=lfs diff=lfs merge=lfs -text
```

In order to make it work correctly for all people with the project, we have to add the `.gitattribute` file to the repository:
```bash
git add .gitattribute              # adding the file 
git commit -m "configured git lfs" # commiting, then
git push                           # pushing
```
### File locking
In GitLab, we have file locking ability with Git LFS. To learn more about it, see [GitLab's website](https://docs.gitlab.com/ee/workflow/lfs/manage_large_binaries_with_git_lfs.html#file-locking)
