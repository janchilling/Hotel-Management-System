package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class BookingDiscountDTO {

    private Integer bookingDiscountId;
    private String discountName;
    private Double discountedAmount;
    private Integer discountId;
}
