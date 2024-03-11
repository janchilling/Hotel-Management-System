package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class SeasonRoomTypeResponseDTO {

    private Integer seasonId;
    private String seasonName;
    private Double roomPrice;
    private Integer noOfRooms;

}
