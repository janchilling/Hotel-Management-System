package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class PaymentResponseDTO {

    private Integer paymentId;
    private String paymentDate;
    private Double paymentAmount;
    private String paymentType;
    private Integer bookingId;
    private Long customerId;
}
