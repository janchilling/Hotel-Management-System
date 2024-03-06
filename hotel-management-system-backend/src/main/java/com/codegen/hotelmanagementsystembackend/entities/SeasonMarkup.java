package com.codegen.hotelmanagementsystembackend.entities;

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
    Markup markup;

    @ManyToOne
    @MapsId("seasonId")
    @JoinColumn(name = "season_id")
    Season season;

    private Double markupPercentage;

    @Override
    public int hashCode() {
        return seasonMarkupKey != null ? seasonMarkupKey.hashCode() : 0;
    }
}
