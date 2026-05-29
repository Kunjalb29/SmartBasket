package com.smartbasket.api.controller;

import com.smartbasket.api.service.AIAssistantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

/**
 * AI Assistant REST controller
 * Handles natural language shopping queries
 */
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.origins}")
public class AIController {

    private final AIAssistantService aiService;

    /**
     * POST /api/ai/chat
     * Send a message and receive AI response with product recommendations
     */
    @PostMapping("/chat")
    public ResponseEntity<?> chat(
        @RequestBody Map<String, Object> request,
        @AuthenticationPrincipal String userId
    ) {
        String message = (String) request.get("message");
        String conversationId = (String) request.getOrDefault("conversationId", null);
        return ResponseEntity.ok(aiService.chat(message, conversationId, UUID.fromString(userId)));
    }

    /**
     * GET /api/ai/recommendations
     * Get personalized product recommendations for current user
     */
    @GetMapping("/recommendations")
    public ResponseEntity<?> getRecommendations(
        @AuthenticationPrincipal String userId,
        @RequestParam(defaultValue = "10") int limit
    ) {
        return ResponseEntity.ok(aiService.getPersonalizedRecommendations(UUID.fromString(userId), limit));
    }

    /**
     * POST /api/ai/analyze-cart
     * Analyze current cart for health score and suggestions
     */
    @PostMapping("/analyze-cart")
    public ResponseEntity<?> analyzeCart(
        @RequestBody Map<String, Object> cartData,
        @AuthenticationPrincipal String userId
    ) {
        return ResponseEntity.ok(aiService.analyzeCart(cartData, UUID.fromString(userId)));
    }

    /**
     * GET /api/ai/meal-plan
     * Generate a weekly meal plan based on user preferences
     */
    @GetMapping("/meal-plan")
    public ResponseEntity<?> getMealPlan(
        @AuthenticationPrincipal String userId,
        @RequestParam(defaultValue = "7") int days,
        @RequestParam(defaultValue = "2000") int targetCalories
    ) {
        return ResponseEntity.ok(aiService.generateMealPlan(UUID.fromString(userId), days, targetCalories));
    }
}
