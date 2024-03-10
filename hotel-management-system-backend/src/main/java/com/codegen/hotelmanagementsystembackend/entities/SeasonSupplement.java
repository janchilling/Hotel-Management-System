package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SeasonSupplement {

    @EmbeddedId
    SeasonSupplementKey seasonSupplementKey;

    @ManyToOne
    @MapsId("supplementId")
    @JoinColumn(name = "supplement_id")
    @JsonBackReference("seasonSupplementsSupplementReference")
    Supplement supplement;

    @ManyToOne
    @MapsId("seasonId")
    @JoinColumn(name = "season_id")
    @JsonBackReference("seasonSupplementsSeasonReference")
    Season season;

    private Double supplementPrice;


}
