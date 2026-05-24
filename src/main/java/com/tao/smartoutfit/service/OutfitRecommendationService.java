package com.tao.smartoutfit.service;

import com.tao.smartoutfit.model.OutfitRecommendation;
import org.springframework.stereotype.Service;

@Service
public class OutfitRecommendationService {

    public OutfitRecommendation getRecommendation(String occasion, String season, int temperature) {
        if (occasion.equals("work") && season.equals("spring")) {
            if (temperature <= 10) {
                return new OutfitRecommendation(
                        "work",
                        "spring",
                        "white shirt",
                        "black trousers",
                        "warm trench coat",
                        "Recommended outfit for cool spring work days."
                );
            } else {
                return new OutfitRecommendation(
                        "work",
                        "spring",
                        "white shirt",
                        "black trousers",
                        "light blazer",
                        "Recommended outfit for mild spring work days."
                );
            }
        } else if (occasion.equals("work") && season.equals("winter")) {
            return new OutfitRecommendation(
                    "work",
                    "winter",
                    "knit sweater",
                    "dark trousers",
                    "wool coat",
                    "Recommended outfit for work in winter."
            );
        } else if (occasion.equals("casual") && season.equals("summer")) {
            if (temperature >= 28) {
                return new OutfitRecommendation(
                        "casual",
                        "summer",
                        "light T-shirt",
                        "shorts",
                        "no outerwear",
                        "Recommended outfit for hot summer casual days."
                );
            } else {
                return new OutfitRecommendation(
                        "casual",
                        "summer",
                        "T-shirt",
                        "jeans",
                        "light cardigan",
                        "Recommended outfit for mild summer casual days."
                );
            }
        } else if (occasion.equals("party") && season.equals("summer")) {
            return new OutfitRecommendation(
                    "party",
                    "summer",
                    "elegant top",
                    "skirt",
                    "light jacket",
                    "Recommended outfit for a summer party."
            );
        } else {
            return new OutfitRecommendation(
                    occasion,
                    season,
                    "unknown",
                    "unknown",
                    "unknown",
                    "No recommendation available for this occasion, season and temperature yet."
            );
        }
    }
}