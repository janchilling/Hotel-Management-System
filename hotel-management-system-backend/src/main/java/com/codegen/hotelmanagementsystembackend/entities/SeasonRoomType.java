package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;

@Entity
public class SeasonRoomType {

    @EmbeddedId
    SeasonRoomTypeKey id;
    @ManyToOne
    @MapsId("room_type_id")
    @JoinColumn(name = "room_type_id")
    RoomType roomType;

    @ManyToOne
    @MapsId("season_id")
    @JoinColumn(name = "season_id")
    Season season;


    private Double room_price;

    private Integer no_of_rooms;
}
