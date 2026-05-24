package com.tao.smartoutfit;

import com.tao.smartoutfit.model.ClothingItem;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

class SmartoutfitApplicationTests {

    @Test
    void marksClothingAsUnwornOverOneYear() {
        ClothingItem item = new ClothingItem();
        item.setPurchaseDate(LocalDate.now().minusYears(1).minusDays(1));
        item.setWearCount(0);

        assertThat(item.isUnwornOverOneYear()).isTrue();
    }

    @Test
    void doesNotMarkRecentlyPurchasedClothingAsUnwornOverOneYear() {
        ClothingItem item = new ClothingItem();
        item.setPurchaseDate(LocalDate.now().minusMonths(6));
        item.setWearCount(0);

        assertThat(item.isUnwornOverOneYear()).isFalse();
    }
}
