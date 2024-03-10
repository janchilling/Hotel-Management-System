package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Data
public class SeasonRequestDTO {

    private Integer seasonId;
    private String seasonName;
    private Date startDate;
    private Date endDate;
//    private List<SeasonSupplementDTO> supplementsSeasonsLists;
//    private List<SeasonRoomTypeDTO> supplementsRoomtypesLists;
//    private List<SeasonMarkupDTO> seasonMarkupsLists;
//    private List<SeasonDiscountDTO> seasonDiscountsLists;
    private Integer contractId;
}
