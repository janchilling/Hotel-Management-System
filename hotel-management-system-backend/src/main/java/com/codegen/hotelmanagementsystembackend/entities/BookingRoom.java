package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "BookingRoom")
public class BookingRoom {

    @Id
    @Column(name = "booking_room_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer bookingRoomId;

    private Integer noOfRooms;

    private String roomTypeName;

    private Double bookedPrice;

    @ManyToOne
    @JsonBackReference("bookingBookingRoomReference")
    private Booking booking;

    @ManyToOne
    @JsonBackReference("roomtypeBookingRoomReference")
    private RoomType roomType;


}
