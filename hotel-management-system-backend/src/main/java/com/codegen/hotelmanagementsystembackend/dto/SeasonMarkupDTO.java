package com.codegen.hotelmanagementsystembackend.dto;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class SeasonMarkupDTO {

    private Integer seasonId;
    private Double markupPercentage;
}
