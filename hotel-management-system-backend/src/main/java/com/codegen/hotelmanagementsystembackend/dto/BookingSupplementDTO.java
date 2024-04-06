package com.codegen.hotelmanagementsystembackend.dto;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;

@Data
public class BookingSupplementDTO {

    private Long supplementPrice;
    private String supplementName;
    private Integer supplementId;
    private Integer roomTypeId;
    private Integer noOfRooms;
}
