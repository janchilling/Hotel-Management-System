package com.codegen.hotelmanagementsystembackend.entities;

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
    Discount discount;

    @ManyToOne
    @MapsId("seasonId")
    @JoinColumn(name = "season_id")
    Season season;

    private Date startDate;

    private Date endDate;

    private Double discountPercentage;

    @Override
    public int hashCode() {
        return seasonDiscountKey != null ? seasonDiscountKey.hashCode() : 0;
    }
}
