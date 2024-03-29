package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.List;

@Data
public class SupplementRequestDTO {

    private Integer supplementId;
    private String supplementName;
    private String supplementDescription;
    private String imageIconURL;
    private List<SeasonSupplementDTO> seasonSupplements;
    private Integer contractId;
}
