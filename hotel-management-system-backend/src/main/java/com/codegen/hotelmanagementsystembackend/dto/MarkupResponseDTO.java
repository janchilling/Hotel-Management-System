package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class MarkupResponseDTO {

    private Integer markupId;
    private List<SeasonMarkupResponseDTO> seasonMarkups = new ArrayList<>();
    private Integer contractId;
    private String contractStatus;
    private Integer hotelId;
    private String hotelName;
}
