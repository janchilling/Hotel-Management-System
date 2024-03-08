package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    // Add services beds

    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<RoomTypeImages> roomTypeImages = new HashSet<>();

    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<SeasonRoomType> seasonRoomtype = new HashSet<>();

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    @JsonBackReference
    private Contract contract;

    @OneToMany(mappedBy="roomType")
    @JsonManagedReference
    private List<BookingRoom> rooms = new ArrayList<>();

    @Override
    public int hashCode() {
        return roomTypeId != null ? roomTypeId.hashCode() : 0;
    }
}
