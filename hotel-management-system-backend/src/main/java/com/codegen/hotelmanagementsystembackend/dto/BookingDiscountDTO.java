package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class BookingDiscountDTO {

    private String discountName;

    private Double discountedAmount;

    private Integer discountId;
}
