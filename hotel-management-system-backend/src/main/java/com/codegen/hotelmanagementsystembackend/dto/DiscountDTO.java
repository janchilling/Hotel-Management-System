package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class DiscountRequest {

    private Integer discountId;
    private String discountName;
    private String discountDescription;
    private Set<SeasonDiscountDTO> seasonDiscounts;
    private ContractRequest contract;

}
