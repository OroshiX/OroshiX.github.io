---
layout: page
title: Syntax
permalink: /syntax
---
**Content**
* Toc
{:toc} 
# Parameters
In dart, we have two ways of defining methods/functions: either with positional parameters, or with named parameters.

## Positional parameters
In order to declare a function with positional parameters, we can define it like this: 
```dart
int myFun(int par1, int par2) {
  return par1 + par2;
}
```

And then we can call it like that:
```dart
var sum = myFun(1, 2);
```

## Named parameters
We can also define functions with named parameters:
```dart
int myFun({int par1, @required int par2, int par3 = 3}) {
  // see the braces around the parameters 
}
```
Here, `par3` has a default value, `par2` is a required parameter, which means that if it does not appear in the arguments of the call, we have a warning. And `par1` is optional. 

When we call the function, we can write:
```dart
var t = myFun(par1: 1, par2: 2);
// And par3 has a default value, so it will be =3
```

## Mixed parameters
We can also mix the 2 types of parameters in one function, but in order to do this, we must put the positional parameters first, then the named ones.

```dart
int myFun(int pos1, int pos2, {int named1, int named2}) {
  // ...
}
```
And we can call it like this:
```dart
var t = myFun(1,2, named1: 3);
```

# Private 
To declare a field or a method private, we put an `_` before the name of the field or method. 

# Widgets
Everything visible is a widget, it is the approximate equivalent to
Android Views.

Widgets can be either **stateless** or **stateful**. The difference is
that a stateless widget is visually immutable, a stateful one can change
appearance.

## Stateless Widget Creation

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

## Stateful Widget Creation

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

For example, if we want a text to appear or disappear in a screen, we can add a field called `_isVisible`, and change it.

```dart
class _TodoWidgetState extends State<TodoWidget> {
  boolean _isVisible;
  @override
  void initState() {
    super.initState();
    _isVisible = true;
  }

  @override  
  Widget build(BuildContext context) {
    // When _isVisible is true, the text appears,
    // and it disappears when _isVisible is false
    return Visibility(visible: _isVisible,
                      child: Text("Continue"));
  }

  // Change the visibility of the text
  _toggleVisibility() {
    setState((){
      _isVisible = !_isVisible;
    });
  }
}
``` 