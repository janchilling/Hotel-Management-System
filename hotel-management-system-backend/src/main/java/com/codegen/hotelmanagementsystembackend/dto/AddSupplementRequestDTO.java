package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class AddSupplementRequestDTO {

    private Integer seasonId;
    private String supplementName;
    private String supplementDescription;
    private String supplementType;
    private Double supplementPrice;

}
