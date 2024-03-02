package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class SeasonDiscount {

    @EmbeddedId
    SeasonDiscountKey id;

    @ManyToOne
    @MapsId("discount_id")
    @JoinColumn(name = "discount_id")
    Discount discount;

    @ManyToOne
    @MapsId("season_id")
    @JoinColumn(name = "season_id")
    Season season;

    private Date start_date;

    private Date end_date;

    private Double discount_percentage;
}
