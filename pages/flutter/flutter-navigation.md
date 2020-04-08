---
layout: page
permalink: /navigation
title: Navigation in flutter
---
**Content**
* Toc
{:toc} 
Flutter navigation is quite straight forward: we can define a map that matches the route name to the actual widget screen we want to go to.  
This can be done in the `MaterialApp`, in the parameter `routes`:
```dart
var app = MaterialApp(
  // ...
  routes: <String, WidgetBuilder> {
    "/screen1": (context) => Screen1(),
    "/screen2": (context) => Screen2(),
    "/screen3": (context) => Screen3(),
  }
);
```

So now, in our application, whenever we want to go to Screen2, we can call this method:
```dart
Navigator.of(context).pushNamed("/screen2");
``` 