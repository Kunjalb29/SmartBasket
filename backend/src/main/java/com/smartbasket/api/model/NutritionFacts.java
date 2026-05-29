package com.smartbasket.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Detailed nutrition facts for a product (one-to-one with Product)
 */
@Entity
@Table(name = "nutrition_facts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class NutritionFacts {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", unique = true)
    private Product product;

    @Column(name = "serving_size", length = 50)
    private String servingSize;

    @Column(name = "servings_per_container")
    private BigDecimal servingsPerContainer;

    @Column(name = "calories_per_serving")
    private Integer caloriesPerServing;

    @Column(name = "total_fat_g", precision = 8, scale = 2)
    private BigDecimal totalFatG;

    @Column(name = "saturated_fat_g", precision = 8, scale = 2)
    private BigDecimal saturatedFatG;

    @Column(name = "trans_fat_g", precision = 8, scale = 2)
    private BigDecimal transFatG;

    @Column(name = "cholesterol_mg", precision = 8, scale = 2)
    private BigDecimal cholesterolMg;

    @Column(name = "sodium_mg", precision = 8, scale = 2)
    private BigDecimal sodiumMg;

    @Column(name = "total_carbs_g", precision = 8, scale = 2)
    private BigDecimal totalCarbsG;

    @Column(name = "dietary_fiber_g", precision = 8, scale = 2)
    private BigDecimal dietaryFiberG;

    @Column(name = "total_sugars_g", precision = 8, scale = 2)
    private BigDecimal totalSugarsG;

    @Column(name = "added_sugars_g", precision = 8, scale = 2)
    private BigDecimal addedSugarsG;

    @Column(name = "protein_g", precision = 8, scale = 2)
    private BigDecimal proteinG;

    @Column(name = "vitamin_d_mcg", precision = 8, scale = 2)
    private BigDecimal vitaminDMcg;

    @Column(name = "calcium_mg", precision = 8, scale = 2)
    private BigDecimal calciumMg;

    @Column(name = "iron_mg", precision = 8, scale = 2)
    private BigDecimal ironMg;

    @Column(name = "potassium_mg", precision = 8, scale = 2)
    private BigDecimal potassiumMg;
}
