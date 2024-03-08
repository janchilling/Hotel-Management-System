package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class ContractRequestDTO {

    private Integer contractId;
    private Date startDate;
    private Date endDate;
    private String contractStatus;
    private String cancellationDeadline;
    private Double cancellationAmount;
    private String prepayment;
    private String balancePayment;
    private List<DiscountRequestDTO> discounts;
    private List<MarkupRequestDTO> markups;
    private List<SeasonRequestDTO> seasons;
    private List<SupplementDTO> supplements;
    private List<RoomTypeRequestDTO> roomTypes;

}
