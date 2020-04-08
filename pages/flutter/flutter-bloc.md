---
title: BLoC Pattern
permalink: /bloc
layout: page
---
**Content**
* Toc
{:toc} 
How can we pass information from one widget to another? That is what the BLoC (Business Logic Component) pattern is all about.

At the core of the BLoC pattern is the idea that every information in flutter should transit via streams of events. The streams should be regrouped somewhere, and can be accessible everywhere in the app. 

So a BLoC file is a `dart` file in our app, where we put our streams. We will be able to have `sinks` and `streams` in order to change some information, or to get it.

# Example
For instance, let's take an app where we want to have access to some entries of anything, and we'll call them `InfoEntry`, and we have several of them, so we'll make a list of them. 

## Create BLoC File
Create a bloc file called `entries_bloc.dart`
```dart
class EntriesBloc implements BlocBase {
  @override
  void dispose() {
    // TODO here we'll close our streams
  }
}
```
And the `bloc_base.dart` file:
```dart
abstract class BlocBase {
  void dispose();
}
```

## Init streams
In our `EntriesBloc` class, we'll initialize a few streams. First, an output stream, which is the one that will be used within our pages to display the entries.

```dart
Stream<List<InfoEntry>> infoEntries;
```

Then we want to add some broadcast controllers: they will receive events when we will want 

Then we add some input streams in order to add, modify and delete infoEntries. We will be able to call them from our pages. For that, we want to create broadcast controllers, and access to them outside our class.
```dart
final _addEntryController = StreamController<InfoEntry>.broadcast();
final _modifyEntryController = StreamController<InfoEntry>.broadcast();
final _deleteEntryController = StreamController<InfoEntry>.broadcast();

// Here are the sinks we will access from our pages
StreamSink<InfoEntry> get inAddEntry => _addEntryController.sink;
StreamSink<InfoEntry> get inModifyEntry => _modifyEntryController.sink;
StreamSink<InfoEntry> get inDeleteEntry => _deleteEntryController.sink;
```

## Link controllers to data handling
We have to link the controllers for modifying the list of entries to a method that handles the data.

```dart
EntriesBloc() {
  // Listens for changes to the controller and
  // calls the method to handle data on change
  _addEntryController.stream.listen(_handleAddEntry);
  _modifyEntryController.stream.listen(_handleModifyEntry);
  _deleteEntryController.stream.listen(_handleDeleteEntry);
}
``` 

## Link data to the output stream
To link the infoEntries to real database data, we can use the [Moor](/moor) library, because it integrates really well with streams.  

So we can add something like this in the constructor:
```dart
infoEntries = moorDatabase.watchInfoEntries();
```
The stream infoEntries is linked directly to the database stream, so we can use it in a [StreamBuilder](/stream-builder) component.
