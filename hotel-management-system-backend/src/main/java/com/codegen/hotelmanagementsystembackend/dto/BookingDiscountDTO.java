package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class BookingDiscountDTO {

    private String discountCode;
    private Double discountedAmount;
    private Integer discountId;
}
