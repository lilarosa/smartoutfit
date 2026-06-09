package com.tao.smartoutfit.repository;

import com.tao.smartoutfit.model.OutfitCalendarEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface OutfitCalendarEntryRepository extends JpaRepository<OutfitCalendarEntry, Long> {
    List<OutfitCalendarEntry> findTop20ByOrderByEntryDateDescCreatedAtDesc();

    List<OutfitCalendarEntry> findByEntryDateOrderByCreatedAtDesc(LocalDate entryDate);
}
