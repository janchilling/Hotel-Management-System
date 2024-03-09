package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Booking {

    @Id
    @Column(name = "booking_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer bookingId;

    private String bookingDate;

    private String checkInDate;

    private String checkOutDate;

    private Double finalBookingPrice;

    private Integer noOfAdults;

    private Integer noOfChildren;

    private String bookingStatus;

    private String paymentStatus;

    @ManyToOne
    @JsonBackReference
    private Hotel hotel;

    @OneToMany(mappedBy="booking", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Payment> payments = new ArrayList<>();

    @ManyToOne
    @JsonBackReference
    private Customer customer;

    @OneToMany(mappedBy="booking", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<BookingRoom> rooms = new ArrayList<>();

    @OneToMany(mappedBy="booking", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<BookingDiscount> discounts = new ArrayList<>();

    @OneToMany(mappedBy="booking", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<BookingSupplements> supplements = new ArrayList<>();


}
