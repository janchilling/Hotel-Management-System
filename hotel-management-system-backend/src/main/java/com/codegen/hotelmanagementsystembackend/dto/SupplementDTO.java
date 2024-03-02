package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class SupplementRequest {

    private Integer supplementId;
    private String supplementName;
    private String supplementDescription;
    private String supplementType;
    private Set<SeasonSupplementDTO> supplementsSeasons;
    private ContractRequest contract;
}
