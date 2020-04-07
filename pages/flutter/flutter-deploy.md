---
layout: page
title: Deployment
permalink: /deploy
---
**Content**
* Toc
{:toc} 
## Build flutter web

```
flutter build web
```

The index.html is in build/web

## Deploying to firebase

### Install firebase tools

```
npm install -g firebase-tools
```

### Setup firebase project

```
firebase login
```

Go to the project directory

```
firebase init
```

\=\> choose a firebase project, select options (Hosting), add the
directory build/web to the public directory

### Test

```
firebase serve
```

\=\> Go to <http://localhost:5000> to check that it works

### Deploy

```
firebase deploy
```

### Go to site

Now the site is available at 2 urls:

  - \<firebase-project-name>.firebaseapp.com =>
  - \<firebase-project-name>.web.app