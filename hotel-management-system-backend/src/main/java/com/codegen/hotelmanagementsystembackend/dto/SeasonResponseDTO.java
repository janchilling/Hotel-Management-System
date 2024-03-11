package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class SeasonResponseDTO {

    private Integer seasonId;
    private String seasonName;
    private Date startDate;
    private Date endDate;
    private Integer contractId;
    private String contractStatus;
    private Integer hotelId;
    private String hotelName;

}
