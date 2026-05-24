package com.tao.smartoutfit.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadPath = "file:" + System.getProperty("user.home")
                + "/Downloads/02_Softwares/09projects/smartoutfit/uploads/";

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadPath);
    }
}