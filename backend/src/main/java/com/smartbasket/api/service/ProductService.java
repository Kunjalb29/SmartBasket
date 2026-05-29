package com.smartbasket.api.service;

import com.smartbasket.api.dto.ProductDTO;
import com.smartbasket.api.model.Product;
import com.smartbasket.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public Page<ProductDTO> findProducts(
        String category, String search, String sort, Double minPrice, Double maxPrice,
        Integer minHealthScore, Boolean organic, Boolean vegan, Boolean onSale, Pageable pageable
    ) {
        // delegates to findFiltered custom JPQL query on repository
        return productRepository.findFiltered(
            category, search, minPrice, maxPrice, minHealthScore, organic, vegan, onSale, pageable
        ).map(this::mapToDTO);
    }

    @Transactional(readOnly = true)
    public ProductDTO findById(UUID id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new com.smartbasket.api.exception.ResourceNotFoundException("Product not found with id: " + id));
        return mapToDTO(p);
    }

    @Transactional(readOnly = true)
    public ProductDTO findByBarcode(String barcode) {
        Product p = productRepository.findByBarcode(barcode)
                .orElseThrow(() -> new com.smartbasket.api.exception.ResourceNotFoundException("Product not found with barcode: " + barcode));
        return mapToDTO(p);
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getFeaturedProducts(int limit) {
        // limit logic or delegate to repository
        return productRepository.findTop8ByActiveTrueAndOnSaleTrueOrderByDiscountPercentageDesc()
                .stream()
                .limit(limit)
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getRecommendedProducts(int limit) {
        return productRepository.findTop10ByActiveTrueOrderByAiScoreDesc()
                .stream()
                .limit(limit)
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> quickSearch(String query, int limit) {
        return productRepository.quickSearch(query, PageRequest.of(0, limit))
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO mapToDTO(Product p) {
        String imgUrl = p.getThumbnail() != null ? p.getThumbnail() : 
                        (p.getImages() != null && !p.getImages().isEmpty() ? p.getImages().get(0) : "");
        
        return ProductDTO.builder()
                .id(p.getId())
                .name(p.getName())
                .brand(p.getBrand())
                .category(p.getCategory() != null ? p.getCategory().getName() : "")
                .price(p.getPrice())
                .imageUrl(imgUrl)
                .healthScore(p.getHealthScore() != null ? p.getHealthScore() : 0)
                .barcode(p.getBarcode())
                .isOrganic(p.isOrganic())
                .allergens(List.of())
                .build();
    }
}

