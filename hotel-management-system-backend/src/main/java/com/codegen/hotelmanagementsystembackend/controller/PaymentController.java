package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.PaymentResponseDTO;
import com.codegen.hotelmanagementsystembackend.services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping("/getPaymentById/{paymentId}")
    public ResponseEntity<PaymentResponseDTO> getPaymentById(@PathVariable Integer paymentId) {
        return ResponseEntity.ok(paymentService.getPaymentById(paymentId));
    }
}
