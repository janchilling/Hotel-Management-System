package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SearchResponseDTO;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

import java.sql.Date;
import java.util.List;

public interface ProductService {

    StandardResponse<List<SearchResponseDTO>> searchHotels(String destination, Integer noOfRooms, Date checkIn, Date checkOut);

    StandardResponse<SearchResponseDTO> getHotelByIdActive(Integer hotelId);

    StandardResponse<Boolean> checkAvailabilityByHotelId(Integer hotelId, Integer noOfRooms, Date checkIn, Date checkOut);

    StandardResponse<List<SearchResponseDTO>> adminSearchHotels(String hotel);

}
