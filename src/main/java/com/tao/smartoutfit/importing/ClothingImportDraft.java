package com.tao.smartoutfit.importing;

public record ClothingImportDraft(
        String imageUrl,
        String originalFilename,
        String name,
        String category,
        String color,
        String season,
        String occasion,
        String material,
        Boolean specialCare,
        String careInstructions,
        String recyclingNotes,
        String confidenceNote
) {
}
