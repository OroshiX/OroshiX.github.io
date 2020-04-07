---
permalink: /lists
layout: page
title: ListViews and lists
---
**Content**
* Toc
{:toc} 
# ListViews
ListViews in flutter are scrollable widgets, that can be setup to be either horizontal or vertical.  
There are several ways of creating ListViews in flutter.

## With a constructor
```dart
var listView = ListView(
  children: <Widget>[
    Text("1st element"),
    Text("2nd element"),
    Text("3rd element"),
  ]
);
```

## With a builder
```dart
var listView = ListView.builder(itemCount: 10,
      itemBuilder: (context, index) {
        return Text("Element number $index");
      }
    );
```

# Lists
```dart
var intList = List.generate(10, (int index) {
  return index;
});
```

