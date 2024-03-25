package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "Hotel")
public class Hotel {

    @Id
    @Column(name = "hotel_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer hotelId;

    private String hotelName;

    private String hotelDescription;

    private Integer hotelRating;

    private String hotelBriefDescription;

    private String hotelEmail;

    private String hotelStreetAddress;

    private String hotelCity;

    private String hotelState;

    private String hotelCountry;

    private Integer hotelPostalCode;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    @JsonManagedReference("hotelImageHoteltReference")
    private List<HotelImage> hotelImages = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    @JsonManagedReference("hotelPhoneHoteltReference")
    private List<HotelPhone> hotelPhones = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    @JsonManagedReference("contractHoteltReference")
    private List<Contract> contracts = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    @JsonManagedReference("bookingHotelReference")
    private List<Booking> bookings = new ArrayList<>();

}
