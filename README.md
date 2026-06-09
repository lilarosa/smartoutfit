# Smart Outfit

Smart Outfit is a private-first wardrobe intelligence app. It helps users build a personal digital wardrobe, generate outfit recommendations, track clothing usage, plan travel packing lists, and make better shopping decisions without making personal data public.

The project is designed as an interview portfolio project with a clear consumer product core and optional future partner integrations.

## Product Focus

- Private wardrobe management
- Weather-aware outfit recommendations
- Batch clothing import and draft classification
- Item detail profiles with brand, size, price, material, care notes, special meaning, wear count, and favorite score
- Outfit calendar and saved outfits
- Editable travel packing lists
- Shopping duplicate checks and wardrobe gap analysis
- Lightweight wellness tracking for lifestyle reminders
- Consent-based partner access concept, disabled by default
- Avatar-based fitting mirror prototype, with realistic AI try-on planned as a future extension

## Privacy Positioning

Smart Outfit is private by default. User clothing images, wardrobe records, and wellness records are not designed for public social feeds. Partner access is modeled as explicit, revocable authorization and currently remains a local prototype.

## Tech Stack

- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Static Web/PWA frontend
- Flutter mobile app scaffold
- Maven

## Running The Backend

```bash
./mvnw spring-boot:run
```

Then open:

```text
http://localhost:8080/
```

The static frontend can also be opened directly from:

```text
src/main/resources/static/index.html
```

For database-backed features, use the Spring Boot URL.

## Running Tests

```bash
./mvnw test
```

Flutter:

```bash
cd mobile_flutter
../.tools/flutter/bin/flutter analyze
../.tools/flutter/bin/flutter test
```

## Interview Narrative

Smart Outfit is not just a wardrobe gallery. It is a private decision-support layer for everyday dressing and shopping. The app can help users understand what they own, what they actually wear, what they should avoid buying again, and which wardrobe gaps are worth filling.

For retail partners, the same system could later expose consent-based wardrobe insights, allowing better product recommendations without giving companies unrestricted access to personal data.
