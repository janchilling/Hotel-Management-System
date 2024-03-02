package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;

@Entity
public class SeasonMarkup {

    @EmbeddedId
    SeasonMarkupKey id;

    @ManyToOne
    @MapsId("markup_id")
    @JoinColumn(name = "markup_id")
    Markup markup;

    @ManyToOne
    @MapsId("season_id")
    @JoinColumn(name = "season_id")
    Season season;

    private Double markup_percentage;
}
