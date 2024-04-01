package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class BookingRequestDTO {

    private Integer bookingId;
    private String bookingDate;
    private String checkInDate;
    private String checkOutDate;
    private Double finalBookingPrice;
    private Integer noOfAdults;
    private String bookingStatus;
    private String paymentStatus;
    private Integer hotelId;
    private Long customerId;
    private Integer paymentId;
    private PaymentRequestDTO payment;
    private Set<BookingRoomDTO> bookingRooms = new HashSet<>();
    private Set<BookingDiscountDTO> bookingDiscounts = new HashSet<>();
    private Set<BookingSupplementDTO> bookingSupplements = new HashSet<>();

}
