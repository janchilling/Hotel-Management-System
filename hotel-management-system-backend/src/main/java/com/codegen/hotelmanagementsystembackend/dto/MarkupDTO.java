package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class MarkupDTO {

    private Integer markupId;
    private Set<SeasonMarkupDTO> seasonMarkups = new HashSet<>();
    private Integer contractId;

}
