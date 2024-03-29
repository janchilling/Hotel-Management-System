package com.codegen.hotelmanagementsystembackend.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "HotelImage")
public class HotelImage {

    @Id
    @Column(name = "hotel_image_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer hotelImageId;

    @Column(length = 1000)
    private String hotelImageURL;

    @ManyToOne
    @JsonBackReference("hotelImageHoteltReference")
    private Hotel hotel;
}
