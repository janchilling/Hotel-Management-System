package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class BookingRoomDTO {

    private Integer noOfRooms;
    private String roomTypeName;
    private Double bookedPrice;
    private Integer roomTypeId;
    private Date checkInDate;
    private Date checkOutDate;
}
