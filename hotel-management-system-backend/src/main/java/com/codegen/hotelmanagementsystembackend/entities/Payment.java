package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Payment {

    @Id
    @Column(name = "payment_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer paymentId;

    private String paymentDate;

    private Double paymentAmount;

    private String paymentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference("bookingPaymentReference")
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference("customerPaymentReference")
    private Customer customer;
}
