package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class BookingDiscount {

    @Id
    @Column(name = "booking_discount_id")
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer bookingDiscountId;

    private String discountName;

    private Double discountedAmount;

    @ManyToOne
    @JsonBackReference
    private Booking booking;

    @ManyToOne
    @JsonBackReference
    private Discount discount;
}
