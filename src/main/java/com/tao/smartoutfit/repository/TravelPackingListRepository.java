package com.tao.smartoutfit.repository;

import com.tao.smartoutfit.model.TravelPackingList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TravelPackingListRepository extends JpaRepository<TravelPackingList, Long> {
    List<TravelPackingList> findTop10ByOrderByCreatedAtDesc();
}
