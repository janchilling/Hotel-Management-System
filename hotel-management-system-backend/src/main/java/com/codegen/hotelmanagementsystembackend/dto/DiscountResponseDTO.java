package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.List;

@Data
public class DiscountResponseDTO {

    private Integer discountId;
    private String discountName;
    private String discountDescription;
    private Integer contractId;
    private String contractStatus;
    private Integer hotelId;
    private String hotelName;
    private List<SeasonDiscountResponseDTO> seasonDiscounts;
}
