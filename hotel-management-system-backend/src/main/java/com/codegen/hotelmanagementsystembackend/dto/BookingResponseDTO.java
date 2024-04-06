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
    private Double subtotal;
    private Double supplementsTotal;
    private Double discountedAmount;
    private Double tax;
    private Integer noOfAdults;
    private String bookingStatus;
    private String paymentStatus;
    private String hotelName;
    private Integer hotelId;
    private String customerName;
    private Long customerId;
    private String contactEmail;
    private String contactPhone;
    private String contactFirstName;
    private String contactLastName;
    private List<PaymentResponseDTO> payment;
    private List<BookingRoomResponseDTO> rooms;
    private List<BookingDiscountResponseDTO> discounts;
    private List<BookingSupplementResponseDTO> supplements;
}
