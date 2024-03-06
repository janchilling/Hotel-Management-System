package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
public class SeasonMarkupKey implements Serializable {
    @Column(name = "season_id")
    Integer seasonId;

    @Column(name = "markup_id")
    Integer markupId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SeasonMarkupKey seasonMarkupKey)) return false;
        return Objects.equals(getSeasonId(), seasonMarkupKey.getSeasonId()) &&
                Objects.equals(getMarkupId(), seasonMarkupKey.getMarkupId());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getSeasonId(), getMarkupId());
    }


}
