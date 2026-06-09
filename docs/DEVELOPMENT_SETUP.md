# Development Setup

Last updated: 2026-05-24

## Flutter

Use the Flutter SDK checked into the project tools directory:

```bash
export PATH="/Users/tao/Downloads/02_Softwares/09projects/smartoutfit/.tools/flutter/bin:$PATH"
flutter doctor -v
```

The duplicate Flutter SDK at `/Users/tao/Downloads/02_Softwares/flutter` was removed because it conflicted with the project SDK.

## Required For iOS App Store Work

- Install full Xcode from the App Store or Apple Developer.
- Run first launch setup:

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

- Install CocoaPods after Xcode is complete.
- Join Apple Developer Program before TestFlight/App Store distribution.

## Required For Android Work

- Install Android Studio.
- Install Android SDK and platform tools from Android Studio.
- Configure Flutter if the SDK is installed in a custom location:

```bash
flutter config --android-sdk <ANDROID_SDK_PATH>
```

## Java

Flutter warned that Java 26 may conflict with the Android Gradle version generated for the app. Use Java 17 or Java 21 for Android builds:

```bash
flutter config --jdk-dir <JDK_17_OR_21_DIRECTORY>
```

## Current Validation Commands

Backend:

```bash
./mvnw test
./mvnw spring-boot:run
```

Flutter app:

```bash
cd mobile_flutter
../.tools/flutter/bin/flutter pub get
../.tools/flutter/bin/flutter analyze
../.tools/flutter/bin/flutter test
```
