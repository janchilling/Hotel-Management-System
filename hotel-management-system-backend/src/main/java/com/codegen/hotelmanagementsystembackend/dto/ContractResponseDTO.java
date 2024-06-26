package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class ContractResponseDTO {

    private Integer contractId;
    private Date startDate;
    private Date endDate;
    private String contractStatus;
    private Integer cancellationDeadline;
    private Integer cancellationAmount;
    private Integer prepayment;
    private Integer balancePayment;
    private Integer hotelId;
    private String hotelName;
    private List<SeasonResponseDTO> seasons;
    private List<MarkupResponseDTO> markups;
    private List<DiscountResponseDTO> discounts;
    private List<RoomTypeResponseDTO> roomTypes;
    private List<SupplementResponseDTO> supplements;

}
