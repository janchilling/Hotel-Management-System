package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.Set;

@Data
@Entity
@Table(name = "Season")
public class Season {

    @Id
    @Column(name = "season_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer season_id;

    private String season_name;

    private Date start_date;

    private Date end_date;

    @OneToMany(mappedBy = "season")
    Set<SeasonSupplement> supplements_seasons;

    @OneToMany(mappedBy = "season")
    Set<SeasonRoomType> supplements_roomtypes;

    @OneToMany(mappedBy = "season")
    Set<SeasonMarkup> season_markups;

    @OneToMany(mappedBy = "season")
    Set<SeasonDiscount> season_discounts;

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    private Contract contract;
}
