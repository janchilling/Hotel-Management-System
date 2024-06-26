package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
public class MarkupRequestDTO {

    private Integer markupId;
    private Set<SeasonMarkupDTO> seasonMarkups = new HashSet<>();
    private Integer contractId;

}
