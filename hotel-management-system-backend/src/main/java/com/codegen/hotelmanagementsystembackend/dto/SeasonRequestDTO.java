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
    private Integer contractId;
}
