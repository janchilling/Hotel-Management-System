package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class ContractRequest {

    private Integer contractId;
    private Date startDate;
    private Date endDate;
    private String contractStatus;
    private String cancellationDeadline;
    private Double cancellationAmount;
    private String prepayment;
    private String balancePayment;
    private List<DiscountDTO> discounts;
    private List<MarkupDTO> markups;
    private List<SeasonDTO> seasons;
    private List<SupplementDTO> supplements;

}
