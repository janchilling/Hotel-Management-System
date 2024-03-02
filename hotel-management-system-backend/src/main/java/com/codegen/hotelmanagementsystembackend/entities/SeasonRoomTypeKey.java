package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class SeasonRoomTypeKey implements Serializable {

    @Column(name = "season_id")
    Integer season_id;

    @Column(name = "room_type_id")
    Integer room_type_id;
}
