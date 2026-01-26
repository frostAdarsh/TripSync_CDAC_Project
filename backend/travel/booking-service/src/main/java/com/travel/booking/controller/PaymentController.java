package com.travel.booking.controller;

import com.travel.booking.entity.Payment;
import com.travel.booking.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    private final PaymentService service;

    /**
     * Process a payment for a specific booking.
     * URL: POST http://localhost:8083/api/payments
     * Body: { "booking": { "id": 10 }, "amount": 1200.50, "paymentMethod": "CREDIT_CARD" }
     */
    @PostMapping
    public ResponseEntity<Payment> processPayment(@RequestBody Payment payment) {
        return ResponseEntity.ok(service.processPayment(payment));
    }

    /**
     * Get payment details by ID.
     * URL: GET http://localhost:8083/api/payments/5
     */
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getPaymentById(id));
    }

    /**
     * Get payment details for a specific Booking ID.
     * URL: GET http://localhost:8083/api/payments/booking/10
     */
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<Payment> getPaymentByBookingId(@PathVariable Long bookingId) {
        return ResponseEntity.ok(service.getPaymentByBookingId(bookingId));
    }
}