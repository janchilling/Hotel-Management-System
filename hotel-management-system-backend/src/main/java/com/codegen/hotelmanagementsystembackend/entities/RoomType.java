package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "RoomType")
public class RoomType {

    @Id
    @Column(name = "room_type_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer room_type_id;

    private String room_type_name;

    private String room_dimensions;

    private Double room_type_price;

    private Integer no_of_rooms;

    private Integer max_adults;

    @OneToMany(mappedBy = "roomType")
    Set<SeasonRoomType> season_roomtype;

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    private Contract contract;
}
