package com.tao.smartoutfit.service;

import com.tao.smartoutfit.model.ClothingItem;
import com.tao.smartoutfit.repository.ClothingItemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class ClothingService {

    private final ClothingItemRepository clothingItemRepository;

    public ClothingService(ClothingItemRepository clothingItemRepository) {
        this.clothingItemRepository = clothingItemRepository;
    }

    public ClothingItem getSampleClothingItem() {
        List<ClothingItem> clothes = clothingItemRepository.findAll();
        if (clothes.isEmpty()) {
            return null;
        }
        return clothes.get(0);
    }

    public List<ClothingItem> getAllClothes() {
        return clothingItemRepository.findAll();
    }

    public List<ClothingItem> filterClothes(String season, String occasion) {
        return searchClothes(season, occasion, null, null, null, "createdAt", "desc");
    }

    public List<ClothingItem> searchClothes(
            String season,
            String occasion,
            String color,
            String material,
            Boolean specialCare,
            String sortBy,
            String direction
    ) {
        Comparator<ClothingItem> comparator = getComparator(sortBy);
        if ("desc".equalsIgnoreCase(direction)) {
            comparator = comparator.reversed();
        }

        return clothingItemRepository.findAll().stream()
                .filter(item -> matches(season, item.getSeason()))
                .filter(item -> matches(occasion, item.getOccasion()))
                .filter(item -> matches(color, item.getColor()))
                .filter(item -> matches(material, item.getMaterial()))
                .filter(item -> specialCare == null || specialCare.equals(item.getSpecialCare()))
                .sorted(comparator)
                .toList();
    }

    public ClothingItem getClothingById(Long id) {
        Optional<ClothingItem> item = clothingItemRepository.findById(id);
        return item.orElse(null);
    }

    public ClothingItem addClothingItem(ClothingItem clothingItem) {
        clothingItem.setId(null);
        return clothingItemRepository.save(clothingItem);
    }

    public ClothingItem updateClothingItem(ClothingItem updatedItem) {
        Optional<ClothingItem> existingOptional = clothingItemRepository.findById(updatedItem.getId());

        if (existingOptional.isEmpty()) {
            return null;
        }

        ClothingItem existingItem = existingOptional.get();
        existingItem.setName(updatedItem.getName());
        existingItem.setCategory(updatedItem.getCategory());
        existingItem.setColor(updatedItem.getColor());
        existingItem.setSeason(updatedItem.getSeason());
        existingItem.setOccasion(updatedItem.getOccasion());
        existingItem.setMaterial(updatedItem.getMaterial());
        existingItem.setPurchaseDate(updatedItem.getPurchaseDate());
        existingItem.setWearCount(updatedItem.getWearCount());
        existingItem.setLastWornAt(updatedItem.getLastWornAt());
        existingItem.setSpecialCare(updatedItem.getSpecialCare());
        existingItem.setCareInstructions(updatedItem.getCareInstructions());
        existingItem.setRecyclingNotes(updatedItem.getRecyclingNotes());
        existingItem.setImageUrl(updatedItem.getImageUrl());
        existingItem.setIsArchived(updatedItem.getIsArchived());

        return clothingItemRepository.save(existingItem);
    }

    public ClothingItem recordWear(Long id) {
        Optional<ClothingItem> existingOptional = clothingItemRepository.findById(id);

        if (existingOptional.isEmpty()) {
            return null;
        }

        ClothingItem existingItem = existingOptional.get();
        int currentWearCount = existingItem.getWearCount() == null ? 0 : existingItem.getWearCount();
        existingItem.setWearCount(currentWearCount + 1);
        existingItem.setLastWornAt(LocalDateTime.now());

        return clothingItemRepository.save(existingItem);
    }

    public boolean deleteClothingById(Long id) {
        if (!clothingItemRepository.existsById(id)) {
            return false;
        }
        clothingItemRepository.deleteById(id);
        return true;
    }

    private boolean matches(String expected, String actual) {
        return expected == null || expected.isBlank() || expected.equalsIgnoreCase(actual);
    }

    private Comparator<ClothingItem> getComparator(String sortBy) {
        return switch (sortBy == null ? "" : sortBy) {
            case "purchaseDate" -> Comparator.comparing(
                    ClothingItem::getPurchaseDate,
                    Comparator.nullsLast(Comparator.naturalOrder())
            );
            case "wearCount" -> Comparator.comparing(
                    ClothingItem::getWearCount,
                    Comparator.nullsLast(Comparator.naturalOrder())
            );
            case "season" -> Comparator.comparing(
                    ClothingItem::getSeason,
                    Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER)
            );
            case "lastWornAt" -> Comparator.comparing(
                    ClothingItem::getLastWornAt,
                    Comparator.nullsLast(Comparator.naturalOrder())
            );
            default -> Comparator.comparing(
                    ClothingItem::getCreatedAt,
                    Comparator.nullsLast(Comparator.naturalOrder())
            );
        };
    }
}
