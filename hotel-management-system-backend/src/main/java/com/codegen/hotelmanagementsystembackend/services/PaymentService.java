package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.PaymentRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.PaymentResponseDTO;

public interface PaymentService {

    PaymentResponseDTO getPaymentById(Integer paymentId);

}
