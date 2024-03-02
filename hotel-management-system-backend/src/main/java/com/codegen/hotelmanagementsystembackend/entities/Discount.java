package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "Discount")
public class Discount {

    @Id
    @Column(name = "discount_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer discount_id;

    private String discount_name;

    private String discount_description;

    @OneToMany(mappedBy = "discount")
    Set<SeasonDiscount> season_discounts;

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    private Contract contract;

}
