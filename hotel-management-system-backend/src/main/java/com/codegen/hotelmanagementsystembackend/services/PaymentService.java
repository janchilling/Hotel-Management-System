package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.PaymentRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.PaymentResponseDTO;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

public interface PaymentService {


    PaymentResponseDTO getPaymentById(Integer paymentId);

}
