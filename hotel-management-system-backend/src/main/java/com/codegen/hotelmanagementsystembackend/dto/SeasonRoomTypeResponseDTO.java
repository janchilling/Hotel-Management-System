package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class SeasonRoomTypeResponseDTO {

    private Integer seasonId;
    private String seasonName;
    private Double roomPrice;
    private Integer noOfRooms;
    private Date startDate;
    private Date endDate;

}
