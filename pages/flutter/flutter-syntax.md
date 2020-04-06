---
layout: page
title: Syntax
permalink: /syntax
---
## Widgets

Everything visible is a widget, it is the approximate equivalent to
Android Views.

Widgets can be either **stateless** or **stateful**. The difference is
that a stateless widget is visually immutable, a stateful one can change
appearance.

### Stateless Widget Creation

To create a stateless Widget in IntelliJ/Android studio, there is a
macro where we type *stless*, and it creates the skeleton for a
stateless widget. For a stateless Widget named Widg, the generated code
is the following:

```dart
class Widg extends StatelessWidget {  
  @override
  Widget build(BuildContext context) {  
    return Container();
  }
}
```

The important part here is the return value of the build method. This is
where all the graphical parts of this widget are going to be rendered.
This is where the tree of components will be constructed.

### Stateful Widget Creation

To create a stateful Widget in intelliJ/Android studio, there is a macro
where we type *stful*, and it creates the 2 classes needed for creating
a stateful widget. For example, for stateful Widget named TodoWidget,
the created classes are the following:

```dart
class TodoWidget extends StatefulWidget {  
  @override
  _TodoWidgetState createState() => _TodoWidgetState();  
}
```
  
```dart
class _TodoWidgetState extends State<TodoWidget> {  
  @override  
  Widget build(BuildContext context) {  
    return Container();  
  }  
}
```

The class that extends *StatefulWidget* is only syntactic sugar. The
important one is the one extending *State\<TodoWidget>*. Same as with the
stateless widget, the build method is the important part here.

A difference is that we can define a field in the class
\_TodoWidgetState, and use this field as a parameter for different
graphical widgets inside the hierarchy.

The method `setState(){}` will have to be called any time we want to
change the display of a stateful widget, like this:

```dart
setState() {  
  // add here the change of value of the field`  
}
```