package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
public class SeasonDiscountKey implements Serializable {

    @Column(name = "season_id")
    Integer seasonId;

    @Column(name = "discount_id")
    Integer discountId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SeasonDiscountKey seasonDiscountKey)) return false;
        return Objects.equals(getSeasonId(), seasonDiscountKey.getSeasonId()) &&
                Objects.equals(getDiscountId(), seasonDiscountKey.getDiscountId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSeasonId(), getDiscountId());
    }
}
