package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class PaymentRequestDTO {

    private String paymentDate;

    private Double paymentAmount;

    private String paymentType;
}
