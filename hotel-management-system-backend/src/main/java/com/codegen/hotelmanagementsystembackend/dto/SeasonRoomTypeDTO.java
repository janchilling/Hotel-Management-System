package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class SeasonRoomTypeDTO {

    private Double roomPrice;
    private Integer numberOfRooms;
    private RoomTypeDTO roomType;
    private SeasonDTO season;

}
