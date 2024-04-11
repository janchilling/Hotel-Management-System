package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.HotelImageDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SearchResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

import java.sql.Date;
import java.util.List;

public interface HotelService {

    StandardResponse<Hotel> createHotel(HotelRequestDTO hotelRequestDTO);

    StandardResponse<Hotel> updateHotel(Integer hotelId, HotelRequestDTO hotelRequestDTO);

    StandardResponse<HotelResponseDTO> getHotelById(Integer hotelId);


    StandardResponse<List<HotelImageDTO>> getHotelImagesByHotelId(Integer hotelId);

}
