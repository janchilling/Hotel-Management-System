package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class SeasonMarkupKey implements Serializable {
    @Column(name = "season_id")
    Integer season_id;

    @Column(name = "markup_id")
    Integer markup_id;

}
