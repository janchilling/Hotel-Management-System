package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.List;

@Data
public class SearchResponseDTO {

    private Integer hotelId;
    private String hotelName;
    private String hotelDescription;
    private String hotelBriefDescription;
    private String hotelEmail;
    private Integer hotelRating;
    private String hotelStreetAddress;
    private String hotelCity;
    private String hotelState;
    private String hotelCountry;
    private Integer hotelPostalCode;
    private String hotelImage;
    private Double lowestRoomTypePrice;
    private Integer contractId;

}
