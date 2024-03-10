package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class SupplementRequestDTO {

    private Integer supplementId;
    private String supplementName;
    private String supplementDescription;
    private String supplementType;
    private List<SeasonSupplementDTO> supplementsSeasons;
    private Integer contractId;
}
