package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class BookingRoomResponseDTO {

    private Integer bookingRoomId;
    private Integer noOfRooms;
    private Integer roomTypeId;
    private String roomTypeName;
    private Double bookedPrice;
    private Date checkInDate;
    private Date checkOutDate;
    private String imageURL;

}
