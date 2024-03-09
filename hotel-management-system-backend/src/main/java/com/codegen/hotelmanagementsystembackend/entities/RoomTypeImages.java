package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "RoomTypeImages")
public class RoomTypeImages {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer roomTypeImageId;

    @ManyToOne
//    @MapsId("roomTypeId")
//    @JoinColumn(name = "room_type_id")
    @JsonBackReference
    private RoomType roomType;

    private String ImageURL;

    @Override
    public int hashCode() {
        return roomTypeImageId != null ? roomTypeImageId.hashCode() : 0;
    }
}
