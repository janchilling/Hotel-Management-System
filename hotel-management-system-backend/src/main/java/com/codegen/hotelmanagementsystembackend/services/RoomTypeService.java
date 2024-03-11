package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.RoomTypeRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.RoomTypeResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.RoomType;

import java.util.List;

public interface RoomTypeService {

    List<RoomType> createRoomType(List<RoomTypeRequestDTO> roomTypeRequestDTOS);

    RoomTypeResponseDTO getRoomTypeById(Integer discountId);

    List<RoomTypeResponseDTO> getRoomTypeByContract(Integer contractId);

    List<List<RoomTypeResponseDTO>> getRoomTypeByHotel(Integer hotelId);
}
