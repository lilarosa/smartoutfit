# Smart Outfit App Store Roadmap

Last updated: 2026-05-24

## Product Direction

Smart Outfit should ship as a native mobile wardrobe assistant, with the Spring Boot backend as the system of record and the existing static web/PWA kept for development, quick testing, and later optional web access.

The App Store build should use Flutter for the user-facing mobile app because it gives us native-feeling navigation, camera flows, image handling, offline states, and long-term iOS/Android parity without maintaining two separate native codebases.

## Launch Baseline

- Native mobile app: `mobile_flutter`
- Backend: Spring Boot API and static file serving
- Database: PostgreSQL for production
- Upload storage: local `uploads` only for development; production should move to object storage
- Current prototype web shell: `src/main/resources/static`
- Legacy Capacitor shell: `mobile`, retained for reference until the Flutter app replaces it

## App Store Readiness Requirements

- Build and submit with Apple-supported tooling and current SDK requirements.
- Provide App Privacy details in App Store Connect for wardrobe images, account data, diagnostics, and any analytics that are added.
- Publish a privacy policy URL before submission.
- If account creation is added, include in-app account deletion that can delete the account and associated personal data.
- Avoid tracking or third-party advertising SDKs unless there is a clear product reason and consent flow.
- Keep image and personal wardrobe data private by default.

Official Apple references:

- App submission requirements: https://developer.apple.com/app-store/submitting/
- App privacy details: https://developer.apple.com/app-store/app-privacy-details/
- App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Account deletion guidance: https://developer.apple.com/support/offering-account-deletion-in-your-app/

## Milestones

### 1. Native MVP

- Build Flutter wardrobe list, empty state, refresh, backend settings, and image loading.
- Add clothing detail screen.
- Add create/edit item flow.
- Add camera/photo upload.
- Add wear count and last-worn update.
- Add basic local error handling and loading states.

### 2. Product Quality

- Replace free-text fields with polished pickers where useful.
- Add onboarding for first-time users.
- Add clear privacy copy around photo upload.
- Add responsive iPad layout.
- Add app icon, launch screen, and store screenshots.
- Add localization baseline for Chinese and English.

### 3. Backend Hardening

- Add user accounts and authentication before public launch.
- Add authorization so users can only see their own wardrobe.
- Add production profiles and secret management.
- Move uploads from local disk to object storage.
- Add request validation and structured error responses.
- Add database migrations instead of relying on `ddl-auto=update`.

### 4. Release Pipeline

- Configure iOS bundle id, signing, and App Store Connect app record.
- Configure Android package id and signing for later Google Play release.
- Add CI checks for backend tests and Flutter analyze/test.
- Prepare TestFlight builds.
- Write privacy policy and support URL.

## Immediate Next Steps

1. Finish Flutter MVP screens and wire them to the existing API.
2. Add backend user isolation before any real public beta.
3. Decide production hosting and storage.
4. Prepare Apple Developer account, Xcode, certificates, and TestFlight flow.
