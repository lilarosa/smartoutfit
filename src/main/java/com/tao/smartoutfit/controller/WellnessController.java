package com.tao.smartoutfit.controller;

import com.tao.smartoutfit.model.WellnessEntry;
import com.tao.smartoutfit.service.WellnessService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class WellnessController {

    private final WellnessService wellnessService;

    public WellnessController(WellnessService wellnessService) {
        this.wellnessService = wellnessService;
    }

    @GetMapping("/wellness/entries")
    public List<WellnessEntry> getEntries(
            @RequestParam(required = false) LocalDate start,
            @RequestParam(required = false) LocalDate end
    ) {
        return wellnessService.getEntries(start, end);
    }

    @PostMapping("/wellness/entries")
    public WellnessEntry saveEntry(@RequestBody WellnessEntry entry) {
        return wellnessService.saveEntry(entry);
    }

    @DeleteMapping("/wellness/entries")
    public Map<String, Integer> deleteAllEntries() {
        return Map.of("deleted", wellnessService.deleteAllEntries());
    }
}
