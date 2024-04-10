package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class CustomerResponseDTO {

    private Long userId;
    private String customerFname;
    private String customerLname;
    private String customerStreetAddress;
    private String customerCity;
    private String customerState;
    private String customerPostalCode;
    private String customerCountry;
}
