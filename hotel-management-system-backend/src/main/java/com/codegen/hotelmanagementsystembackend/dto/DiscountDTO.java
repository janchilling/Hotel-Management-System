package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class DiscountDTO {

    private Integer discountId;
    private String discountName;
    private String discountDescription;
    private Set<SeasonDiscountDTO> seasonDiscounts;
    private ContractDTO contract;

}
