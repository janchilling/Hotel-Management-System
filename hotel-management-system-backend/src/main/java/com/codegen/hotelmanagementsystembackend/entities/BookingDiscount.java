package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class BookingDiscount {

    @Id
    @Column(name = "booking_discount_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer bookingDiscountId;

    private String discountName;

    private Double discountedAmount;

    @ManyToOne
    @JsonBackReference("bookingBookingDiscountReference")
    private Booking booking;

    @ManyToOne
    @JsonBackReference("seasonDiscountDicountReference")
    private Discount discount;
}
