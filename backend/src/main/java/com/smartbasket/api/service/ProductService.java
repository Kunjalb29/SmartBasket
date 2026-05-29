package com.smartbasket.api.service;

import com.smartbasket.api.dto.ProductDTO;
import com.smartbasket.api.model.Product;
import com.smartbasket.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public Page<ProductDTO> getProducts(String query, String category, Pageable pageable) {
        return productRepository.searchProducts(query, category, pageable)
                .map(this::mapToDTO);
    }

    public ProductDTO getProductById(UUID id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        return mapToDTO(p);
    }

    private ProductDTO mapToDTO(Product p) {
        return ProductDTO.builder()
                .id(p.getId())
                .name(p.getName())
                .brand(p.getBrand())
                .category(p.getCategory())
                .price(p.getPrice())
                .imageUrl(p.getImageUrl())
                .healthScore(p.getHealthScore())
                .barcode(p.getBarcode())
                .isOrganic(p.isOrganic())
                .build();
    }
}\n