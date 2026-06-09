package com.tao.smartoutfit.model;

import java.util.List;

public record OutfitPlan(
        String title,
        String occasion,
        String season,
        int temperature,
        String colorPreference,
        List<ClothingItem> items,
        List<String> reasons,
        String message
) {
}
