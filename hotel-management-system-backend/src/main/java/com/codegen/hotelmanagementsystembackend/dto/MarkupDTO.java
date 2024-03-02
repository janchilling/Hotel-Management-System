package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class MarkupDTO {

    private Integer markupId;
    private Set<SeasonMarkupDTO> seasonMarkups;
    private ContractDTO contract;

}
