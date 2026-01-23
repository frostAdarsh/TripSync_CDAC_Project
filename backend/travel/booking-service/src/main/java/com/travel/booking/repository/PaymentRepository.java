package com.travel.booking.repository;

import com.travel.booking.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    // Custom method to find payment details for a specific booking
    Optional<Payment> findByBookingId(Long bookingId);
}