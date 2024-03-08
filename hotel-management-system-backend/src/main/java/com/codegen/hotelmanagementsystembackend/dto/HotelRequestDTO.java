package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class HotelRequestDTO {

    private String hotelName;

    private String hotelDescription;

    private String hotelEmail;

    private String hotelStreetAddress;

    private String hotelCity;

    private String hotelState;

    private String hotelCountry;

    private Integer hotelPostalCode;

    private List<HotelImageDTO> hotelImages = new ArrayList<>();

    private List<HotelPhoneDTO> hotelPhones = new ArrayList<>();

    private Integer contractId;
}
