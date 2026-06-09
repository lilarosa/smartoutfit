package com.tao.smartoutfit.controller;

import com.tao.smartoutfit.model.FavoriteOutfit;
import com.tao.smartoutfit.model.OutfitCalendarEntry;
import com.tao.smartoutfit.model.TravelPackingList;
import com.tao.smartoutfit.service.UtilityService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class UtilityController {

    private final UtilityService utilityService;

    public UtilityController(UtilityService utilityService) {
        this.utilityService = utilityService;
    }

    @GetMapping("/outfit-calendar")
    public List<OutfitCalendarEntry> recentCalendarEntries() {
        return utilityService.recentCalendarEntries();
    }

    @PostMapping("/outfit-calendar")
    public OutfitCalendarEntry saveCalendarEntry(@RequestBody OutfitCalendarEntry entry) {
        return utilityService.saveCalendarEntry(entry);
    }

    @DeleteMapping("/outfit-calendar/{id}")
    public void deleteCalendarEntry(@PathVariable Long id) {
        utilityService.deleteCalendarEntry(id);
    }

    @GetMapping("/favorite-outfits")
    public List<FavoriteOutfit> recentFavorites() {
        return utilityService.recentFavorites();
    }

    @PostMapping("/favorite-outfits")
    public FavoriteOutfit saveFavorite(@RequestBody FavoriteOutfit favorite) {
        return utilityService.saveFavorite(favorite);
    }

    @DeleteMapping("/favorite-outfits/{id}")
    public void deleteFavorite(@PathVariable Long id) {
        utilityService.deleteFavorite(id);
    }

    @GetMapping("/travel-packing-lists")
    public List<TravelPackingList> recentTravelLists() {
        return utilityService.recentTravelLists();
    }

    @PostMapping("/travel-packing-lists")
    public TravelPackingList saveTravelList(@RequestBody TravelPackingList packingList) {
        return utilityService.saveTravelList(packingList);
    }

    @DeleteMapping("/travel-packing-lists/{id}")
    public void deleteTravelList(@PathVariable Long id) {
        utilityService.deleteTravelList(id);
    }
}
