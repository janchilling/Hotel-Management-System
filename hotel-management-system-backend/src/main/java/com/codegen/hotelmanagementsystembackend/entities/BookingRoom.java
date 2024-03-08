package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class BookingRoom {

    @Id
    @Column(name = "booking_room_id")
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer bookingRoomId;

    private Integer noOfRooms;

    private String roomTypeName;

    private Double bookedPrice;

    @ManyToOne
    @JsonBackReference
    private Booking booking;

    @ManyToOne
    @JsonBackReference
    private RoomType roomType;


}
