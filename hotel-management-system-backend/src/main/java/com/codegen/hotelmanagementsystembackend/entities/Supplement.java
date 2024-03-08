package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "Supplement")
public class Supplement {

    @Id
    @Column(name = "supplement_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer supplement_id;

    private String supplementName;

    private String supplement_description;

    private String supplement_type;

    @OneToMany(mappedBy = "supplement")
    Set<SeasonSupplement> supplements_seasons;

    @ManyToOne
    @JoinColumn(name="contract_id")
    private Contract contract;

    @OneToMany(mappedBy="supplement")
    @JsonManagedReference
    private List<BookingSupplements> supplements = new ArrayList<>();

}
