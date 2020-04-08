---
layout: page
title: Native code integration
permalink: /native
---
How to integrate native code in flutter?
    
   # Flutter side
   We use platform channels. We declare a platform like this:
   ```dart
   static const platform = const MethodChannel('<my-package-name>/info');
   ```
   In order to call a native method, we can do this:
   ```dart
   platform.invokeMethod("myMethod");
   ```
   So for example, in a stateful widget, the class would look like this:
   ```dart
   import 'package:flutter/material.dart';
   import 'package:flutter/services.dart';
   class TestNative extends StatefulWidget {
     @override
     _TestNativeState createState() => _TestNativeState();
   }
   
   class _TestNativeState extends State<TestNative> {
     static const platform = const MethodChannel('fr.myorg.app/info');
     String _message = "No messages yet...";
     @override
     void initState() {
       super.initState();
       _getMessage().then((String message) => setState(() {
             _message = message;
           }));
     }
   
     @override
     Widget build(BuildContext context) {
       return Container(
         child: Center(
           child: Text(_message),
         ),
       );
     }
   
     Future<String> _getMessage() async {
       String message;
       try {
         message = await platform.invokeMethod("getMessage");
       } catch (e) {
         print(e);
       }
       return message;
     }
   }
   ```
   
   # Android side
   We modify our `MainActivity.kt` file to look like this:
   
   ```kotlin
   class MainActivity: FlutterActivity() {
       private val CHANNEL = "fr.myorg.app/info"
       override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
           GeneratedPluginRegistrant.registerWith(flutterEngine);
   
           MethodChannel(flutterEngine.dartExecutor.binaryMessenger,
                   CHANNEL).setMethodCallHandler { call, result ->
               // NOTE: this method is invoked on the main thread
               if (call.method == "getMessage") {
                   val message = "My beautiful message"
                   result.success(message)
               } else {
                   result.notImplemented()
               }
           }
       }
   }
   ```

For detailed information, see [the official documentation](https://flutter.dev/docs/development/platform-integration/platform-channels#example-calling-platform-specific-ios-and-android-code-using-platform-channels%7C).