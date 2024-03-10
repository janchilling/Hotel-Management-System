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
@Table(name = "Discount")
public class Discount {

    @Id
    @Column(name = "discount_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer discountId;

    private String discountName;

    private String discountDescription;

    @OneToMany(mappedBy = "discount", cascade = CascadeType.ALL)
    @JsonManagedReference("seasonDiscountSeasonReference")
    private List<SeasonDiscount> seasonDiscounts = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    @JsonBackReference("discountContractReference")
    private Contract contract;

    @OneToMany(mappedBy="discount")
    @JsonManagedReference("seasonDiscountDicountReference")
    private List<BookingDiscount> discounts = new ArrayList<>();

    @Override
    public int hashCode() {
        return discountId != null ? discountId.hashCode() : 0;
    }

}
