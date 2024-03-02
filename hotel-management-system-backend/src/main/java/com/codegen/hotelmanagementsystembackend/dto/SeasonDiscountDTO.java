package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class SeasonDiscountDTO {

    private Date startDate;
    private Date endDate;
    private Double discountPercentage;
    private DiscountDTO discount;
    private SeasonDTO season;
}
