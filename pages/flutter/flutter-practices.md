---
layout: page
title: Best Practices
permalink: /best-practices
---
## Stateful or Stateless Widgets

As soon as a widget retains a state (stateful), it is given to all of its children, so if the tree is big below that widget, the performance is impacted. 
The best practice is to make the stateful widget as low as possible (be the lowest possible child of the hierarchy), and make all the ancestors be stateless.
