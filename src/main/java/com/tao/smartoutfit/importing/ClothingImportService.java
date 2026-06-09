package com.tao.smartoutfit.importing;

import com.tao.smartoutfit.image.ImageStorageService;
import com.tao.smartoutfit.image.StoredImage;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class ClothingImportService {

    private final ImageStorageService imageStorageService;

    public ClothingImportService(ImageStorageService imageStorageService) {
        this.imageStorageService = imageStorageService;
    }

    public List<ClothingImportDraft> preview(MultipartFile[] files) {
        List<ClothingImportDraft> drafts = new ArrayList<>();
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }
            StoredImage storedImage = imageStorageService.store(file);
            drafts.add(suggestDraft(storedImage));
        }
        return drafts;
    }

    private ClothingImportDraft suggestDraft(StoredImage image) {
        String source = (image.originalFilename() == null ? "" : image.originalFilename()).toLowerCase(Locale.ROOT);
        String category = suggestCategory(source);
        String color = suggestColor(source);
        String season = suggestSeason(source, category);
        String occasion = suggestOccasion(source, category);
        String material = suggestMaterial(source);
        boolean specialCare = "silk".equals(material) || "wool".equals(material) || "leather".equals(material);

        return new ClothingImportDraft(
                image.imageUrl(),
                image.originalFilename(),
                humanName(category, color),
                category,
                color,
                season,
                occasion,
                material,
                specialCare,
                specialCare ? "Follow the material care label; use low temperature or professional care first." : "",
                "",
                "Current draft uses local rule-based pre-classification. Visual AI recognition can be connected later."
        );
    }

    private String suggestCategory(String source) {
        if (containsAny(source, "coat", "jacket", "blazer", "parka", "trench", "Outerwear", "jacket", "coat", "blazer")) {
            return "outerwear";
        }
        if (containsAny(source, "dress", "gown", "skirt", "Dress")) {
            return "dress";
        }
        if (containsAny(source, "pants", "jeans", "trousers", "shorts", "pants", "jeans", "shorts")) {
            return "bottom";
        }
        if (containsAny(source, "shoe", "sneaker", "boot", "heel", "loafer", "Shoes", "boots")) {
            return "shoes";
        }
        if (containsAny(source, "bag", "handbag", "backpack", "Bag")) {
            return "bag";
        }
        if (containsAny(source, "hat", "scarf", "belt", "watch", "hat", "scarf", "belt", "Accessory")) {
            return "accessory";
        }
        return "top";
    }

    private String suggestColor(String source) {
        if (containsAny(source, "black", "black")) return "black";
        if (containsAny(source, "white", "white")) return "white";
        if (containsAny(source, "red", "red")) return "red";
        if (containsAny(source, "blue", "blue")) return "blue";
        if (containsAny(source, "green", "green")) return "green";
        if (containsAny(source, "yellow", "yellow")) return "yellow";
        if (containsAny(source, "pink", "pink")) return "pink";
        if (containsAny(source, "gray", "grey", "gray")) return "gray";
        if (containsAny(source, "brown", "brown", "brown")) return "brown";
        if (containsAny(source, "beige", "beige")) return "beige";
        return "unknown";
    }

    private String suggestSeason(String source, String category) {
        if (containsAny(source, "spring", "spring")) return "spring";
        if (containsAny(source, "summer", "summer")) return "summer";
        if (containsAny(source, "autumn", "fall", "autumn")) return "autumn";
        if (containsAny(source, "winter", "winter")) return "winter";
        if ("outerwear".equals(category)) return "winter";
        if ("dress".equals(category)) return "summer";
        return "spring";
    }

    private String suggestOccasion(String source, String category) {
        if (containsAny(source, "work", "office", "commute", "Work", "office")) return "work";
        if (containsAny(source, "sport", "gym", "run", "Sport", "Gym")) return "sport";
        if (containsAny(source, "party", "formal", "wedding", "Party", "wedding")) return "party";
        if ("outerwear".equals(category)) return "work";
        return "casual";
    }

    private String suggestMaterial(String source) {
        if (containsAny(source, "wool", "wool")) return "wool";
        if (containsAny(source, "silk", "silk", "silk")) return "silk";
        if (containsAny(source, "leather", "leather")) return "leather";
        if (containsAny(source, "cotton", "cotton")) return "cotton";
        if (containsAny(source, "linen", "linen")) return "linen";
        return "";
    }

    private String humanName(String category, String color) {
        String categoryName = switch (category) {
            case "outerwear" -> "Outerwear";
            case "dress" -> "Dress";
            case "bottom" -> "Bottom";
            case "shoes" -> "Shoes";
            case "bag" -> "Bag";
            case "accessory" -> "Accessory";
            default -> "Top";
        };
        return "unknown".equals(color) ? categoryName : color + " " + categoryName;
    }

    private boolean containsAny(String source, String... keywords) {
        for (String keyword : keywords) {
            if (source.contains(keyword)) {
                return true;
            }
        }
        return false;
    }
}
