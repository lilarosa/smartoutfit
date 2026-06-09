package com.tao.smartoutfit.repository;

import com.tao.smartoutfit.model.FavoriteOutfit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteOutfitRepository extends JpaRepository<FavoriteOutfit, Long> {
    List<FavoriteOutfit> findTop20ByOrderByCreatedAtDesc();
}
