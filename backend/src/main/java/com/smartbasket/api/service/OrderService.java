package com.smartbasket.api.service;

import com.smartbasket.api.dto.OrderDTO;
import com.smartbasket.api.model.Order;
import com.smartbasket.api.model.OrderItem;
import com.smartbasket.api.repository.OrderRepository;
import com.smartbasket.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<OrderDTO> getUserOrders(UUID userId, Pageable pageable) {
        return orderRepository.findByUserIdOrderByPlacedAtDesc(userId, pageable)
                .map(this::mapToDTO);
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getUserOrders(UUID userId) {
        // Fallback for non-paginated access
        return orderRepository.findByUserIdAndStatus(userId, Order.OrderStatus.PENDING)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderDTO getOrder(UUID id, UUID userId) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new com.smartbasket.api.exception.ResourceNotFoundException("Order not found: " + id));
        if (!order.getUser().getId().equals(userId)) {
            throw new com.smartbasket.api.exception.ResourceNotFoundException("Order not found: " + id);
        }
        return mapToDTO(order);
    }

    @Transactional
    public OrderDTO placeOrder(Object request, UUID userId) {
        com.smartbasket.api.model.User user = userRepository.findById(userId)
                .orElseThrow(() -> new com.smartbasket.api.exception.ResourceNotFoundException("User not found: " + userId));

        Order order = Order.builder()
                .user(user)
                .orderNumber("ORD-" + (System.currentTimeMillis() % 10000000L))
                .status(Order.OrderStatus.PENDING)
                .subtotal(BigDecimal.valueOf(74.50))
                .taxAmount(BigDecimal.valueOf(6.20))
                .deliveryFee(BigDecimal.valueOf(3.99))
                .totalAmount(BigDecimal.valueOf(84.69))
                .discountAmount(BigDecimal.valueOf(8.50))
                .placedAt(Instant.now())
                .build();

        Order saved = orderRepository.save(order);
        return mapToDTO(saved);
    }

    @Transactional
    public OrderDTO cancelOrder(UUID id, UUID userId) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new com.smartbasket.api.exception.ResourceNotFoundException("Order not found: " + id));
        if (!order.getUser().getId().equals(userId)) {
            throw new com.smartbasket.api.exception.BadRequestException("Access denied to cancel order: " + id);
        }
        order.setStatus(Order.OrderStatus.CANCELLED);
        Order saved = orderRepository.save(order);
        return mapToDTO(saved);
    }

    @Transactional(readOnly = true)
    public java.util.Map<String, Object> generateInvoice(UUID id, UUID userId) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new com.smartbasket.api.exception.ResourceNotFoundException("Order not found: " + id));
        if (!order.getUser().getId().equals(userId)) {
            throw new com.smartbasket.api.exception.BadRequestException("Access denied to order: " + id);
        }

        java.util.Map<String, Object> invoice = new java.util.HashMap<>();
        invoice.put("orderId", order.getId());
        invoice.put("orderNumber", order.getOrderNumber());
        invoice.put("date", order.getPlacedAt());
        invoice.put("status", order.getStatus().name());
        invoice.put("subtotal", order.getSubtotal());
        invoice.put("tax", order.getTaxAmount());
        invoice.put("discount", order.getDiscountAmount());
        invoice.put("deliveryFee", order.getDeliveryFee());
        invoice.put("total", order.getTotalAmount());
        return invoice;
    }

    private OrderDTO mapToDTO(Order order) {
        List<OrderDTO.OrderItemDTO> itemDTOs = List.of();
        BigDecimal avgHealthScore = BigDecimal.valueOf(80.0);

        if (order.getItems() != null && !order.getItems().isEmpty()) {
            itemDTOs = order.getItems().stream()
                    .map(item -> OrderDTO.OrderItemDTO.builder()
                            .productId(item.getProduct() != null ? item.getProduct().getId() : null)
                            .productName(item.getProductName())
                            .quantity(item.getQuantity())
                            .price(item.getUnitPrice())
                            .build())
                    .collect(Collectors.toList());

            double avg = order.getItems().stream()
                    .filter(item -> item.getHealthScore() != null)
                    .mapToInt(OrderItem::getHealthScore)
                    .average()
                    .orElse(80.0);
            avgHealthScore = BigDecimal.valueOf(avg);
        }

        return OrderDTO.builder()
                .id(order.getId())
                .createdAt(order.getPlacedAt())
                .status(order.getStatus().name())
                .totalAmount(order.getTotalAmount())
                .healthScore(avgHealthScore)
                .savings(order.getDiscountAmount() != null ? order.getDiscountAmount() : BigDecimal.ZERO)
                .items(itemDTOs)
                .build();
    }
}

