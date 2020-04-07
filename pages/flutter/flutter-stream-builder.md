---
title: StreamBuilder/FutureBuilder Widget
layout: page
permalink: /stream-builder
---
When we have static data that are not susceptible to change, normal widgets are perfectly good and enough. But we know that data is generally susceptible to change, or we want to get it from the network, or elsewhere, and that is when these two widgets are really useful.

# FutureBuilder
When we have the data that we want to display in a `Future`, we use this. It will display the result of the future when we will get it.

We need to provide it with a future, and a builder that returns a widget when given the result of the future.

```dart
FutureBuilder(
  future: http.get('http://example.com'),
  builder: (context, snapshot) {
    return MyWidget(snapshot.data);
  },
)
``` 

So when the future terminates, we get the data and the widget will be `MyWidget`

# StreamBuilder
A `StreamBuilder` widget is very practical when we have data that change, like a stream.

Same principle:
```dart
StreamBuilder<int> (
  stream: _myStream,
  initialData: 3
  builder: (BuildContext context, AsyncSnapshot<int> snapshot) {
    return MyWidget(snapshot.data);
  }
)
```
But this time, MyWidget is updated each time the stream receives a new value (an int in our case). We can provide an initial value so that we already have data even when the stream has not yet released a value.
