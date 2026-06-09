package com.tao.smartoutfit.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class WellnessEntryTests {

    @Test
    void periodStartAlsoMarksPeriodDay() {
        WellnessEntry entry = new WellnessEntry();
        entry.setPeriodStart(true);
        entry.setPeriodDay(false);

        entry.prePersist();

        assertThat(entry.getPeriodStart()).isTrue();
        assertThat(entry.getPeriodDay()).isTrue();
    }
}
