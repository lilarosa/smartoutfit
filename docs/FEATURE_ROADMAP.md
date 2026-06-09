# Smart Outfit Feature Roadmap

Last updated: 2026-05-24

## Requested Features

The following features are accepted into the product direction:

- Outfit calendar
- Care and cleaning reminders
- Idle clothing reminders and declutter suggestions
- Travel packing list
- Wardrobe color analysis
- Shopping duplicate check
- Outfit favorites
- Occasion templates
- Privacy and data management

## Product Fit

These features fit Smart Outfit because they stay close to the core promise: help users understand, use, maintain, and reduce waste in their wardrobe.

## Implementation Order

### Phase 1: Lightweight Utility Hub

Build a utility page with client-side insights from existing closet data:

- Care reminders based on `specialCare`, material, and category.
- Idle reminders using `unwornOverOneYear`.
- Color analysis from stored colors.
- Shopping duplicate check using category/color text matching.
- Occasion template shortcuts that prefill outfit recommendation form.
- Outfit favorites stored locally in browser for prototype validation.
- Privacy/data management summary and shortcuts.

### Phase 2: Persistent Utility Data

Add backend persistence for:

- Outfit calendar entries.
- Favorite outfit plans.
- Care reminder dismissed/snoozed state.
- Shopping check history.

### Phase 3: Travel Packing

Add trip planning:

- Destination, dates, weather, activities.
- Generate packing list from closet.
- Track packed/unpacked status.

### Phase 4: App Store Hardening

- Data export.
- Account deletion and associated image deletion.
- Storage usage summary.
- Privacy policy wording aligned with App Store privacy labels.
