package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Season")
public class Season {

    @Id
    @Column(name = "season_id")
    private Integer season_id;

    private String season_name;

    private Date start_date;

    private Date end_date;

    @ManyToMany
    @JoinTable(
            name = "season_discount",
            joinColumns = @JoinColumn(name = "season_id"),
            inverseJoinColumns = @JoinColumn(name = "discount_id"))
    private List<Discount> discounts;

    @ManyToMany
    @JoinTable(
            name = "season_supplement",
            joinColumns = @JoinColumn(name = "season_id"),
            inverseJoinColumns = @JoinColumn(name = "supplement_id"))
    private List<Supplement> supplements;

    @ManyToMany
    @JoinTable(
            name = "season_room_type",
            joinColumns = @JoinColumn(name = "season_id"),
            inverseJoinColumns = @JoinColumn(name = "room_type_id"))
    private List<RoomType> roomTypes;

    @ManyToMany
    @JoinTable(
            name = "season_markup",
            joinColumns = @JoinColumn(name = "season_id"),
            inverseJoinColumns = @JoinColumn(name = "markup_id"))
    private List<Markup> markups;
}
