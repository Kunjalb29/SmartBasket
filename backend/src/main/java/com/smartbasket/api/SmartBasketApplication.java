package com.smartbasket.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * SmartBasket AI Shopping Platform
 * Main Spring Boot application entry point
 * 
 * @version 2.0.0
 * @author SmartBasket Engineering
 */
@SpringBootApplication
@EnableCaching
@EnableAsync
@EnableScheduling
public class SmartBasketApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartBasketApplication.class, args);
    }
}
