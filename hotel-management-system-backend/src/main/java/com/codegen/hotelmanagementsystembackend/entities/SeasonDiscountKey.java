package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;

import java.io.Serializable;

@Embeddable
public class SeasonDiscountKey implements Serializable {

    @Column(name = "season_id")
    Integer season_id;

    @Column(name = "discount_id")
    Integer discount_id;
}
