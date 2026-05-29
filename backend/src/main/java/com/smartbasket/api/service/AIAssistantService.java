package com.smartbasket.api.service;

import com.smartbasket.api.dto.AIChatRequest;
import com.smartbasket.api.dto.AIChatResponse;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.ArrayList;

@Service
public class AIAssistantService {
    public AIChatResponse generateChatResponse(AIChatRequest request) {
        String msg = request.getMessage().toLowerCase();
        String reply;
        
        if (msg.contains("healthy") || msg.contains("organic")) {
            reply = "I've analyzed your basket. Swapping regular whole milk for organic grass-fed whole milk boosts your basket health score by +8 points for only $0.50 more!";
        } else if (msg.contains("save") || msg.contains("budget")) {
            reply = "Great news! If you swap brand-name pasta for SmartBasket organic store brand, you'll save $2.40 on this basket with zero nutritional quality loss!";
        } else {
            reply = "Hello! I am your SmartBasket AI Assistant. Ask me how to optimize your cart for lower costs, higher organic ingredients, or fending off allergens.";
        }

        return AIChatResponse.builder()
                .response(reply)
                .suggestedActions(Arrays.asList("Apply organic Whole Milk swap", "Save $2.40 on Pasta"))
                .recommendedProducts(new ArrayList<>())
                .build();
    }
}\n