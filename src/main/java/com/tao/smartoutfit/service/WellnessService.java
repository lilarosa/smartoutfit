package com.tao.smartoutfit.service;

import com.tao.smartoutfit.model.WellnessEntry;
import com.tao.smartoutfit.repository.WellnessEntryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WellnessService {

    private final WellnessEntryRepository wellnessEntryRepository;

    public WellnessService(WellnessEntryRepository wellnessEntryRepository) {
        this.wellnessEntryRepository = wellnessEntryRepository;
    }

    public List<WellnessEntry> getEntries(LocalDate start, LocalDate end) {
        LocalDate resolvedEnd = end == null ? LocalDate.now() : end;
        LocalDate resolvedStart = start == null ? resolvedEnd.minusDays(90) : start;
        return wellnessEntryRepository.findByEntryDateBetweenOrderByEntryDateDesc(resolvedStart, resolvedEnd);
    }

    public WellnessEntry saveEntry(WellnessEntry entry) {
        WellnessEntry target = wellnessEntryRepository.findByEntryDate(entry.getEntryDate())
                .orElseGet(WellnessEntry::new);

        target.setEntryDate(entry.getEntryDate());
        target.setWeightKg(entry.getWeightKg());
        target.setPeriodStart(entry.getPeriodStart());
        target.setPeriodDay(entry.getPeriodDay());
        target.setMood(entry.getMood());
        target.setImportantEvents(entry.getImportantEvents());
        target.setNotes(entry.getNotes());

        return wellnessEntryRepository.save(target);
    }

    public int deleteAllEntries() {
        List<WellnessEntry> entries = wellnessEntryRepository.findAll();
        wellnessEntryRepository.deleteAll(entries);
        return entries.size();
    }
}
