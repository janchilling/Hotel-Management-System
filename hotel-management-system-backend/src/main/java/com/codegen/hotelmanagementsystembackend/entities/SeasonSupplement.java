package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;

@Entity
public class SeasonSupplement {

    @EmbeddedId
    SeasonSupplementKey id;

    @ManyToOne
    @MapsId("supplement_id")
    @JoinColumn(name = "supplement_id")
    Supplement supplement;

    @ManyToOne
    @MapsId("season_id")
    @JoinColumn(name = "season_id")
    Season season;

    private Double supplement_price;


}
