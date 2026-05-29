package com.smartbasket.api.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class OrderDTO {
    private UUID id;
    private Instant createdAt;
    private String status;
    private BigDecimal totalAmount;
    private BigDecimal healthScore;
    private BigDecimal savings;
    private List<OrderItemDTO> items;

    @Data
    @Builder
    public static class OrderItemDTO {
        private UUID productId;
        private String productName;
        private Integer quantity;
        private BigDecimal price;
    }
}
