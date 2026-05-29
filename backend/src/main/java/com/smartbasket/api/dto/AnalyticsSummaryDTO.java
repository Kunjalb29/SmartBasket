package com.smartbasket.api.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
public class AnalyticsSummaryDTO {
    private BigDecimal totalSpent;
    private BigDecimal totalSavings;
    private BigDecimal averageHealthScore;
    private Long totalOrdersCount;
    private Map<String, BigDecimal> categorySpending;
    private Map<String, BigDecimal> healthScoreTrend;
}\n