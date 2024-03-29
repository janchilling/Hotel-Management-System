package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.RoomTypeRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.RoomTypeResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.RoomType;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

import java.sql.Date;
import java.util.List;

public interface RoomTypeService {

    StandardResponse<Integer> getAvailableRoomTypeCount(Integer roomTypeId, Date checkInDate, Date checkOutDate, Integer seasonId);

    List<RoomType> createRoomType(List<RoomTypeRequestDTO> roomTypeRequestDTOS);

    RoomTypeResponseDTO getRoomTypeById(Integer discountId);

    List<RoomTypeResponseDTO> getRoomTypeByContract(Integer contractId);

    List<List<RoomTypeResponseDTO>> getRoomTypeByHotel(Integer hotelId);

}
