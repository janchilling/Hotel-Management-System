package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class BookingDiscountResponseDTO {

    private Integer bookingDiscountId;
    private String discountName;
    private Double discountedAmount;

}
