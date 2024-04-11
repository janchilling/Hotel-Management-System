package com.codegen.hotelmanagementsystembackend.dto;

import com.codegen.hotelmanagementsystembackend.entities.BookingDiscount;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class DiscountRequestDTO {

    private Integer discountId;
    private String discountName;
    private String discountCode;
    private String discountDescription;
    private List<SeasonDiscountDTO> seasonDiscounts = new ArrayList<>();
    private Integer contractId;

}
