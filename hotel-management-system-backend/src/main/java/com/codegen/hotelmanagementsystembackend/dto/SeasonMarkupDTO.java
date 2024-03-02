package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class SeasonMarkupDTO {

    private Double markupPercentage;
    private MarkupDTO markup;
    private SeasonDTO season;

}
