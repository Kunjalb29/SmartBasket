package com.smartbasket.api.controller;

import com.smartbasket.api.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Analytics REST controller — admin-only platform metrics
 */
@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "${cors.origins}")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    /** GET /api/analytics/dashboard — KPI summary */
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats() {
        return ResponseEntity.ok(analyticsService.getDashboardStats());
    }

    /** GET /api/analytics/revenue?period=30d */
    @GetMapping("/revenue")
    public ResponseEntity<?> getRevenue(@RequestParam(defaultValue = "30d") String period) {
        return ResponseEntity.ok(analyticsService.getRevenueData(period));
    }

    /** GET /api/analytics/products/top */
    @GetMapping("/products/top")
    public ResponseEntity<?> getTopProducts(@RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(analyticsService.getTopProducts(limit));
    }

    /** GET /api/analytics/users/growth */
    @GetMapping("/users/growth")
    public ResponseEntity<?> getUserGrowth(@RequestParam(defaultValue = "30d") String period) {
        return ResponseEntity.ok(analyticsService.getUserGrowthData(period));
    }

    /** GET /api/analytics/health-scores */
    @GetMapping("/health-scores")
    public ResponseEntity<?> getHealthScoreTrend() {
        return ResponseEntity.ok(analyticsService.getHealthScoreTrend());
    }
}
