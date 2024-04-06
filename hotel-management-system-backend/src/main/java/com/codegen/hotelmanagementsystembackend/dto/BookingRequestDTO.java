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
    private Double subtotal;
    private Double supplementsTotal;
    private Double discountedAmount;
    private Double tax;
    private Integer noOfAdults;
    private String bookingStatus;
    private String paymentStatus;
    private Integer hotelHotelId;
    private Long customerCustomerId;
    private String contactEmail;
    private String contactPhone;
    private String contactFirstName;
    private String contactLastName;
    private PaymentRequestDTO payment;
    private List<BookingRoomDTO> bookingRooms;
    private List<BookingDiscountDTO> bookingDiscounts;
    private List<BookingSupplementDTO> bookingSupplements;

}
