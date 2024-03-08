package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.RoomTypeRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.RoomType;

import java.util.List;

public interface RoomTypeService {

    List<RoomType> createRoomType(List<RoomTypeRequestDTO> roomTypeRequestDTOS);
}
