package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class SeasonDiscountDTO {

    private Integer seasonId;
    private Date startDate;
    private Date endDate;
    private Double discountPercentage;

}
