package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class SeasonSupplementResponseDTO {

    private Double supplementPrice;
    private Integer seasonId;
    private String seasonName;
    private Date startDate;
    private Date endDate;
}
