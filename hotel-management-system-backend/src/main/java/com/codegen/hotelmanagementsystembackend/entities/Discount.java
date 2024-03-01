package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Discount")
public class Discount {

    @Id
    @Column(name = "discount_id")
    private Integer discount_id;

    private String discount_name;

    private String discount_description;

    private Date start_date;

    private Date end_date;

    private Double discount_percentage;

    @ManyToMany(mappedBy = "discounts")
    private List<Season> season;

}
