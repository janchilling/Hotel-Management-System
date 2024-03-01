package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Supplement")
public class Supplement {

    @Id
    @Column(name = "supplement_id")
    private Integer supplement_id;

    private String supplement_name;

    private String supplement_description;

    private String supplement_type;

    private Double supplement_percentage;

    @ManyToMany(mappedBy = "supplements")
    private List<Season> season;
}
