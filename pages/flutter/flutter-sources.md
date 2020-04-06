---
layout: page
title: Source code
permalink: /sources
---
**Content**
* Toc
{:toc}  
We have the dependencies in a file named ```pubspec.yaml```, following the yaml syntax. It is the equivalent of a gradle file.

Flutter works best with packages, and the community can contribute easily by creating those packages, and publishing them.

## Packages
A package is a dependency that we include in our ```pubspec.yaml```, in a line under the section dependencies: 
```yaml
dependencies:
  rxdart: ^0.22.6
```
If it is a dev dependency (generally for code generation), it is placed under the section dev_dependencies:
```yaml
dev_dependencies:
  # For JSON
  build_runner: ^1.0.0
  json_serializable: ^2.0.0
``` 
### Location 
We can find all the available packages at this URL [https://pub.dev/flutter](https://pub.dev/flutter). Don't forget to check whether a package is available for the platform you are building for: it is indicated. Most packages are available for Android and iOS, more and more for Web, and as of now, not many for desktop.  
### Flutter favorites
When a package has a set of good statistics about it, with some predefined metrics, it is featured on what is called flutter favorites, and we can find a list of all flutter favorites at this address: [https://pub.dev/flutter/favorites](https://pub.dev/flutter/favorites)

## Assets
In order to use assets located in our source in our application, we have to declare them in a section of the ```pubspec.yaml``` file. For example, if we want to add 2 images called img1.png and img2.png, and access all videos in the folder videos, we would create a folder called images in the project root, then add the following lines in the yaml file:
```yaml
assets:
  - images/img1.png
  - images/img2.png
  - videos/
```
For fonts font1.ttf and font1-bold.ttf, we would create the folders assets/fonts at the project root, then add the following lines in the yaml file:
```yaml
fonts:
  - family: Bold
    fonts:
      - asset: assets/fonts/font1-bold.ttf
  - family: Regular
    fonts:
      - asset: assets/fonts/font1.ttf
```

## Source code
All source code in dart is located under the directory ```libs```, and can be sorted under subfolders too.

### Using platform-specific code
It is possible to use platform-specific code, see the [official documentation](https://flutter.dev/docs/development/platform-integration/platform-channels#example-calling-platform-specific-ios-and-android-code-using-platform-channels%7C) for more on this.