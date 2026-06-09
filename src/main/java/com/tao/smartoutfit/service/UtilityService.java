package com.tao.smartoutfit.service;

import com.tao.smartoutfit.model.FavoriteOutfit;
import com.tao.smartoutfit.model.OutfitCalendarEntry;
import com.tao.smartoutfit.model.TravelPackingList;
import com.tao.smartoutfit.repository.FavoriteOutfitRepository;
import com.tao.smartoutfit.repository.OutfitCalendarEntryRepository;
import com.tao.smartoutfit.repository.TravelPackingListRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilityService {

    private final OutfitCalendarEntryRepository calendarEntryRepository;
    private final FavoriteOutfitRepository favoriteOutfitRepository;
    private final TravelPackingListRepository travelPackingListRepository;

    public UtilityService(
            OutfitCalendarEntryRepository calendarEntryRepository,
            FavoriteOutfitRepository favoriteOutfitRepository,
            TravelPackingListRepository travelPackingListRepository
    ) {
        this.calendarEntryRepository = calendarEntryRepository;
        this.favoriteOutfitRepository = favoriteOutfitRepository;
        this.travelPackingListRepository = travelPackingListRepository;
    }

    public List<OutfitCalendarEntry> recentCalendarEntries() {
        return calendarEntryRepository.findTop20ByOrderByEntryDateDescCreatedAtDesc();
    }

    public OutfitCalendarEntry saveCalendarEntry(OutfitCalendarEntry entry) {
        return calendarEntryRepository.save(entry);
    }

    public void deleteCalendarEntry(Long id) {
        calendarEntryRepository.deleteById(id);
    }

    public List<FavoriteOutfit> recentFavorites() {
        return favoriteOutfitRepository.findTop20ByOrderByCreatedAtDesc();
    }

    public FavoriteOutfit saveFavorite(FavoriteOutfit favorite) {
        return favoriteOutfitRepository.save(favorite);
    }

    public void deleteFavorite(Long id) {
        favoriteOutfitRepository.deleteById(id);
    }

    public List<TravelPackingList> recentTravelLists() {
        return travelPackingListRepository.findTop10ByOrderByCreatedAtDesc();
    }

    public TravelPackingList saveTravelList(TravelPackingList packingList) {
        return travelPackingListRepository.save(packingList);
    }

    public void deleteTravelList(Long id) {
        travelPackingListRepository.deleteById(id);
    }
}
