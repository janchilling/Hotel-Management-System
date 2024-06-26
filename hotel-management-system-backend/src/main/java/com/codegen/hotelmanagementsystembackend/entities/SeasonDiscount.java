package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
public class SeasonDiscount {

    @EmbeddedId
    SeasonDiscountKey seasonDiscountKey;

    @ManyToOne
    @MapsId("discountId")
    @JoinColumn(name = "discount_id")
    @JsonBackReference("seasonDiscountSeasonReference")
    Discount discount;

    @ManyToOne
    @MapsId("seasonId")
    @JoinColumn(name = "season_id")
    @JsonBackReference("seasonSeasonDiscountReference")
    Season season;

    private Double discountPercentage;

    @Override
    public int hashCode() {
        return seasonDiscountKey != null ? seasonDiscountKey.hashCode() : 0;
    }
}
