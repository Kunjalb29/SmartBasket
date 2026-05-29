package com.smartbasket.api.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class AIChatResponse {
    private String response;
    private List<String> suggestedActions;
    private List<ProductDTO> recommendedProducts;
}
