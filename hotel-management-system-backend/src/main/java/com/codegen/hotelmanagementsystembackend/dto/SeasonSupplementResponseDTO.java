package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class SeasonSupplementResponseDTO {

    private Double supplementPrice;
    private Integer seasonId;
    private String seasonName;
}
