package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "Markup")
public class Markup {

    @Id
    @Column(name = "markup_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer markupId;

    @OneToMany(mappedBy = "markup", cascade = CascadeType.ALL)
    @JsonManagedReference
    Set<SeasonMarkup> seasonMarkups = new HashSet<>();

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    @JsonBackReference
    private Contract contract;

    @Override
    public int hashCode() {
        return markupId != null ? markupId.hashCode() : 0;
    }
}
