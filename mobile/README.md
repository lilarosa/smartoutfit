# Smart Outfit Mobile

This directory wraps the existing Spring Boot-hosted PWA with Capacitor.

Use the local Node/npm installed in `../.tools/node-v24.16.0-darwin-arm64`:

```bash
export PATH="$PWD/../.tools/node-v24.16.0-darwin-arm64/bin:$PATH"
npm install
npm run sync
```

After Android Studio and full Xcode are installed:

```bash
npm run open:android
npm run open:ios
```

In the native app, open settings and set the backend URL to the reachable Spring Boot server, for example:

```text
http://192.168.1.10:8080
```
