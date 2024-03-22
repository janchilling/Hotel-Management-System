package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.HotelRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

import java.sql.Date;
import java.util.List;

public interface HotelService {

    Hotel createHotel(HotelRequestDTO hotelRequestDTO);

    HotelResponseDTO getHotelById(Integer hotelId);


}
