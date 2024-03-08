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
    private Long user_id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private String customer_fname;

    private String customer_lname;

    private String customer_street_address;

    private String customer_city;

    private String customer_state;

    private String customer_postal_code;

    private String customer_country;

    @OneToMany(mappedBy="customer")
    @JsonManagedReference
    private List<Payment> payments;

    @OneToMany(mappedBy="customer")
    @JsonManagedReference
    private List<Booking> bookings;
}
