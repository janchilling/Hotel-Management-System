package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class SupplementDTO {

    private Integer supplementId;
    private String supplementName;
    private String supplementDescription;
    private String supplementType;
    private Set<SeasonSupplementDTO> supplementsSeasons;
    private ContractRequestDTO contract;
}
