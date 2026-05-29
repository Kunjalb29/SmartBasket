package com.smartbasket.api.service;

import com.smartbasket.api.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BarcodeService {
    private final ProductService productService;

    public ProductDTO scanBarcode(String barcode) {
        // Simulates mapping an standard UPC/EAN code from camera scanner to repository models
        if ("012000000133".equals(barcode)) {
            // Demo product mapping
            return ProductDTO.builder()
                    .name("Organic Almond Milk")
                    .brand("SmartChoice")
                    .category("Dairy & Alternatives")
                    .healthScore(92)
                    .barcode(barcode)
                    .build();
        }
        throw new RuntimeException("UPC Barcode not recognized: " + barcode);
    }
}\n