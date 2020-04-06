---
layout: page
title: Flutter commands
permalink: /commands/
---
**Contents**
* TOC
{:toc}
# Create a flutter app
We can use the terminal in order to create a flutter app:
``` 
flutter create myApp
cd myApp
```
Or we can use IntelliJ/Android Studio with a ```File > New > Project...``` and select flutter, after having installed the flutter plugin.
# Build and run
## Clean
```
flutter clean
```
## Get packages

```
flutter pub get
```

## Build the generated files 
Sometimes, we want to generate files, for instance, when we use JSON format, and we want to serialize and deserialize objects, but not specify every serialization by hand. There is no introspection in dart, so a library like GSON in Android cannot be used, so in order to have an automated process, we have to use file generation. The files generated have the extension ```.g.dart```, and the filename corresponds to the original file name. We have to include the generated file using this import ```part 'filename.g.dart';```   
If we use the generation of files, we have to generate them before we can compile correctly the project, using this command:
```
flutter pub run build_runner build --delete-conflicting-outputs
```

## Run
To check the list of devices:
```
flutter devices
```  
We receive a list with this format: 
```
SM T720    • 420094dac44f2600 • android-arm64  • Android 9 (API 28)
Chrome     • chrome           • web-javascript • Google Chrome 80.0.3987.163
Web Server • web-server       • web-javascript • Flutter Tools
```
The second column is the device ID.

### Debug mode
In order to run on a specific device, we run this command: 

```
flutter run -d <device-id>
```

### Release mode

To run:  

```
flutter run --release
```

To build:
```
flutter build <build-target>
```
Where build-target can be ios, apk, appbundle, web, macos.

### Profile mode
Profile mode is for profiling the app for performance.
```
flutter run --profile
```
## Hot reload
Whenever we run a flutter app on debug mode, we can make use of the hot reload feature. That means the launched application is changed to match the change in the code almost instantly.  
 It works only with debug mode: that is because there are two types of compilation for flutter, one ahead of time that is used for release mode, and the other for debug mode, which can be sent to the device much faster.
 Most modifications of code can be hot reloaded, but there are some [limitations](https://flutter.dev/docs/development/tools/hot-reload#limitations).

# Maintenance
## Upgrade
```
flutter upgrade
```

## Change channel
In order to check which channel we are using:
```
flutter channel
```
We will see which channel is selected:
```
Flutter channels:
* master
  dev
  beta
  stable
```
Here, the star means that the selected channel is master. It corresponds to the git branch that we are in. The installation of flutter is synchronized with the Git repository, and changing flutter channel means changing the branch that we are in, so there can be different functions not available on a channel, but available on another.

To change the channel, we then type ```flutter channel <channel-name>```, then we can do a ```flutter upgrade```.
