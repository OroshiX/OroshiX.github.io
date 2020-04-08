---
layout: page
permalink: /provider
title: Provider pattern
---
**Contents**
* Toc
{:toc}
The provider pattern permits to widgets lower in the tree hierarchy to have access to data in the provided class.

Here, we'll continue the example started with the [Bloc pattern](/bloc), and use this pattern in order to create a bloc provider.
# Code of the provider
```dart
class BlocProvider<T extends BlocBase> extends StatefulWidget {
  final T bloc;
  final Widget child;

  const BlocProvider({Key key, @required this.bloc, @required this.child})
      : super(key: key);

  @override
  _BlocProviderState<T> createState() => _BlocProviderState<T>();

  static T of<T extends BlocBase>(BuildContext context) {
    BlocProvider<T> provider =
        context.findAncestorWidgetOfExactType<BlocProvider<T>>();
    return provider.bloc;
  }
}

class _BlocProviderState<T> extends State<BlocProvider<BlocBase>> {
  @override
  Widget build(BuildContext context) {
    return widget.child;
  }

  @override
  void dispose() {
    widget.bloc.dispose();
    super.dispose();
  }
}
```

When we integrate the above code, we can then use the `BlocProvider` class as a wrapper for a widget in our tree hierarchy, and then, each of its descendants will have access to the bloc specified as the bloc argument.

# Usage
For instance, we can use it like this: 
```dart
BlocProvider(
  bloc: EntriesBloc(),
  child: MyWidgetHierarchy(
    // ...
  )
)
```
So all the children of `MyWidgetHierarchy` will be able to access `EntriesBloc` by doing this: 
```dart
var bloc = BlocProvider.of<EntriesBloc>(context);
```

So afterwards, if we want to add an entry to the infoEntries, we just have to call 
```dart
bloc.inAddEntry.add(InfoEntry());
```