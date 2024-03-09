package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SeasonSupplement {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Integer seasonSupplementId;

    @ManyToOne
//    @MapsId("supplement_id")
    @JoinColumn(name = "supplement_id")
    Supplement supplement;

    @ManyToOne
//    @MapsId("season_id")
    @JoinColumn(name = "season_id")
    Season season;

    private Double supplement_price;


}
