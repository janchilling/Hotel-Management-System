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
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer supplementId;

    private String supplementName;

    private String supplementDescription;

    private String supplementType;

    @OneToMany(mappedBy = "supplement")
    Set<SeasonSupplement> supplementsSeasons;

    @ManyToOne
    @JoinColumn(name="contract_id")
    private Contract contract;

    @OneToMany(mappedBy="supplement")
    @JsonManagedReference
    private List<BookingSupplements> supplements = new ArrayList<>();

}
