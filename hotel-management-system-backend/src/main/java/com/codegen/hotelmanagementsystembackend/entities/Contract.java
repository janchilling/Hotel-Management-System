package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Contract")
public class Contract {

    @Id
    @Column(name = "contract_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer contractId;

    private Date startDate;

    private Date endDate;

    private String contractStatus;

    private Integer cancellationDeadline;

    private Integer cancellationAmount;

    private Integer prepayment;

    private Integer balancePayment;

    @OneToMany(mappedBy="contract")
    @JsonManagedReference("discountContractReference")
    private List<Discount> discounts = new ArrayList<>();

    @OneToMany(mappedBy="contract")
    @JsonManagedReference("seasonContractReference")
    private List<Season> seasons;

    @OneToMany(mappedBy="contract")
    @JsonManagedReference("roomTypeContractReference")
    private List<RoomType> roomTypes;

    @OneToMany(mappedBy="contract")
    @JsonManagedReference("markupContractReference")
    private List<Markup> markups;

    @OneToMany(mappedBy="contract")
    @JsonManagedReference("supplementContractReference")
    private List<Supplement> supplements;

    @OneToMany(mappedBy = "contract", cascade = CascadeType.ALL)
    @JsonManagedReference("bookingContractReference")
    private List<Booking> bookings = new ArrayList<>();

    @ManyToOne
    @JsonBackReference("contractHoteltReference")
    private Hotel hotel;

}
