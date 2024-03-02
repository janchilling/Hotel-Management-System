package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class SeasonSupplementDTO {

    private Double supplementPrice;
    private SupplementDTO supplement;
    private SeasonDTO season;

}
