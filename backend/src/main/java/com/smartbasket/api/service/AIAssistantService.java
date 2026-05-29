package com.smartbasket.api.service;

import com.smartbasket.api.dto.AIChatResponse;
import com.smartbasket.api.dto.ProductDTO;
import com.smartbasket.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AIAssistantService {
    private final ProductRepository productRepository;
    private final ProductService productService;

    @Transactional(readOnly = true)
    public AIChatResponse chat(String message, String conversationId, UUID userId) {
        String msg = message != null ? message.toLowerCase() : "";
        String reply;
        List<String> actions = new ArrayList<>();
        List<ProductDTO> recommendations = new ArrayList<>();
        
        if (msg.contains("healthy") || msg.contains("organic")) {
            reply = "I've analyzed your basket. Swapping regular whole milk for organic grass-fed whole milk boosts your basket health score by +8 points for only $0.50 more!";
            actions.add("Apply organic Whole Milk swap");
            // Pull high health score items
            recommendations = productRepository.findTop10ByActiveTrueOrderByAiScoreDesc().stream()
                    .limit(2)
                    .map(productService::mapToDTO)
                    .collect(Collectors.toList());
        } else if (msg.contains("save") || msg.contains("budget")) {
            reply = "Great news! If you swap brand-name pasta for SmartBasket organic store brand, you'll save $2.40 on this basket with zero nutritional quality loss!";
            actions.add("Save $2.40 on Pasta");
            recommendations = productRepository.findTop8ByActiveTrueAndOnSaleTrueOrderByDiscountPercentageDesc().stream()
                    .limit(2)
                    .map(productService::mapToDTO)
                    .collect(Collectors.toList());
        } else {
            reply = "Hello! I am your SmartBasket AI Assistant. Ask me how to optimize your cart for lower costs, higher organic ingredients, or fending off allergens.";
            actions.add("Analyze current cart");
            actions.add("Show organic milk options");
        }

        return AIChatResponse.builder()
                .response(reply)
                .suggestedActions(actions)
                .recommendedProducts(recommendations)
                .build();
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getPersonalizedRecommendations(UUID userId, int limit) {
        return productRepository.findTop10ByActiveTrueOrderByAiScoreDesc()
                .stream()
                .limit(limit)
                .map(productService::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Map<String, Object> analyzeCart(Map<String, Object> cartData, UUID userId) {
        Map<String, Object> analysis = new HashMap<>();
        analysis.put("userId", userId);
        analysis.put("currentHealthScore", 82);
        analysis.put("potentialHealthScore", 90);
        analysis.put("suggestedSwapsCount", 2);
        
        List<Map<String, Object>> suggestions = new ArrayList<>();
        Map<String, Object> swap1 = new HashMap<>();
        swap1.put("originalItem", "Conventional Milk");
        swap1.put("suggestedItem", "Organic Grass-Fed Whole Milk");
        swap1.put("healthDelta", +8);
        swap1.put("priceDelta", +0.50);
        suggestions.add(swap1);
        
        Map<String, Object> swap2 = new HashMap<>();
        swap2.put("originalItem", "Brand Name Pasta");
        swap2.put("suggestedItem", "SmartBasket House Brand Pasta");
        swap2.put("healthDelta", 0);
        swap2.put("priceDelta", -2.40);
        suggestions.add(swap2);
        
        analysis.put("suggestions", suggestions);
        return analysis;
    }

    public Map<String, Object> generateMealPlan(UUID userId, int days, int targetCalories) {
        Map<String, Object> plan = new HashMap<>();
        plan.put("userId", userId);
        plan.put("daysCount", days);
        plan.put("dailyCalorieTarget", targetCalories);
        
        List<Map<String, Object>> dailyPlans = new ArrayList<>();
        String[] daysOfWeek = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
        
        for (int i = 0; i < Math.min(days, 7); i++) {
            Map<String, Object> day = new HashMap<>();
            day.put("dayName", daysOfWeek[i]);
            day.put("breakfast", "Avocado Toast with poached eggs (420 kcal)");
            day.put("lunch", "Grilled Chicken Quinoa Bowl (620 kcal)");
            day.put("snack", "Greek Yogurt with organic almonds (200 kcal)");
            day.put("dinner", "Baked Salmon with asparagus (550 kcal)");
            day.put("totalCalories", 1790);
            dailyPlans.add(day);
        }
        
        plan.put("weeklySchedule", dailyPlans);
        plan.put("macroDistribution", Map.of("carbs", "40%", "protein", "30%", "fat", "30%"));
        return plan;
    }
}

