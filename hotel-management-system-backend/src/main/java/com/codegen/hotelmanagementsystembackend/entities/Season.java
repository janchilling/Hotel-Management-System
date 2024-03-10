package com.codegen.hotelmanagementsystembackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "Season")
public class Season {

    @Id
    @Column(name = "season_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer seasonId;

    private String seasonName;

    private Date startDate;

    private Date endDate;

    @OneToMany(mappedBy = "season", cascade = CascadeType.ALL)
    @JsonManagedReference("seasonSupplementsSeasonReference")
    private List<SeasonSupplement> seasonSupplements = new ArrayList<>();

    @OneToMany(mappedBy = "season", cascade = CascadeType.ALL)
    @JsonManagedReference("seasonSeasonRoomtypeReference")
    private List<SeasonRoomType> seasonRoomtypes = new ArrayList<>();

    @OneToMany(mappedBy = "season", cascade = CascadeType.ALL)
    @JsonManagedReference("seasonSeasonMarkupReference")
    private List<SeasonMarkup> seasonMarkups = new ArrayList<>();

    @OneToMany(mappedBy = "season", cascade = CascadeType.ALL)
    @JsonManagedReference("seasonSeasonDiscountReference")
    private List<SeasonDiscount> seasonDiscounts = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    @JsonBackReference("seasonContractReference")
    private Contract contract;

}
