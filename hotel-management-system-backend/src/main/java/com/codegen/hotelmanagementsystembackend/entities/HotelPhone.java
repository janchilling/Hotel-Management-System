package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "HotelPhone")
public class HotelPhone {

    @Id
    @Column(name = "hotel_phone_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer hotelPhoneId;

    private Long hotelPhone;

    @ManyToOne
    @JsonBackReference
    private Hotel hotel;

}
