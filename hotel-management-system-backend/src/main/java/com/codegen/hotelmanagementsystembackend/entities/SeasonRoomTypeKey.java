package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class SeasonRoomTypeKey implements Serializable {

    @Column(name = "season_id")
    Integer seasonId;

    @Column(name = "room_type_id")
    Integer roomTypeId;
}
