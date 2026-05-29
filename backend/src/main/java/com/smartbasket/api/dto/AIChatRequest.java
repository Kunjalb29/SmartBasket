package com.smartbasket.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
public class AIChatRequest {
    @NotBlank
    private String message;
    private List<String> currentCartItemIds;
    private String context;
}
