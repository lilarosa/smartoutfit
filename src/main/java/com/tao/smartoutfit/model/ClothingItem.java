package com.tao.smartoutfit.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "clothing_items")
public class ClothingItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String imageUrl;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private String season;

    @Column(nullable = false)
    private String occasion;

    private String material;
    private String brand;
    private BigDecimal price;
    private String sizeLabel;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "wear_count")
    private Integer wearCount = 0;

    @Column(name = "last_worn_at")
    private LocalDateTime lastWornAt;

    @Column(name = "outfit_adoption_count")
    private Integer outfitAdoptionCount = 0;

    @Column(name = "special_care")
    private Boolean specialCare = false;

    @Column(name = "care_instructions", length = 1000)
    private String careInstructions;

    @Column(name = "recycling_notes", length = 1000)
    private String recyclingNotes;

    @Column(name = "special_meaning", length = 1000)
    private String specialMeaning;

    @Column(name = "special_tag")
    private Boolean specialTag = false;


    @Column(name = "is_archived")
    private Boolean isArchived = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public ClothingItem() {
    }

    public ClothingItem(Long id, String name, String category, String color, String season, String occasion) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.color = color;
        this.season = season;
        this.occasion = occasion;
    }

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
        if (this.isArchived == null) {
            this.isArchived = false;
        }
        if (this.wearCount == null) {
            this.wearCount = 0;
        }
        if (this.outfitAdoptionCount == null) {
            this.outfitAdoptionCount = 0;
        }
        if (this.specialCare == null) {
            this.specialCare = false;
        }
        if (this.specialTag == null) {
            this.specialTag = false;
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getColor() {
        return color;
    }

    public String getSeason() {
        return season;
    }

    public String getOccasion() {
        return occasion;
    }

    public String getMaterial() {
        return material;
    }

    public String getBrand() {
        return brand;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getSizeLabel() {
        return sizeLabel;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public Integer getWearCount() {
        return wearCount;
    }

    public LocalDateTime getLastWornAt() {
        return lastWornAt;
    }

    public Integer getOutfitAdoptionCount() {
        return outfitAdoptionCount;
    }

    @Transient
    public Integer getFavoriteScore() {
        int wears = wearCount == null ? 0 : wearCount;
        int adoptions = outfitAdoptionCount == null ? 0 : outfitAdoptionCount;
        return Math.min(100, wears * 4 + adoptions * 12);
    }

    public Boolean getSpecialCare() {
        return specialCare;
    }

    public String getCareInstructions() {
        return careInstructions;
    }

    public String getRecyclingNotes() {
        return recyclingNotes;
    }

    public String getSpecialMeaning() {
        return specialMeaning;
    }

    public Boolean getSpecialTag() {
        return specialTag;
    }

    @Transient
    public boolean isUnwornOverOneYear() {
        int count = wearCount == null ? 0 : wearCount;
        LocalDate referenceDate = purchaseDate;
        if (referenceDate == null && createdAt != null) {
            referenceDate = createdAt.toLocalDate();
        }

        return count == 0
                && referenceDate != null
                && referenceDate.isBefore(LocalDate.now().minusYears(1));
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Boolean getIsArchived() {
        return isArchived;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public void setOccasion(String occasion) {
        this.occasion = occasion;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setSizeLabel(String sizeLabel) {
        this.sizeLabel = sizeLabel;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public void setWearCount(Integer wearCount) {
        this.wearCount = wearCount;
    }

    public void setLastWornAt(LocalDateTime lastWornAt) {
        this.lastWornAt = lastWornAt;
    }

    public void setOutfitAdoptionCount(Integer outfitAdoptionCount) {
        this.outfitAdoptionCount = outfitAdoptionCount;
    }

    public void setSpecialCare(Boolean specialCare) {
        this.specialCare = specialCare;
    }

    public void setCareInstructions(String careInstructions) {
        this.careInstructions = careInstructions;
    }

    public void setRecyclingNotes(String recyclingNotes) {
        this.recyclingNotes = recyclingNotes;
    }

    public void setSpecialMeaning(String specialMeaning) {
        this.specialMeaning = specialMeaning;
    }

    public void setSpecialTag(Boolean specialTag) {
        this.specialTag = specialTag;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setIsArchived(Boolean archived) {
        isArchived = archived;
    }
}
