package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class BookingSupplementResponseDTO {

    private Integer bookingSupplementId;
    private Long supplementPrice;
    private String supplementName;

}
