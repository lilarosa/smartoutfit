package com.tao.smartoutfit.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

class UtilityModelsTests {

    @Test
    void calendarEntryStoresDateAndSummary() {
        OutfitCalendarEntry entry = new OutfitCalendarEntry();
        entry.setEntryDate(LocalDate.of(2026, 5, 25));
        entry.setTitle("通勤搭配");
        entry.setItemSummary("白色衬衫、黑色西裤");

        entry.prePersist();

        assertThat(entry.getEntryDate()).isEqualTo(LocalDate.of(2026, 5, 25));
        assertThat(entry.getItemSummary()).contains("白色衬衫");
        assertThat(entry.getCreatedAt()).isNotNull();
    }

    @Test
    void travelPackingListStoresTripContext() {
        TravelPackingList list = new TravelPackingList();
        list.setDestination("Paris");
        list.setDays(3);
        list.setSeason("spring");
        list.setItemSummary("白色衬衫、充电器");

        list.prePersist();

        assertThat(list.getDestination()).isEqualTo("Paris");
        assertThat(list.getDays()).isEqualTo(3);
        assertThat(list.getItemSummary()).contains("充电器");
    }

    @Test
    void favoriteOutfitStoresSummary() {
        FavoriteOutfit favorite = new FavoriteOutfit();
        favorite.setTitle("稳定通勤搭配");
        favorite.setItemSummary("白色衬衫、黑色西裤");

        favorite.prePersist();

        assertThat(favorite.getTitle()).isEqualTo("稳定通勤搭配");
        assertThat(favorite.getItemSummary()).contains("黑色西裤");
        assertThat(favorite.getCreatedAt()).isNotNull();
    }
}
