package com.codegen.hotelmanagementsystembackend.entities;

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
    RoomType roomType;

    @ManyToOne
    @MapsId("seasonId")
    @JoinColumn(name = "season_id")
    Season season;


    private Double roomPrice;

    private Integer noOfRooms;

    @Override
    public int hashCode() {
        return seasonRoomTypeKey != null ? seasonRoomTypeKey.hashCode() : 0;
    }
}
