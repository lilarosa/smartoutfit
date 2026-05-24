package com.tao.smartoutfit.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.tao.smartoutfit.model.ClothingItem;
import com.tao.smartoutfit.model.OutfitRecommendation;
import com.tao.smartoutfit.service.ClothingService;
import com.tao.smartoutfit.service.OutfitRecommendationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
@CrossOrigin(origins = "*")
@RestController
public class HelloController {

    private final OutfitRecommendationService outfitRecommendationService;
    private final ClothingService clothingService;

    public HelloController(
            OutfitRecommendationService outfitRecommendationService,
            ClothingService clothingService
    ) {
        this.outfitRecommendationService = outfitRecommendationService;
        this.clothingService = clothingService;
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello Smart Outfit from Spring Boot!";
    }

    @GetMapping("/recommend")
    public OutfitRecommendation recommend(
            @RequestParam String occasion,
            @RequestParam String season,
            @RequestParam int temperature
    ) {
        return outfitRecommendationService.getRecommendation(occasion, season, temperature);
    }

    @GetMapping("/clothes/sample")
    public ClothingItem getSampleClothingItem() {
        return clothingService.getSampleClothingItem();
    }

    @GetMapping("/clothes")
    public List<ClothingItem> getClothes(
            @RequestParam(required = false) String season,
            @RequestParam(required = false) String occasion,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) String material,
            @RequestParam(required = false) Boolean specialCare,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        return clothingService.searchClothes(
                season,
                occasion,
                color,
                material,
                specialCare,
                sortBy,
                direction
        );
    }

    @GetMapping("/clothes/filter")
    public List<ClothingItem> filterClothes(
            @RequestParam(required = false) String season,
            @RequestParam(required = false) String occasion
    ) {
        return clothingService.filterClothes(season, occasion);
    }
    @GetMapping("/clothes/by-id")
    public ClothingItem getClothingById(@RequestParam Long id) {
        return clothingService.getClothingById(id);
    }
    @PostMapping("/clothes")
    public ClothingItem addClothingItem(@RequestBody ClothingItem clothingItem) {
        return clothingService.addClothingItem(clothingItem);
    }
    @DeleteMapping("/clothes")
    public String deleteClothingById(@RequestParam Long id) {
        boolean deleted = clothingService.deleteClothingById(id);

        if (deleted) {
            return "Clothing item with id " + id + " was deleted successfully.";
        } else {
            return "Clothing item with id " + id + " was not found.";
        }
    }
    @PutMapping("/clothes")
    public ClothingItem updateClothingItem(@RequestBody ClothingItem clothingItem) {
        return clothingService.updateClothingItem(clothingItem);
    }

    @PatchMapping("/clothes/wear")
    public ClothingItem recordWear(@RequestParam Long id) {
        return clothingService.recordWear(id);
    }
}
