package com.smartbasket.api.repository;

import com.smartbasket.api.model.Order;
import com.smartbasket.api.model.Order.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

    Optional<Order> findByOrderNumber(String orderNumber);

    Page<Order> findByUserIdOrderByPlacedAtDesc(UUID userId, Pageable pageable);

    List<Order> findByUserIdAndStatus(UUID userId, OrderStatus status);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.placedAt >= :from AND o.placedAt <= :to")
    Optional<BigDecimal> sumRevenueBetween(@Param("from") Instant from, @Param("to") Instant to);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.placedAt >= :from")
    long countOrdersSince(@Param("from") Instant from);

    @Query("SELECT o FROM Order o WHERE o.status = :status AND o.placedAt < :before")
    List<Order> findStaleOrders(@Param("status") OrderStatus status, @Param("before") Instant before);
}
