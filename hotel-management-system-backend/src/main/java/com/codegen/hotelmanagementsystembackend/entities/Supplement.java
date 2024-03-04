package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Data
@Entity
@Table(name = "Supplement")
public class Supplement {

    @Id
    @Column(name = "supplement_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer supplement_id;

    private String supplement_name;

    private String supplement_description;

    private String supplement_type;

    @OneToMany(mappedBy = "supplement")
    Set<SeasonSupplement> supplements_seasons;

    @ManyToOne
    @JoinColumn(name="contract_id")
    private Contract contract;
}
