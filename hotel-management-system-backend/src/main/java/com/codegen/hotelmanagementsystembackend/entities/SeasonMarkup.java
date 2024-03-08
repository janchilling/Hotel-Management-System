package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SeasonMarkup {

    @EmbeddedId
    SeasonMarkupKey seasonMarkupKey;

    @ManyToOne
    @MapsId("markupId")
    @JoinColumn(name = "markup_id")
    @JsonBackReference
    Markup markup;

    @ManyToOne
    @MapsId("seasonId")
    @JoinColumn(name = "season_id")
    @JsonBackReference
    Season season;

    private Double markupPercentage;

    @Override
    public int hashCode() {
        return seasonMarkupKey != null ? seasonMarkupKey.hashCode() : 0;
    }
}
