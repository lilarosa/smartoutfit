package com.tao.smartoutfit.service;

import com.tao.smartoutfit.model.ClothingItem;
import com.tao.smartoutfit.model.OutfitPlan;
import com.tao.smartoutfit.model.OutfitRecommendation;
import com.tao.smartoutfit.repository.ClothingItemRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class OutfitRecommendationService {

    private final ClothingItemRepository clothingItemRepository;

    public OutfitRecommendationService(ClothingItemRepository clothingItemRepository) {
        this.clothingItemRepository = clothingItemRepository;
    }

    public OutfitRecommendation getRecommendation(String occasion, String season, int temperature) {
        if (occasion.equals("work") && season.equals("spring")) {
            if (temperature <= 10) {
                return new OutfitRecommendation(
                        "work",
                        "spring",
                        "white shirt",
                        "black trousers",
                        "warm trench coat",
                        "Recommended outfit for cool spring work days."
                );
            } else {
                return new OutfitRecommendation(
                        "work",
                        "spring",
                        "white shirt",
                        "black trousers",
                        "light blazer",
                        "Recommended outfit for mild spring work days."
                );
            }
        } else if (occasion.equals("work") && season.equals("winter")) {
            return new OutfitRecommendation(
                    "work",
                    "winter",
                    "knit sweater",
                    "dark trousers",
                    "wool coat",
                    "Recommended outfit for work in winter."
            );
        } else if (occasion.equals("casual") && season.equals("summer")) {
            if (temperature >= 28) {
                return new OutfitRecommendation(
                        "casual",
                        "summer",
                        "light T-shirt",
                        "shorts",
                        "no outerwear",
                        "Recommended outfit for hot summer casual days."
                );
            } else {
                return new OutfitRecommendation(
                        "casual",
                        "summer",
                        "T-shirt",
                        "jeans",
                        "light cardigan",
                        "Recommended outfit for mild summer casual days."
                );
            }
        } else if (occasion.equals("party") && season.equals("summer")) {
            return new OutfitRecommendation(
                    "party",
                    "summer",
                    "elegant top",
                    "skirt",
                    "light jacket",
                    "Recommended outfit for a summer party."
            );
        } else {
            return new OutfitRecommendation(
                    occasion,
                    season,
                    "unknown",
                    "unknown",
                    "unknown",
                    "No recommendation available for this occasion, season and temperature yet."
            );
        }
    }

    public List<OutfitPlan> recommendOutfitPlans(
            String occasion,
            String season,
            int temperature,
            String colorPreference
    ) {
        List<ClothingItem> candidates = clothingItemRepository.findAll().stream()
                .filter(item -> matches(season, item.getSeason()))
                .filter(item -> matches(occasion, item.getOccasion()))
                .sorted(Comparator.comparing(
                        ClothingItem::getWearCount,
                        Comparator.nullsLast(Comparator.naturalOrder())
                ))
                .toList();

        if (candidates.isEmpty()) {
            candidates = clothingItemRepository.findAll();
        }

        List<OutfitPlan> plans = new ArrayList<>();
        Optional<ClothingItem> dress = pick(candidates, colorPreference, "dress");
        Optional<ClothingItem> top = pick(candidates, colorPreference, "top", "shirt", "t-shirt", "blouse", "sweater", "knit");
        Optional<ClothingItem> bottom = pick(candidates, colorPreference, "bottom", "pants", "trousers", "jeans", "skirt", "shorts");
        Optional<ClothingItem> outerwear = needsOuterwear(season, temperature)
                ? pick(candidates, colorPreference, "outerwear", "coat", "jacket", "blazer", "cardigan")
                : Optional.empty();
        Optional<ClothingItem> shoes = pick(candidates, colorPreference, "shoes", "shoe", "sneaker", "boot", "heel", "loafer");
        Optional<ClothingItem> bag = pick(candidates, colorPreference, "bag", "accessory");

        if (dress.isPresent()) {
            plans.add(plan(
                    "One-piece quick outfit",
                    occasion,
                    season,
                    temperature,
                    colorPreference,
                    compactList(dress, outerwear, shoes, bag),
                    List.of("Dress reduces outfit complexity", weatherReason(season, temperature), colorReason(colorPreference))
            ));
        }

        if (top.isPresent() || bottom.isPresent()) {
            plans.add(plan(
                    "Reliable everyday outfit",
                    occasion,
                    season,
                    temperature,
                    colorPreference,
                    compactList(top, bottom, outerwear, shoes, bag),
                    List.of("Top and bottom combinations are easy to repeat", weatherReason(season, temperature), colorReason(colorPreference))
            ));
        }

        List<ClothingItem> colorFocused = candidates.stream()
                .filter(item -> matches(colorPreference, item.getColor()))
                .limit(4)
                .toList();
        if (!colorFocused.isEmpty()) {
            plans.add(plan(
                    "Preferred color palette plan",
                    occasion,
                    season,
                    temperature,
                    colorPreference,
                    colorFocused,
                    List.of("Prioritize your preferred color", weatherReason(season, temperature))
            ));
        }

        if (plans.isEmpty() && !candidates.isEmpty()) {
            plans.add(plan(
                    "Start from existing wardrobe",
                    occasion,
                    season,
                    temperature,
                    colorPreference,
                    candidates.stream().limit(4).toList(),
                    List.of("Wardrobe categories are incomplete, so available items are combined first")
            ));
        }

        return plans.stream().limit(3).toList();
    }

    private OutfitPlan plan(
            String title,
            String occasion,
            String season,
            int temperature,
            String colorPreference,
            List<ClothingItem> items,
            List<String> reasons
    ) {
        String message = items.isEmpty()
                ? "There are not enough wardrobe items yet. Import clothes first to generate outfits."
                : "Combined from your wardrobe based on occasion, season, temperature, and color preference.";
        return new OutfitPlan(title, occasion, season, temperature, colorPreference, items, reasons, message);
    }

    @SafeVarargs
    private List<ClothingItem> compactList(Optional<ClothingItem>... items) {
        List<ClothingItem> result = new ArrayList<>();
        for (Optional<ClothingItem> item : items) {
            item.ifPresent(result::add);
        }
        return result;
    }

    private Optional<ClothingItem> pick(List<ClothingItem> items, String colorPreference, String... categoryKeywords) {
        Optional<ClothingItem> colorMatch = items.stream()
                .filter(item -> categoryMatches(item, categoryKeywords))
                .filter(item -> matches(colorPreference, item.getColor()))
                .findFirst();
        return colorMatch.or(() -> items.stream().filter(item -> categoryMatches(item, categoryKeywords)).findFirst());
    }

    private boolean categoryMatches(ClothingItem item, String... keywords) {
        String category = normalize(item.getCategory());
        for (String keyword : keywords) {
            if (category.contains(normalize(keyword))) {
                return true;
            }
        }
        return false;
    }

    private boolean needsOuterwear(String season, int temperature) {
        return temperature <= 18 || "winter".equalsIgnoreCase(season) || "autumn".equalsIgnoreCase(season);
    }

    private String weatherReason(String season, int temperature) {
        if (temperature <= 8) {
            return "Cold weather prioritizes warm layers";
        }
        if (temperature >= 28) {
            return "Hot weather prioritizes lightweight breathable items";
        }
        return "Fits " + labelOf(season) + " and " + temperature + "°C";
    }

    private String colorReason(String colorPreference) {
        return colorPreference == null || colorPreference.isBlank()
                ? "When no color is specified, occasion-matched items are prioritized"
                : "Prioritize matching " + colorPreference + " color palette";
    }

    private String labelOf(String season) {
        return switch (normalize(season)) {
            case "spring" -> "Spring";
            case "summer" -> "Summer";
            case "autumn" -> "Autumn";
            case "winter" -> "Winter";
            default -> "Current Season";
        };
    }

    private boolean matches(String expected, String actual) {
        return expected == null || expected.isBlank() || normalize(expected).equals(normalize(actual));
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim().toLowerCase(Locale.ROOT);
    }
}
