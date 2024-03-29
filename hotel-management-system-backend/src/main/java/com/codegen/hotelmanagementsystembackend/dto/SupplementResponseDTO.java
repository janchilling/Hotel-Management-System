package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.List;

@Data
public class SupplementResponseDTO {

    private Integer supplementId;
    private String supplementName;
    private String supplementDescription;
    private String imageIconURL;
    private Integer contractId;
    private String contractStatus;
    private Integer hotelId;
    private String hotelName;
    List<SeasonSupplementResponseDTO> seasonSupplements;
}
