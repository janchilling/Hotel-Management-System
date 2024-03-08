package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "Contract")
public class Contract {

    @Id
    @Column(name = "contract_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer contract_id;

    private Date start_date;

    private Date end_date;

    private String contract_status;

    private String cancellation_deadline;

    private Double cancellation_amount;

    private String prepayment;

    private String balance_payment;

    @OneToMany(mappedBy="contract")
    @JsonManagedReference
    private List<Discount> discounts;

    @OneToMany(mappedBy="contract")
    @JsonManagedReference
    private List<Season> seasons;

    @OneToMany(mappedBy="contract")
    @JsonManagedReference
    private List<RoomType> roomTypes;

    @OneToMany(mappedBy="contract")
    @JsonManagedReference
    private List<Markup> markups;

    @ManyToOne
    @JsonBackReference
    private Hotel hotel;

    @Override
    public String toString() {
        return "Contract{" +
                "contractId=" + contract_id +
                ", startDate=" + start_date +
                ", endDate=" + end_date +
                ", contractStatus='" + contract_status + '\'' +
                '}';
    }

}
