package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class BookingClashResponseDTO {

    private Boolean isClash;
    private String hotelName;
    private String checkIn;
    private String checkOut;
    private Integer bookingId;
}
