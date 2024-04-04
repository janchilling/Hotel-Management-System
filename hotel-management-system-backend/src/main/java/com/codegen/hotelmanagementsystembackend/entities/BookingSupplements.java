package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "BookingSupplements")
public class BookingSupplements {

    @Id
    @Column(name = "booking_supplement_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer bookingSupplementId;

    private Long supplementPrice;

    private String supplementName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference("bookingBookingSupplementReference")
    private Booking booking;

    @ManyToOne
    @JsonBackReference("supplementBookingSupplementReference")
    private Supplement supplement;
}
