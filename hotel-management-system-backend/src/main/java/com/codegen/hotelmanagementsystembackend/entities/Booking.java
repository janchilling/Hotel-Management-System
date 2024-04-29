package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "Booking")
public class Booking {

    @Id
    @Column(name = "booking_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
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

    private String contactEmail;

    private String contactPhone;

    private String contactFirstName;

    private String contactLastName;

    @ManyToOne
    @JsonBackReference("bookingHotelReference")
    private Hotel hotel;

    @ManyToOne
    @JsonBackReference("bookingContractReference")
    private Contract contract;

    @OneToMany(mappedBy="booking", cascade = CascadeType.ALL)
    @JsonManagedReference("bookingPaymentReference")
    private List<Payment> payments = new ArrayList<>();

    @ManyToOne
    @JsonBackReference("bookingCustomerReference")
    private Customer customer;

    @OneToMany(mappedBy="booking")
    @JsonManagedReference("bookingBookingRoomReference")
    private List<BookingRoom> bookingRooms = new ArrayList<>();

    @OneToMany(mappedBy="booking", cascade = CascadeType.ALL)
    @JsonManagedReference("bookingBookingDiscountReference")
    private List<BookingDiscount> bookingDiscounts = new ArrayList<>();

    @OneToMany(mappedBy="booking")
    @JsonManagedReference("bookingBookingSupplementReference")
    private List<BookingSupplements> bookingSupplements = new ArrayList<>();
}
