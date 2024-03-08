package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "Season")
public class Season {

    @Id
    @Column(name = "season_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer seasonId;

    private String seasonName;

    private Date startDate;

    private Date endDate;

    @OneToMany(mappedBy = "season")
    @JsonManagedReference
    Set<SeasonSupplement> supplements_seasons;

    @OneToMany(mappedBy = "season")
    @JsonManagedReference
    Set<SeasonRoomType> supplements_roomtypes;

    @OneToMany(mappedBy = "season")
    @JsonManagedReference
    Set<SeasonMarkup> season_markups = new HashSet<>();

    @OneToMany(mappedBy = "season")
    @JsonManagedReference
    Set<SeasonDiscount> season_discounts = new HashSet<>();

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    @JsonBackReference
    private Contract contract;

    @Override
    public String toString() {
        return "Season{" +
                "seasonId=" + seasonId +
                ", seasonName='" + seasonName + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
