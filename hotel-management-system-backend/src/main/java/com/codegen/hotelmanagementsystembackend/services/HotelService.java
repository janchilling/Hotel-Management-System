package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.HotelRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;

public interface HotelService {

    Hotel createHotel(HotelRequestDTO hotelRequestDTO);

    HotelResponseDTO getHotelById(Integer hotelId);

}
