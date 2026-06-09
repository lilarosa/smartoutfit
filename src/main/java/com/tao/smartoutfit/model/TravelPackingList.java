package com.tao.smartoutfit.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "travel_packing_lists")
public class TravelPackingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String destination;
    private Integer days;
    private String season;
    private String occasion;
    private Integer temperature;

    @Column(name = "item_summary", length = 2400)
    private String itemSummary;

    @Column(name = "packing_items", length = 5000)
    private String packingItems;

    @Column(length = 1200)
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getDestination() {
        return destination;
    }

    public Integer getDays() {
        return days;
    }

    public String getSeason() {
        return season;
    }

    public String getOccasion() {
        return occasion;
    }

    public Integer getTemperature() {
        return temperature;
    }

    public String getItemSummary() {
        return itemSummary;
    }

    public String getPackingItems() {
        return packingItems;
    }

    public String getNotes() {
        return notes;
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

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public void setOccasion(String occasion) {
        this.occasion = occasion;
    }

    public void setTemperature(Integer temperature) {
        this.temperature = temperature;
    }

    public void setItemSummary(String itemSummary) {
        this.itemSummary = itemSummary;
    }

    public void setPackingItems(String packingItems) {
        this.packingItems = packingItems;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
