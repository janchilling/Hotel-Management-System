package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
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

    private String roomDimensions;

    private Integer maxAdults;

    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL)
    private Set<RoomTypeImages> roomTypeImages = new HashSet<>();

    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL)
    private Set<SeasonRoomType> seasonRoomtype = new HashSet<>();

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    private Contract contract;

    @Override
    public int hashCode() {
        return roomTypeId != null ? roomTypeId.hashCode() : 0;
    }
}
