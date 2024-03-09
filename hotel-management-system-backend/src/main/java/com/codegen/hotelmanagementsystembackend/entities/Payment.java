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

    @ManyToOne
    @JsonBackReference
    private Booking booking;

    @ManyToOne
    @JsonBackReference
    private Customer customer;
}
