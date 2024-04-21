package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Builder;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
@Builder
public class ContractRequestDTO {

    private Integer contractId;
    private Date startDate;
    private Date endDate;
    private String contractStatus;
    private Integer cancellationDeadline;
    private Integer cancellationAmount;
    private Integer prepayment;
    private Integer balancePayment;
    private Integer hotelId;
    private List<SeasonRequestDTO> seasons;

}
