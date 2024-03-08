package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SeasonRoomType {

    @EmbeddedId
    SeasonRoomTypeKey seasonRoomTypeKey;

    @ManyToOne
    @MapsId("roomTypeId")
    @JoinColumn(name = "room_type_id")
    @JsonBackReference
    RoomType roomType;

    @ManyToOne
    @MapsId("seasonId")
    @JoinColumn(name = "season_id")
    @JsonBackReference
    Season season;


    private Double roomPrice;

    private Integer noOfRooms;

    @Override
    public int hashCode() {
        return seasonRoomTypeKey != null ? seasonRoomTypeKey.hashCode() : 0;
    }
}
