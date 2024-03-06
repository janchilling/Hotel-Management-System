package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "RoomType")
public class RoomType {

    @Id
    @Column(name = "room_type_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer roomTypeId;

    private String roomTypeName;

    private String room_dimensions;

    private Double roomTypePrice;

    private Integer noOfRooms;

    private Integer maxAdults;

    @OneToMany(mappedBy = "roomType")
    Set<SeasonRoomType> seasonRoomtype;

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    private Contract contract;
}
