---
layout: page
permalink: /moor
title: Moor package for database
---
**Content**
* Toc
{:toc} 
[Moor](https://pub.dev/packages/moor) is a package for simplifying database related code in flutter. It makes use of code generation in order to generate boilerplate code.  
It is a persistence library build on top of sqlite. It works for every platform: Android, iOS, web, macOS, Windows and Linux.

With Moor, we can define entity tables easily, in a file called `my_database_moor.dart`: 
```dart
class User extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get pseudo => text().withLength(min: 3, max: 26)();
  DateTimeColumn get date => dateTime()();
}
```
We have to include the import `part 'my_database_moor.g.dart`, and when we have all our entities written up, we will have to send the command line to generate the file `my_database_moor.g.dart`. 
```shell script
flutter packages pub run build_runner build
``` 

Retrieving information from the tables can be as easy as writing this:
```dart
Stream<List<User>> get watchAllUsers => select(users).watch();
Future<List<User>> get allUsers => select(users).get();
```
So we can either get all the users with a Future (get) once and for all, or as a Stream (watch) so that every modification will trigger a new event in the stream, and we will get notified.

We can use many-to-one and many-to-many relations, make use of joins, query, and even use raw queries by writing SQL code directly.

A good documentation is available at [this address](https://moor.simonbinder.eu/docs/).