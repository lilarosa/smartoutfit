# App Store Compliance Checklist

Last updated: 2026-05-25

Goal: minimize compliance risk while keeping Smart Outfit functional.

## Product Scope

- [ ] Private wardrobe by default.
- [ ] No public community in launch version.
- [ ] No comments, likes, follows, public profiles, or public image feeds.
- [ ] No advertising tracking SDK.
- [ ] No selling or sharing personal wardrobe/health data.

## Privacy

- [ ] Publish privacy policy URL.
- [ ] Fill App Store App Privacy details accurately.
- [ ] Disclose user photos/user content.
- [ ] Disclose optional health/lifestyle records if enabled.
- [ ] Explain AI image processing before upload/recognition.
- [ ] Add data deletion UI.
- [ ] Add account deletion before account-based release.

## User Data Controls

- [ ] Delete individual clothing item.
- [ ] Delete associated uploaded image.
- [ ] Delete all wardrobe data.
- [ ] Delete wellness records.
- [ ] Delete outfit calendar entries.
- [ ] Delete favorite outfit entries.
- [ ] Delete travel packing lists.
- [ ] Export user data.

## Health Feature Guardrails

- [ ] Use lifestyle tracking wording, not medical wording.
- [ ] Show non-medical disclaimer on health page.
- [ ] Avoid diagnosis, treatment, fertility guarantee, or weight-loss claims.
- [ ] Keep cycle and ovulation reminders clearly marked as estimates.

## Image Upload Guardrails

- [ ] Limit file size.
- [ ] Limit file type.
- [ ] Limit batch upload count.
- [ ] Compress images before upload in mobile app.
- [ ] Use private object storage before production.
- [ ] Avoid public image URLs that expose user data without auth.

## Launch Architecture

- [ ] Use user ID isolation before public cloud sync.
- [ ] Move from local uploads to object storage.
- [ ] Use database migrations.
- [ ] Store secrets outside source code.
- [ ] Add production logging without sensitive photo/health data.
