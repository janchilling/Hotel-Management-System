package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    private String imageIconURL;

    @OneToMany(mappedBy = "supplement", cascade = CascadeType.ALL)
    @JsonManagedReference("seasonSupplementsSupplementReference")
    private List<SeasonSupplement> supplementsSeasons = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="contract_id")
    @JsonBackReference("supplementContractReference")
    private Contract contract;

    @OneToMany(mappedBy="supplement", cascade = CascadeType.ALL)
    @JsonManagedReference("supplementBookingSupplementReference")
    private List<BookingSupplements> supplements = new ArrayList<>();

}
