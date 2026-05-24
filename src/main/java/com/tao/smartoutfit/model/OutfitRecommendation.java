package com.tao.smartoutfit.model;

public class OutfitRecommendation {

    private String occasion;
    private String season;
    private String top;
    private String bottom;
    private String outerwear;
    private String message;

    public OutfitRecommendation(String occasion, String season, String top, String bottom, String outerwear, String message) {
        this.occasion = occasion;
        this.season = season;
        this.top = top;
        this.bottom = bottom;
        this.outerwear = outerwear;
        this.message = message;
    }

    public String getOccasion() {
        return occasion;
    }

    public String getSeason() {
        return season;
    }

    public String getTop() {
        return top;
    }

    public String getBottom() {
        return bottom;
    }

    public String getOuterwear() {
        return outerwear;
    }

    public String getMessage() {
        return message;
    }
}