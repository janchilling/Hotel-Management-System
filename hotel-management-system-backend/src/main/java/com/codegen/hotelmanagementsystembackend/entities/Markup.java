package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "Markup")
public class Markup {

    @Id
    @Column(name = "markup_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer markup_id;

    @OneToMany(mappedBy = "markup")
    Set<SeasonMarkup> season_markups;

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    private Contract contract;
}
