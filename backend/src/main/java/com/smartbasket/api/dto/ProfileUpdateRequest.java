package com.smartbasket.api.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProfileUpdateRequest {
    private String name;
    private String email;
    private List<String> dietaryPreferences;
    private List<String> allergens;
    private Integer weeklyBudget;
}
