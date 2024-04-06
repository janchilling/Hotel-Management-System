package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Customer")
public class Customer {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private String customerFname;

    private String customerLname;

    private String customerStreetAddress;

    private String customerCity;

    private String customerState;

    private String customerPostalCode;

    private String customerCountry;

    @OneToMany(mappedBy="customer")
    @JsonManagedReference("customerPaymentReference")
    private List<Payment> payments;

    @OneToMany(mappedBy="customer")
    @JsonManagedReference("bookingCustomerReference")
    private List<Booking> bookings;
}
