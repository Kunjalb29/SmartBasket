package com.smartbasket.api.controller;

import com.smartbasket.api.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Order management REST controller
 */
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.origins}")
public class OrderController {

    private final OrderService orderService;

    /** GET /api/orders — current user's orders */
    @GetMapping
    public ResponseEntity<?> getMyOrders(
        @AuthenticationPrincipal String userId,
        Pageable pageable
    ) {
        return ResponseEntity.ok(orderService.getUserOrders(UUID.fromString(userId), pageable));
    }

    /** GET /api/orders/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@PathVariable UUID id, @AuthenticationPrincipal String userId) {
        return ResponseEntity.ok(orderService.getOrder(id, UUID.fromString(userId)));
    }

    /** POST /api/orders — place new order */
    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody Object request, @AuthenticationPrincipal String userId) {
        return ResponseEntity.ok(orderService.placeOrder(request, UUID.fromString(userId)));
    }

    /** POST /api/orders/{id}/cancel */
    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable UUID id, @AuthenticationPrincipal String userId) {
        return ResponseEntity.ok(orderService.cancelOrder(id, UUID.fromString(userId)));
    }

    /** GET /api/orders/{id}/invoice */
    @GetMapping("/{id}/invoice")
    public ResponseEntity<?> getInvoice(@PathVariable UUID id, @AuthenticationPrincipal String userId) {
        return ResponseEntity.ok(orderService.generateInvoice(id, UUID.fromString(userId)));
    }
}
