package com.codegen.hotelmanagementsystembackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "Discount")
public class Discount {

    @Id
    @Column(name = "discount_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer discountId;

    private String discountName;

    private String discountDescription;

    @OneToMany(mappedBy = "discount", cascade = CascadeType.ALL)
    Set<SeasonDiscount> seasonDiscounts = new HashSet<>();

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    private Contract contract;

    @Override
    public int hashCode() {
        return discountId != null ? discountId.hashCode() : 0;
    }

}
