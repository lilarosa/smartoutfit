package com.tao.smartoutfit.repository;

import com.tao.smartoutfit.model.WellnessEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WellnessEntryRepository extends JpaRepository<WellnessEntry, Long> {
    List<WellnessEntry> findByEntryDateBetweenOrderByEntryDateDesc(LocalDate start, LocalDate end);

    Optional<WellnessEntry> findByEntryDate(LocalDate entryDate);
}
