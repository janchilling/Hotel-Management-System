package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class BookingRequestDTO {

    private String bookingDate;
    private String checkInDate;
    private String checkOutDate;
    private Double finalBookingPrice;
    private Integer noOfAdults;
    private String bookingStatus;
    private String paymentStatus;
    private Integer hotelHotelId;
    private Long customerCustomerId;
    private PaymentRequestDTO payment;
    private List<BookingRoomDTO> bookingRooms;
    private List<BookingDiscountDTO> bookingDiscounts;
    private List<BookingSupplementDTO> bookingSupplements;

}
