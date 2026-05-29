package com.smartbasket.api.controller;

import com.smartbasket.api.dto.ProductDTO;
import com.smartbasket.api.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Product REST controller
 */
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.origins}")
public class ProductController {

    private final ProductService productService;

    /**
     * Get all products with filtering and pagination
     * GET /api/products?category=&search=&sort=&page=&size=
     */
    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getProducts(
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String sort,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(required = false) Integer minHealthScore,
        @RequestParam(required = false) Boolean organic,
        @RequestParam(required = false) Boolean vegan,
        @RequestParam(required = false) Boolean onSale,
        Pageable pageable
    ) {
        Page<ProductDTO> products = productService.findProducts(
            category, search, sort, minPrice, maxPrice, minHealthScore, organic, vegan, onSale, pageable
        );
        return ResponseEntity.ok(products);
    }

    /**
     * Get product by ID
     * GET /api/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable UUID id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    /**
     * Get product by barcode (for scanner feature)
     * GET /api/products/barcode/{code}
     */
    @GetMapping("/barcode/{code}")
    public ResponseEntity<ProductDTO> getByBarcode(@PathVariable String code) {
        return ResponseEntity.ok(productService.findByBarcode(code));
    }

    /**
     * Get featured products for dashboard
     * GET /api/products/featured
     */
    @GetMapping("/featured")
    public ResponseEntity<?> getFeatured(@RequestParam(defaultValue = "8") int limit) {
        return ResponseEntity.ok(productService.getFeaturedProducts(limit));
    }

    /**
     * Get AI recommended products for current user
     * GET /api/products/recommended
     */
    @GetMapping("/recommended")
    public ResponseEntity<?> getRecommended(@RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(productService.getRecommendedProducts(limit));
    }

    /**
     * Search products (quick search for typeahead)
     * GET /api/products/search?q=
     */
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String q, @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(productService.quickSearch(q, limit));
    }
}
