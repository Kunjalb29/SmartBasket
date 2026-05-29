package com.smartbasket.api.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Product entity representing items available for purchase
 */
@Entity
@Table(name = "products",
    indexes = {
        @Index(name = "idx_products_category", columnList = "category_id"),
        @Index(name = "idx_products_barcode", columnList = "barcode"),
        @Index(name = "idx_products_health_score", columnList = "health_score"),
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, length = 100)
    private String brand;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(unique = true, length = 50)
    private String barcode;

    @Column(unique = true, length = 100)
    private String sku;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "original_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal originalPrice;

    @Column(name = "discount_percentage")
    @Builder.Default
    private Integer discountPercentage = 0;

    @Column(name = "stock_count")
    @Builder.Default
    private Integer stockCount = 0;

    @Column(length = 50)
    private String unit;

    @Column(name = "weight_grams")
    private Integer weightGrams;

    @Column(name = "thumbnail", columnDefinition = "TEXT")
    private String thumbnail;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> images;

    @Column(name = "health_score")
    private Integer healthScore;

    @Column(name = "ai_score", precision = 5, scale = 2)
    private BigDecimal aiScore;

    @Column(name = "is_organic")
    @Builder.Default
    private boolean organic = false;

    @Column(name = "is_vegan")
    @Builder.Default
    private boolean vegan = false;

    @Column(name = "is_gluten_free")
    @Builder.Default
    private boolean glutenFree = false;

    @Column(name = "is_on_sale")
    @Builder.Default
    private boolean onSale = false;

    @Column(name = "is_active")
    @Builder.Default
    private boolean active = true;

    @ElementCollection
    @CollectionTable(name = "product_tags", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "tag")
    private List<String> tags;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private NutritionFacts nutritionFacts;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
