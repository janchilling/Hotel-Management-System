package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class SeasonSupplementKey implements Serializable {

    @Column(name = "season_id")
    Integer season_id;

    @Column(name = "supplement_id")
    Integer supplement_id;
}
