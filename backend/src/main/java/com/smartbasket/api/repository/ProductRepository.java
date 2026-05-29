package com.smartbasket.api.repository;

import com.smartbasket.api.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    Optional<Product> findByBarcode(String barcode);
    Optional<Product> findBySku(String sku);

    @Query("""
        SELECT p FROM Product p
        WHERE p.active = true
        AND (:category IS NULL OR p.category.slug = :category)
        AND (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
             OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :search, '%')))
        AND (:minPrice IS NULL OR p.price >= :minPrice)
        AND (:maxPrice IS NULL OR p.price <= :maxPrice)
        AND (:minHealthScore IS NULL OR p.healthScore >= :minHealthScore)
        AND (:organic IS NULL OR p.organic = :organic)
        AND (:vegan IS NULL OR p.vegan = :vegan)
        AND (:onSale IS NULL OR p.onSale = :onSale)
    """)
    Page<Product> findFiltered(
        @Param("category") String category,
        @Param("search") String search,
        @Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice,
        @Param("minHealthScore") Integer minHealthScore,
        @Param("organic") Boolean organic,
        @Param("vegan") Boolean vegan,
        @Param("onSale") Boolean onSale,
        Pageable pageable
    );

    List<Product> findTop10ByActiveTrueOrderByAiScoreDesc();
    List<Product> findTop8ByActiveTrueAndOnSaleTrueOrderByDiscountPercentageDesc();

    @Query("SELECT p FROM Product p WHERE p.active = true AND LOWER(p.name) LIKE LOWER(CONCAT('%', :q, '%')) ORDER BY p.aiScore DESC")
    List<Product> quickSearch(@Param("q") String query, Pageable pageable);
}
