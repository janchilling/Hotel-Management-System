package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "RoomType")
public class RoomType {

    @Id
    @Column(name = "room_type_id")
    private Integer room_type_id;

    private String room_type_name;

    private String room_dimensions;

    private Double room_type_price;

    private Integer no_of_rooms;

    private Integer max_adults;

    @ManyToMany(mappedBy = "roomTypes")
    private List<Season> season;
}
