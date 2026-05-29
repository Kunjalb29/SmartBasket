package com.smartbasket.api.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ProductDTO {
    private UUID id;
    private String name;
    private String brand;
    private String category;
    private BigDecimal price;
    private String imageUrl;
    private Integer healthScore;
    private String barcode;
    private List<String> allergens;
    private boolean isOrganic;
}
