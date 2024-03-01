package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Markup")
public class Markup {

    @Id
    @Column(name = "markup_id")
    private Integer markup_id;

    private Double markup_percentage;

    @ManyToMany(mappedBy = "markups")
    private List<Season> seasons;
}
