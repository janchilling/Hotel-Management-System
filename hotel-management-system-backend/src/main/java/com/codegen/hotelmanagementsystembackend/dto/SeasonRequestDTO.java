package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;
import java.util.Set;

@Data
public class SeasonRequestDTO {

    private Integer seasonId;
    private String seasonName;
    private Date startDate;
    private Date endDate;
    private Set<SeasonSupplementDTO> supplementsSeasons;
    private Set<SeasonRoomTypeDTO> supplementsRoomtypes;
    private Set<SeasonMarkupDTO> seasonMarkups;
    private Set<SeasonDiscountDTO> seasonDiscounts;
    private ContractRequestDTO contract;
}
