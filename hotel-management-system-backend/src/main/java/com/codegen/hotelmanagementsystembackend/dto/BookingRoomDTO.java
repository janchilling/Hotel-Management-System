package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class BookingRoomDTO {

    private Integer noOfRooms;

    private String roomTypeName;

    private Double bookedPrice;

    private Integer roomTypeId;
}
