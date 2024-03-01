package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.sql.Date;

@Data
@Entity
@Table(name = "Contract")
public class Contract {

    @Id
    @Column(name = "contract_id")
    private Integer contract_id;

    private Date start_date;

    private Date end_date;

    private String contract_status;

    private String cancellation_deadline;

    private Double cancellation_amount;

    private String prepayment;

    private String balance_payment;

}
