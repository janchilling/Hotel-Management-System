package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "RoomTypeImages")
public class RoomTypeImages {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer roomTypeImageId;

    @ManyToOne
//    @MapsId("roomTypeId")
//    @JoinColumn(name = "room_type_id")
    private RoomType roomType;

    private String ImageURL;

    @Override
    public int hashCode() {
        return roomTypeImageId != null ? roomTypeImageId.hashCode() : 0;
    }
}
