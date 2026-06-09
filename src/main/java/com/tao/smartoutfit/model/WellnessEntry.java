package com.tao.smartoutfit.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "wellness_entries",
        uniqueConstraints = @UniqueConstraint(name = "uk_wellness_entry_date", columnNames = "entry_date")
)
public class WellnessEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entry_date", nullable = false)
    private LocalDate entryDate;

    @Column(name = "weight_kg", precision = 5, scale = 2)
    private BigDecimal weightKg;

    @Column(name = "period_start")
    private Boolean periodStart = false;

    @Column(name = "period_day")
    private Boolean periodDay = false;

    private String mood;

    @Column(name = "important_events", length = 1200)
    private String importantEvents;

    @Column(length = 1200)
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
        normalizeBooleans();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
        normalizeBooleans();
    }

    private void normalizeBooleans() {
        if (periodStart == null) {
            periodStart = false;
        }
        if (periodDay == null) {
            periodDay = false;
        }
        if (Boolean.TRUE.equals(periodStart)) {
            periodDay = true;
        }
    }

    public Long getId() {
        return id;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public BigDecimal getWeightKg() {
        return weightKg;
    }

    public Boolean getPeriodStart() {
        return periodStart;
    }

    public Boolean getPeriodDay() {
        return periodDay;
    }

    public String getMood() {
        return mood;
    }

    public String getImportantEvents() {
        return importantEvents;
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

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public void setWeightKg(BigDecimal weightKg) {
        this.weightKg = weightKg;
    }

    public void setPeriodStart(Boolean periodStart) {
        this.periodStart = periodStart;
    }

    public void setPeriodDay(Boolean periodDay) {
        this.periodDay = periodDay;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public void setImportantEvents(String importantEvents) {
        this.importantEvents = importantEvents;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
