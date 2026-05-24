package com.tao.smartoutfit.repository;

import com.tao.smartoutfit.model.ClothingItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothingItemRepository extends JpaRepository<ClothingItem, Long> {
}