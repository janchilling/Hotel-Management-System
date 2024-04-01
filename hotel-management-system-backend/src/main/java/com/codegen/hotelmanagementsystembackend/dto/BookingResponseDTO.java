package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.List;

@Data
public class BookingResponseDTO {

    private Integer bookingId;
    private String bookingDate;
    private String checkInDate;
    private String checkOutDate;
    private Double finalBookingPrice;
    private Integer noOfAdults;
    private String bookingStatus;
    private String paymentStatus;
    private String hotelName;
    private Integer hotelId;
    private String customerName;
    private Long customerId;

    private List<BookingRoomResponseDTO> rooms;
    private List<BookingDiscountResponseDTO> discounts;
    private List<BookingSupplementResponseDTO> supplements;
}
