package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.List;

@Data
public class HotelResponseDTO {

    private Integer hotelId;
    private String hotelName;
    private String hotelDescription;
    private String hotelBriefDescription;
    private String hotelEmail;
    private String hotelStreetAddress;
    private String hotelCity;
    private String hotelState;
    private String hotelCountry;
    private Integer hotelPostalCode;

    // Seperate DTO?
    private List<Integer> contractIds;
    private List<String> contractStatuses;

}
