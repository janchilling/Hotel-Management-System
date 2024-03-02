package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class MarkupRequest {

    private Integer markupId;
    private Set<SeasonMarkupDTO> seasonMarkups;
    private ContractRequest contract;

}
